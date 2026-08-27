// =============================================================================
// Mesin perhitungan harga sewa menara.
// Port setia dari handbook (rumus bernomor) dan scripts/build_workbook.py.
// Semua perhitungan deterministik dan berjalan di browser.
// =============================================================================

import type {
  Parameters,
  Unit,
  Pembanding,
  HasilUnit,
  HasilPasar,
  HasilPembanding,
  HasilModel,
  CekMutu,
  Zona,
} from "./types";

export type ModeTarif = "OTOMATIS" | "MANUAL";

// -----------------------------------------------------------------------------
// Bantuan
// -----------------------------------------------------------------------------
const clamp = (x: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, x));

function cariZona(zona: Zona[], lantai: number): Zona {
  // Meniru MATCH(lantai, lantai_awal, 1): ambil zona terakhir yang lantai_awal <= lantai.
  let pilih = zona[0];
  for (const z of zona) {
    if (z.lantai_awal <= lantai) pilih = z;
    else break;
  }
  return pilih;
}

// -----------------------------------------------------------------------------
// Faktor lantai (Bab 9)
// -----------------------------------------------------------------------------
export function faktorLantaiZona(zona: Zona[], lantai: number): number {
  const z = cariZona(zona, lantai);
  return 1 + z.premi_zona + z.tambahan_per_lantai * (lantai - z.lantai_awal);
}

export function faktorLantaiLog(
  lantai: number,
  theta: number,
  lantaiRef: number,
  lambda: number
): number {
  return 1 + theta * Math.log((lantai + lambda) / (lantaiRef + lambda));
}

// -----------------------------------------------------------------------------
// Pendekatan Pasar (Bab 5)
// -----------------------------------------------------------------------------
export function hitungPasar(pembanding: Pembanding[]): HasilPasar {
  const eps = 0.01;
  const baris = pembanding.map((p) => {
    const totalBersih = p.penyesuaian.reduce((a, b) => a + b, 0);
    const totalAbs = p.penyesuaian.reduce((a, b) => a + Math.abs(b), 0);
    const tarifDisesuaikan = p.penyesuaian.reduce((acc, a) => acc * (1 + a), p.tarif_awal);
    return { nama: p.nama, tarif_awal: p.tarif_awal, totalBersih, totalAbs, tarifDisesuaikan };
  });
  const sumInv = baris.reduce((a, b) => a + 1 / (b.totalAbs + eps), 0);
  const hasil: HasilPembanding[] = baris.map((b) => {
    const bobot = sumInv > 0 ? 1 / (b.totalAbs + eps) / sumInv : 0;
    return {
      nama: b.nama,
      tarif_awal: b.tarif_awal,
      total_penyesuaian: b.totalBersih,
      total_abs: b.totalAbs,
      tarif_disesuaikan: b.tarifDisesuaikan,
      bobot,
    };
  });
  const rPasar = hasil.reduce((a, b) => a + b.bobot * b.tarif_disesuaikan, 0);

  // CV (Rumus 17.1) atas tarif disesuaikan
  const arr = hasil.map((h) => h.tarif_disesuaikan);
  const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
  const varians = arr.reduce((a, b) => a + (b - mean) ** 2, 0) / (arr.length - 1); // STDEV sampel
  const sd = Math.sqrt(varians);
  const cv = mean > 0 ? sd / mean : 1;
  const maksAbs = Math.max(...hasil.map((h) => h.total_abs));

  return { pembanding: hasil, r_pasar: rPasar, cv, maks_abs: maksAbs };
}

