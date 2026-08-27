// =============================================================================
// Data bawaan (DUMMY) — disalin dari config/parameters.yaml,
// master_unit_DUMMY.csv, dan grid pembanding pada build_workbook.py.
//
// PERINGATAN: Seluruh angka adalah DATA KARANGAN yang menyerupai pasar
// perkantoran Jakarta pertengahan 2026. Ganti dengan data gedung Anda sendiri.
// =============================================================================

import type { Parameters, Unit, Pembanding } from "./types";

export const DEFAULT_PARAMS: Parameters = {
  meta: {
    versi: "1.0",
    tanggal: "2026-08-23",
    penyusun: "Analis Penetapan Harga",
    status_kalibrasi: "BELUM_TERKALIBRASI",
  },
  gedung: {
    kode: "MNS-01",
    nama: "Menara Nusantara",
    lokasi: "Jakarta - Luar CBD",
    grade: "A",
    jumlah_lantai: 30,
    lantai_sewa_mulai: 3,
    tahun_selesai: 2018,
    gfa_m2: 48000,
    nla_m2: 33600,
    standar_pengukuran: "ANSI/BOMA Z65.1-2024 Metode B (Faktor Beban Tunggal)",
    faktor_beban: 0.18,
  },
  tarif: {
    dasar_gedung_rp_m2_bulan: 184000,
    service_charge_rp_m2_bulan: 62000,
    satuan_pembulatan_rp: 500,
    basis_kalibrasi: "SELURUH_NLA",
  },
  pagar_pengaman: {
    phi_toleransi_impas: 0.9,
    delta_diskon_maks_pasar: 0.15,
    gamma_premi_maks: 0.08,
    tarif_premium_pasar_rp: 234000,
    faktor_total_min: 0.8,
    faktor_total_maks: 1.35,
  },
  faktor_lantai: {
    model_aktif: "ZONA",
    logaritmik: {
      theta: 0.085,
      lantai_referensi: 9,
      lambda_pelandaian: 5,
    },
    zona: [
      { nama: "Podium", lantai_awal: 3, lantai_akhir: 5, premi_zona: -0.06, tambahan_per_lantai: 0.003 },
      { nama: "Bawah", lantai_awal: 6, lantai_akhir: 12, premi_zona: 0.0, tambahan_per_lantai: 0.0035 },
      { nama: "Tengah", lantai_awal: 13, lantai_akhir: 20, premi_zona: 0.045, tambahan_per_lantai: 0.003 },
      { nama: "Atas", lantai_awal: 21, lantai_akhir: 27, premi_zona: 0.09, tambahan_per_lantai: 0.0025 },
      { nama: "Puncak", lantai_awal: 28, lantai_akhir: 30, premi_zona: 0.13, tambahan_per_lantai: 0.0015 },
    ],
  },
  faktor_view: {
    porsi_view_dalam_faktor_lantai: 0.27,
    kategori: {
      Terhalang: -0.03,
      Terbatas: 0.0,
      Terbuka: 0.03,
      Penanda: 0.06,
    },
  },
  faktor_posisi: {
    Sudut: 0.03,
    Hadap_Lift: 0.01,
    Dekat_Servis: -0.025,
    Ujung_Buntu: -0.015,
    Standar: 0.0,
  },
  faktor_ukuran: {
    luas_referensi_m2: 250,
    sigma: 0.04,
    batas_bawah: 0.92,
    batas_atas: 1.08,
  },
  faktor_kondisi: {
    Shell_Core: 0.0,
    Warm_Shell: 0.035,
    Semi_Fitted: 0.065,
    Fully_Fitted: 0.12,
    biaya_fitout_rp_m2: 3500000,
    masa_sewa_acuan_bulan: 60,
  },
  faktor_denah: {
    Bebas_Kolom: 0.02,
    Standar: 0.0,
    Banyak_Kolom: -0.025,
    Plafon_Tinggi: 0.015,
  },
  keuangan: {
    nilai_aset_rp: 700000000000,
    cap_rate_target: 0.07,
    opex_tahunan_rp: 26400000000,
    pendapatan_lain_tahunan_rp: 4800000000,
    cadangan_capex_tahunan_rp: 6720000000,
    cicilan_utang_tahunan_rp: 22000000000,
    okupansi_target: 0.78,
    kerugian_penagihan: 0.015,
    diskonto_tahunan: 0.11,
    eskalasi_sewa_tahunan: 0.03,
    eskalasi_sc_tahunan: 0.03,
  },
  pajak: {
    pph_final_sewa: 0.1,
    ppn: 0.11,
    dasar_pengenaan: "BRUTO_TERMASUK_SERVICE_CHARGE",
  },
  insentif: {
    masa_sewa_baku_bulan: 36,
    bulan_gratis_baku: 2,
    biaya_ti_rp_m2: 250000,
    komisi_agen_persen_nilai_kontrak: 0.02,
  },
  sensitivitas: {
    elastisitas_okupansi: -0.6,
    variasi_tarif: [-0.1, -0.05, 0.0, 0.06, 0.11],
    variasi_okupansi: [0.65, 0.7, 0.75, 0.8, 0.85],
  },
  ambang_mutu: {
    toleransi_kalibrasi: 0.005,
    cv_pembanding_maks: 0.15,
    penyesuaian_pembanding_maks: 0.25,
    selisih_pembulatan_maks: 0.005,
    mape_maks: 0.15,
    kalibrasi_k_min: 0.9,
    kalibrasi_k_maks: 1.1,
  },
};

