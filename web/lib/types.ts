// =============================================================================
// Tipe data model harga sewa menara.
// Mengikuti struktur config/parameters.yaml dan handbook.
// =============================================================================

export type ModelLantai = "ZONA" | "LOGARITMIK";
export type BasisKalibrasi = "SELURUH_NLA" | "UNIT_TERISI";

export type KategoriView = "Terhalang" | "Terbatas" | "Terbuka" | "Penanda";
export type Posisi =
  | "Sudut"
  | "Hadap_Lift"
  | "Dekat_Servis"
  | "Ujung_Buntu"
  | "Standar";
export type KondisiFitout =
  | "Shell_Core"
  | "Warm_Shell"
  | "Semi_Fitted"
  | "Fully_Fitted";
export type Denah = "Bebas_Kolom" | "Standar" | "Banyak_Kolom" | "Plafon_Tinggi";
export type StatusHunian = "Terisi" | "Kosong";

export interface Zona {
  nama: string;
  lantai_awal: number;
  lantai_akhir: number;
  premi_zona: number;
  tambahan_per_lantai: number;
}

export interface Parameters {
  meta: {
    versi: string;
    tanggal: string;
    penyusun: string;
    status_kalibrasi: "BELUM_TERKALIBRASI" | "TERKALIBRASI";
  };
  gedung: {
    kode: string;
    nama: string;
    lokasi: string;
    grade: string;
    jumlah_lantai: number;
    lantai_sewa_mulai: number;
    tahun_selesai: number;
    gfa_m2: number;
    nla_m2: number;
    standar_pengukuran: string;
    faktor_beban: number;
  };
  tarif: {
    dasar_gedung_rp_m2_bulan: number;
    service_charge_rp_m2_bulan: number;
    satuan_pembulatan_rp: number;
    basis_kalibrasi: BasisKalibrasi;
  };
  pagar_pengaman: {
    phi_toleransi_impas: number;
    delta_diskon_maks_pasar: number;
    gamma_premi_maks: number;
    tarif_premium_pasar_rp: number;
    faktor_total_min: number;
    faktor_total_maks: number;
  };
  faktor_lantai: {
    model_aktif: ModelLantai;
    logaritmik: {
      theta: number;
      lantai_referensi: number;
      lambda_pelandaian: number;
    };
    zona: Zona[];
  };
  faktor_view: {
    porsi_view_dalam_faktor_lantai: number;
    kategori: Record<KategoriView, number>;
  };
  faktor_posisi: Record<Posisi, number>;
  faktor_ukuran: {
    luas_referensi_m2: number;
    sigma: number;
    batas_bawah: number;
    batas_atas: number;
  };
  faktor_kondisi: Record<KondisiFitout, number> & {
    biaya_fitout_rp_m2: number;
    masa_sewa_acuan_bulan: number;
  };
  faktor_denah: Record<Denah, number>;
  keuangan: {
    nilai_aset_rp: number;
    cap_rate_target: number;
    opex_tahunan_rp: number;
    pendapatan_lain_tahunan_rp: number;
    cadangan_capex_tahunan_rp: number;
    cicilan_utang_tahunan_rp: number;
    okupansi_target: number;
    kerugian_penagihan: number;
    diskonto_tahunan: number;
    eskalasi_sewa_tahunan: number;
    eskalasi_sc_tahunan: number;
  };
  pajak: {
    pph_final_sewa: number;
    ppn: number;
    dasar_pengenaan: string;
  };
  insentif: {
    masa_sewa_baku_bulan: number;
    bulan_gratis_baku: number;
    biaya_ti_rp_m2: number;
    komisi_agen_persen_nilai_kontrak: number;
  };
  sensitivitas: {
    elastisitas_okupansi: number;
    variasi_tarif: number[];
    variasi_okupansi: number[];
  };
  ambang_mutu: {
    toleransi_kalibrasi: number;
    cv_pembanding_maks: number;
    penyesuaian_pembanding_maks: number;
    selisih_pembulatan_maks: number;
    mape_maks: number;
    kalibrasi_k_min: number;
    kalibrasi_k_maks: number;
  };
}

export interface Unit {
  Kode_Gedung: string;
  Kode_Unit: string;
  Lantai: number;
  Luas_NLA_m2: number;
  Kategori_View: KategoriView;
  Posisi: Posisi;
  Kondisi_Fitout: KondisiFitout;
  Denah: Denah;
  Status_Hunian: StatusHunian;
  Nama_Penyewa: string;
  Catatan: string;
}

// Data pembanding pasar (Bab 5). Penyesuaian dalam pecahan.
export interface Pembanding {
  nama: string;
  tarif_awal: number;
  penyesuaian: number[]; // daftar penyesuaian per atribut
}

// -----------------------------------------------------------------------------
// Hasil perhitungan
// -----------------------------------------------------------------------------

export interface HasilUnit {
  unit: Unit;
  zona: string;
  f_lantai: number;
  view_premi_mentah: number;
  f_view: number;
  f_posisi: number;
  f_ukuran: number;
  f_kondisi: number;
  f_denah: number;
  f_total: number; // sebelum dibatasi
  f_dibatasi: number;
  r_awal: number;
  r_final: number;
  r_publikasi: number;
  tarif_kotor: number;
  sewa_bulan: number;
  sc_bulan: number;
  tagihan_kotor: number;
  ppn: number;
  total_ditagih: number;
  pph_final: number;
  diterima_pemilik: number;
}

export interface HasilPembanding {
  nama: string;
  tarif_awal: number;
  total_penyesuaian: number; // jumlah bersih
  total_abs: number; // jumlah mutlak |A_i|
  tarif_disesuaikan: number;
  bobot: number;
}

export interface HasilPasar {
  pembanding: HasilPembanding[];
  r_pasar: number;
  cv: number; // koefisien variasi tarif disesuaikan
  maks_abs: number; // penyesuaian mutlak terbesar
}

export interface CekMutu {
  no: number;
  nama: string;
  nilai: string;
  ambang: string;
  status: "LULUS" | "PERIKSA";
}

export interface HasilModel {
  units: HasilUnit[];
  pasar: HasilPasar;
  // penentuan tarif dasar
  r_pasar: number;
  r_butuh: number;
  r_impas: number;
  r_min: number;
  r_maks: number;
  r_bintang: number; // R* terpilih (median) — sebelum override manual
  r_dipakai: number; // R* yang benar-benar dipakai model
  status_koridor: string;
  status_impas: string;
  o_min: number; // okupansi minimum impas
  cap_rate_riil: number;
  // kalibrasi
  k: number;
  rata_awal_tertimbang: number;
  rata_publikasi_tertimbang: number;
  selisih_pembulatan: number;
  // agregat
  total_nla: number;
  nla_terisi: number;
  okupansi_aktual: number;
  noi_target: number;
  cek_mutu: CekMutu[];
}