// -----------------------------------------------------------------------------
// Perhitungan penuh model
// -----------------------------------------------------------------------------
export function hitungModel(
  p: Parameters,
  units: Unit[],
  pembanding: Pembanding[],
  modeTarif: ModeTarif = "OTOMATIS"
): HasilModel {
  const fl = p.faktor_lantai;
  const fv = p.faktor_view;

  // --- Pendekatan pasar ---
  const pasar = hitungPasar(pembanding);
  const rPasar = pasar.r_pasar;

  // --- Pendekatan pendapatan & titik impas (Bab 6) ---
  const k = p.keuangan;
  const penyebutEfektif = p.gedung.nla_m2 * (k.okupansi_target - k.kerugian_penagihan) * 12;
  const noiTarget = k.nilai_aset_rp * k.cap_rate_target;
  const rButuh = penyebutEfektif > 0 ? (noiTarget + k.opex_tahunan_rp - k.pendapatan_lain_tahunan_rp) / penyebutEfektif : 0;
  const rImpas =
    penyebutEfektif > 0
      ? (k.opex_tahunan_rp + k.cadangan_capex_tahunan_rp + k.cicilan_utang_tahunan_rp - k.pendapatan_lain_tahunan_rp) /
        penyebutEfektif
      : 0;

  // --- Pagar pengaman (Bab 7) ---
  const pg = p.pagar_pengaman;
  const rMin = Math.max(rImpas * pg.phi_toleransi_impas, rPasar * (1 - pg.delta_diskon_maks_pasar));
  const rMaks = pg.tarif_premium_pasar_rp * (1 + pg.gamma_premi_maks);
  const rBintang = median3(rMin, rPasar, rMaks); // Rumus 7.3

  const rDipakai = modeTarif === "OTOMATIS" ? rBintang : p.tarif.dasar_gedung_rp_m2_bulan;

  // --- Faktor per unit (sebelum kalibrasi) ---
  type Pra = {
    unit: Unit;
    zona: string;
    f_lantai: number;
    view_premi_mentah: number;
    f_view: number;
    f_posisi: number;
    f_ukuran: number;
    f_kondisi: number;
    f_denah: number;
    f_total: number;
    f_dibatasi: number;
    r_awal: number;
  };

  const pra: Pra[] = units.map((u) => {
    const fLantaiZona = faktorLantaiZona(fl.zona, u.Lantai);
    const fLantaiLog = faktorLantaiLog(u.Lantai, fl.logaritmik.theta, fl.logaritmik.lantai_referensi, fl.logaritmik.lambda_pelandaian);
    const fLantai = fl.model_aktif === "ZONA" ? fLantaiZona : fLantaiLog;

    const viewPremi = fv.kategori[u.Kategori_View] ?? 0;
    // Koreksi tumpang tindih hanya bila premi view positif (Rumus 10.1 + koreksi)
    const koreksi = viewPremi > 0 ? Math.max(0, fLantai - 1) * fv.porsi_view_dalam_faktor_lantai : 0;
    const fView = 1 + viewPremi - koreksi;

    const fPosisi = 1 + (p.faktor_posisi[u.Posisi] ?? 0);

    const fu = p.faktor_ukuran;
    const fUkuranRaw = Math.pow(fu.luas_referensi_m2 / u.Luas_NLA_m2, fu.sigma);
    const fUkuran = clamp(fUkuranRaw, fu.batas_bawah, fu.batas_atas);

    const fKondisi = 1 + (p.faktor_kondisi[u.Kondisi_Fitout] ?? 0);
    const fDenah = 1 + (p.faktor_denah[u.Denah] ?? 0);

    const fTotal = fLantai * fView * fPosisi * fUkuran * fKondisi * fDenah;
    const fDibatasi = clamp(fTotal, pg.faktor_total_min, pg.faktor_total_maks);
    const rAwal = rDipakai * fDibatasi;

    return {
      unit: u,
      zona: cariZona(fl.zona, u.Lantai).nama,
      f_lantai: fLantai,
      view_premi_mentah: viewPremi,
      f_view: fView,
      f_posisi: fPosisi,
      f_ukuran: fUkuran,
      f_kondisi: fKondisi,
      f_denah: fDenah,
      f_total: fTotal,
      f_dibatasi: fDibatasi,
      r_awal: rAwal,
    };
  });

  // --- Kalibrasi (Bab 11) ---
  const basisTerisi = p.tarif.basis_kalibrasi === "UNIT_TERISI";
  const basisSet = basisTerisi ? pra.filter((x) => x.unit.Status_Hunian === "Terisi") : pra;
  const sumLuas = basisSet.reduce((a, b) => a + b.unit.Luas_NLA_m2, 0);
  const sumLuasR = basisSet.reduce((a, b) => a + b.unit.Luas_NLA_m2 * b.r_awal, 0);
  const rataAwal = sumLuas > 0 ? sumLuasR / sumLuas : 0;
  const kal = rataAwal > 0 ? rDipakai / rataAwal : 1;

  const mu = p.tarif.satuan_pembulatan_rp;
  const sc = p.tarif.service_charge_rp_m2_bulan;
  const ppn = p.pajak.ppn;
  const pph = p.pajak.pph_final_sewa;

  const hasilUnits: HasilUnit[] = pra.map((x) => {
    const rFinal = x.r_awal * kal;
    const rPub = Math.round(rFinal / mu) * mu;
    const tarifKotor = rPub + sc;
    const sewaBulan = rPub * x.unit.Luas_NLA_m2;
    const scBulan = sc * x.unit.Luas_NLA_m2;
    const tagihanKotor = sewaBulan + scBulan;
    const nilaiPpn = tagihanKotor * ppn;
    const nilaiPph = tagihanKotor * pph;
    return {
      unit: x.unit,
      zona: x.zona,
      f_lantai: x.f_lantai,
      view_premi_mentah: x.view_premi_mentah,
      f_view: x.f_view,
      f_posisi: x.f_posisi,
      f_ukuran: x.f_ukuran,
      f_kondisi: x.f_kondisi,
      f_denah: x.f_denah,
      f_total: x.f_total,
      f_dibatasi: x.f_dibatasi,
      r_awal: x.r_awal,
      r_final: rFinal,
      r_publikasi: rPub,
      tarif_kotor: tarifKotor,
      sewa_bulan: sewaBulan,
      sc_bulan: scBulan,
      tagihan_kotor: tagihanKotor,
      ppn: nilaiPpn,
      total_ditagih: tagihanKotor + nilaiPpn,
      pph_final: nilaiPph,
      diterima_pemilik: tagihanKotor - nilaiPph,
    };
  });

  // --- Agregat ---
  const totalNla = hasilUnits.reduce((a, b) => a + b.unit.Luas_NLA_m2, 0);
  const nlaTerisi = hasilUnits
    .filter((h) => h.unit.Status_Hunian === "Terisi")
    .reduce((a, b) => a + b.unit.Luas_NLA_m2, 0);
  const okupansiAktual = totalNla > 0 ? nlaTerisi / totalNla : 0;

  // rata-rata tertimbang R publikasi (untuk uji kalibrasi 1)
  const rataPub = totalNla > 0 ? hasilUnits.reduce((a, b) => a + b.unit.Luas_NLA_m2 * b.r_publikasi, 0) / totalNla : 0;
  const selisihPembulatan = rDipakai > 0 ? Math.abs(rataPub - rDipakai) / rDipakai : 0;

  // okupansi minimum impas (Rumus 6.7) memakai R dipakai
  const oMin =
    rDipakai * p.gedung.nla_m2 * 12 > 0
      ? (k.opex_tahunan_rp + k.cadangan_capex_tahunan_rp + k.cicilan_utang_tahunan_rp - k.pendapatan_lain_tahunan_rp) /
          (rDipakai * p.gedung.nla_m2 * 12) +
        k.kerugian_penagihan
      : 0;

  // cap rate riil (bacaan 7.1)
  const capRateRiil =
    k.nilai_aset_rp > 0
      ? (rDipakai * penyebutEfektif - k.opex_tahunan_rp + k.pendapatan_lain_tahunan_rp) / k.nilai_aset_rp
      : 0;

  // status koridor & impas
  let statusKoridor = "DI DALAM KORIDOR";
  if (rDipakai < rMin) statusKoridor = "DI BAWAH KORIDOR";
  else if (rDipakai > rMaks) statusKoridor = "DI ATAS KORIDOR";
  const statusImpas = rDipakai >= rImpas * pg.phi_toleransi_impas ? "AMAN" : "DI BAWAH IMPAS";

  // --- Rata-rata per zona (untuk monotonisitas) ---
  const zonaNama = fl.zona.map((z) => z.nama);
  const tarifPerZona = zonaNama.map((zn) => {
    const set = hasilUnits.filter((h) => h.zona === zn);
    const l = set.reduce((a, b) => a + b.unit.Luas_NLA_m2, 0);
    const lr = set.reduce((a, b) => a + b.unit.Luas_NLA_m2 * b.r_publikasi, 0);
    return l > 0 ? lr / l : 0;
  });

  // --- Sembilan pemeriksaan mutu (Bab 17) ---
  const fmtPct = (x: number) => (x * 100).toFixed(2) + "%";
  const fmtRp = (x: number) => "Rp " + Math.round(x).toLocaleString("id-ID");
  const fmtFak = (x: number) => x.toFixed(4);
  const am = p.ambang_mutu;

  const fTotalMin = Math.min(...pra.map((x) => x.f_total));
  const fTotalMaks = Math.max(...pra.map((x) => x.f_total));

  // monotonisitas: setiap zona dengan unit harus >= zona sebelumnya (yang ada unit)
  const zonaAda = tarifPerZona.filter((t) => t > 0);
  let monoton = true;
  for (let i = 1; i < zonaAda.length; i++) if (zonaAda[i] < zonaAda[i - 1] - 1e-6) monoton = false;

  // kelengkapan data unit: hitung sel kosong pada kolom wajib
  const selKosong = units.reduce((acc, u) => {
    let c = 0;
    if (!u.Kode_Unit) c++;
    if (!u.Luas_NLA_m2) c++;
    if (!u.Kategori_View) c++;
    return acc + c;
  }, 0);

  const cek: CekMutu[] = [
    mk(1, "Selisih kalibrasi rata-rata", fmtPct(selisihPembulatan), "≤ " + fmtPct(am.toleransi_kalibrasi), selisihPembulatan <= am.toleransi_kalibrasi),
    mk(2, "Faktor total minimum", fmtFak(fTotalMin), "≥ " + fmtFak(pg.faktor_total_min), fTotalMin >= pg.faktor_total_min - 1e-9),
    mk(3, "Faktor total maksimum", fmtFak(fTotalMaks), "≤ " + fmtFak(pg.faktor_total_maks), fTotalMaks <= pg.faktor_total_maks + 1e-9),
    mk(4, "Tarif di atas titik impas", fmtRp(rDipakai), "≥ " + fmtRp(rImpas * pg.phi_toleransi_impas), rDipakai >= rImpas * pg.phi_toleransi_impas),
    mk(5, "Tarif dalam koridor bawah", fmtRp(rDipakai), "≥ " + fmtRp(rMin), rDipakai >= rMin - 1e-6),
    mk(6, "Tarif dalam koridor atas", fmtRp(rDipakai), "≤ " + fmtRp(rMaks), rDipakai <= rMaks + 1e-6),
    mk(7, "Koefisien variasi pembanding", fmtPct(pasar.cv), "≤ " + fmtPct(am.cv_pembanding_maks), pasar.cv <= am.cv_pembanding_maks),
    mk(8, "Penyesuaian pembanding terbesar", fmtPct(pasar.maks_abs), "≤ " + fmtPct(am.penyesuaian_pembanding_maks), pasar.maks_abs <= am.penyesuaian_pembanding_maks),
    mk(9, "Kelengkapan data unit (sel kosong)", String(selKosong), "= 0", selKosong === 0),
    mk(10, "Monotonisitas vertikal antar zona", monoton ? "Naik" : "Tidak naik", "Wajib naik", monoton),
    mk(11, "Faktor kalibrasi dalam rentang", fmtFak(kal), `${fmtFak(am.kalibrasi_k_min)}–${fmtFak(am.kalibrasi_k_maks)}`, kal >= am.kalibrasi_k_min && kal <= am.kalibrasi_k_maks),
  ];

  return {
    units: hasilUnits,
    pasar,
    r_pasar: rPasar,
    r_butuh: rButuh,
    r_impas: rImpas,
    r_min: rMin,
    r_maks: rMaks,
    r_bintang: rBintang,
    r_dipakai: rDipakai,
    status_koridor: statusKoridor,
    status_impas: statusImpas,
    o_min: oMin,
    cap_rate_riil: capRateRiil,
    k: kal,
    rata_awal_tertimbang: rataAwal,
    rata_publikasi_tertimbang: rataPub,
    selisih_pembulatan: selisihPembulatan,
    total_nla: totalNla,
    nla_terisi: nlaTerisi,
    okupansi_aktual: okupansiAktual,
    noi_target: noiTarget,
    cek_mutu: cek,
  };
}