// Mode penetapan tarif dasar. OTOMATIS = pakai median hasil model (Rumus 7.3).
// MANUAL = pakai tarif.dasar_gedung_rp_m2_bulan.
export const DEFAULT_MODE_TARIF: "OTOMATIS" | "MANUAL" = "OTOMATIS";

// Grid pembanding pasar (Bab 5). Urutan penyesuaian:
// [Lokasi, Usia, Grade, Transit, Hijau, Fasilitas]
export const DEFAULT_PEMBANDING: Pembanding[] = [
  { nama: "Menara Cendrawasih", tarif_awal: 195000, penyesuaian: [0.0, 0.03, 0.0, -0.04, -0.03, 0.0] },
  { nama: "Wisma Anggrek", tarif_awal: 165000, penyesuaian: [0.05, -0.02, 0.06, 0.02, 0.0, 0.0] },
  { nama: "Graha Kirana Tower", tarif_awal: 210000, penyesuaian: [-0.06, 0.05, -0.05, -0.05, -0.03, 0.0] },
  { nama: "Plaza Mahakam", tarif_awal: 172000, penyesuaian: [0.02, 0.0, 0.04, 0.0, 0.0, 0.0] },
  { nama: "Menara Bimasakti", tarif_awal: 158000, penyesuaian: [0.06, -0.03, 0.07, 0.03, 0.0, 0.02] },
  { nama: "Sentra Nirwana Office", tarif_awal: 188000, penyesuaian: [0.01, 0.02, 0.0, -0.02, 0.0, 0.0] },
];

export const LABEL_PEMBANDING = ["Lokasi", "Usia", "Grade", "Transit", "Hijau", "Fasilitas"];

