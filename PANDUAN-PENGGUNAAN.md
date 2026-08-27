# Panduan Penggunaan — Aplikasi Harga Sewa Menara

Panduan ini untuk siapa saja yang mau **memakai** aplikasinya sehari-hari — bukan untuk mengerti seluruh teori di baliknya. Kalau nanti Anda penasaran "kenapa rumusnya begini", baru buka `HANDBOOK-HARGA-SEWA-MENARA.md`.

---

## 1. Membuka aplikasinya

**Cara tercepat — buka langsung di browser, tidak perlu instalasi apa pun:**

**https://harga-sewa.reyhanmauluddi.web.id**

(Kalau alamat itu belum aktif karena DNS baru diatur, sementara pakai **https://harga-sewa-menara.vercel.app** — isinya sama persis.)

Tidak perlu login. Semua perhitungan jalan langsung di browser Anda; data tersimpan otomatis di perangkat masing-masing (lihat bagian 4).

**Cara alternatif — jalankan sendiri di komputer (untuk mengembangkan/mengubah kode):**

Dari folder `web/`, jalankan:

```bash
npm install   # cukup sekali di awal
npm run dev
```

Lalu buka alamat yang muncul di terminal, biasanya **http://localhost:3000** (kalau port itu dipakai proses lain, Next.js otomatis pindah ke 3001 — perhatikan baris `Local:` di terminal).

---

## 2. Apa yang dilakukan aplikasi ini

Aplikasi ini membantu menentukan **berapa harga sewa yang wajar untuk tiap unit** di sebuah gedung perkantoran — supaya unit di lantai 28 dengan pemandangan bagus tidak disewakan dengan harga sama seperti unit di lantai 4 menghadap tembok.

Alurnya sederhana:

1. Tentukan **satu harga dasar** untuk seluruh gedung (dibandingkan dengan gedung sejenis + dicek supaya gedung tidak rugi).
2. Kalikan harga dasar itu dengan beberapa **faktor** per unit — lantai berapa, pemandangannya seperti apa, besar unitnya, dst.
3. Hasilnya: daftar harga per unit yang bisa dipertanggungjawabkan ke calon penyewa.

Data yang sudah ada di aplikasi ini **contoh karangan** (gedung "Menara Nusantara", 65 unit dummy) — silakan diganti dengan data gedung Anda sendiri.

---

## 3. Urutan tab yang disarankan

Aplikasi punya 7 tab di bagian atas. Urutan berikut adalah alur kerja yang masuk akal kalau Anda mulai dari nol dengan gedung sendiri:

| Urutan | Tab | Apa yang dilakukan di situ |
|---|---|---|
| 1 | **Gedung Pembanding** | Masukkan data gedung sejenis di sekitar (tarif, lokasi, usia, dll.) — dari sini aplikasi menghitung "harga pasar" sebagai acuan awal. |
| 2 | **Parameter** | Isi data keuangan gedung Anda sendiri (nilai aset, target untung, biaya operasional) dan atur besaran tiap faktor (lantai, pemandangan, ukuran unit, dll.) |
| 3 | **Data Unit** | Masukkan daftar unit gedung Anda — lantai, luas, kategori pemandangan, dst. Bisa diketik satu-satu atau impor dari CSV. |
| 4 | **Ringkasan** | Lihat hasil akhirnya: harga dasar gedung yang dipakai, apakah aman secara keuangan, dan 11 pengecekan otomatis (semua harus "LULUS" sebelum harga dipakai beneran). |
| 5 | **Daftar Harga** | Tabel harga per unit — ini yang dicetak/dibagikan ke tim pemasaran. |
| 6 | **Simulasi Tarif** | Coba-coba: kalau tarif dinaikkan/diturunkan, kira-kira okupansi dan pendapatan jadi berapa? |
| 7 | **Sewa Efektif & Insentif** | Kalau mau kasih promo bulan gratis ke penyewa, hitung dulu di sini supaya tidak rugi. |

Kalau Anda cuma mau **coba-coba dulu** pakai data dummy yang sudah ada, langsung saja buka tab **Ringkasan** — semua sudah terisi dan bisa dilihat hasilnya.

---

## 4. Hal-hal yang perlu diketahui

- **Data tersimpan otomatis** di browser Anda (localStorage) — tidak perlu tombol "Simpan". Kalau ganti browser atau bersihkan cache, data akan hilang.
- Tombol **"Reset dummy"** di kanan atas mengembalikan semua data ke contoh awal. Hati-hati, perubahan Anda akan hilang.
- Ikon **ⓘ** kecil di sebelah label yang agak asing (RevPAM, cap rate, faktor kalibrasi, dst.) bisa di-hover atau diklik untuk penjelasan singkat.
- Angka kecil dalam kurung seperti "(5.3)" atau simbol Yunani seperti φ, θ, σ itu rujukan ke nomor rumus di handbook — boleh diabaikan kalau Anda tidak perlu mencocokkan ke sana.
- **Ini bukan laporan penilaian resmi.** Untuk urusan yang mengikat secara hukum (jaminan bank, laporan keuangan, dll.), tetap perlu Penilai Publik berizin.

---

## 5. Kalau masih bingung dengan satu istilah tertentu

1. Coba klik ikon **ⓘ** di sebelah istilah itu dulu.
2. Kalau belum cukup jelas, cari istilah itu di **Bab 2 — Kamus Istilah Wajib** pada `HANDBOOK-HARGA-SEWA-MENARA.md`.
3. Kalau mau paham logika di baliknya, baca kotak **"Intinya:"** yang ada di bawah tiap rumus di handbook — itu ringkasan bahasa awamnya, tanpa perlu paham notasi matematis.
