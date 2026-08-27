# Aplikasi Web — Model Harga Sewa Menara

Aplikasi web interaktif untuk penetapan harga sewa gedung perkantoran bertingkat,
port setia dari **Handbook Penentuan Harga Sewa Gedung Menara** dan
`scripts/build_workbook.py`. Seluruh perhitungan berjalan di browser (tanpa server).

## Live

**https://harga-sewa.reyhanmauluddi.web.id** (fallback sementara: https://harga-sewa-menara.vercel.app)

Di-hosting di Vercel, project `harga-sewa-menara` (team `reyhanfenosiols-projects`). Deploy ulang ke production dengan `vercel --prod` dari folder ini.

## Menjalankan secara lokal

```bash
cd web
npm install
npm run dev
```

Buka http://localhost:3000 (atau port yang ditampilkan). Untuk membangun versi produksi:

```bash
npm run build
npm run start
```

## Fitur (per tab)

| Tab | Isi | Rujukan handbook |
|---|---|---|
| **Ringkasan** | KPI utama, penentuan tarif dasar (koridor pasar/pendapatan/impas), ikhtisar keuangan, 11 uji mutu, tarif per zona | Bab 5–7, 17 |
| **Rate Card** | Tabel tarif per unit + seluruh faktor pengali, filter/sortir, ekspor CSV | Bab 8–13 |
| **Parameter** | Editor seluruh asumsi model (live recompute) | Bab 7–13 |
| **Data Unit** | Editor 65 unit + impor CSV | Bab 3 |
| **Pembanding** | Grid penyesuaian data pembanding pasar → R pasar | Bab 5 |
| **Sensitivitas** | Tabel dua arah tarif×okupansi, elastisitas, eskalasi, nilai kini, skenario | Bab 15–16 |
| **NER & Insentif** | Kalkulator Sewa Efektif Bersih + batas bulan gratis | Bab 14 |

## Verifikasi

Nilai bawaan (data dummy) telah dicocokkan dengan handbook:

- R pasar **185.516**, R butuh **228.889**, R impas **163.139**
- R min **157.688**, R maks **252.720**, R\* terpilih **185.516**
- Status **DI DALAM KORIDOR** & **AMAN**, faktor kalibrasi k ≈ **0,9185**
- 11/11 pemeriksaan mutu **LULUS**

## Catatan

- Data tersimpan otomatis di `localStorage` peramban. Tombol **Reset dummy** mengembalikan ke bawaan.
- Seluruh angka adalah **data karangan** menyerupai pasar Jakarta pertengahan 2026.
  Model ini alat bantu analisis internal, **bukan** laporan penilaian resmi.

## Teknologi

Next.js 15 · React 19 · TypeScript · Tailwind CSS v4. Logika model ada di `lib/model.ts`,
parameter & data bawaan di `lib/defaults.ts`.