// -----------------------------------------------------------------------------
// 65 unit dummy — disalin dari master_unit_DUMMY.csv
// -----------------------------------------------------------------------------
type U = Omit<Unit, "Kode_Gedung">;
const rows: U[] = [
  { Kode_Unit: "MNS-01-03A", Lantai: 3, Luas_NLA_m2: 290, Kategori_View: "Terbatas", Posisi: "Hadap_Lift", Kondisi_Fitout: "Warm_Shell", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Rekayasa Presisi", Catatan: "" },
  { Kode_Unit: "MNS-01-03B", Lantai: 3, Luas_NLA_m2: 290, Kategori_View: "Terbatas", Posisi: "Standar", Kondisi_Fitout: "Warm_Shell", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Samudera Trading", Catatan: "" },
  { Kode_Unit: "MNS-01-03C", Lantai: 3, Luas_NLA_m2: 310, Kategori_View: "Terbatas", Posisi: "Standar", Kondisi_Fitout: "Warm_Shell", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Cakrawala Media", Catatan: "" },
  { Kode_Unit: "MNS-01-03D", Lantai: 3, Luas_NLA_m2: 310, Kategori_View: "Terhalang", Posisi: "Standar", Kondisi_Fitout: "Shell_Core", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Samudera Trading", Catatan: "" },
  { Kode_Unit: "MNS-01-04A", Lantai: 4, Luas_NLA_m2: 575, Kategori_View: "Terhalang", Posisi: "Sudut", Kondisi_Fitout: "Shell_Core", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Graha Konsultama", Catatan: "" },
  { Kode_Unit: "MNS-01-04B", Lantai: 4, Luas_NLA_m2: 625, Kategori_View: "Terhalang", Posisi: "Sudut", Kondisi_Fitout: "Warm_Shell", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Lintas Data Prima", Catatan: "" },
  { Kode_Unit: "MNS-01-05A", Lantai: 5, Luas_NLA_m2: 575, Kategori_View: "Terbatas", Posisi: "Sudut", Kondisi_Fitout: "Semi_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Mitra Energi Terbarukan", Catatan: "" },
  { Kode_Unit: "MNS-01-05B", Lantai: 5, Luas_NLA_m2: 625, Kategori_View: "Terbatas", Posisi: "Standar", Kondisi_Fitout: "Warm_Shell", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Bahari Logistik", Catatan: "" },
  { Kode_Unit: "MNS-01-06A", Lantai: 6, Luas_NLA_m2: 535, Kategori_View: "Terbatas", Posisi: "Sudut", Kondisi_Fitout: "Semi_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Bumi Sejahtera", Catatan: "" },
  { Kode_Unit: "MNS-01-06B", Lantai: 6, Luas_NLA_m2: 665, Kategori_View: "Terhalang", Posisi: "Standar", Kondisi_Fitout: "Semi_Fitted", Denah: "Banyak_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Cakrawala Media", Catatan: "" },
  { Kode_Unit: "MNS-01-07A", Lantai: 7, Luas_NLA_m2: 355, Kategori_View: "Terbatas", Posisi: "Sudut", Kondisi_Fitout: "Warm_Shell", Denah: "Banyak_Kolom", Status_Hunian: "Kosong", Nama_Penyewa: "", Catatan: "" },
  { Kode_Unit: "MNS-01-07B", Lantai: 7, Luas_NLA_m2: 390, Kategori_View: "Terbuka", Posisi: "Hadap_Lift", Kondisi_Fitout: "Semi_Fitted", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "Kantor Hukum Wijaya & Rekan", Catatan: "" },
  { Kode_Unit: "MNS-01-07C", Lantai: 7, Luas_NLA_m2: 455, Kategori_View: "Terbatas", Posisi: "Sudut", Kondisi_Fitout: "Warm_Shell", Denah: "Banyak_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Mitra Energi Terbarukan", Catatan: "" },
  { Kode_Unit: "MNS-01-08A", Lantai: 8, Luas_NLA_m2: 380, Kategori_View: "Terbatas", Posisi: "Hadap_Lift", Kondisi_Fitout: "Semi_Fitted", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Sentosa Asuransi", Catatan: "" },
  { Kode_Unit: "MNS-01-08B", Lantai: 8, Luas_NLA_m2: 445, Kategori_View: "Terhalang", Posisi: "Hadap_Lift", Kondisi_Fitout: "Shell_Core", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Sentosa Asuransi", Catatan: "" },
  { Kode_Unit: "MNS-01-08C", Lantai: 8, Luas_NLA_m2: 375, Kategori_View: "Terbatas", Posisi: "Sudut", Kondisi_Fitout: "Fully_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Sentosa Asuransi", Catatan: "" },
  { Kode_Unit: "MNS-01-09A", Lantai: 9, Luas_NLA_m2: 290, Kategori_View: "Terhalang", Posisi: "Sudut", Kondisi_Fitout: "Fully_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "Kantor Hukum Wijaya & Rekan", Catatan: "" },
  { Kode_Unit: "MNS-01-09B", Lantai: 9, Luas_NLA_m2: 285, Kategori_View: "Terbuka", Posisi: "Hadap_Lift", Kondisi_Fitout: "Semi_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Rekayasa Presisi", Catatan: "" },
  { Kode_Unit: "MNS-01-09C", Lantai: 9, Luas_NLA_m2: 290, Kategori_View: "Terbuka", Posisi: "Standar", Kondisi_Fitout: "Shell_Core", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Nusantara Fintech", Catatan: "" },
  { Kode_Unit: "MNS-01-09D", Lantai: 9, Luas_NLA_m2: 335, Kategori_View: "Terbatas", Posisi: "Ujung_Buntu", Kondisi_Fitout: "Warm_Shell", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Rekayasa Presisi", Catatan: "" },
  { Kode_Unit: "MNS-01-10A", Lantai: 10, Luas_NLA_m2: 255, Kategori_View: "Terhalang", Posisi: "Sudut", Kondisi_Fitout: "Semi_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Sinar Kencana", Catatan: "" },
  { Kode_Unit: "MNS-01-10B", Lantai: 10, Luas_NLA_m2: 300, Kategori_View: "Terbuka", Posisi: "Standar", Kondisi_Fitout: "Shell_Core", Denah: "Banyak_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Karya Arsitektur", Catatan: "" },
  { Kode_Unit: "MNS-01-10C", Lantai: 10, Luas_NLA_m2: 330, Kategori_View: "Terhalang", Posisi: "Hadap_Lift", Kondisi_Fitout: "Warm_Shell", Denah: "Plafon_Tinggi", Status_Hunian: "Terisi", Nama_Penyewa: "PT Bahari Logistik", Catatan: "" },
  { Kode_Unit: "MNS-01-10D", Lantai: 10, Luas_NLA_m2: 315, Kategori_View: "Terhalang", Posisi: "Sudut", Kondisi_Fitout: "Shell_Core", Denah: "Plafon_Tinggi", Status_Hunian: "Terisi", Nama_Penyewa: "PT Karya Arsitektur", Catatan: "" },
  { Kode_Unit: "MNS-01-11A", Lantai: 11, Luas_NLA_m2: 440, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Shell_Core", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Karya Arsitektur", Catatan: "" },
  { Kode_Unit: "MNS-01-11B", Lantai: 11, Luas_NLA_m2: 310, Kategori_View: "Terbuka", Posisi: "Dekat_Servis", Kondisi_Fitout: "Shell_Core", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Mitra Energi Terbarukan", Catatan: "" },
  { Kode_Unit: "MNS-01-11C", Lantai: 11, Luas_NLA_m2: 450, Kategori_View: "Terbuka", Posisi: "Ujung_Buntu", Kondisi_Fitout: "Warm_Shell", Denah: "Banyak_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Graha Konsultama", Catatan: "" },
  { Kode_Unit: "MNS-01-12A", Lantai: 12, Luas_NLA_m2: 320, Kategori_View: "Terbatas", Posisi: "Hadap_Lift", Kondisi_Fitout: "Semi_Fitted", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Rekayasa Presisi", Catatan: "" },
  { Kode_Unit: "MNS-01-12B", Lantai: 12, Luas_NLA_m2: 315, Kategori_View: "Terbuka", Posisi: "Dekat_Servis", Kondisi_Fitout: "Semi_Fitted", Denah: "Standar", Status_Hunian: "Kosong", Nama_Penyewa: "", Catatan: "" },
  { Kode_Unit: "MNS-01-12C", Lantai: 12, Luas_NLA_m2: 240, Kategori_View: "Terhalang", Posisi: "Standar", Kondisi_Fitout: "Semi_Fitted", Denah: "Plafon_Tinggi", Status_Hunian: "Kosong", Nama_Penyewa: "", Catatan: "" },
  { Kode_Unit: "MNS-01-12D", Lantai: 12, Luas_NLA_m2: 325, Kategori_View: "Terbatas", Posisi: "Ujung_Buntu", Kondisi_Fitout: "Semi_Fitted", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Karya Arsitektur", Catatan: "" },
  { Kode_Unit: "MNS-01-13A", Lantai: 13, Luas_NLA_m2: 595, Kategori_View: "Terbatas", Posisi: "Sudut", Kondisi_Fitout: "Fully_Fitted", Denah: "Standar", Status_Hunian: "Kosong", Nama_Penyewa: "", Catatan: "" },
  { Kode_Unit: "MNS-01-13B", Lantai: 13, Luas_NLA_m2: 605, Kategori_View: "Terbuka", Posisi: "Ujung_Buntu", Kondisi_Fitout: "Semi_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Dirgantara Teknologi", Catatan: "" },
  { Kode_Unit: "MNS-01-14A", Lantai: 14, Luas_NLA_m2: 575, Kategori_View: "Terbatas", Posisi: "Hadap_Lift", Kondisi_Fitout: "Shell_Core", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Nusantara Fintech", Catatan: "" },
  { Kode_Unit: "MNS-01-14B", Lantai: 14, Luas_NLA_m2: 625, Kategori_View: "Terbuka", Posisi: "Ujung_Buntu", Kondisi_Fitout: "Warm_Shell", Denah: "Standar", Status_Hunian: "Kosong", Nama_Penyewa: "", Catatan: "" },
  { Kode_Unit: "MNS-01-15A", Lantai: 15, Luas_NLA_m2: 630, Kategori_View: "Terbatas", Posisi: "Sudut", Kondisi_Fitout: "Shell_Core", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Sinar Kencana", Catatan: "" },
  { Kode_Unit: "MNS-01-15B", Lantai: 15, Luas_NLA_m2: 570, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Warm_Shell", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Andalan Digital", Catatan: "" },
  { Kode_Unit: "MNS-01-16A", Lantai: 16, Luas_NLA_m2: 410, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Semi_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Dirgantara Teknologi", Catatan: "" },
  { Kode_Unit: "MNS-01-16B", Lantai: 16, Luas_NLA_m2: 375, Kategori_View: "Terbuka", Posisi: "Hadap_Lift", Kondisi_Fitout: "Warm_Shell", Denah: "Banyak_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Karya Arsitektur", Catatan: "" },
  { Kode_Unit: "MNS-01-16C", Lantai: 16, Luas_NLA_m2: 415, Kategori_View: "Terbuka", Posisi: "Standar", Kondisi_Fitout: "Semi_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Nusantara Fintech", Catatan: "" },
  { Kode_Unit: "MNS-01-17A", Lantai: 17, Luas_NLA_m2: 645, Kategori_View: "Terbuka", Posisi: "Hadap_Lift", Kondisi_Fitout: "Warm_Shell", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Samudera Trading", Catatan: "" },
  { Kode_Unit: "MNS-01-17B", Lantai: 17, Luas_NLA_m2: 555, Kategori_View: "Terbuka", Posisi: "Standar", Kondisi_Fitout: "Semi_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Sinar Kencana", Catatan: "" },
  { Kode_Unit: "MNS-01-18A", Lantai: 18, Luas_NLA_m2: 575, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Semi_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Sentosa Asuransi", Catatan: "" },
  { Kode_Unit: "MNS-01-18B", Lantai: 18, Luas_NLA_m2: 625, Kategori_View: "Terbuka", Posisi: "Ujung_Buntu", Kondisi_Fitout: "Warm_Shell", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Cakrawala Media", Catatan: "" },
  { Kode_Unit: "MNS-01-19A", Lantai: 19, Luas_NLA_m2: 670, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Warm_Shell", Denah: "Plafon_Tinggi", Status_Hunian: "Terisi", Nama_Penyewa: "PT Rekayasa Presisi", Catatan: "" },
  { Kode_Unit: "MNS-01-19B", Lantai: 19, Luas_NLA_m2: 530, Kategori_View: "Terbatas", Posisi: "Ujung_Buntu", Kondisi_Fitout: "Warm_Shell", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Karya Arsitektur", Catatan: "" },
  { Kode_Unit: "MNS-01-20A", Lantai: 20, Luas_NLA_m2: 420, Kategori_View: "Terbatas", Posisi: "Sudut", Kondisi_Fitout: "Semi_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Bahari Logistik", Catatan: "" },
  { Kode_Unit: "MNS-01-20B", Lantai: 20, Luas_NLA_m2: 410, Kategori_View: "Terbuka", Posisi: "Dekat_Servis", Kondisi_Fitout: "Semi_Fitted", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "Kantor Hukum Wijaya & Rekan", Catatan: "" },
  { Kode_Unit: "MNS-01-20C", Lantai: 20, Luas_NLA_m2: 370, Kategori_View: "Terbuka", Posisi: "Ujung_Buntu", Kondisi_Fitout: "Shell_Core", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Bahari Logistik", Catatan: "" },
  { Kode_Unit: "MNS-01-21A", Lantai: 21, Luas_NLA_m2: 630, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Fully_Fitted", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Nusantara Fintech", Catatan: "" },
  { Kode_Unit: "MNS-01-21B", Lantai: 21, Luas_NLA_m2: 570, Kategori_View: "Terbuka", Posisi: "Standar", Kondisi_Fitout: "Shell_Core", Denah: "Standar", Status_Hunian: "Kosong", Nama_Penyewa: "", Catatan: "" },
  { Kode_Unit: "MNS-01-22A", Lantai: 22, Luas_NLA_m2: 1200, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Fully_Fitted", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Bumi Sejahtera", Catatan: "" },
  { Kode_Unit: "MNS-01-23A", Lantai: 23, Luas_NLA_m2: 1200, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Semi_Fitted", Denah: "Banyak_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "Kantor Hukum Wijaya & Rekan", Catatan: "" },
  { Kode_Unit: "MNS-01-24A", Lantai: 24, Luas_NLA_m2: 585, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Shell_Core", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Graha Konsultama", Catatan: "" },
  { Kode_Unit: "MNS-01-24B", Lantai: 24, Luas_NLA_m2: 615, Kategori_View: "Terbuka", Posisi: "Ujung_Buntu", Kondisi_Fitout: "Semi_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Bumi Sejahtera", Catatan: "" },
  { Kode_Unit: "MNS-01-25A", Lantai: 25, Luas_NLA_m2: 570, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Shell_Core", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Cakrawala Media", Catatan: "" },
  { Kode_Unit: "MNS-01-25B", Lantai: 25, Luas_NLA_m2: 630, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Fully_Fitted", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Samudera Trading", Catatan: "" },
  { Kode_Unit: "MNS-01-26A", Lantai: 26, Luas_NLA_m2: 605, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Warm_Shell", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Nusantara Fintech", Catatan: "" },
  { Kode_Unit: "MNS-01-26B", Lantai: 26, Luas_NLA_m2: 595, Kategori_View: "Terbuka", Posisi: "Ujung_Buntu", Kondisi_Fitout: "Warm_Shell", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Nusantara Fintech", Catatan: "" },
  { Kode_Unit: "MNS-01-27A", Lantai: 27, Luas_NLA_m2: 575, Kategori_View: "Penanda", Posisi: "Sudut", Kondisi_Fitout: "Shell_Core", Denah: "Bebas_Kolom", Status_Hunian: "Kosong", Nama_Penyewa: "", Catatan: "" },
  { Kode_Unit: "MNS-01-27B", Lantai: 27, Luas_NLA_m2: 625, Kategori_View: "Penanda", Posisi: "Standar", Kondisi_Fitout: "Warm_Shell", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Samudera Trading", Catatan: "" },
  { Kode_Unit: "MNS-01-28A", Lantai: 28, Luas_NLA_m2: 1200, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Semi_Fitted", Denah: "Bebas_Kolom", Status_Hunian: "Terisi", Nama_Penyewa: "PT Graha Konsultama", Catatan: "" },
  { Kode_Unit: "MNS-01-29A", Lantai: 29, Luas_NLA_m2: 1200, Kategori_View: "Terbuka", Posisi: "Sudut", Kondisi_Fitout: "Semi_Fitted", Denah: "Bebas_Kolom", Status_Hunian: "Kosong", Nama_Penyewa: "", Catatan: "" },
  { Kode_Unit: "MNS-01-30A", Lantai: 30, Luas_NLA_m2: 1200, Kategori_View: "Penanda", Posisi: "Sudut", Kondisi_Fitout: "Shell_Core", Denah: "Standar", Status_Hunian: "Terisi", Nama_Penyewa: "PT Nusantara Fintech", Catatan: "" },
];

export const DEFAULT_UNITS: Unit[] = rows.map((u) => ({ Kode_Gedung: "MNS-01", ...u }));