function mk(no: number, nama: string, nilai: string, ambang: string, lulus: boolean): CekMutu {
  return { no, nama, nilai, ambang, status: lulus ? "LULUS" : "PERIKSA" };
}

function median3(a: number, b: number, c: number): number {
  return [a, b, c].sort((x, y) => x - y)[1];
}

// -----------------------------------------------------------------------------
// Premi fit-out minimum (Rumus 10.5)
// -----------------------------------------------------------------------------
export function premiFitoutMinimum(biayaFitout: number, rBintang: number, masaSewaBulan: number): number {
  return rBintang * masaSewaBulan > 0 ? biayaFitout / (rBintang * masaSewaBulan) : 0;
}

// -----------------------------------------------------------------------------
// Sewa Efektif Bersih / NER (Bab 14)
// -----------------------------------------------------------------------------
export interface InputNER {
  tarif: number; // R nominal Rp/m2/bln
  masaSewaBulan: number; // T
  bulanGratis: number; // T_gratis
  luas: number; // A m2
  biayaTiRpM2: number; // biaya tenant improvement per m2
  komisiPersen: number; // komisi agen % nilai kontrak
  diskontoTahunan: number; // untuk NER terdiskonto
}

export function hitungNER(inp: InputNER) {
  const { tarif, masaSewaBulan: T, bulanGratis: Tg, luas: A } = inp;
  const cTI = inp.biayaTiRpM2 * A;
  const nilaiKontrak = tarif * A * (T - Tg);
  const cKomisi = inp.komisiPersen * nilaiKontrak;
  const cAwal = cTI + cKomisi;

  // NER sederhana (Rumus 14.1)
  const nerSederhana = T > 0 ? (tarif * (T - Tg) - cAwal / A) / T : 0;

  // NER terdiskonto (Rumus 14.2)
  const d = Math.pow(1 + inp.diskontoTahunan, 1 / 12) - 1;
  let pvSewa = 0;
  let pvFaktor = 0;
  for (let t = 1; t <= T; t++) {
    const bayar = t > Tg ? 1 : 0; // asumsi bulan gratis di awal
    pvSewa += (tarif * A * bayar) / Math.pow(1 + d, t);
    pvFaktor += 1 / Math.pow(1 + d, t);
  }
  const nerPV = A * pvFaktor > 0 ? (pvSewa - cAwal) / (A * pvFaktor) : 0;

  return { nerSederhana, nerPV, cTI, cKomisi, cAwal, d, nilaiKontrak };
}

// batas maksimum bulan gratis (Rumus 14.4)
export function batasBulanGratis(tarif: number, rMin: number, T: number, cAwalPerM2: number): number {
  return T * (1 - rMin / tarif) - cAwalPerM2 / tarif;
}

// -----------------------------------------------------------------------------
// Sensitivitas & elastisitas (Bab 16)
// -----------------------------------------------------------------------------
export function pendapatanTahunan(tarif: number, nla: number, okupansi: number): number {
  return tarif * nla * okupansi * 12;
}

export function okupansiPadaTarif(oLama: number, rLama: number, rBaru: number, elastisitas: number): number {
  return oLama * Math.pow(rBaru / rLama, elastisitas);
}

// -----------------------------------------------------------------------------
// Eskalasi & nilai kini (Bab 15)
// -----------------------------------------------------------------------------
export function tarifTahunKe(r0: number, g: number, n: number): number {
  return r0 * Math.pow(1 + g, n - 1);
}

export function nilaiKiniTumbuh(r0: number, luas: number, g: number, d: number, N: number): number {
  if (Math.abs(d - g) < 1e-9) return r0 * luas * 12 * N;
  return r0 * luas * 12 * ((1 - Math.pow((1 + g) / (1 + d), N)) / (d - g));
}
