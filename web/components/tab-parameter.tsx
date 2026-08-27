"use client";
import React from "react";
import type { HasilModel, Parameters, KategoriView, Posisi, KondisiFitout, Denah } from "@/lib/types";
import type { ModeTarif } from "@/lib/model";
import { premiFitoutMinimum } from "@/lib/model";
import { rp, pct, fak } from "@/lib/format";
import { Card, Field, NumInput, Select, Badge, Info } from "@/components/ui";

export function ParameterEditor({
  params,
  setParams,
  modeTarif,
  setModeTarif,
  hasil,
}: {
  params: Parameters;
  setParams: (p: Parameters) => void;
  modeTarif: ModeTarif;
  setModeTarif: (m: ModeTarif) => void;
  hasil: HasilModel;
}) {
  const edit = (fn: (p: Parameters) => void) => {
    const c = structuredClone(params);
    fn(c);
    setParams(c);
  };

  const kappaMin = premiFitoutMinimum(
    params.faktor_kondisi.biaya_fitout_rp_m2,
    hasil.r_dipakai,
    params.faktor_kondisi.masa_sewa_acuan_bulan
  );

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-xs text-amber-800">
        Setiap perubahan langsung menghitung ulang seluruh model. Semua besaran premi adalah{" "}
        <b>data contoh (dummy)</b> dan <b>wajib disesuaikan</b> dengan data pasar setempat sebelum dipakai untuk keputusan nyata.
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Tarif dasar */}
        <Card title="Tarif Dasar & Penyeimbang" subtitle="Cara menetapkan R* dan menjaganya konsisten">
          <div className="grid grid-cols-2 gap-3">
            <Field label={<>Cara menetapkan R*<Info text="OTOMATIS: model memilih nilai tengah dari batas bawah, harga pasar, dan batas atas. MANUAL: Anda mengetik angka sendiri di kolom sebelah." /></>} hint="Otomatis = nilai tengah dari batas aman">
              <Select<ModeTarif>
                value={modeTarif}
                options={[
                  { value: "OTOMATIS", label: "OTOMATIS (hasil model)" },
                  { value: "MANUAL", label: "MANUAL (angka bawah)" },
                ]}
                onChange={setModeTarif}
              />
            </Field>
            <Field label="Tarif dasar manual" hint="dipakai hanya bila mode MANUAL">
              <NumInput
                value={params.tarif.dasar_gedung_rp_m2_bulan}
                step={500}
                onChange={(v) => edit((p) => (p.tarif.dasar_gedung_rp_m2_bulan = v))}
              />
            </Field>
            <Field label="Service charge" hint="Rp/m²/bln">
              <NumInput value={params.tarif.service_charge_rp_m2_bulan} step={1000} onChange={(v) => edit((p) => (p.tarif.service_charge_rp_m2_bulan = v))} />
            </Field>
            <Field label="Satuan pembulatan tarif" hint="mis. dibulatkan ke kelipatan Rp 500">
              <NumInput value={params.tarif.satuan_pembulatan_rp} step={100} onChange={(v) => edit((p) => (p.tarif.satuan_pembulatan_rp = v))} />
            </Field>
            <Field label={<>Dasar hitung penyeimbang<Info text="Menentukan apakah rata-rata tarif dihitung dari seluruh unit (untuk daftar harga) atau hanya unit yang sudah terisi (untuk laporan kinerja)." /></>}>
              <Select
                value={params.tarif.basis_kalibrasi}
                options={[
                  { value: "SELURUH_NLA", label: "Seluruh unit" },
                  { value: "UNIT_TERISI", label: "Unit terisi saja" },
                ]}
                onChange={(v) => edit((p) => (p.tarif.basis_kalibrasi = v))}
              />
            </Field>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
            R* yang dipakai: <b className="text-teal-800">{rp(Math.round(hasil.r_dipakai))}</b> · faktor penyeimbang k ={" "}
            <b>{fak(hasil.k, 4)}</b>
          </div>
        </Card>

        {/* Pagar pengaman */}
        <Card title="Batas Aman Tarif" subtitle="Supaya R* tidak jatuh terlalu murah atau naik terlalu mahal">
          <div className="grid grid-cols-2 gap-3">
            <Field label={<>Toleransi di bawah titik impas<Info text="1,00 = tarif tidak boleh sama sekali di bawah titik impas. 0,90 = boleh 10% di bawah impas untuk sementara demi mengisi ruang kosong. Simbol di handbook: φ (phi)." /></>}><NumInput value={params.pagar_pengaman.phi_toleransi_impas} step={0.05} onChange={(v) => edit((p) => (p.pagar_pengaman.phi_toleransi_impas = v))} /></Field>
            <Field label={<>Diskon maksimum dari harga pasar<Info text="Seberapa jauh tarif boleh lebih murah dari harga pasar sebagai batas bawah. Simbol di handbook: δ (delta)." /></>}><NumInput value={params.pagar_pengaman.delta_diskon_maks_pasar} step={0.01} onChange={(v) => edit((p) => (p.pagar_pengaman.delta_diskon_maks_pasar = v))} /></Field>
            <Field label={<>Premi maksimum di atas pasar<Info text="Seberapa jauh tarif boleh lebih mahal dari tarif pembanding terbaik sebagai batas atas. Simbol di handbook: γ (gamma)." /></>}><NumInput value={params.pagar_pengaman.gamma_premi_maks} step={0.01} onChange={(v) => edit((p) => (p.pagar_pengaman.gamma_premi_maks = v))} /></Field>
            <Field label="Tarif pembanding terbaik" hint="acuan untuk batas atas"><NumInput value={params.pagar_pengaman.tarif_premium_pasar_rp} step={1000} onChange={(v) => edit((p) => (p.pagar_pengaman.tarif_premium_pasar_rp = v))} /></Field>
            <Field label={<>Batas bawah pengali gabungan<Info text="Hasil kali seluruh faktor pengali per unit (lantai × view × posisi × ukuran × kondisi × denah) tidak boleh lebih rendah dari angka ini, supaya tidak ada unit yang harganya jadi ekstrem murah." /></>}><NumInput value={params.pagar_pengaman.faktor_total_min} step={0.01} onChange={(v) => edit((p) => (p.pagar_pengaman.faktor_total_min = v))} /></Field>
            <Field label={<>Batas atas pengali gabungan<Info text="Sama seperti batas bawah, tapi ke arah maksimum — mencegah unit tertentu jadi ekstrem mahal." /></>}><NumInput value={params.pagar_pengaman.faktor_total_maks} step={0.01} onChange={(v) => edit((p) => (p.pagar_pengaman.faktor_total_maks = v))} /></Field>
          </div>
        </Card>
      </div>

      {/* Faktor lantai */}
      <Card title="Faktor Lantai" subtitle="Kenapa lantai lebih tinggi biasanya lebih mahal">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Field label={<>Model yang dipakai<Info text="Zona: kenaikan harga ditetapkan per kelompok lantai (mis. lantai 2-5, 6-12, dst). Logaritmik: kenaikan dihitung halus dengan rumus, tanpa lompatan antar zona." /></>}>
            <Select
              value={params.faktor_lantai.model_aktif}
              options={[
                { value: "ZONA", label: "Zona" },
                { value: "LOGARITMIK", label: "Logaritmik" },
              ]}
              onChange={(v) => edit((p) => (p.faktor_lantai.model_aktif = v))}
            />
          </Field>
          <Field label={<>Kekuatan kenaikan per lantai<Info text="Dipakai kalau model 'Logaritmik' aktif. Makin besar angkanya, makin besar selisih harga antar lantai. Simbol di handbook: θ (theta)." /></>}><NumInput value={params.faktor_lantai.logaritmik.theta} step={0.005} onChange={(v) => edit((p) => (p.faktor_lantai.logaritmik.theta = v))} /></Field>
          <Field label="Lantai acuan" hint="lantai dengan faktor = 1,00"><NumInput value={params.faktor_lantai.logaritmik.lantai_referensi} step={1} onChange={(v) => edit((p) => (p.faktor_lantai.logaritmik.lantai_referensi = v))} /></Field>
          <Field label={<>Pelandaian kenaikan<Info text="Membuat kenaikan harga per lantai makin kecil di lantai-lantai atas (sesuai temuan pasar: kenaikan harga melandai di ketinggian). Simbol di handbook: λ (lambda)." /></>}><NumInput value={params.faktor_lantai.logaritmik.lambda_pelandaian} step={1} onChange={(v) => edit((p) => (p.faktor_lantai.logaritmik.lambda_pelandaian = v))} /></Field>
        </div>

        <div className="mt-4 tbl-wrap rounded-lg border border-slate-100">
          <table className="data">
            <thead>
              <tr>
                <th>Zona</th>
                <th className="num">Lantai awal</th>
                <th className="num">Lantai akhir</th>
                <th className="num">Premi zona (π)</th>
                <th className="num">Tambahan/lantai (β)</th>
              </tr>
            </thead>
            <tbody>
              {params.faktor_lantai.zona.map((z, i) => (
                <tr key={i}>
                  <td className="font-medium">{z.nama}</td>
                  <td className="num" style={{ width: 110 }}><NumInput value={z.lantai_awal} step={1} onChange={(v) => edit((p) => (p.faktor_lantai.zona[i].lantai_awal = v))} /></td>
                  <td className="num" style={{ width: 110 }}><NumInput value={z.lantai_akhir} step={1} onChange={(v) => edit((p) => (p.faktor_lantai.zona[i].lantai_akhir = v))} /></td>
                  <td className="num" style={{ width: 130 }}><NumInput value={z.premi_zona} step={0.005} onChange={(v) => edit((p) => (p.faktor_lantai.zona[i].premi_zona = v))} /></td>
                  <td className="num" style={{ width: 140 }}><NumInput value={z.tambahan_per_lantai} step={0.0005} onChange={(v) => edit((p) => (p.faktor_lantai.zona[i].tambahan_per_lantai = v))} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-slate-400">Model yang aktif sekarang: <b>{params.faktor_lantai.model_aktif}</b>. Semua angka premi ditulis sebagai pecahan (0,045 = tambahan 4,5%).</p>
      </Card>

      {/* Faktor non-lantai */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Faktor Pemandangan" subtitle="Koreksi supaya tidak dihitung dobel dengan faktor lantai">
          <Field label={<>Porsi pemandangan dalam faktor lantai<Info text="Sebagian premi lantai tinggi sebenarnya berasal dari pemandangannya. Angka ini mengurangi premi pemandangan supaya tidak dihitung dua kali. Berdasarkan studi Nase dkk. 2019, porsinya sekitar 0,27." /></>} hint="acuan ≈ 0,27">
            <NumInput value={params.faktor_view.porsi_view_dalam_faktor_lantai} step={0.01} onChange={(v) => edit((p) => (p.faktor_view.porsi_view_dalam_faktor_lantai = v))} />
          </Field>
          <div className="mt-3 grid grid-cols-2 gap-3">
            {(Object.keys(params.faktor_view.kategori) as KategoriView[]).map((k) => (
              <Field key={k} label={k}>
                <NumInput value={params.faktor_view.kategori[k]} step={0.005} onChange={(v) => edit((p) => (p.faktor_view.kategori[k] = v))} />
              </Field>
            ))}
          </div>
        </Card>

        <Card title="Faktor Posisi Unit di Denah" subtitle="Tiap atribut yang dimiliki unit dijumlahkan">
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(params.faktor_posisi) as Posisi[]).map((k) => (
              <Field key={k} label={k.replace(/_/g, " ")}>
                <NumInput value={params.faktor_posisi[k]} step={0.005} onChange={(v) => edit((p) => (p.faktor_posisi[k] = v))} />
              </Field>
            ))}
          </div>
        </Card>

        <Card title="Faktor Ukuran Unit" subtitle="Unit lebih besar biasanya dapat diskon per m²">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Luas acuan (m²)" hint="unit seluas ini faktornya = 1,00"><NumInput value={params.faktor_ukuran.luas_referensi_m2} step={10} onChange={(v) => edit((p) => (p.faktor_ukuran.luas_referensi_m2 = v))} /></Field>
            <Field label={<>Kekuatan diskon ukuran<Info text="Makin besar angka ini, makin besar diskon untuk unit yang jauh lebih luas dari luas acuan. Simbol di handbook: σ (sigma)." /></>}><NumInput value={params.faktor_ukuran.sigma} step={0.005} onChange={(v) => edit((p) => (p.faktor_ukuran.sigma = v))} /></Field>
            <Field label="Batas bawah faktor" hint="agar unit sangat besar tidak terlalu murah"><NumInput value={params.faktor_ukuran.batas_bawah} step={0.01} onChange={(v) => edit((p) => (p.faktor_ukuran.batas_bawah = v))} /></Field>
            <Field label="Batas atas faktor" hint="agar unit sangat kecil tidak terlalu mahal"><NumInput value={params.faktor_ukuran.batas_atas} step={0.01} onChange={(v) => edit((p) => (p.faktor_ukuran.batas_atas = v))} /></Field>
          </div>
        </Card>

        <Card title="Faktor Kondisi Ruang (Fit-out)" subtitle="Premi harus cukup menutup biaya interior yang ditanggung pemilik">
          <div className="grid grid-cols-2 gap-3">
            {(["Shell_Core", "Warm_Shell", "Semi_Fitted", "Fully_Fitted"] as KondisiFitout[]).map((k) => (
              <Field key={k} label={k.replace(/_/g, " ")}>
                <NumInput value={params.faktor_kondisi[k]} step={0.005} onChange={(v) => edit((p) => ((p.faktor_kondisi as any)[k] = v))} />
              </Field>
            ))}
            <Field label="Biaya fit-out Rp/m²" hint="ditanggung pemilik"><NumInput value={params.faktor_kondisi.biaya_fitout_rp_m2} step={100000} onChange={(v) => edit((p) => (p.faktor_kondisi.biaya_fitout_rp_m2 = v))} /></Field>
            <Field label="Masa sewa acuan (bln)"><NumInput value={params.faktor_kondisi.masa_sewa_acuan_bulan} step={6} onChange={(v) => edit((p) => (p.faktor_kondisi.masa_sewa_acuan_bulan = v))} /></Field>
          </div>
          <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs">
            Premi fit-out minimum agar biaya interior kembali modal: <b className="text-slate-800">{pct(kappaMin)}</b>.{" "}
            {params.faktor_kondisi.Fully_Fitted < kappaMin ? (
              <Badge tone="warn">Fully Fitted {pct(params.faktor_kondisi.Fully_Fitted)} belum menutup biaya</Badge>
            ) : (
              <Badge tone="good">Premi mencukupi</Badge>
            )}
          </div>
        </Card>

        <Card title="Faktor Efisiensi Denah">
          <div className="grid grid-cols-2 gap-3">
            {(Object.keys(params.faktor_denah) as Denah[]).map((k) => (
              <Field key={k} label={k.replace(/_/g, " ")}>
                <NumInput value={params.faktor_denah[k]} step={0.005} onChange={(v) => edit((p) => (p.faktor_denah[k] = v))} />
              </Field>
            ))}
          </div>
        </Card>

        {/* Keuangan */}
        <Card title="Keuangan Gedung" subtitle="Menentukan harga yang dibutuhkan & titik impas">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nilai aset (Rp)" hint="perkiraan nilai gedung"><NumInput value={params.keuangan.nilai_aset_rp} step={1e9} onChange={(v) => edit((p) => (p.keuangan.nilai_aset_rp = v))} /></Field>
            <Field label={<>Target untung tahunan (cap rate)<Info text="Persentase keuntungan tahunan yang ingin dicapai pemilik, dibanding nilai gedung." /></>}><NumInput value={params.keuangan.cap_rate_target} step={0.0025} onChange={(v) => edit((p) => (p.keuangan.cap_rate_target = v))} /></Field>
            <Field label="Biaya operasional/thn" hint="OpEx"><NumInput value={params.keuangan.opex_tahunan_rp} step={1e8} onChange={(v) => edit((p) => (p.keuangan.opex_tahunan_rp = v))} /></Field>
            <Field label="Pendapatan lain/thn" hint="parkir, sewa antena, dsb."><NumInput value={params.keuangan.pendapatan_lain_tahunan_rp} step={1e8} onChange={(v) => edit((p) => (p.keuangan.pendapatan_lain_tahunan_rp = v))} /></Field>
            <Field label="Cadangan renovasi/thn" hint="CapEx"><NumInput value={params.keuangan.cadangan_capex_tahunan_rp} step={1e8} onChange={(v) => edit((p) => (p.keuangan.cadangan_capex_tahunan_rp = v))} /></Field>
            <Field label="Cicilan utang/thn"><NumInput value={params.keuangan.cicilan_utang_tahunan_rp} step={1e8} onChange={(v) => edit((p) => (p.keuangan.cicilan_utang_tahunan_rp = v))} /></Field>
            <Field label="Target tingkat isi gedung" hint="okupansi"><NumInput value={params.keuangan.okupansi_target} step={0.01} onChange={(v) => edit((p) => (p.keuangan.okupansi_target = v))} /></Field>
            <Field label="Kerugian tunggakan" hint="penyewa yang telat/tidak bayar"><NumInput value={params.keuangan.kerugian_penagihan} step={0.005} onChange={(v) => edit((p) => (p.keuangan.kerugian_penagihan = v))} /></Field>
            <Field label={<>Tingkat diskonto tahunan<Info text="Dipakai untuk menghitung nilai uang masa depan setara uang hari ini (nilai kini)." /></>}><NumInput value={params.keuangan.diskonto_tahunan} step={0.005} onChange={(v) => edit((p) => (p.keuangan.diskonto_tahunan = v))} /></Field>
            <Field label="Kenaikan sewa tahunan" hint="eskalasi"><NumInput value={params.keuangan.eskalasi_sewa_tahunan} step={0.005} onChange={(v) => edit((p) => (p.keuangan.eskalasi_sewa_tahunan = v))} /></Field>
          </div>
        </Card>

        <Card title="Pajak" subtitle="Wajib diverifikasi ke sumber resmi & konsultan pajak saat dipakai nyata">
          <div className="grid grid-cols-2 gap-3">
            <Field label="PPh Final atas sewa" hint="PP 34/2017, umumnya 10%"><NumInput value={params.pajak.pph_final_sewa} step={0.01} onChange={(v) => edit((p) => (p.pajak.pph_final_sewa = v))} /></Field>
            <Field label="PPN" hint="Pajak Pertambahan Nilai"><NumInput value={params.pajak.ppn} step={0.01} onChange={(v) => edit((p) => (p.pajak.ppn = v))} /></Field>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">Dasar pengenaan pajak: jumlah bruto (tarif sewa + service charge).</p>
        </Card>
      </div>
    </div>
  );
}
