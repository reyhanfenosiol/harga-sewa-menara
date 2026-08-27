---
title: "Handbook Penentuan Harga Sewa Gedung Menara"
subtitle: "Panduan Praktis Penetapan Tarif Sewa per Lantai dan per Unit"
version: "1.0"
date: "23 Agustus 2026"
lang: "id-ID"
---

# Handbook Penentuan Harga Sewa Gedung Menara

**Panduan Praktis Penetapan Tarif Sewa per Lantai dan per Unit**

Versi 1.0 — 23 Agustus 2026

---

## Cara Membaca Handbook Ini

Handbook ini ditulis untuk pembaca yang **belum punya latar belakang penilaian properti**. Semua istilah teknis dijelaskan dulu sebelum dipakai. Tiap rumus disertai empat hal:

1. **Penjelasan bahasa sehari-hari** — apa maksud rumus itu;
2. **Notasi matematis** — bentuk resminya, untuk yang mau cek detailnya;
3. **Contoh angka** — hitungan nyata pakai data dummy;
4. **Sumber rujukan** — supaya dasar teorinya bisa dicek ulang.

**Cara tercepat membaca handbook ini:** baca dulu kalimat "Intinya" yang muncul setelah tiap rumus. Itu sudah cukup untuk mengerti maksudnya. Notasi matematis dan contoh angka di sekitarnya adalah detail teknis — boleh dilewati kalau Anda cuma mau paham logika besarnya, dan boleh dibaca kalau Anda mau menghitung sendiri atau mengecek angkanya.

Handbook ini berpasangan dengan berkas Excel **`Model_Harga_Sewa_Menara_DUMMY.xlsx`**. Isi datanya **karangan (dummy)**, dibuat mirip kondisi pasar nyata. Anda bisa mengganti isinya dengan data gedung sendiri tanpa mengubah satu pun rumus.

> **Peringatan penting.** Handbook ini alat bantu analisis internal, bukan laporan penilaian resmi. Untuk keperluan yang mengikat secara hukum — jaminan utang, laporan keuangan, transaksi jual beli, atau sengketa — hasil model ini wajib diverifikasi oleh Penilai Publik berizin yang terdaftar di Kementerian Keuangan RI dan tunduk pada Standar Penilaian Indonesia (SPI).

---

## Daftar Isi

**BAGIAN I — DASAR**
1. Mengapa Harga Sewa Berbeda Antar Lantai dan Antar Unit
2. Kamus Istilah Wajib
3. Mengukur Luas dengan Benar (NLA, GFA, dan Faktor Beban)

**BAGIAN II — MENENTUKAN HARGA DASAR GEDUNG**
4. Tiga Pendekatan Penilaian yang Diakui Standar
5. Pendekatan Pasar: Grid Penyesuaian Data Pembanding
6. Pendekatan Pendapatan: Tarif yang Dibutuhkan dan Titik Impas
7. Menetapkan Pagar Pengaman (Batas Bawah dan Batas Atas)

**BAGIAN III — MEMBEDAH HARGA KE TIAP UNIT**
8. Model Faktor Pengali (Multiplikatif)
9. Faktor Lantai — Inti dari Perbedaan Harga Vertikal
10. Faktor Non-Lantai: Pemandangan, Posisi, Ukuran, Kondisi
11. Kalibrasi: Menjaga Rata-Rata Tetap Sesuai Pasar
12. Kalibrasi Lanjutan dengan Regresi Hedonik

**BAGIAN IV — DARI TARIF KE UANG MASUK**
13. Service Charge, Pajak, dan Harga yang Dilihat Penyewa
14. Sewa Efektif Bersih (NER) dan Biaya Insentif
15. Eskalasi Tahunan dan Nilai Kini
16. Analisis Sensitivitas dan Optimasi Okupansi

**BAGIAN V — TATA KELOLA**
17. Uji Kualitas Model
18. Struktur Berkas Excel dan Aturan Warna
19. Prosedur Kerja: 10 Langkah dari Data Mentah ke Rate Card
20. Rancangan Jangka Panjang: Agar Model Ini Tetap Murah dan Hidup
21. Penerapan di Claude Code
22. Daftar Pustaka dan Sumber Data

---
---

# BAGIAN I — DASAR

## 1. Mengapa Harga Sewa Berbeda Antar Lantai dan Antar Unit

Dua ruang kantor di gedung yang sama, dengan luas yang persis sama, sering disewakan dengan harga berbeda. Ini bukan ketidakadilan, melainkan cerminan dari **manfaat yang tidak sama**.

Contohnya: unit di lantai 28 menghadap barat dengan pemandangan kota memberi hal-hal yang tidak didapat unit di lantai 4 menghadap dinding gedung sebelah — cahaya alami, jauh dari bising jalan, pemandangan, dan gengsi alamat. Penyewa mau bayar lebih untuk itu. Sebaliknya, unit lantai bawah punya keunggulan lain: dekat lobi, tidak perlu antre lift lama, dan lebih murah biaya evakuasinya.

Buktinya kuat dan berulang di banyak negara:

- Studi atas 55.907 iklan sewa ruang kantor di 2.567 gedung, 25 kota, menemukan **premi harga yang signifikan secara statistik untuk unit di lantai lebih tinggi, di 23 dari 25 kota**. Besaran preminya beda-beda antar kota — kota dengan pasar perkantoran lebih besar cenderung punya premi lebih tinggi (Nutt, 2016, MIT Center for Real Estate).
- Penelitian atas 627 transaksi sewa di 33 gedung tinggi di Amsterdam menemukan premi positif yang konsisten untuk lantai lebih tinggi. Premi ini bisa dipecah: sekitar **27% karena faktor pemandangan**, 3% karena beda sektor industri penyewa, dan sisanya sekitar 70% karena citra perusahaan dan faktor lain (Nase, van Assendelft & Remøy, 2019).
- Di level gedung (bukan level lantai), perusahaan di Belanda terbukti mau bayar **sekitar 4% lebih mahal untuk gedung yang 10 meter lebih tinggi** (Koster, van Ommeren & Rietveld, 2014).

**Yang perlu digarisbawahi: besaran preminya tidak universal.** Angka dari Amsterdam tidak boleh disalin mentah ke Jakarta. Yang universal cuma *bentuk hubungannya* — lantai lebih tinggi umumnya lebih mahal, dan preminya melandai di lantai paling atas. Besarannya harus dihitung ulang dari data pasar setempat. Handbook ini mengajarkan caranya.

Premi ketinggian juga **tidak selalu ada**. Di sejumlah pasar, penyewa lebih peduli pada efisiensi denah lantai, fasilitas, dan sistem lift, jadi premi lantai atas menipis atau hilang sama sekali. Karena itu langkah kalibrasi (menyesuaikan angka dengan data sendiri) itu wajib, bukan opsional.

### 1.1 Dua Kesalahan yang Paling Sering Terjadi

**Kesalahan pertama: satu tarif untuk seluruh gedung.**
Akibatnya, unit terbaik terjual terlalu murah (rugi pendapatan) dan unit terlemah tidak laku (rugi okupansi). Pengelola merasa "harga sudah wajar" padahal sedang rugi dari dua arah sekaligus.

**Kesalahan kedua: harga per unit ditentukan asal-asalan lewat tawar-menawar.**
Tidak ada logika yang bisa dipertahankan saat penyewa membandingkan tarifnya dengan tetangga selantai. Ini merusak kepercayaan dan memicu permintaan renegosiasi berantai.

Model di handbook ini ada di tengah-tengah: **satu tarif dasar untuk gedung, lalu satu rangkaian faktor pengali yang transparan dan bisa dijelaskan** untuk tiap unit.

---

## 2. Kamus Istilah Wajib

Istilah-istilah berikut akan muncul terus-menerus. Sebaiknya dibaca sekali sampai paham sebelum melanjutkan.

| Istilah | Singkatan | Arti sederhana |
|---|---|---|
| Gross Floor Area | GFA | Luas total lantai gedung diukur dari sisi luar dinding, termasuk semua ruang. |
| Net Lettable Area | NLA | Luas yang benar-benar disewakan dan ditagihkan ke penyewa. Ini yang dikalikan dengan tarif. |
| Usable Area | UA | Luas yang benar-benar dipakai penyewa di dalam unitnya, tidak termasuk koridor bersama. |
| Faktor Beban | Load Factor | Selisih antara luas yang ditagih dan luas yang dipakai, dinyatakan sebagai persentase. |
| Tarif Sewa Dasar | Base Rent | Harga sewa ruang murni, per meter persegi per bulan, belum termasuk service charge. |
| Service Charge | SC | Iuran pengelolaan gedung: listrik area bersama, AC sentral, keamanan, kebersihan, lift. |
| Sewa Kotor | Gross Rent | Tarif Sewa Dasar + Service Charge. Ini angka yang biasanya ditanyakan calon penyewa. |
| Harga Penawaran | Asking Rent | Harga yang dipasang pengelola di brosur atau daftar harga. |
| Harga Transaksi | Achieved Rent | Harga yang benar-benar disepakati setelah negosiasi. Biasanya lebih rendah. |
| Sewa Efektif Bersih | NER | Tarif rata-rata riil setelah memperhitungkan bulan gratis dan insentif lain. |
| Okupansi | Occupancy | Persentase NLA yang terisi penyewa. |
| Tingkat Kekosongan | Vacancy | Kebalikan okupansi. Okupansi 78% berarti kekosongan 22%. |
| Pendapatan Operasi Bersih | NOI | Pendapatan sewa dikurangi biaya operasional gedung. |
| Tingkat Kapitalisasi | Cap Rate | Rasio NOI terhadap nilai aset. Dipakai untuk mengaitkan sewa dengan nilai gedung. |
| Data Pembanding | Comparable | Gedung lain sejenis yang tarifnya dipakai sebagai acuan. |
| Fit-out | — | Pekerjaan interior unit: partisi, plafon, lantai, listrik, jaringan. |
| Shell & Core | — | Kondisi unit polos: baru struktur, lantai beton, belum ada interior. |

### 2.1 Satuan yang Dipakai di Seluruh Dokumen

Untuk menghindari kekacauan, seluruh handbook dan berkas Excel memakai satuan yang seragam:

- **Tarif sewa**: Rupiah per meter persegi per bulan — ditulis **Rp/m²/bulan**
- **Luas**: meter persegi — ditulis **m²**
- **Periode**: bulan untuk tarif, tahun untuk proyeksi
- **Persentase**: disimpan sebagai pecahan di Excel (0,15 ditampilkan sebagai 15,0%)

Konversi yang sering dibutuhkan:

$$\text{Rp/m}^2\text{/tahun} = \text{Rp/m}^2\text{/bulan} \times 12$$

$$\text{Rp/ft}^2\text{/bulan} = \frac{\text{Rp/m}^2\text{/bulan}}{10{,}7639}$$

Satu meter persegi setara 10,7639 kaki persegi. Konversi ini diperlukan bila membandingkan dengan laporan pasar internasional yang memakai satuan kaki persegi.

---

## 3. Mengukur Luas dengan Benar (NLA, GFA, dan Faktor Beban)

Ini bagian yang paling sering diabaikan, dan paling sering memicu sengketa. Sebelum bicara harga, **luasnya harus disepakati dulu**. Tarif Rp 200.000/m² atas luas 100 m² dan tarif Rp 182.000/m² atas luas 110 m² menghasilkan tagihan yang nyaris sama — tapi yang kedua kelihatan lebih murah. Tanpa standar pengukuran yang sama, perbandingan harga jadi tidak berarti apa-apa.

**Intinya:** sepakati dulu cara mengukur luasnya, baru bicara harga per meternya. Kalau tidak, dua gedung bisa kelihatan beda harga padahal sebenarnya sama saja — cuma cara hitung luasnya yang beda.

### 3.1 Standar yang Diakui

Standar yang paling banyak dipakai di industri perkantoran adalah **ANSI/BOMA Z65.1**, terbitan Building Owners and Managers Association International. Edisi terbarunya **BOMA 2024 for Office Buildings: Standard Methods of Measurement (ANSI/BOMA Z65.1-2024)**.

Tujuan utama standar ini: menghitung **Rentable Area** (luas yang bisa disewakan), angka dasar untuk sewa-menyewa ruang kantor. Angka luas ini juga berguna untuk menganalisis pemakaian ruang, penilaian, pembandingan antar gedung, dan pembagian biaya gedung.

BOMA 2024 punya dua metode:

- **Metode A (Legacy Method)** — faktor beban dihitung per lantai. Tiap lantai bisa punya faktor beban berbeda.
- **Metode B (Single Load Factor Method)** — satu faktor beban berlaku untuk seluruh gedung.

Metode B mulai ada di edisi 2010, sebagai alternatif dari edisi 1996 yang cuma mengenal hitungan per lantai. Standar ini juga membolehkan **faktor beban berbatas (capped load factor)** — bahkan sejak edisi 2017 bisa diterapkan per penyewa, jadi pemilik dan penyewa bisa menegosiasikan struktur yang cocok dengan praktik pasar setempat.

Selisih sekitar 2% biasanya masih dianggap wajar di industri ini, karena dua pihak bisa dapat hasil sedikit beda akibat cara ukur fisik atau cara membaca standar yang berbeda di bangunan yang bentuknya tidak biasa.

**Rekomendasi untuk pemula:** pakai **Metode B (faktor beban tunggal)**. Lebih mudah dijelaskan ke penyewa, lebih mudah diaudit, dan menghilangkan perdebatan mengapa lantai 5 punya faktor beban berbeda dari lantai 15.

> Sumber: BOMA International, *Office Buildings: Standard Methods of Measurement (ANSI/BOMA Z65.1)* — https://www.boma.org/BOMA/BOMA-Standards/BOMA_Floor_Measurement_Standards/Office_Buildings.aspx dan daftar seluruh standar BOMA di https://boma.org/boma-standards/

### 3.2 Rumus Faktor Beban

**Rumus 3.1 — Faktor Beban (Load Factor)**

Faktor beban menjawab pertanyaan: berapa persen tambahan luas yang ditagihkan di atas luas yang benar-benar dipakai penyewa?

**Intinya:** penyewa tidak cuma bayar ruangannya sendiri, tapi juga "jatah" atas koridor, toilet, lobi, dan area bersama lain. Faktor beban ini angka yang menunjukkan berapa persen tambahan itu.

$$LF = \frac{A_{\text{rentable}} - A_{\text{usable}}}{A_{\text{usable}}}$$

Keterangan:
- $LF$ = Faktor beban (dalam pecahan; 0,18 berarti 18%)
- $A_{\text{rentable}}$ = Luas yang ditagihkan (NLA)
- $A_{\text{usable}}$ = Luas yang dipakai penyewa di dalam unit

**Rumus 3.2 — Dari Usable ke Rentable**

$$A_{\text{rentable}} = A_{\text{usable}} \times (1 + LF)$$

**Contoh perhitungan.**
Sebuah unit memiliki luas pakai 850 m². Faktor beban gedung ditetapkan 18%.

$$A_{\text{rentable}} = 850 \times (1 + 0{,}18) = 1.003 \text{ m}^2$$

Penyewa memakai 850 m², tetapi ditagih atas 1.003 m². Selisih 153 m² adalah bagian proporsionalnya atas koridor, toilet, lobi lift, dan ruang bersama lain.

**Rumus 3.3 — Rasio Efisiensi Gedung**

$$\eta = \frac{\text{NLA total}}{\text{GFA total}}$$

Keterangan:
- $\eta$ (eta) = Rasio efisiensi gedung

**Intinya:** rasio efisiensi menunjukkan berapa persen dari total luas bangunan yang benar-benar menghasilkan uang (sisanya jadi koridor, toilet, ruang mesin, dll). Nilai sehat untuk gedung perkantoran tinggi biasanya **0,60 sampai 0,75**. Di bawah 0,55, gedung itu kemungkinan boros ruang inti (core), dan tarif sewanya harus lebih tinggi supaya imbal hasilnya tetap sama.

**Contoh.** GFA gedung 48.000 m², NLA 33.600 m².

$$\eta = \frac{33.600}{48.000} = 0{,}70 = 70\%$$

### 3.3 Aturan Praktis yang Harus Dipatuhi

1. **Satu gedung, satu standar.** Jangan mencampur BOMA 1996 untuk sebagian lantai dan BOMA 2024 untuk lantai lain.
2. **Cantumkan standar yang dipakai di dalam kontrak sewa.** Sebutkan edisinya secara eksplisit.
3. **Simpan hasil pengukuran sebagai berkas terpisah yang tidak boleh diubah tanpa persetujuan.** Perubahan luas mengubah semua tagihan.
4. **Bila tarif dibandingkan dengan gedung lain, pastikan basis luasnya sama.** Tarif Rp 200.000/m² atas dasar *usable* tidak setara dengan Rp 200.000/m² atas dasar *rentable*.

---
---

# BAGIAN II — MENENTUKAN HARGA DASAR GEDUNG

## 4. Tiga Pendekatan Penilaian yang Diakui Standar

Sebelum membedah harga ke tiap unit, kita perlu menetapkan **satu angka jangkar** dulu: Tarif Sewa Dasar Gedung. Ini tarif rata-rata yang mewakili gedung secara keseluruhan.

Standar penilaian internasional mengenal tiga pendekatan utama. Ketiganya berlandaskan prinsip ekonomi yang berbeda — keseimbangan harga pasar, antisipasi manfaat di masa depan, atau substitusi (orang tidak akan bayar lebih dari harga gantinya):

| Pendekatan | Logika dasarnya | Dipakai untuk |
|---|---|---|
| **Pendekatan Pasar** (*Market Approach*) | Membandingkan aset yang dinilai dengan aset identik atau serupa yang informasi harganya tersedia. | Menentukan tarif indikatif dari gedung pesaing. |
| **Pendekatan Pendapatan** (*Income Approach*) | Mengubah arus kas masa depan menjadi satu nilai kini. | Menentukan tarif minimum yang dibutuhkan agar target imbal hasil tercapai. |
| **Pendekatan Biaya** (*Cost Approach*) | Pembeli tidak akan membayar lebih dari biaya memperoleh aset dengan manfaat setara. | Menentukan batas bawah yang masuk akal dan uji kewajaran. |

Di Indonesia, aturan soal pendekatan dan metode penilaian ada di **SPI 106 — Pendekatan dan Metode Penilaian**, bagian dari **Kode Etik Penilai Indonesia dan Standar Penilaian Indonesia (KEPI & SPI) Edisi VII Tahun 2018** terbitan Masyarakat Profesi Penilai Indonesia (MAPPI).

KEPI & SPI Edisi VII mengacu pada International Valuation Standards (IVS) 2017 — sistematika, penomoran, dan isinya dibuat selaras, supaya Penilai Indonesia punya standar setara internasional. MAPPI adalah anggota IVSC, dan sejak tahun 2000 SPI memang selalu dirancang merujuk ke IVS.

SPI wajib dipatuhi. Menurut PMK 101/2014 tentang Penilai Publik Pasal 1 ayat 4, Standar Penilaian Indonesia adalah pedoman dasar yang wajib diikuti Penilai saat melakukan penilaian.

Dalam KEPI dan SPI 2018, metode kapitalisasi langsung dijelaskan sederhana: nilai dihitung dengan membagi pendapatan tetap dengan tingkat kapitalisasi, dan proyeksi pendapatannya didapat dari menganalisis pasar terkait — data sewa dan tingkat hunian di sekitarnya.

> Sumber:
> - IVSC, *IVS 105 Valuation Approaches and Methods* — https://www.ivsc.org/wp-content/uploads/2021/10/IVS105ValuationApproaches.pdf
> - IVSC, *International Valuation Standards* — https://ivsc.org/standards/
> - RICS, *RICS Valuation – Global Standards (Red Book)* — https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/valuation-standards/red-book/red-book-global
> - MAPPI, *KEPI & SPI Edisi VII 2018* — https://ecommerce.mappi.or.id/home/products/kode-etik-penilai-indonesia-dan-standar-penilaian-indonesia-edisi-vii-2018-bundling
> - Penjelasan SPI dan dasar hukumnya — https://penilaian.id/2022/07/30/apa-itu-standar-penilaian-indonesia-spi/

**Praktik terbaik: jangan pakai satu pendekatan saja.** Gunakan Pendekatan Pasar sebagai penentu utama, lalu pakai Pendekatan Pendapatan dan Biaya sebagai *pagar pengaman*. Bila ketiganya memberi angka yang berjauhan, ada yang salah pada asumsi — dan itu justru informasi berharga.

---

## 5. Pendekatan Pasar: Grid Penyesuaian Data Pembanding

### 5.1 Logikanya

Tidak ada dua gedung yang identik. Gedung pembanding mungkin lebih baru, lebih dekat stasiun MRT, atau sudah bersertifikat hijau. Karena itu tarifnya tidak boleh dicontek mentah-mentah — harus **disesuaikan** dulu supaya setara dengan gedung yang kita nilai.

Analoginya gampang: kalau tetangga jual mobil sejenis seharga Rp 300 juta, tapi mobilnya matik sedangkan punya kita manual, harga acuan kita harus lebih rendah dari Rp 300 juta.

### 5.2 Rumus

**Rumus 5.1 — Tarif Pembanding yang Disesuaikan (model multiplikatif)**

$$R_i^{adj} = R_i \times \prod_{j=1}^{m} (1 + a_{ij})$$

Keterangan:
- $R_i^{adj}$ = Tarif pembanding ke-$i$ setelah disesuaikan
- $R_i$ = Tarif pembanding ke-$i$ sebelum disesuaikan
- $a_{ij}$ = Besar penyesuaian untuk atribut ke-$j$ pada pembanding ke-$i$, dalam pecahan
- $\prod$ = Simbol perkalian berantai (kalikan semua suku)
- $m$ = Jumlah atribut yang disesuaikan

**Intinya:** ambil tarif gedung pembanding, lalu naikkan atau turunkan sedikit-sedikit untuk tiap perbedaan (usia, lokasi, sertifikat hijau, dst.) sampai tarif itu "setara" dengan gedung kita.

**Arah tanda penyesuaian.** Ini sering membingungkan, jadi hafalkan aturannya:

> Bila pembanding **lebih baik** dari objek kita, penyesuaiannya **negatif** (turunkan tarifnya agar setara).
> Bila pembanding **lebih buruk** dari objek kita, penyesuaiannya **positif** (naikkan tarifnya agar setara).

**Rumus 5.2 — Bobot Berdasarkan Kemiripan**

Pembanding yang butuh sedikit penyesuaian berarti lebih mirip dengan gedung kita, jadi wajar diberi bobot lebih besar.

**Intinya:** gedung pembanding yang paling mirip gedung kita (paling sedikit "koreksinya") lebih dipercaya, jadi pengaruhnya ke tarif akhir juga lebih besar.

$$w_i = \frac{1 / (|A_i| + \varepsilon)}{\sum_{k=1}^{n} 1 / (|A_k| + \varepsilon)}$$

di mana total penyesuaian mutlak:

$$|A_i| = \sum_{j=1}^{m} |a_{ij}|$$

Keterangan:
- $w_i$ = Bobot pembanding ke-$i$ (semua bobot berjumlah 1)
- $|A_i|$ = Jumlah nilai mutlak seluruh penyesuaian pada pembanding ke-$i$
- $\varepsilon$ (epsilon) = Angka kecil, misalnya 0,01, untuk mencegah pembagian dengan nol
- $n$ = Jumlah pembanding

**Rumus 5.3 — Tarif Dasar Indikasi Pasar**

$$R_{\text{pasar}} = \sum_{i=1}^{n} w_i \times R_i^{adj}$$

**Intinya:** rata-rata dari semua tarif pembanding yang sudah disesuaikan, tapi pembanding yang lebih mirip "suaranya" lebih didengar (bobotnya lebih besar).

### 5.3 Contoh Perhitungan Lengkap

Objek yang dinilai: **Menara Nusantara**, Grade A, luar CBD Jakarta, usia 8 tahun, jarak 600 m dari stasiun MRT, belum bersertifikat hijau.

| Pembanding | Tarif awal (Rp/m²/bln) | Lokasi | Usia | Grade | Akses transit | Sertifikat hijau | Total penyesuaian | Tarif disesuaikan |
|---|---|---|---|---|---|---|---|---|
| Gedung A | 195.000 | 0% | +3% | 0% | −4% | −3% | −4% | 187.200 |
| Gedung B | 165.000 | +5% | −2% | +6% | +2% | 0% | +11% | 183.150 |
| Gedung C | 210.000 | −6% | +5% | −5% | −5% | −3% | −14% | 180.600 |
| Gedung D | 172.000 | +2% | 0% | +4% | 0% | 0% | +6% | 182.320 |

**Cara mendapatkan kolom "Tarif disesuaikan" — mengikuti Rumus 5.1 langkah demi langkah.**

Rumus 5.1 menulis tiap penyesuaian sebagai $a_{ij}$: $i$ menunjuk baris (gedung pembanding), $j$ menunjuk kolom atribut (Lokasi, Usia, Grade, Akses transit, Sertifikat hijau). Untuk Gedung A, kelima nilai $a_{ij}$-nya diambil langsung dari tabel:

$$a_{A,1}=0{,}00 \;(\text{Lokasi}) \quad a_{A,2}=0{,}03 \;(\text{Usia}) \quad a_{A,3}=0{,}00 \;(\text{Grade}) \quad a_{A,4}=-0{,}04 \;(\text{Akses transit}) \quad a_{A,5}=-0{,}03 \;(\text{Sertifikat hijau})$$

Dimasukkan ke Rumus 5.1 apa adanya (kalikan berantai, satu per satu):

$$R_{A}^{adj} = 195.000 \times (1+0{,}00) \times (1+0{,}03) \times (1+0{,}00) \times (1-0{,}04) \times (1-0{,}03)$$

$$R_{A}^{adj} = 195.000 \times 1{,}00 \times 1{,}03 \times 1{,}00 \times 0{,}96 \times 0{,}97 \approx 187.032$$

Begitu juga untuk tiga pembanding lain, dikalikan berantai dengan nilai $a_{ij}$ pada barisnya masing-masing:

- Gedung B: $165.000 \times 1{,}05 \times 0{,}98 \times 1{,}06 \times 1{,}02 \times 1{,}00 \approx 183.572$
- Gedung C: $210.000 \times 0{,}94 \times 1{,}05 \times 0{,}95 \times 0{,}95 \times 0{,}97 \approx 181.449$
- Gedung D: $172.000 \times 1{,}02 \times 1{,}00 \times 1{,}04 \times 1{,}00 \times 1{,}00 \approx 182.458$

**Jalan pintas yang dipakai di tabel.** Angka "Tarif disesuaikan" yang tercetak di tabel (187.200 / 183.150 / 180.600 / 182.320) memakai jalan pintas yang lebih sederhana: menjumlahkan dulu kelima $a_{ij}$ menjadi satu angka bersih (kolom "Total penyesuaian"), baru dikalikan **sekali** ke tarif awal:

$$\text{Tarif disesuaikan (jalan pintas)} = \text{Tarif awal} \times (1 + \sum_j a_{ij})$$

- Gedung A: $195.000 \times (1 + (-0{,}04)) = 195.000 \times 0{,}96 = 187.200$
- Gedung B: $165.000 \times (1 + 0{,}11) = 165.000 \times 1{,}11 = 183.150$
- Gedung C: $210.000 \times (1 + (-0{,}14)) = 210.000 \times 0{,}86 = 180.600$
- Gedung D: $172.000 \times (1 + 0{,}06) = 172.000 \times 1{,}06 = 182.320$

**Bandingkan kedua cara:**

| Pembanding | Rumus 5.1 murni (kali berantai) | Jalan pintas (jumlah dulu) | Selisih |
|---|---|---|---|
| Gedung A | 187.032 | 187.200 | +168 (0,09%) |
| Gedung B | 183.572 | 183.150 | −422 (0,23%) |
| Gedung C | 181.449 | 180.600 | −849 (0,47%) |
| Gedung D | 182.458 | 182.320 | −138 (0,08%) |

**Intinya:** kedua cara menjawab pertanyaan yang sama — "berapa tarif pembanding ini kalau sudah disetarakan dengan gedung kita" — dan untuk penyesuaian sekecil ini (masing-masing di bawah 6%), hasilnya nyaris sama, selisih di bawah 0,5%. Rumus 5.1 murni (kali berantai) adalah cara yang benar secara matematis dan disarankan bila penyesuaian pada gedung Anda cukup besar (di atas ±15% per atribut, karena di situ selisih dua cara ini mulai berarti). Tabel contoh di handbook ini memakai jalan pintas (jumlah dulu) karena lebih mudah dihitung manual dan bedanya dapat diabaikan untuk data dummy ini.

Perhitungan bobot dengan $\varepsilon = 0{,}01$:

| Pembanding | $\|A_i\|$ | $1/(\|A_i\|+\varepsilon)$ | Bobot $w_i$ |
|---|---|---|---|
| Gedung A | 0,10 | 9,091 | 0,263 |
| Gedung B | 0,13 | 7,143 | 0,207 |
| Gedung C | 0,24 | 4,000 | 0,116 |
| Gedung D | 0,06 | 14,286 | 0,414 |
| **Jumlah** | | **34,520** | **1,000** |

Catatan: $|A_i|$ adalah jumlah nilai **mutlak** tiap penyesuaian, bukan jumlah bersihnya. Untuk Gedung A: $|0| + |0{,}03| + |0| + |0{,}04| + |0{,}03| = 0{,}10$.

**Cara mendapatkan kolom $1/(|A_i|+\varepsilon)$.** Ambil $|A_i|$ dari kolom sebelumnya, tambahkan $\varepsilon = 0{,}01$, lalu balik (1 dibagi hasilnya):

- Gedung A: $1/(0{,}10+0{,}01) = 1/0{,}11 = 9{,}091$
- Gedung B: $1/(0{,}13+0{,}01) = 1/0{,}14 = 7{,}143$
- Gedung C: $1/(0{,}24+0{,}01) = 1/0{,}25 = 4{,}000$
- Gedung D: $1/(0{,}06+0{,}01) = 1/0{,}07 = 14{,}286$

Jumlah keempatnya (penyebut di Rumus 5.2): $9{,}091 + 7{,}143 + 4{,}000 + 14{,}286 = 34{,}520$.

**Cara mendapatkan bobot $w_i$.** Bagi angka tiap baris dengan jumlah totalnya (Rumus 5.2):

$$w_i = \frac{1/(|A_i|+\varepsilon)}{\displaystyle\sum_{k} 1/(|A_k|+\varepsilon)}$$

- Gedung A: $9{,}091 / 34{,}520 = 0{,}263$
- Gedung B: $7{,}143 / 34{,}520 = 0{,}207$
- Gedung C: $4{,}000 / 34{,}520 = 0{,}116$
- Gedung D: $14{,}286 / 34{,}520 = 0{,}414$
- Jumlah: $0{,}263 + 0{,}207 + 0{,}116 + 0{,}414 = 1{,}000$ — bobot memang wajib berjumlah tepat 1, itulah gunanya membagi dengan totalnya.

**Intinya:** pembanding dengan penyesuaian paling sedikit (Gedung D, cuma 0,06) dianggap paling mirip dengan gedung yang dinilai, jadi "suaranya" paling didengar (bobot 0,414 — hampir separuh). Pembanding yang paling banyak disesuaikan (Gedung C, 0,24) dapat porsi paling kecil (0,116).

Tarif dasar indikasi pasar:

$$R_{\text{pasar}} = (0{,}263 \times 187.200) + (0{,}207 \times 183.150) + (0{,}116 \times 180.600) + (0{,}414 \times 182.320)$$

$$R_{\text{pasar}} \approx 183.576 \text{ Rp/m}^2\text{/bulan}$$

Dibulatkan untuk keperluan operasional menjadi **Rp 184.000/m²/bulan**.

### 5.4 Aturan Kualitas Data Pembanding

| Kriteria | Ambang yang disarankan | Alasan |
|---|---|---|
| Jumlah pembanding | Minimal 4, idealnya 6–8 | Satu atau dua pembanding terlalu rentan pada kasus khusus. |
| Total penyesuaian mutlak per pembanding | Maksimal 25% | Di atas itu, pembanding terlalu berbeda untuk dipercaya. |
| Usia data | Maksimal 6 bulan | Pasar sewa bergerak; data lama menyesatkan. |
| Jenis data | Utamakan tarif transaksi, bukan tarif penawaran | Tarif penawaran umumnya lebih tinggi dari yang benar-benar disepakati. |
| Sebaran hasil | Koefisien variasi maksimal 15% | Sebaran lebar berarti pasar tidak seragam atau data bermasalah. |

**Peringatan soal selisih penawaran dan transaksi.** Saat kondisi pasar menguntungkan penyewa, selisih antara tarif penawaran (di brosur) dan tarif transaksi (yang benar-benar disepakati) bisa besar. Kalau cuma tarif penawaran yang tersedia, kurangi dengan diskon negosiasi berdasarkan data historis gedung sendiri. Sebagai gambaran, laporan pasar Jakarta mencatat tarif penawaran rata-rata di CBD sekitar Rp 218.000/m²/bulan pada Kuartal II 2026, sementara laporan lain yang mengukur *base rent* CBD mencatat sekitar Rp 176.700/m²/bulan pada Kuartal I 2026 — bedanya sebagian besar karena definisi dan cara ukur yang beda, bukan karena salah satu sumbernya keliru.

> Sumber data pasar Jakarta yang dipakai sebagai rujukan angka dummy:
> - Colliers Indonesia, laporan kuartalan pasar perkantoran Jakarta — https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q1-2026-jakarta-office
> - Ringkasan laporan Colliers Kuartal II 2026 — https://realestateasia.com/commercial-office/news/jakarta-non-cbd-office-rents-rise-2-3-annually-until-2029
> - Cushman & Wakefield, *Jakarta CBD Office MarketBeat Q1 2026* — https://www.cushmanwakefield.com/en/indonesia/insights/jakarta-marketbeat
> - CBRE Indonesia, *Jakarta Office Market Outlook Q1 2026* — https://indonesia.cbre.com/insights/reports/jakarta-office-market-outlook-q1-2026
> - Bank Indonesia, *Perkembangan Properti Komersial* (laporan triwulanan) — https://www.bi.go.id/id/publikasi/laporan/default.aspx?kategori=perkembangan+properti+komersial

---

## 6. Pendekatan Pendapatan: Tarif yang Dibutuhkan dan Titik Impas

Pendekatan Pasar menjawab *"berapa harga yang bisa diterima pasar?"*. Pendekatan Pendapatan menjawab pertanyaan lain yang sama pentingnya: *"berapa harga yang **harus** saya dapatkan supaya gedung ini tidak rugi dan mencapai target untung?"*

### 6.1 Susunan Pendapatan Gedung

Alur hitungannya bertingkat dari atas ke bawah — mulai dari pendapatan penuh di atas kertas, sampai ke uang yang benar-benar tersisa untuk pemilik:

**Rumus 6.1 — Potensi Pendapatan Kotor (PGI)**

$$PGI = R \times NLA \times 12$$

Keterangan:
- $PGI$ = *Potential Gross Income*, pendapatan kalau seluruh ruang terisi penuh setahun penuh
- $R$ = Tarif sewa rata-rata (Rp/m²/bulan)
- $NLA$ = Total luas disewakan (m²)

**Intinya:** ini pendapatan di skenario sempurna — seandainya seluruh gedung terisi penuh sepanjang tahun. Kenyataannya selalu lebih rendah, karena itu ada rumus berikutnya.

**Rumus 6.2 — Pendapatan Kotor Efektif (EGI)**

$$EGI = PGI \times (1 - v - c) + I_{\text{lain}}$$

Keterangan:
- $EGI$ = *Effective Gross Income*
- $v$ = Tingkat kekosongan (pecahan)
- $c$ = Kerugian penagihan atau tunggakan (pecahan)
- $I_{\text{lain}}$ = Pendapatan lain: parkir, sewa antena, ruang iklan, ruang serbaguna

**Intinya:** dari pendapatan sempurna (PGI) di atas, kurangi dulu perkiraan unit kosong dan penyewa yang telat/tidak bayar, lalu tambah pendapatan sampingan. Hasilnya pendapatan yang realistis.

**Rumus 6.3 — Pendapatan Operasi Bersih (NOI)**

$$NOI = EGI - OpEx$$

Keterangan:
- $OpEx$ = Biaya operasional gedung setahun yang tidak dibebankan ke penyewa

**Intinya:** pendapatan realistis dikurangi biaya jalan gedung (listrik, keamanan, kebersihan, dll. yang ditanggung pemilik). Sisanya inilah "untung kotor" gedung sebelum bicara cicilan atau pajak.

**Rumus 6.4 — Kaitan NOI dengan Nilai Aset**

$$V = \frac{NOI}{r_{\text{cap}}} \qquad \Longleftrightarrow \qquad NOI = V \times r_{\text{cap}}$$

Keterangan:
- $V$ = Nilai aset gedung
- $r_{\text{cap}}$ = Tingkat kapitalisasi (*capitalization rate*), dalam pecahan

**Intinya:** ini cara menghubungkan "untung setahun" (NOI) dengan "nilai gedung" (V) lewat satu angka target imbal hasil (cap rate). Kalau NOI-nya tetap, semakin tinggi target imbal hasil yang diminta, semakin rendah nilai gedung yang dianggap wajar — begitu juga sebaliknya. Ini metode kapitalisasi langsung yang juga dipakai dalam KEPI & SPI 2018: nilai gedung didapat dari membagi pendapatan tetap dengan tingkat kapitalisasi.

### 6.2 Membalik Rumus: Menghitung Tarif yang Dibutuhkan

Kalau kita sudah tahu berapa NOI yang ingin dicapai, kita bisa membalik seluruh rangkaian rumus di atas untuk mendapat tarif minimumnya.

**Rumus 6.5 — Tarif Sewa yang Dibutuhkan**

$$R_{\text{butuh}} = \frac{NOI_{\text{target}} + OpEx - I_{\text{lain}}}{NLA \times (1 - v - c) \times 12}$$

**Intinya:** ini rumus 6.1–6.4 dibalik. Alih-alih bertanya "kalau tarifnya segini, untungnya berapa?", pertanyaannya jadi "kalau saya mau untung segini, tarifnya harus berapa?"

**Contoh perhitungan.**

Data Menara Nusantara (dummy):

| Komponen | Nilai |
|---|---|
| Nilai aset yang diinvestasikan ($V$) | Rp 700.000.000.000 |
| Tingkat kapitalisasi target ($r_{\text{cap}}$) | 7,00% |
| Biaya operasional tahunan ($OpEx$) | Rp 26.400.000.000 |
| Pendapatan lain tahunan ($I_{\text{lain}}$) | Rp 4.800.000.000 |
| NLA total | 33.600 m² |
| Tingkat kekosongan target ($v$) | 22% |
| Kerugian penagihan ($c$) | 1,5% |

Langkah 1 — NOI target:

$$NOI_{\text{target}} = 700.000.000.000 \times 0{,}0700 = \text{Rp } 49.000.000.000$$

Langkah 2 — Tarif yang dibutuhkan:

$$R_{\text{butuh}} = \frac{49.000.000.000 + 26.400.000.000 - 4.800.000.000}{33.600 \times (1 - 0{,}22 - 0{,}015) \times 12}$$

$$R_{\text{butuh}} = \frac{70.600.000.000}{33.600 \times 0{,}765 \times 12} = \frac{70.600.000.000}{308.448} \approx \text{Rp } 228.889\text{/m}^2\text{/bulan}$$

**Cara membaca hasil ini.** Angka Rp 228.889 itu sekitar 24% di atas indikasi pasar Rp 184.000. Ini **bukan berarti hitungannya salah** — justru ini temuan yang penting. Artinya: dengan struktur biaya dan target untung saat ini, pasar belum sanggup membayar tarif yang dibutuhkan untuk mencapai imbal hasil 7,00%.

Kesenjangan seperti ini bukan hal aneh di pasar perkantoran Jakarta, yang beberapa tahun terakhir kelebihan pasokan. Nilai gedung — yang sebagian besar berasal dari biaya konstruksi dan tanah — sering kali sudah tidak sejalan lagi dengan tarif sewa yang sanggup dibayar pasar sekarang.

Bila situasi ini muncul pada gedung nyata, pilihan tindakannya adalah:

1. **Turunkan target imbal hasil** agar realistis dengan kondisi pasar.
2. **Tekan biaya operasional** melalui efisiensi energi, renegosiasi kontrak pengelolaan, atau otomasi.
3. **Naikkan okupansi** — ini yang paling berpengaruh, karena penyebutnya membesar.
4. **Tambah sumber pendapatan lain** — parkir, ruang iklan, menara telekomunikasi, ruang penyimpanan.
5. **Tinjau ulang nilai buku aset** bila nilai perolehannya memang terlalu tinggi dibanding kondisi pasar sekarang.

Model ini sengaja menampilkan ketidakcocokan tersebut secara terbuka, bukan menyembunyikannya. Itulah gunanya membandingkan tiga pendekatan.

### 6.3 Titik Impas: Batas Bawah Mutlak

**Rumus 6.6 — Tarif Sewa Titik Impas**

$$R_{\text{impas}} = \frac{OpEx + \text{Cadangan CapEx} + \text{Cicilan Utang} - I_{\text{lain}}}{NLA \times (1 - v - c) \times 12}$$

**Intinya:** ini tarif paling rendah yang masih boleh dipakai. Di titik ini gedung pas-pasan — tidak untung, tidak rugi secara kas. **Di bawah angka ini, setiap meter persegi yang disewakan justru menambah kerugian.**

**Contoh.** Dengan cadangan CapEx Rp 6.720.000.000 per tahun (setara Rp 200.000/m²/tahun) dan cicilan utang Rp 22.000.000.000 per tahun:

$$R_{\text{impas}} = \frac{26.400.000.000 + 6.720.000.000 + 22.000.000.000 - 4.800.000.000}{308.448}$$

$$R_{\text{impas}} = \frac{50.320.000.000}{308.448} \approx \text{Rp } 163.139\text{/m}^2\text{/bulan}$$

**Cara membaca hasil ini.** Angka Rp 163.139 ada **di bawah** indikasi pasar Rp 184.000. Ini kabar baik: gedung tetap hasilkan kas positif pada tarif pasar dan okupansi target.

**Rumus 6.7 — Okupansi Minimum agar Impas**

Pertanyaan yang lebih berguna buat pengelola: pada tarif pasar, sampai seberapa rendah okupansi masih boleh turun sebelum gedung mulai rugi?

$$o_{\min} = \frac{OpEx + \text{CapEx} + \text{Utang} - I_{\text{lain}}}{R \times NLA \times 12} + c$$

Dengan tarif Rp 184.000:

$$o_{\min} = \frac{50.320.000.000}{184.000 \times 33.600 \times 12} + 0{,}015 = \frac{50.320.000.000}{74.188.800.000} + 0{,}015$$

$$o_{\min} = 0{,}6783 + 0{,}015 = 0{,}6933 \approx 69{,}3\%$$

Artinya, selama okupansi bertahan di atas sekitar 69%, gedung tidak rugi secara kas. Angka ini adalah **alarm dini** yang lebih berguna daripada sekadar tarif impas — karena okupansi bergerak lebih cepat daripada tarif, dan lebih gampang dipantau tiap bulan. Berkas Excel menghitungnya otomatis di lembar `06_UJI_KELAYAKAN`.

---

## 7. Menetapkan Pagar Pengaman (Batas Bawah dan Batas Atas)

Setelah tiga pendekatan menghasilkan tiga angka berbeda, kita butuh satu aturan untuk menyatukannya jadi satu keputusan.

**Rumus 7.1 — Batas Bawah Tarif**

$$R_{\min} = \max \left( R_{\text{impas}} \times \phi, \; R_{\text{pasar}} \times (1 - \delta) \right)$$

Keterangan:
- $\phi$ (phi) = Toleransi terhadap titik impas. Nilai 1,00 berarti tidak boleh di bawah impas sama sekali; 0,90 berarti boleh 10% di bawah impas untuk sementara, demi mengisi ruang kosong.
- $\delta$ (delta) = Diskon maksimum terhadap pasar yang masih diizinkan, misalnya 0,15 (15%).

**Intinya:** ini pagar paling bawah — tarif tidak boleh jatuh lebih rendah dari sini, supaya gedung tidak rugi dan tidak "banting harga" terlalu jauh dari pasar.

**Rumus 7.2 — Batas Atas Tarif**

$$R_{\max} = R_{\text{pasar,premium}} \times (1 + \gamma)$$

Keterangan:
- $R_{\text{pasar,premium}}$ = Tarif pembanding terbaik di segmen yang sama
- $\gamma$ (gamma) = Premi maksimum yang dapat dipertahankan, umumnya 0,05 sampai 0,10

**Intinya:** ini pagar paling atas — tarif tidak boleh melebihi tarif gedung terbaik di segmen sejenis, ditambah sedikit premi. Di atas ini, harga dianggap tidak realistis buat pasar.

**Rumus 7.3 — Tarif Akhir yang Dipakai**

$$R^{*} = \text{median} \left( R_{\min}, \; R_{\text{pasar}}, \; R_{\max} \right)$$

Fungsi median otomatis memilih nilai tengah, jadi tarif tidak pernah keluar dari koridor yang sudah disepakati.

**Cara kerja aturan ini.** Kalau $R_{\text{pasar}}$ ada di antara batas bawah dan batas atas, dia yang dipakai. Kalau $R_{\text{pasar}}$ lebih rendah dari batas bawah, batas bawah yang dipakai. Kalau lebih tinggi dari batas atas, batas atas yang dipakai. Simpelnya: tarif pasar dipakai selama masih masuk akal; kalau tidak, dibulatkan ke pagar terdekat.

Di berkas Excel, aturan ini diterapkan di lembar `06_UJI_KELAYAKAN`, dan hasilnya berupa satu sel keputusan yang menampilkan status secara otomatis bila tarif yang dipakai melanggar batas.

### 7.1 Hasil pada Data Dummy

Agar pembaca dapat mencocokkan, berikut hasil yang muncul di berkas Excel dengan data dummy bawaan:

| Besaran | Nilai | Keterangan |
|---|---|---|
| $R_{\text{pasar}}$ | Rp 185.516 | Rata-rata tertimbang 6 pembanding (Rumus 5.3) |
| $R_{\text{butuh}}$ | Rp 228.889 | Belum tercapai pada tarif pasar |
| $R_{\text{impas}}$ | Rp 163.139 | Aman |
| $R_{\min}$ | Rp 157.688 | $\max(163.139 \times 0{,}90; \; 185.516 \times 0{,}85)$ |
| $R_{\max}$ | Rp 252.720 | $234.000 \times 1{,}08$ |
| **$R^{*}$ terpilih** | **Rp 185.516** | Median jatuh pada $R_{\text{pasar}}$ |

Karena $R_{\text{pasar}}$ ada di dalam koridor, dia yang dipilih jadi tarif dasar. Status yang ditampilkan model: **DI DALAM KORIDOR** dan **AMAN** terhadap titik impas, dengan selisih −18,9% terhadap tarif yang dibutuhkan dan +13,7% terhadap titik impas.

**Cara membaca kesenjangan −18,9%.** Ini pesan bahwa target imbal hasil 7,00% belum tercapai di kondisi pasar sekarang. Imbal hasil yang benar-benar dihasilkan bisa dihitung balik:

$$r_{\text{cap,riil}} = \frac{R^{*} \times NLA \times (o - c) \times 12 - OpEx + I_{\text{lain}}}{V}$$

$$= \frac{185.516 \times 308.448 - 26.400.000.000 + 4.800.000.000}{700.000.000.000} = \frac{35.622.000.000}{700.000.000.000} \approx 5{,}09\%$$

Pilihan yang tersedia buat manajemen: menerima imbal hasil 5,09%, menekan biaya operasional, menaikkan okupansi di atas target, atau meninjau ulang nilai buku aset. Model tidak memilihkan — cuma menyajikan angkanya secara terbuka.

---
---

# BAGIAN III — MEMBEDAH HARGA KE TIAP UNIT

## 8. Model Faktor Pengali (Multiplikatif)

### 8.1 Mengapa Dikalikan, Bukan Ditambah

Ada dua cara membedah harga: **ditambah** (aditif) dan **dikalikan** (multiplikatif).

Model aditif: `Tarif unit = Tarif dasar + Rp 5.000 (lantai tinggi) + Rp 3.000 (sudut)`
Model multiplikatif: `Tarif unit = Tarif dasar × 1,05 (lantai tinggi) × 1,03 (sudut)`

Handbook ini pakai model multiplikatif, karena tiga alasan:

1. **Otomatis ikut skala.** Kalau tarif dasar naik dari Rp 184.000 jadi Rp 200.000, model aditif tetap menambah Rp 5.000 rata (yang sekarang jadi relatif lebih kecil). Model multiplikatif otomatis menyesuaikan — tambahannya ikut naik proporsional.
2. **Sesuai pola data yang ada di lapangan.** Studi harga sewa umumnya memodelkan harga dalam bentuk logaritma. Dalam bentuk logaritma, menjumlah koefisien itu sama saja dengan mengalikan faktor di skala harga aslinya.
3. **Gampang dijelaskan.** "Unit ini 8% lebih mahal karena lantai tinggi dan posisi sudut" lebih gampang dipahami daripada deretan angka Rupiah.

### 8.2 Rumus Inti

**Rumus 8.1 — Tarif Unit Sebelum Kalibrasi**

$$R_u^{\text{awal}} = R^{*} \times F_{\text{lantai},u} \times F_{\text{view},u} \times F_{\text{posisi},u} \times F_{\text{ukuran},u} \times F_{\text{kondisi},u} \times F_{\text{denah},u}$$

Keterangan:
- $R_u^{\text{awal}}$ = Tarif unit $u$ sebelum kalibrasi (Rp/m²/bulan)
- $R^{*}$ = Tarif Sewa Dasar Gedung dari Rumus 7.3
- $F_{\ldots,u}$ = Faktor pengali untuk masing-masing atribut unit $u$

**Intinya:** ambil tarif dasar gedung, lalu kalikan berturut-turut dengan tiap faktor unit itu (lantai, view, posisi, ukuran, kondisi, denah). Faktor $1{,}00$ berarti netral (tidak menaikkan atau menurunkan apa-apa). Faktor $1{,}06$ berarti naik 6%. Faktor $0{,}96$ berarti turun 4%.

**Rumus 8.2 — Bentuk Umum**

$$R_u^{\text{awal}} = R^{*} \times \prod_{k=1}^{K} F_{k,u}$$

di mana $K$ adalah jumlah faktor yang dipakai. Kalau nanti ada faktor baru yang mau ditambah, tinggal ditambahkan ke perkalian ini tanpa mengubah struktur rumus — ini alasan model ini tahan lama.

### 8.3 Aturan Disiplin dalam Memilih Faktor

Godaan terbesarnya adalah menambah faktor sebanyak-banyaknya. Ini harus ditahan. Ikuti empat aturan:

1. **Setiap faktor harus dapat diamati secara objektif.** "Unit terasa nyaman" bukan faktor. "Unit memiliki jendela di dua sisi" adalah faktor.
2. **Setiap faktor harus dapat diverifikasi oleh pihak ketiga.** Bila penyewa bertanya, harus ada jawaban yang bisa ditunjukkan di denah.
3. **Jangan menghitung hal yang sama dua kali.** Bila "lantai tinggi" sudah mencakup manfaat pemandangan, jangan menambahkan faktor pemandangan penuh untuk hal yang sama. Ini disebut **tumpang tindih faktor** dan menyebabkan harga membengkak tanpa dasar.
4. **Batasi jumlah faktor pada 5–7.** Lebih dari itu, model menjadi sulit dijelaskan dan sulit dikalibrasi karena data yang tersedia biasanya tidak cukup.

**Rumus 8.3 — Uji Batas Sebaran Faktor**

Agar model tidak menghasilkan harga ekstrem, hasil perkalian seluruh faktor sebaiknya dibatasi:

$$0{,}80 \leq \prod_{k=1}^{K} F_{k,u} \leq 1{,}35$$

**Intinya:** setelah semua faktor dikalikan, hasil akhirnya tidak boleh menaikkan atau menurunkan tarif lebih dari itu. Kalau ada unit yang keluar dari rentang ini, periksa lagi — kemungkinan ada faktor yang dihitung dobel. Batas ini bisa diubah di lembar `01_ASUMSI`.

---

## 9. Faktor Lantai — Inti dari Perbedaan Harga Vertikal

Ini adalah faktor terpenting dan yang paling banyak ditanyakan. Handbook ini menyediakan dua model: sederhana dan lanjutan.

### 9.1 Landasan Empiris

Sebelum menetapkan angka, penting untuk tahu dulu apa yang sudah ditemukan penelitian:

**Premi lantai umumnya positif, tapi besarnya beda-beda antar kota.** Analisis atas 55.907 iklan ruang kantor di 2.567 gedung, 25 kota, menemukan premi harga yang positif dan signifikan secara statistik untuk unit di lantai lebih tinggi, di 23 dari 25 kota. Studi ini juga menemukan kota dengan pasar perkantoran lebih besar cenderung punya premi lebih tinggi — tapi tidak ada hubungan antara ciri fisik kota (jumlah penduduk, kepadatan, tinggi bangunan rata-rata) dengan besar premi per lantainya (Nutt, 2016).

**Premi lantai bisa dipecah jadi beberapa sumber.** Studi Amsterdam atas 627 transaksi sewa di 33 gedung tinggi berhasil menguraikan premi vertikal jadi komponen: sekitar 27% karena pemandangan, 3% karena beda sektor industri penyewa, dan sekitar 70% karena citra perusahaan dan faktor lain. Penelitian ini juga menemukan premi kuat di sektor dengan keluaran per pekerja tertinggi, seperti firma hukum dan konsultan manajemen — sementara sektor teknologi informasi justru kurang peduli ketinggian, meski produktivitasnya tinggi (Nase, van Assendelft & Remøy, 2019).

**Premi lantai melandai makin ke atas.** Studi atas unit hunian yang sangat seragam di Hong Kong menemukan premi lantai tidak konstan — **mengecil seiring bertambahnya lantai**. Studi yang sama tidak menemukan perbedaan berarti antara pola premi lantai di gedung tinggi dan gedung rendah (Chau, Wong & Yiu, 2012 — *Journal of Housing and the Built Environment*).

**Premi ketinggian gedung itu beda dari premi lantai.** Perusahaan di Belanda terbukti mau bayar sekitar 4% lebih mahal untuk gedung yang 10 meter lebih tinggi. Premi ini dianggap gabungan dari efek berkumpulnya bisnis sejenis di satu gedung, efek "gedung ikonik" (*landmark*), dan efek pemandangan; jumlah efek ikonik dan pemandangan diperkirakan sekitar 2,8%–5,5% dari sewa, untuk gedung yang tingginya lima kali rata-rata (Koster, van Ommeren & Rietveld, 2014).

**Premi lantai bisa saja tidak ada sama sekali.** Di sejumlah pasar, penyewa lebih peduli pada efisiensi denah lantai, kelengkapan fasilitas, sistem lift, dan lokasi gedung, jadi premi lantai atas tidak terbentuk. Karena itu, **jangan pernah asal berasumsi ada premi lantai tanpa mengecek data sendiri.**

### 9.2 Model Sederhana: Zona Lantai

Model ini paling mudah dijelaskan ke pihak non-teknis dan cukup untuk sebagian besar keperluan.

**Rumus 9.1 — Faktor Lantai Berbasis Zona**

$$F_{\text{lantai},u} = 1 + \pi_{z(u)} + \beta_z \times \left( \ell_u - \ell_{z,\text{awal}} \right)$$

Keterangan:
- $\pi_z$ (pi) = Premi dasar zona $z$, dalam pecahan
- $z(u)$ = Zona tempat unit $u$ berada
- $\beta_z$ = Tambahan premi per lantai di dalam zona $z$
- $\ell_u$ = Nomor lantai unit $u$
- $\ell_{z,\text{awal}}$ = Lantai pertama dari zona $z$

**Intinya:** gedung dibagi jadi beberapa zona lantai (podium, bawah, tengah, atas, puncak). Tiap zona punya "harga dasar zona", lalu di dalam zona itu tarifnya naik sedikit-sedikit tiap lantai. Ini cara paling gampang dijelaskan ke penyewa: "lantai Anda masuk zona Atas, jadi ada tambahan segini."

Contoh tabel zona untuk gedung 30 lantai (nilai dummy, wajib dikalibrasi):

| Zona | Rentang lantai | Premi zona $\pi_z$ | Tambahan per lantai $\beta_z$ | Dasar pertimbangan |
|---|---|---|---|---|
| Podium | 2–5 | −6,0% | +0,30% | Kebisingan jalan, pemandangan terhalang, tetapi akses lobi cepat. |
| Bawah | 6–12 | 0,0% | +0,35% | Zona acuan; premi ditetapkan nol. |
| Tengah | 13–20 | +4,5% | +0,30% | Di atas garis atap gedung sekitar, pemandangan mulai terbuka. |
| Atas | 21–27 | +9,0% | +0,25% | Pemandangan penuh, kebisingan minimal. |
| Puncak | 28–30 | +13,0% | +0,15% | Lantai penanda, gengsi tertinggi; premi melandai. |

**Contoh perhitungan.** Unit di lantai 24 (Zona Atas, lantai awal zona = 21):

$$F_{\text{lantai}} = 1 + 0{,}090 + 0{,}0025 \times (24 - 21) = 1 + 0{,}090 + 0{,}0075 = 1{,}0975$$

Artinya lantai 24 dihargai 9,75% di atas tarif dasar hanya karena posisi vertikalnya.

Perhatikan bahwa $\beta_z$ **mengecil** dari zona bawah ke zona puncak (0,35% → 0,15%). Ini mencerminkan temuan bahwa premi lantai melandai di ketinggian.

### 9.3 Model Lanjutan: Fungsi Logaritmik Berlandai

Kalau tersedia data transaksi yang cukup, bentuk fungsi yang lebih halus ini lebih akurat dan tidak menimbulkan lompatan harga tiba-tiba di batas zona.

**Rumus 9.2 — Faktor Lantai Logaritmik**

$$F_{\text{lantai},u} = 1 + \theta \times \ln \left( \frac{\ell_u + \lambda}{\ell_{\text{ref}} + \lambda} \right)$$

Keterangan:
- $\theta$ (theta) = Kekuatan premi vertikal. Nilai lazim hasil kalibrasi: 0,04–0,12
- $\ln$ = Logaritma natural
- $\ell_{\text{ref}}$ = Lantai acuan, tempat faktor bernilai tepat 1,00
- $\lambda$ (lambda) = Parameter pelandaian, umumnya 3–8

**Intinya:** mirip model zona di atas, tapi kenaikannya mulus tanpa "lompatan" antar zona. Sifatnya: naik satu lantai di bagian bawah gedung memberi kenaikan tarif yang lebih besar daripada naik satu lantai di bagian atas — sesuai temuan penelitian bahwa premi lantai melandai di ketinggian.

**Contoh perhitungan** dengan $\theta = 0{,}085$, $\ell_{\text{ref}} = 9$, $\lambda = 5$:

| Lantai | Perhitungan | $F_{\text{lantai}}$ |
|---|---|---|
| 3 | $1 + 0{,}085 \times \ln(8/14)$ | 0,9524 |
| 9 | $1 + 0{,}085 \times \ln(14/14)$ | 1,0000 |
| 15 | $1 + 0{,}085 \times \ln(20/14)$ | 1,0303 |
| 21 | $1 + 0{,}085 \times \ln(26/14)$ | 1,0526 |
| 27 | $1 + 0{,}085 \times \ln(32/14)$ | 1,0703 |
| 30 | $1 + 0{,}085 \times \ln(35/14)$ | 1,0779 |

Selisih lantai 3 ke 9 adalah 4,76 poin persentase; selisih lantai 21 ke 27 hanya 1,77 poin persentase. Pelandaian terjadi secara otomatis tanpa perlu tabel zona.

Berkas Excel menyediakan **kedua model**, dan pengguna dapat beralih di antaranya melalui satu sel saklar di lembar `01_ASUMSI`.

### 9.4 Cara Mengukur Premi Lantai dari Data Sendiri

Ini langkah kalibrasi yang tidak boleh dilewati. Caranya:

1. Kumpulkan seluruh kontrak sewa aktif di gedung (atau gedung sejenis di kawasan yang sama) dalam 24 bulan terakhir.
2. Untuk tiap kontrak, catat: tarif per m² per bulan, nomor lantai, luas unit, dan kondisi fit-out.
3. Buang kontrak yang khusus: sewa ke perusahaan afiliasi, sewa sangat singkat, dan sewa dengan konsesi luar biasa.
4. Hitung tarif rata-rata per lantai, dengan bobot berupa luas unit.
5. Buat grafik sebar: sumbu mendatar nomor lantai, sumbu tegak tarif per m².
6. Amati polanya. Kalau garisnya cenderung naik, berarti premi lantai memang ada. Kalau mendatar, premi lantai tidak terbentuk di gedung ini dan $\theta$ harus disetel mendekati nol.
7. Hitung $\theta$ dengan regresi sederhana (dijelaskan di Bab 12).

**Jumlah data minimum.** Untuk memperkirakan premi lantai secara wajar, dibutuhkan minimal **30 kontrak yang tersebar di setidaknya 8 lantai berbeda**. Dengan data lebih sedikit, gunakan tabel zona dengan nilai konservatif, dan tandai model sebagai "belum terkalibrasi" di lembar ringkasan.

---

## 10. Faktor Non-Lantai: Pemandangan, Posisi, Ukuran, Kondisi

### 10.1 Faktor Pemandangan

**Rumus 10.1**

$$F_{\text{view},u} = 1 + \nu_{k(u)}$$

di mana $\nu_k$ (nu) adalah premi untuk kategori pemandangan $k$.

| Kategori | Definisi objektif | Premi $\nu$ (dummy) |
|---|---|---|
| Terhalang | Jarak pandang bebas kurang dari 30 m | −3,0% |
| Terbatas | Jarak pandang bebas 30–150 m | 0,0% |
| Terbuka | Jarak pandang bebas di atas 150 m tanpa penghalang utama | +3,0% |
| Penanda | Menghadap objek bernilai (taman kota, sungai, tugu, garis langit kota) | +6,0% |

**Peringatan hitung dobel.** Kalau faktor lantai sudah memasukkan manfaat pemandangan, premi kategori "Terbuka" dan "Penanda" harus dikurangi supaya tidak dihitung dua kali. Studi Amsterdam memperkirakan sekitar 27% dari premi vertikal itu sebenarnya berasal dari pemandangan — angka ini bisa dipakai sebagai dasar koreksi. Kalau $F_{\text{lantai}}$ di suatu lantai bernilai +10%, sekitar 2,7 poin persentase di antaranya sudah mewakili pemandangan, jadi premi pemandangan tambahan sebaiknya dikurangi sebesar itu.

Berkas Excel menyediakan sel parameter **`Porsi_View_Dalam_Faktor_Lantai`** untuk mengoreksi hal ini secara otomatis.

### 10.2 Faktor Posisi dalam Denah Lantai

**Rumus 10.2**

$$F_{\text{posisi},u} = 1 + \sum_{p} \rho_p \times \mathbb{1}_{p}(u)$$

Keterangan:
- $\rho_p$ (rho) = Premi untuk atribut posisi $p$
- $\mathbb{1}_{p}(u)$ = Bernilai 1 bila unit $u$ memiliki atribut $p$, dan 0 bila tidak

| Atribut posisi | Premi $\rho$ (dummy) | Alasan |
|---|---|---|
| Unit sudut (dua sisi berjendela) | +3,0% | Cahaya alami dua arah, kesan lapang. |
| Berhadapan langsung dengan lobi lift | +1,0% | Mudah ditemukan tamu, cocok untuk kantor dengan banyak kunjungan. |
| Berdekatan dengan area layanan atau ruang mesin | −2,5% | Potensi kebisingan dan getaran. |
| Berada di ujung koridor buntu | −1,5% | Akses lebih jauh, sirkulasi kurang baik. |

Atribut-atribut ini bersifat **kumulatif dan bisa berlaku bersamaan**. Sebuah unit sudut yang juga berhadapan dengan lobi lift memperoleh $1 + 0{,}030 + 0{,}010 = 1{,}040$.

### 10.3 Faktor Ukuran Unit

Makin besar unit yang disewa, biasanya makin rendah tarif per meter perseginya. Ini bentuk diskon volume yang lazim di pasar sewa perkantoran: penyewa besar memberi kepastian pendapatan lebih lama, dan menekan biaya pemasaran per meter persegi.

**Rumus 10.3 — Faktor Ukuran (fungsi pangkat)**

$$F_{\text{ukuran},u} = \left( \frac{A_{\text{ref}}}{A_u} \right)^{\!\!\sigma}$$

Keterangan:
- $A_u$ = Luas unit $u$ (m²)
- $A_{\text{ref}}$ = Luas unit acuan, tempat faktor bernilai tepat 1,00
- $\sigma$ (sigma) = Kekuatan diskon ukuran. Nilai lazim: 0,02–0,06

**Intinya:** unit kecil bayar sedikit lebih mahal per m², unit besar dapat diskon per m². Ini wajar di pasar sewa — penyewa besar dianggap lebih "aman" buat pemilik gedung.

**Contoh** dengan $A_{\text{ref}} = 250$ m² dan $\sigma = 0{,}040$:

| Luas unit | Perhitungan | $F_{\text{ukuran}}$ |
|---|---|---|
| 90 m² | $(250/90)^{0{,}04}$ | 1,0418 |
| 150 m² | $(250/150)^{0{,}04}$ | 1,0205 |
| 250 m² | $(250/250)^{0{,}04}$ | 1,0000 |
| 500 m² | $(250/500)^{0{,}04}$ | 0,9727 |
| 1.200 m² | $(250/1200)^{0{,}04}$ | 0,9385 |

Fungsi pangkat dipilih karena perubahannya halus, tanpa lompatan di batas kategori. Alternatifnya tabel bertingkat, tapi tabel bertingkat membuka celah negosiasi: penyewa bisa minta tambah 1 m² supaya masuk ke pita diskon berikutnya.

**Batas pengaman.** Terapkan pembatas agar unit sangat kecil dan sangat besar tidak menghasilkan faktor ekstrem:

$$F_{\text{ukuran},u} = \min \left( 1{,}08, \; \max \left( 0{,}92, \; \left( \tfrac{A_{\text{ref}}}{A_u} \right)^{\sigma} \right) \right)$$

### 10.4 Faktor Kondisi Fit-out

**Rumus 10.4**

$$F_{\text{kondisi},u} = 1 + \kappa_{c(u)}$$

| Kondisi unit | Premi $\kappa$ (dummy) | Catatan |
|---|---|---|
| Shell & core (polos) | 0,0% | Kondisi acuan. |
| Warm shell (plafon, lantai, listrik dasar terpasang) | +3,5% | Menghemat waktu dan biaya penyewa. |
| Semi fitted (partisi dasar, pantry) | +6,5% | — |
| Fully fitted (siap huni, termasuk perabot) | +12,0% | Premi harus mencerminkan amortisasi biaya fit-out. |

**Uji kewajaran premi fit-out.** Premi ini tidak boleh ditetapkan asal-asalan. Minimal harus cukup untuk menutup biaya fit-out yang dikeluarkan pemilik, dicicil sepanjang masa sewa.

**Rumus 10.5 — Premi Fit-out Minimum**

$$\kappa_{\min} = \frac{C_{\text{fitout}}}{R^{*} \times T}$$

Keterangan:
- $C_{\text{fitout}}$ = Biaya fit-out per m² yang ditanggung pemilik
- $T$ = Masa sewa dalam bulan

**Intinya:** kalau pemilik yang bayar biaya interior unit, premi fit-out yang dikenakan ke penyewa minimal harus cukup untuk "balik modal" biaya itu selama masa sewanya. Kalau tidak, pemilik rugi diam-diam.

**Contoh.** Biaya fit-out Rp 3.500.000/m², masa sewa 60 bulan, tarif dasar Rp 184.000/m²/bulan:

$$\kappa_{\min} = \frac{3.500.000}{184.000 \times 60} = \frac{3.500.000}{11.040.000} = 0{,}3170 = 31{,}7\%$$

Hasil ini menunjukkan premi 12% **tidak cukup** untuk menutup biaya fit-out penuh dalam 60 bulan. Pilihannya: memperpanjang masa sewa, menagih biaya fit-out terpisah, atau membatasi fit-out cuma sampai tingkat *warm shell*. Model Excel menghitung dan menandai ketidaksesuaian ini otomatis.

### 10.5 Faktor Efisiensi Denah

**Rumus 10.6**

$$F_{\text{denah},u} = 1 + \tau_{d(u)}$$

| Karakteristik denah | Premi $\tau$ (dummy) |
|---|---|
| Bebas kolom (*column-free*) | +2,0% |
| Kolom standar | 0,0% |
| Banyak kolom atau bentuk tidak beraturan | −2,5% |
| Tinggi plafon di atas 2,90 m | +1,5% |

---

## 11. Kalibrasi: Menjaga Rata-Rata Tetap Sesuai Pasar

### 11.1 Masalah yang Diselesaikan

Setelah semua faktor diterapkan, rata-rata tarif seluruh unit hampir pasti **tidak persis sama** dengan tarif dasar gedung. Kalau sebagian besar unit ada di lantai atas dan posisi sudut, rata-ratanya akan melayang naik. Kalau sebaliknya, rata-ratanya akan melorot turun.

Ini berbahaya. Tarif dasar gedung sudah ditetapkan dari analisis pasar yang cermat; kalau rata-rata hasil model beda, artinya model diam-diam sudah menetapkan harga gedung di atas atau di bawah pasar tanpa kita sadari.

### 11.2 Rumus Kalibrasi

**Rumus 11.1 — Faktor Kalibrasi**

$$k = \frac{R^{*}}{\dfrac{\sum_{u} \left( A_u \times R_u^{\text{awal}} \right)}{\sum_{u} A_u}}$$

Keterangan:
- $k$ = Faktor kalibrasi, satu angka untuk seluruh gedung
- Penyebutnya adalah rata-rata tarif awal seluruh unit, dengan bobot luas unit

**Intinya:** $k$ itu satu angka "koreksi" untuk seluruh gedung. Kalau rata-rata tarif dari semua unit (setelah dikalikan faktor lantai/view/dst) ternyata lebih tinggi dari tarif dasar $R^{*}$, $k$ akan lebih kecil dari 1 untuk menariknya turun lagi — dan sebaliknya. Tujuannya satu: memastikan rata-rata akhir persis sama dengan $R^{*}$.

**Rumus 11.2 — Tarif Unit Final**

$$R_u = R_u^{\text{awal}} \times k$$

Setelah kalibrasi, berlaku persamaan berikut — ini jadi **uji wajib** model:

$$\frac{\sum_{u} \left( A_u \times R_u \right)}{\sum_{u} A_u} = R^{*}$$

**Contoh perhitungan sederhana** dengan tiga unit:

| Unit | Luas (m²) | $R_u^{\text{awal}}$ | Luas × Tarif |
|---|---|---|---|
| A | 200 | 175.000 | 35.000.000 |
| B | 300 | 190.000 | 57.000.000 |
| C | 500 | 205.000 | 102.500.000 |
| **Total** | **1.000** | | **194.500.000** |

Rata-rata tertimbang: $194.500.000 / 1.000 = \text{Rp } 194.500$

Bila $R^{*} = \text{Rp } 184.000$, maka:

$$k = \frac{184.000}{194.500} = 0{,}94602$$

Tarif final: Unit A menjadi Rp 165.554, Unit B menjadi Rp 179.744, Unit C menjadi Rp 193.934.

Periksa: $(200 \times 165.554 + 300 \times 179.744 + 500 \times 193.934) / 1.000 = 184.000$. Benar.

**Yang perlu dipahami:** kalibrasi **tidak mengubah perbedaan relatif antar unit**. Unit C tetap 17,1% lebih mahal dari Unit A, baik sebelum maupun sesudah kalibrasi. Yang berubah cuma tingkat harga keseluruhannya — semua unit digeser naik/turun bersama-sama secara proporsional.

### 11.3 Kalibrasi Berdasarkan Unit Terisi atau Seluruh Unit

Ada dua pilihan bobot dalam kalibrasi, dan pilihannya benar-benar berdampak ke angka akhir:

- **Berbasis seluruh NLA** — mencerminkan target harga bila gedung terisi penuh. Cocok untuk penetapan daftar harga (*rate card*).
- **Berbasis unit yang terisi saja** — mencerminkan harga rata-rata yang benar-benar diterima. Cocok untuk pelaporan kinerja.

Berkas Excel menyediakan saklar untuk memilih di antara keduanya di lembar `01_ASUMSI`.

### 11.4 Pembulatan Operasional

Tarif hasil model berupa angka pecahan seperti Rp 179.744. Untuk keperluan operasional, tarif perlu dibulatkan supaya gampang dipakai.

**Rumus 11.3 — Pembulatan**

$$R_u^{\text{publikasi}} = \text{ROUND} \left( \frac{R_u}{\mu} \right) \times \mu$$

di mana $\mu$ adalah satuan pembulatan, misalnya Rp 500 atau Rp 1.000.

**Intinya:** tarif dibulatkan ke kelipatan terdekat (mis. ke ratusan atau ribuan rupiah terdekat) supaya rapi dan gampang dipakai di daftar harga.

**Peringatan.** Pembulatan bikin rata-rata tarif bergeser sedikit dari $R^{*}$. Model menghitung besar pergeserannya dan menampilkannya sebagai **selisih pembulatan**. Kalau selisihnya lebih dari 0,5%, perkecil satuan pembulatannya.

---

## 12. Kalibrasi Lanjutan dengan Regresi Hedonik

Bagian ini opsional, buat pengguna yang punya data transaksi memadai.

### 12.1 Landasan Teori

Metode ini berakar dari karya **Sherwin Rosen (1974)**, *Hedonic Prices and Implicit Markets: Product Differentiation in Pure Competition*, terbit di *Journal of Political Economy*. Gagasan intinya sederhana: barang yang tidak seragam — seperti ruang kantor — sebenarnya adalah kumpulan atribut, dan harga pasarnya menyingkapkan "harga tersembunyi" dari tiap atribut itu. Dengan mengamati banyak transaksi, harga tersembunyi itu bisa diperkirakan secara statistik.

**Intinya:** ini cara mengurai "kenapa unit A lebih mahal dari unit B" jadi angka pasti per atribut — misalnya, berapa persen tambahan harga per lantai, berapa persen untuk unit sudut — dengan menganalisis banyak data transaksi sekaligus, bukan menebak-nebak.

Metode ini jadi landasan sebagian besar penelitian harga sewa perkantoran modern, termasuk studi-studi yang dikutip di Bab 9.

### 12.2 Bentuk Persamaan

**Rumus 12.1 — Model Semi-Logaritmik**

$$\ln(R_u) = \beta_0 + \beta_1 \ell_u + \beta_2 \ln(A_u) + \beta_3 D_{\text{sudut},u} + \beta_4 D_{\text{view},u} + \beta_5 D_{\text{fitout},u} + \epsilon_u$$

Keterangan:
- $\ln(R_u)$ = Logaritma natural dari tarif unit $u$
- $\beta_0$ = Konstanta
- $\beta_1 \ldots \beta_5$ = Koefisien yang diperkirakan dari data
- $D_{\ldots}$ = Variabel boneka (bernilai 1 bila atribut ada, 0 bila tidak)
- $\epsilon_u$ = Galat acak

**Intinya:** ini rumus statistik untuk "menebak" tarif suatu unit berdasarkan lantai, luas, dan atributnya — dilatih dari data transaksi sungguhan. Bentuk semi-logaritmik dipilih karena koefisiennya bisa langsung dibaca sebagai persentase kenaikan/penurunan harga.

**Rumus 12.2 — Mengubah Koefisien Menjadi Faktor Pengali**

Untuk variabel kontinu seperti nomor lantai:

$$F_{\text{lantai}} \approx \exp \left( \beta_1 \times (\ell_u - \ell_{\text{ref}}) \right)$$

Untuk variabel boneka:

$$F_{\text{atribut}} = \exp(\beta_j)$$

**Contoh pembacaan hasil.** Bila regresi menghasilkan $\beta_1 = 0{,}0041$, artinya setiap kenaikan satu lantai berkaitan dengan kenaikan tarif sekitar:

$$\exp(0{,}0041) - 1 = 0{,}00411 = 0{,}411\%$$

Angka inilah yang menjadi $\beta_z$ pada tabel zona di Bab 9.

### 12.3 Syarat Minimum agar Regresi Bermakna

| Syarat | Ambang | Alasan |
|---|---|---|
| Jumlah pengamatan | Minimal 10 kali jumlah variabel; idealnya 50+ | Terlalu sedikit data menghasilkan koefisien tidak stabil. |
| Sebaran lantai | Minimal 8 lantai berbeda | Tanpa sebaran, premi lantai tidak dapat dipisahkan. |
| Rentang waktu data | Maksimal 24 bulan | Data lama mencerminkan kondisi pasar berbeda. |
| $R^2$ terkoreksi | Minimal 0,50 | Di bawah itu, model menjelaskan terlalu sedikit variasi. |
| Nilai-p tiap koefisien | Maksimal 0,10 | Koefisien yang tidak signifikan sebaiknya tidak dipakai. |

**Peringatan penting buat pemula.** Regresi gampang disalahgunakan. Tiga jebakan paling umum:

1. **Korelasi bukan sebab-akibat.** Lantai atas mungkin lebih mahal karena unitnya juga lebih besar dan lebih baru — bukan murni karena ketinggiannya.
2. **Variabel yang saling tumpang tindih.** Kalau hampir semua unit sudut kebetulan ada di lantai atas, model jadi tidak bisa memisahkan mana pengaruh lantai dan mana pengaruh posisi sudut.
3. **Jangan memaksakan hasil.** Kalau koefisien lantai keluar negatif, itu temuan nyata — bukan kesalahan yang harus "diperbaiki" sampai jadi positif.

Kalau salah satu syarat di tabel atas tidak terpenuhi, **pakai model zona di Bab 9 dengan nilai konservatif**, dan tandai model sebagai belum terkalibrasi.

> Sumber: Rosen, S. (1974). "Hedonic Prices and Implicit Markets: Product Differentiation in Pure Competition." *Journal of Political Economy*, 82(1), 34–55. https://doi.org/10.1086/260169

---
---

# BAGIAN IV — DARI TARIF KE UANG MASUK

## 13. Service Charge, Pajak, dan Harga yang Dilihat Penyewa

### 13.1 Struktur Tagihan Bulanan

Yang dibayar penyewa bukan cuma tarif sewa. Susunannya:

**Rumus 13.1 — Tagihan Sewa Bulanan**

$$B_u = R_u \times A_u$$

**Rumus 13.2 — Tagihan Service Charge Bulanan**

$$S_u = SC \times A_u$$

di mana $SC$ adalah tarif service charge per m² per bulan.

**Rumus 13.3 — Tagihan Kotor Bulanan**

$$G_u = B_u + S_u = (R_u + SC) \times A_u$$

**Rumus 13.4 — Tarif Kotor per m²**

$$R_u^{\text{kotor}} = R_u + SC$$

**Intinya:** ada dua komponen tagihan bulanan — sewa ruangnya sendiri, dan service charge (iuran pengelolaan gedung: listrik area bersama, AC, keamanan, lift). Jumlah keduanya itulah yang paling sering dipakai calon penyewa untuk membandingkan gedung. Karena itu, walau hitungan internal pakai tarif dasar saja, **daftar harga yang dipublikasikan sebaiknya menampilkan sewa dasar dan service charge secara terpisah dan jelas.**

Sebagai gambaran pasar, laporan Colliers mencatat service charge rata-rata di CBD Jakarta sekitar Rp 86.000/m²/bulan dan di kawasan desentralisasi sekitar Rp 62.000/m²/bulan, dengan perkiraan naik sekitar 3% per tahun sampai 2029.

### 13.2 Perlakuan Pajak di Indonesia

Bagian ini menjelaskan aspek perpajakan supaya model bisa menghitung arus kas bersih dengan benar. **Ini bukan nasihat pajak.** Untuk kasus nyata, konsultasikan dengan konsultan pajak terdaftar, dan cek ulang tarif yang berlaku karena peraturan bisa berubah.

**Pajak Penghasilan Final Pasal 4 ayat (2).** Penghasilan dari sewa tanah dan/atau bangunan kena Pajak Penghasilan yang sifatnya final. Dasar hukumnya Pasal 4 ayat (2) huruf d Undang-Undang Pajak Penghasilan, diatur lebih lanjut di **Peraturan Pemerintah Nomor 34 Tahun 2017**. Tarifnya **10% dari jumlah bruto nilai sewa**.

Yang penting dipahami: **dasar pengenaan pajaknya adalah jumlah bruto, termasuk service charge.** Jumlah bruto mencakup semua yang dibayar atau diutang penyewa — termasuk biaya perawatan, pemeliharaan, keamanan, layanan, dan fasilitas lain — baik perjanjiannya terpisah maupun digabung dengan perjanjian sewa.

**Rumus 13.5 — PPh Final atas Sewa**

$$\text{PPh Final} = 0{,}10 \times \left( B_u + S_u \right)$$

**Intinya:** pemerintah memotong 10% dari total tagihan sewa + service charge. Ini dipotong dari pendapatan pemilik gedung, bukan ditambahkan ke tagihan penyewa.

**Pajak Pertambahan Nilai.** Sewa bangunan itu Jasa Kena Pajak. Pemilik berstatus Pengusaha Kena Pajak wajib memungut PPN dan menerbitkan Faktur Pajak. Sumber industri per Januari 2026 mencatat tarif PPN yang diterapkan atas sewa bangunan sebesar 11%.

**Rumus 13.6 — PPN atas Sewa**

$$\text{PPN} = t_{\text{PPN}} \times \left( B_u + S_u \right)$$

**Intinya:** ini pajak yang ditambahkan ke tagihan penyewa (bukan dipotong dari pemilik) — pemilik cuma jadi "perantara" yang menyetorkannya ke negara. Di berkas Excel, $t_{\text{PPN}}$ adalah **sel parameter yang bisa diubah**, bukan angka mati di dalam rumus, karena tarif pajak bisa berubah dari waktu ke waktu.

**Rumus 13.7 — Arus Kas Bersih Pemilik per Unit per Bulan**

$$CF_u = \left( B_u + S_u \right) \times (1 - 0{,}10) - \frac{OpEx_{\text{unit}}}{12}$$

**Intinya:** ini uang yang benar-benar masuk kantong pemilik per unit per bulan — total tagihan, dikurangi PPh Final 10%, dikurangi biaya operasional. PPN tidak masuk rumus ini karena sifatnya cuma titipan: dipungut dari penyewa lalu disetor ke negara, bukan pendapatan pemilik.

**Contoh perhitungan lengkap.** Unit di lantai 24, luas 320 m², tarif final Rp 202.000/m²/bulan, service charge Rp 62.000/m²/bulan:

| Komponen | Perhitungan | Nilai |
|---|---|---|
| Tagihan sewa | 320 × 202.000 | Rp 64.640.000 |
| Tagihan service charge | 320 × 62.000 | Rp 19.840.000 |
| **Tagihan kotor** | | **Rp 84.480.000** |
| PPN 11% | 11% × 84.480.000 | Rp 9.292.800 |
| **Total ditagih ke penyewa** | | **Rp 93.772.800** |
| PPh Final 10% | 10% × 84.480.000 | Rp 8.448.000 |
| **Diterima pemilik sebelum OpEx** | 84.480.000 − 8.448.000 | **Rp 76.032.000** |

> Sumber:
> - Peraturan Pemerintah Nomor 34 Tahun 2017 tentang Pajak Penghasilan atas Penghasilan dari Persewaan Tanah dan/atau Bangunan — https://peraturan.bpk.go.id/Download/54909/PP%20Nomor%2034%20Tahun%202017.pdf dan https://jdih.kemenkeu.go.id/dok/pp-34-tahun-2017/view
> - Penjelasan tarif dan dasar pengenaan pajak, DDTCNews — https://news.ddtc.co.id/literasi/kelas-pajak/39122/pajak-atas-persewaan-tanah-danatau-bangunan
> - Penjelasan cakupan jumlah bruto termasuk service charge, Ortax — https://ortax.org/pajak-penghasilan-atas-persewaan-tanah-dan-atau-bangunan

---

## 14. Sewa Efektif Bersih (NER) dan Biaya Insentif

### 14.1 Mengapa Harga Kontrak Sering Menipu

Dua kontrak berikut kelihatan beda, padahal nilainya hampir sama:

- **Kontrak X**: Rp 200.000/m²/bulan, masa sewa 36 bulan, tanpa insentif.
- **Kontrak Y**: Rp 230.000/m²/bulan, masa sewa 36 bulan, dengan 5 bulan bebas sewa.

Kontrak Y kelihatan 15% lebih mahal. Tapi setelah dihitung bulan gratisnya, keduanya nyaris setara. Pengelola yang cuma membandingkan tarif nominal akan salah ambil keputusan.

**Sewa Efektif Bersih (Net Effective Rent / NER)** adalah alat untuk membandingkan kontrak secara adil — angka "sebenarnya" setelah semua diskon dan biaya diperhitungkan.

### 14.2 Rumus Sederhana

**Rumus 14.1 — NER Tanpa Diskonto**

$$NER = \frac{R \times (T - T_{\text{gratis}}) - \dfrac{C_{\text{TI}} + C_{\text{komisi}}}{A}}{T}$$

Keterangan:
- $R$ = Tarif nominal per m² per bulan
- $T$ = Masa sewa dalam bulan
- $T_{\text{gratis}}$ = Jumlah bulan bebas sewa
- $C_{\text{TI}}$ = Total biaya perbaikan ruang yang ditanggung pemilik (*tenant improvement*)
- $C_{\text{komisi}}$ = Komisi agen
- $A$ = Luas unit (m²)

**Intinya:** hitung total uang yang benar-benar diterima pemilik selama masa sewa (sewa dikali bulan yang benar-benar dibayar, dikurangi biaya interior dan komisi agen), lalu bagi rata ke seluruh masa sewa termasuk bulan gratisnya. Hasilnya: tarif "efektif" per bulan yang bisa dibandingkan apel-ke-apel antar kontrak.

**Contoh Kontrak Y.** $R = 230.000$, $T = 36$, $T_{\text{gratis}} = 5$, luas 400 m², biaya TI Rp 180.000.000, komisi Rp 55.200.000:

$$NER = \frac{230.000 \times (36 - 5) - \dfrac{180.000.000 + 55.200.000}{400}}{36}$$

$$NER = \frac{7.130.000 - 588.000}{36} = \frac{6.542.000}{36} \approx \text{Rp } 181.722\text{/m}^2\text{/bulan}$$

**Contoh Kontrak X.** $R = 200.000$, $T = 36$, tanpa insentif dan tanpa biaya tambahan:

$$NER = \frac{200.000 \times 36}{36} = \text{Rp } 200.000\text{/m}^2\text{/bulan}$$

**Kesimpulan yang terbalik dari dugaan awal.** Kontrak X, yang tarif nominalnya lebih rendah, ternyata memberi pendapatan efektif **10% lebih tinggi**. Tanpa hitungan NER, pengelola bisa salah pilih kontrak.

### 14.3 Rumus dengan Diskonto

Untuk masa sewa yang panjang, nilai waktu uang harus ikut diperhitungkan (uang Rp 1 juta hari ini lebih berharga daripada Rp 1 juta lima tahun lagi).

**Rumus 14.2 — NER Terdiskonto**

$$NER_{PV} = \frac{\displaystyle\sum_{t=1}^{T} \frac{R_t \times A \times \mathbb{1}_{\text{bayar}}(t)}{(1+d)^t} - C_{\text{awal}}}{A \times \displaystyle\sum_{t=1}^{T} \frac{1}{(1+d)^t}}$$

Keterangan:
- $d$ = Tingkat diskonto bulanan
- $\mathbb{1}_{\text{bayar}}(t)$ = Bernilai 0 pada bulan bebas sewa, 1 pada bulan lainnya
- $C_{\text{awal}}$ = Seluruh biaya yang dikeluarkan pemilik di awal

**Intinya:** sama seperti Rumus 14.1, tapi tiap bulan pembayaran itu "didiskon" ke nilai sekarang dulu sebelum dijumlah — supaya kontrak yang bayarnya belakangan tidak dihitung senilai kontrak yang bayarnya di depan.

**Rumus 14.3 — Tingkat Diskonto Bulanan dari Tingkat Tahunan**

$$d = (1 + d_{\text{tahunan}})^{1/12} - 1$$

**Contoh.** Tingkat diskonto tahunan 11%:

$$d = (1{,}11)^{1/12} - 1 = 0{,}008735 = 0{,}8735\% \text{ per bulan}$$

### 14.4 Batas Insentif yang Aman

**Rumus 14.4 — Batas Maksimum Bulan Gratis**

Supaya NER tidak jatuh di bawah tarif minimum yang bisa diterima:

$$T_{\text{gratis}}^{\max} = T \times \left( 1 - \frac{R_{\min}}{R} \right) - \frac{C_{\text{awal}}}{R \times A}$$

**Intinya:** ini batas atas berapa bulan gratis yang boleh diberikan ke calon penyewa sebelum tarif efektifnya jatuh di bawah harga minimum yang masih bisa diterima pemilik.

**Contoh.** $R = 230.000$, $R_{\min} = 180.000$, $T = 36$, $C_{\text{awal}}/A = 588.000$:

$$T_{\text{gratis}}^{\max} = 36 \times \left( 1 - \frac{180.000}{230.000} \right) - \frac{588.000}{230.000} = 36 \times 0{,}21739 - 2{,}5565$$

$$T_{\text{gratis}}^{\max} = 7{,}826 - 2{,}557 = 5{,}27 \text{ bulan}$$

Artinya, dengan tarif nominal Rp 230.000 dan seluruh biaya awal yang ada, pemilik cuma boleh kasih **maksimal 5 bulan** bebas sewa. Kasih bulan keenam akan menjatuhkan NER di bawah batas minimum.

Rumus ini sangat berguna sebagai **pagar buat tim pemasaran** saat negosiasi — supaya mereka tahu batas maksimal diskon yang boleh ditawarkan tanpa perlu tanya ke atasan tiap kali. Di berkas Excel, batas ini dihitung otomatis untuk tiap unit di lembar `07_NER_INSENTIF`.

---

## 15. Eskalasi Tahunan dan Nilai Kini

### 15.1 Eskalasi Sewa

**Rumus 15.1 — Tarif pada Tahun ke-$n$**

$$R_n = R_0 \times (1 + g)^{n-1}$$

Keterangan:
- $R_0$ = Tarif pada tahun pertama
- $g$ = Tingkat eskalasi tahunan
- $n$ = Nomor tahun (tahun pertama adalah $n = 1$)

**Intinya:** tarif naik sekian persen tiap tahun (eskalasi), biasanya sudah disepakati di kontrak sejak awal supaya kedua pihak tahu kepastiannya.

**Contoh** dengan $R_0 = 184.000$ dan $g = 3\%$:

| Tahun | Perhitungan | Tarif (Rp/m²/bln) |
|---|---|---|
| 1 | $184.000 \times 1{,}03^0$ | 184.000 |
| 2 | $184.000 \times 1{,}03^1$ | 189.520 |
| 3 | $184.000 \times 1{,}03^2$ | 195.206 |
| 4 | $184.000 \times 1{,}03^3$ | 201.062 |
| 5 | $184.000 \times 1{,}03^4$ | 207.094 |

**Menentukan besaran eskalasi yang wajar.** Tiga acuan yang lazim dipakai:

1. **Inflasi umum** — ikut Indeks Harga Konsumen. Aman, tapi mengabaikan kondisi pasar sewa yang sebenarnya.
2. **Proyeksi pertumbuhan sewa pasar** — misalnya laporan pasar Jakarta memperkirakan pertumbuhan sewa CBD sekitar 2%–3% per tahun, dengan proyeksi tarif CBD sekitar Rp 245.000/m²/bulan pada 2029.
3. **Tingkat tetap yang dinegosiasikan** — 3% sampai 5% per tahun, lazim di kontrak jangka panjang.

Untuk service charge, laporan pasar memperkirakan kenaikan sekitar 3% per tahun. Karena service charge itu cerminan biaya nyata, eskalasinya sebaiknya dikaitkan dengan komponen biaya paling dominan — biasanya tarif listrik dan upah minimum.

### 15.2 Nilai Kini Arus Sewa

**Rumus 15.2 — Nilai Kini Kontrak Sewa**

$$PV = \sum_{n=1}^{N} \frac{R_0 \times (1+g)^{n-1} \times A \times 12}{(1 + d_{\text{tahunan}})^{n}}$$

**Intinya:** ini menjawab "kalau saya tanda tangan kontrak sewa 5 tahun sekarang, berapa nilai kontrak itu kalau diukur dalam uang hari ini?" — dengan memperhitungkan bahwa uang yang diterima nanti nilainya lebih kecil dari uang yang diterima sekarang.

**Rumus 15.3 — Bentuk Ringkas (bila $g \neq d$)**

Untuk arus kas yang tumbuh dengan tingkat tetap, ada jalan pintas rumusnya:

$$PV = R_0 \times A \times 12 \times \frac{1 - \left( \dfrac{1+g}{1+d} \right)^{N}}{d - g}$$

**Contoh.** $R_0 = 184.000$, $A = 400$ m², $g = 3\%$, $d = 11\%$, $N = 5$ tahun:

Pendapatan tahun pertama: $184.000 \times 400 \times 12 = \text{Rp } 883.200.000$

$$PV = 883.200.000 \times \frac{1 - \left( \dfrac{1{,}03}{1{,}11} \right)^{5}}{0{,}11 - 0{,}03}$$

$$\left( \frac{1{,}03}{1{,}11} \right)^{5} = (0{,}927928)^{5} = 0{,}68791$$

$$PV = 883.200.000 \times \frac{0{,}31209}{0{,}08} = 883.200.000 \times 3{,}9011 \approx \text{Rp } 3.445.451.000$$

Nilai kini kontrak lima tahun tersebut sekitar **Rp 3,45 miliar**, dibandingkan total nominal sekitar Rp 4,69 miliar.

---

## 16. Analisis Sensitivitas dan Optimasi Okupansi

### 16.1 Dua Tuas yang Saling Berlawanan

Pengelola gedung punya dua tuas utama: **tarif** dan **okupansi**. Keduanya bergerak berlawanan. Naikkan tarif, okupansi cenderung turun; turunkan tarif, okupansi cenderung naik.

**Rumus 16.1 — Pendapatan Sewa Tahunan**

$$\text{Pendapatan} = R \times NLA \times o \times 12$$

di mana $o$ adalah tingkat okupansi.

**Rumus 16.2 — Pendapatan per Meter Persegi Tersedia (RevPAM)**

$$RevPAM = R \times o$$

**Intinya:** RevPAM adalah tarif dikalikan okupansi — jadi satu angka yang menunjukkan "pendapatan rata-rata per m² yang tersedia", bukan cuma per m² yang terisi. Ini ukuran kinerja yang lebih adil daripada tarif atau okupansi sendiri-sendiri, karena menggabungkan keduanya. Contoh: gedung dengan tarif Rp 200.000 tapi okupansi cuma 70% (RevPAM = Rp 140.000) sebenarnya berkinerja lebih buruk daripada gedung dengan tarif Rp 175.000 dan okupansi 85% (RevPAM = Rp 148.750) — meski tarifnya kelihatan lebih murah.

### 16.2 Elastisitas Harga

**Rumus 16.3 — Elastisitas Okupansi terhadap Harga**

$$\varepsilon = \frac{\Delta o / o}{\Delta R / R}$$

**Intinya:** elastisitas mengukur seberapa "sensitif" okupansi terhadap perubahan tarif. Nilai $\varepsilon$ hampir selalu negatif — naik tarif, turun okupansi. Nilai $-0{,}6$ berarti kenaikan tarif 10% menurunkan okupansi sekitar 6%.

**Rumus 16.4 — Perkiraan Okupansi pada Tarif Baru**

$$o_{\text{baru}} = o_{\text{lama}} \times \left( \frac{R_{\text{baru}}}{R_{\text{lama}}} \right)^{\varepsilon}$$

**Contoh.** $o_{\text{lama}} = 78\%$, $R_{\text{lama}} = 184.000$, $R_{\text{baru}} = 200.000$, $\varepsilon = -0{,}6$:

$$o_{\text{baru}} = 0{,}78 \times \left( \frac{200.000}{184.000} \right)^{-0{,}6} = 0{,}78 \times (1{,}08696)^{-0{,}6}$$

$$= 0{,}78 \times 0{,}95160 = 0{,}7422 = 74{,}22\%$$

RevPAM lama: $184.000 \times 0{,}78 = \text{Rp } 143.520$
RevPAM baru: $200.000 \times 0{,}7422 = \text{Rp } 148.440$

Kenaikan tarif ini **menguntungkan**, karena RevPAM-nya naik meskipun okupansinya turun.

**Rumus 16.5 — Ambang Elastisitas Impas**

Kenaikan tarif menguntungkan selama:

$$|\varepsilon| < 1$$

**Intinya:** kalau okupansi tidak terlalu sensitif terhadap kenaikan tarif ($|\varepsilon| < 1$), naikkan saja tarifnya — pendapatan totalnya tetap naik. Tapi kalau elastisitasnya lebih besar dari 1 (permintaan sangat sensitif), menaikkan tarif justru menurunkan pendapatan total karena okupansinya anjlok terlalu jauh.

**Cara memperkirakan $\varepsilon$ tanpa data statistik yang rumit:** lihat saja riwayat gedung sendiri. Kalau dua tahun lalu tarif dinaikkan 8% dan okupansi turun dari 80% jadi 76% (turun 5%), maka $\varepsilon \approx -5\% / 8\% = -0{,}625$.

### 16.3 Tabel Sensitivitas Dua Arah

Berkas Excel menyediakan tabel sensitivitas pada lembar `08_SENSITIVITAS` yang menampilkan pendapatan tahunan untuk setiap kombinasi tarif dan okupansi. Bentuknya:

| Tarif ↓ / Okupansi → | 65% | 70% | 75% | 80% | 85% |
|---|---|---|---|---|---|
| Rp 165.000 | ... | ... | ... | ... | ... |
| Rp 175.000 | ... | ... | ... | ... | ... |
| Rp 184.000 | ... | ... | ... | ... | ... |
| Rp 195.000 | ... | ... | ... | ... | ... |
| Rp 205.000 | ... | ... | ... | ... | ... |

Sel-sel yang menghasilkan pendapatan di bawah titik impas ditandai dengan warna merah secara otomatis. Ini membuat zona bahaya terlihat sekilas pandang.

### 16.4 Uji Skenario

Selain tabel dua arah, model menyediakan tiga skenario baku:

| Skenario | Tarif | Okupansi | Eskalasi | Digunakan untuk |
|---|---|---|---|---|
| Konservatif | −8% dari dasar | −7 poin persentase | 2,0% | Uji ketahanan; dasar perhitungan kovenan utang. |
| Dasar | Tarif model | Target | 3,0% | Anggaran resmi. |
| Optimistis | +6% dari dasar | +5 poin persentase | 4,0% | Perencanaan kapasitas dan investasi. |

---
---

# BAGIAN V — TATA KELOLA

## 17. Uji Kualitas Model

Model yang tidak diuji adalah model yang tidak bisa dipercaya. Berkas Excel menjalankan sembilan pemeriksaan otomatis di lembar `09_RINGKASAN`. Tiap pemeriksaan menghasilkan status **LULUS** atau **PERIKSA**.

### 17.1 Daftar Pemeriksaan Wajib

| No | Nama pemeriksaan | Rumus atau kriteria | Ambang |
|---|---|---|---|
| 1 | Kalibrasi rata-rata | $\left| \frac{\sum A_u R_u}{\sum A_u} - R^{*} \right| / R^{*}$ | ≤ 0,5% |
| 2 | Sebaran faktor total | $\min$ dan $\max$ dari $\prod F_{k,u}$ | 0,80 – 1,35 |
| 3 | Tarif di atas titik impas | $R^{*} \ge R_{\text{impas}} \times \phi$ | Wajib terpenuhi |
| 4 | Tarif dalam koridor pasar | $R_{\min} \le R^{*} \le R_{\max}$ | Wajib terpenuhi |
| 5 | Kualitas data pembanding | Koefisien variasi tarif disesuaikan | ≤ 15% |
| 6 | Penyesuaian pembanding wajar | $\max |A_i|$ | ≤ 25% |
| 7 | Selisih pembulatan | Pergeseran rata-rata akibat pembulatan | ≤ 0,5% |
| 8 | Monotonisitas vertikal | Tarif rata-rata per zona naik dari bawah ke atas | Wajib terpenuhi |
| 9 | Kelengkapan data unit | Jumlah sel kosong pada kolom wajib | 0 |

### 17.2 Rumus Ukuran Statistik yang Dipakai

**Rumus 17.1 — Koefisien Variasi**

$$CV = \frac{s}{\bar{x}}$$

Keterangan: $s$ adalah simpangan baku, $\bar{x}$ adalah rata-rata. **Intinya:** koefisien variasi mengukur seberapa lebar sebaran data dibanding rata-ratanya. Nilai 0,15 berarti sebarannya 15% dari rata-rata — makin kecil, makin seragam datanya.

**Rumus 17.2 — Galat Persentase Absolut Rata-Rata (MAPE)**

Dipakai kalau model diuji lawan tarif transaksi yang benar-benar terjadi:

$$MAPE = \frac{1}{n} \sum_{i=1}^{n} \left| \frac{R_i^{\text{aktual}} - R_i^{\text{model}}}{R_i^{\text{aktual}}} \right| \times 100\%$$

**Intinya:** MAPE mengukur rata-rata seberapa jauh tebakan model meleset dari harga yang benar-benar terjadi, tanpa peduli tebakannya kemahalan atau kemurahan. Cara membaca hasilnya:

| MAPE | Penilaian |
|---|---|
| Di bawah 5% | Sangat baik; model siap dipakai untuk penetapan harga. |
| 5% – 10% | Baik; layak dipakai dengan tinjauan berkala. |
| 10% – 15% | Cukup; gunakan sebagai acuan awal, keputusan akhir tetap manual. |
| Di atas 15% | Belum layak; faktor perlu dikalibrasi ulang. |

**Rumus 17.3 — Bias Rata-Rata**

Beda dari MAPE yang mengukur besar kesalahan, bias mengukur arahnya:

$$\text{Bias} = \frac{1}{n} \sum_{i=1}^{n} \frac{R_i^{\text{model}} - R_i^{\text{aktual}}}{R_i^{\text{aktual}}} \times 100\%$$

**Intinya:** bias menunjukkan apakah model cenderung menebak kemahalan, kemurahan, atau sudah pas. Bias positif berarti model cenderung menetapkan harga terlalu tinggi secara sistematis. Yang diinginkan: bias mendekati nol, meskipun MAPE-nya belum tentu kecil.

### 17.3 Tinjauan oleh Manusia yang Tidak Bisa Digantikan

Beberapa hal tidak akan tertangkap oleh pemeriksaan otomatis mana pun:

1. **Apakah data pembanding benar-benar sebanding?** Angkanya bisa kelihatan rapi tapi berasal dari gedung yang segmennya jauh berbeda.
2. **Apakah ada perubahan besar di kawasan?** Pembangunan stasiun baru, jalan tol, atau gedung pesaing besar bisa membalikkan seluruh asumsi.
3. **Apakah penyewa besar akan pindah?** Kehilangan satu penyewa yang menempati lima lantai mengubah strategi harga sepenuhnya.
4. **Apakah ada kewajiban kontrak yang membatasi kenaikan harga?** Sebagian kontrak punya batas kenaikan atau hak perpanjangan di tarif tertentu.

Model cuma memberi angka. Keputusan tetap di tangan manusia.

---

## 18. Struktur Berkas Excel dan Aturan Warna

### 18.1 Daftar Lembar Kerja

| Lembar | Nama | Isi |
|---|---|---|
| 1 | `00_BACA_SAYA` | Petunjuk pemakaian, legenda warna, urutan pengisian. |
| 2 | `01_ASUMSI` | Seluruh parameter model. **Hanya lembar ini yang diubah rutin.** |
| 3 | `02_MASTER_UNIT` | Daftar seluruh unit beserta atributnya. |
| 4 | `03_FAKTOR` | Tabel acuan seluruh faktor pengali. |
| 5 | `04_KALKULASI` | Mesin perhitungan tarif per unit. Jangan diubah. |
| 6 | `05_PEMBANDING` | Grid penyesuaian data pembanding pasar. |
| 7 | `06_UJI_KELAYAKAN` | Pendekatan pendapatan, titik impas, pagar pengaman. |
| 8 | `07_NER_INSENTIF` | Perhitungan sewa efektif bersih dan batas insentif. |
| 9 | `08_SENSITIVITAS` | Tabel sensitivitas dua arah dan skenario. |
| 10 | `09_RINGKASAN` | Papan pantau dan sembilan pemeriksaan kualitas. |
| 11 | `10_KAMUS_DATA` | Definisi setiap kolom dan satuannya. |
| 12 | `11_SUMBER` | Seluruh rujukan dan tautan sumber. |

### 18.2 Aturan Warna

Aturan ini ikut konvensi baku pemodelan keuangan dan harus dipatuhi ketat:

| Warna | Arti | Boleh diubah? |
|---|---|---|
| **Teks biru** | Angka yang dimasukkan langsung oleh pengguna. | Ya |
| **Latar kuning** | Asumsi kunci yang wajib diperiksa setiap tinjauan. | Ya |
| **Teks hitam** | Hasil rumus di lembar yang sama. | **Tidak** |
| **Teks hijau** | Rumus yang mengambil nilai dari lembar lain. | **Tidak** |

Aturan paling penting: **kalau sebuah sel warnanya hitam atau hijau, jangan ditimpa ketikan manual.** Mengganti rumus dengan angka tetap adalah cara tercepat merusak model — dan kerusakannya baru kelihatan berbulan-bulan kemudian.

### 18.3 Prinsip Perancangan yang Dipakai

1. **Tiap asumsi punya selnya sendiri, dengan label.** Tidak ada angka yang ditanam langsung di dalam rumus. Rumus ditulis `=B5*(1+$B$6)`, bukan `=B5*1,03`.
2. **Rumus seragam sepanjang baris.** Satu sel yang diedit sendiri di tengah baris adalah sumber kesalahan diam-diam yang paling sering terjadi.
3. **Penyebut yang berisiko bernilai nol selalu dilindungi** dengan `IFERROR`.
4. **Tiap angka tetap dicatat sumbernya** di sel sebelahnya atau di lembar `11_SUMBER`.
5. **Satu baris contoh berisi nilai realistis** disediakan sebagai panduan format pengisian.

---

## 19. Prosedur Kerja: 10 Langkah dari Data Mentah ke Rate Card

Bagian ini adalah ringkasan operasional. Ikuti berurutan.

### Langkah 1 — Tetapkan dan Kunci Basis Pengukuran

Pastikan seluruh luas unit sudah diukur dengan satu standar yang sama. Catat standar dan edisinya di lembar `01_ASUMSI`. Kalau pengukuran belum pernah dilakukan secara formal, lakukan dulu — semua langkah berikutnya bergantung pada angka ini.

**Keluaran:** Daftar unit dengan NLA yang telah diverifikasi.

### Langkah 2 — Kumpulkan Data Pasar

Kumpulkan minimal 4, idealnya 6–8 gedung pembanding. Untuk setiap gedung catat: tarif sewa dasar, service charge, grade, usia, jarak ke transportasi umum, tingkat okupansi, dan sumber datanya.

**Keluaran:** Lembar `05_PEMBANDING` terisi.

**Sumber data yang dapat dipakai:**
- Laporan kuartalan konsultan properti (Colliers, Cushman & Wakefield, JLL, CBRE, Knight Frank)
- Laporan *Perkembangan Properti Komersial* Bank Indonesia
- Data transaksi internal perusahaan sendiri
- Survei langsung ke gedung pesaing

### Langkah 3 — Susun Grid Penyesuaian

Tentukan atribut apa saja yang akan disesuaikan dan berapa besarnya. Terapkan Rumus 5.1 sampai 5.3. Periksa bahwa tidak ada pembanding dengan total penyesuaian mutlak di atas 25%.

**Keluaran:** $R_{\text{pasar}}$, tarif dasar indikasi pasar.

### Langkah 4 — Hitung Tarif yang Dibutuhkan dan Titik Impas

Isi data keuangan gedung di lembar `06_UJI_KELAYAKAN`: nilai aset, target imbal hasil, biaya operasional, cicilan utang, cadangan belanja modal, dan pendapatan lain. Terapkan Rumus 6.5 dan 6.6.

**Keluaran:** $R_{\text{butuh}}$ dan $R_{\text{impas}}$.

### Langkah 5 — Tetapkan Tarif Dasar Gedung

Bandingkan ketiga angka. Terapkan Rumus 7.1 sampai 7.3 untuk memperoleh $R^{*}$. Bila ketiganya berjauhan, **hentikan proses dan selidiki penyebabnya** sebelum melanjutkan.

**Keluaran:** $R^{*}$, satu angka jangkar untuk seluruh gedung.

### Langkah 6 — Lengkapi Atribut Setiap Unit

Isi lembar `02_MASTER_UNIT`. Setiap unit membutuhkan: nomor lantai, luas, kategori pemandangan, atribut posisi, kondisi fit-out, dan karakteristik denah. Jangan mengosongkan satu pun kolom wajib.

**Keluaran:** Basis data unit yang lengkap.

### Langkah 7 — Kalibrasi Faktor Lantai

Bila tersedia minimal 30 kontrak yang tersebar di 8 lantai atau lebih, lakukan regresi sesuai Bab 12 dan masukkan hasilnya. Bila tidak, gunakan tabel zona konservatif dan tandai model sebagai belum terkalibrasi.

**Keluaran:** Nilai $\theta$ atau tabel $\pi_z$ dan $\beta_z$ yang terisi.

### Langkah 8 — Jalankan Perhitungan dan Kalibrasi

Lembar `04_KALKULASI` akan menghitung otomatis. Periksa faktor kalibrasi $k$. Bila $k$ berada di luar rentang 0,90–1,10, artinya komposisi unit sangat berat sebelah — periksa kembali apakah ada faktor yang terlalu agresif.

**Keluaran:** Tarif final per unit.

### Langkah 9 — Jalankan Sembilan Pemeriksaan Kualitas

Buka lembar `09_RINGKASAN`. Setiap pemeriksaan yang berstatus **PERIKSA** harus diselesaikan sebelum daftar harga diterbitkan. Tidak ada pengecualian.

**Keluaran:** Seluruh pemeriksaan berstatus LULUS.

### Langkah 10 — Terbitkan Daftar Harga dan Simpan Versinya

Bulatkan tarif sesuai Rumus 11.3. Terbitkan daftar harga yang memuat tarif dasar, service charge, dan tarif kotor secara terpisah. **Simpan salinan berkas dengan nama yang memuat tanggal**, misalnya `Model_Harga_2026-Q3_v1.xlsx`, dan jangan pernah menimpa versi sebelumnya.

**Keluaran:** Daftar harga resmi dan arsip versi.

---

## 20. Rancangan Jangka Panjang: Agar Model Ini Tetap Murah dan Hidup

Bagian ini inti dari keberlanjutan proyek. Sebagian besar model penetapan harga mati dalam dua tahun bukan karena rumusnya salah, tapi karena **biaya perawatannya lebih besar dari manfaatnya**. Rancangan berikut disusun supaya hal itu tidak terjadi.

### 20.1 Sepuluh Keputusan Rancangan dan Alasannya

**Keputusan 1 — Parameter dipisah dari data, dan keduanya dipisah dari rumus.**
Semua asumsi ada di `01_ASUMSI` dan `config/parameters.yaml`. Data unit ada di `02_MASTER_UNIT`. Rumus ada di `04_KALKULASI`. Konsekuensinya: memperbarui harga kuartalan cukup menyentuh satu lembar saja, tidak perlu bongkar seluruh berkas. Waktu pembaruan turun dari beberapa hari jadi beberapa jam.

**Keputusan 2 — Model multiplikatif, bukan aditif.**
Kalau tarif dasar berubah, seluruh tarif unit ikut menyesuaikan secara proporsional tanpa perlu ketik ulang. Tanpa ini, tiap kali tarif dasar disesuaikan, semua unit harus dihitung ulang satu-satu secara manual.

**Keputusan 3 — Kalibrasi otomatis ke tarif pasar.**
Rumus 11.1 memastikan model tidak pernah melenceng dari jangkar pasar, seberapapun komposisi unit berubah. Saat unit baru ditambah atau digabung, model tetap konsisten tanpa perlu disetel ulang manual.

**Keputusan 4 — Format terbuka, tidak terikat lisensi.**
Handbook dalam Markdown, data dalam Excel dan CSV, konfigurasi dalam YAML, keluaran dalam PDF. Tidak ada satu pun format yang mengunci pengguna ke satu vendor. Berkas ini bisa dibuka sepuluh tahun lagi tanpa perangkat lunak khusus.

**Keputusan 5 — Skrip pembangun ulang disertakan.**
Berkas Excel bisa dibangun ulang dari nol lewat `scripts/build_workbook.py`. Kalau berkasnya rusak, tertimpa, atau terlanjur diacak-acak pengguna, pemulihannya cuma butuh satu menit, bukan satu minggu.

**Keputusan 6 — Satu sumber kebenaran untuk tiap angka.**
Tiap parameter cuma ditulis di satu tempat, lalu dirujuk dari tempat lain. Tidak ada angka yang disalin-tempel. Ini menghilangkan kesalahan paling merepotkan: dua tempat yang seharusnya sama tapi ternyata beda.

**Keputusan 7 — Pemeriksaan kualitas tertanam di dalam berkas.**
Sembilan pemeriksaan jalan otomatis tiap kali berkas dibuka. Kesalahan tertangkap saat terjadi, bukan saat penyewa sudah komplain.

**Keputusan 8 — Struktur siap untuk banyak gedung.**
Kolom `Kode_Gedung` sudah ada di `02_MASTER_UNIT` sejak awal, meski sekarang cuma berisi satu nilai. Menambah gedung kedua tidak perlu rancang ulang, cukup tambah baris dan satu blok asumsi.

**Keputusan 9 — Riwayat versi disimpan, bukan ditimpa.**
Tiap kali diterbitkan, disimpan sebagai berkas baru bertanggal. Saat muncul pertanyaan "kenapa tarif lantai 18 di Kuartal II beda?", jawabannya bisa dicari dalam hitungan menit.

**Keputusan 10 — Handbook dan model dalam satu repositori.**
Dokumentasi yang terpisah dari alatnya lama-lama jadi usang. Dengan keduanya di folder dan versi yang sama, keduanya berubah bersama-sama.

### 20.2 Peta Jalan Bertahap

| Tahap | Fokus | Perkiraan waktu | Prasyarat |
|---|---|---|---|
| **Tahap 0** | Pakai data dummy untuk memahami alur model. | 1–2 hari | Tidak ada. |
| **Tahap 1** | Ganti data dummy dengan data gedung sendiri, gunakan tabel zona konservatif. | 1–2 minggu | Daftar unit dan luas terverifikasi. |
| **Tahap 2** | Kumpulkan data pembanding pasar secara sistematis dan tetapkan tarif dasar. | 2–4 minggu | Akses ke laporan pasar atau survei. |
| **Tahap 3** | Kalibrasi faktor lantai dengan regresi dari data kontrak sendiri. | 1–2 bulan | Minimal 30 kontrak di 8 lantai. |
| **Tahap 4** | Otomatisasi pembaruan kuartalan dan pelacakan kinerja aktual. | 3–6 bulan | Model Tahap 3 stabil. |
| **Tahap 5** | Perluas ke beberapa gedung dan bandingkan kinerja antar aset. | 6–12 bulan | Aset kedua tersedia. |

Tiap tahap sudah berguna dengan sendirinya. Proyek yang berhenti di Tahap 2 tetap memberi manfaat — ini memang disengaja, supaya manfaatnya tidak bergantung pada selesainya semua tahapan.

### 20.3 Jadwal Tinjauan

| Kegiatan | Frekuensi | Penanggung jawab | Perkiraan waktu |
|---|---|---|---|
| Perbarui tarif pembanding pasar | Setiap kuartal | Analis | 2–4 jam |
| Perbarui data okupansi dan kontrak baru | Setiap bulan | Pengelola gedung | 1 jam |
| Tinjau faktor pengali | Setiap tahun | Analis + Manajer Aset | 1–2 hari |
| Kalibrasi ulang dengan regresi | Setiap tahun | Analis | 1–3 hari |
| Tinjau biaya operasional dan service charge | Setiap tahun | Keuangan | 1 hari |
| Verifikasi ulang pengukuran luas | Setiap 5 tahun, atau setelah renovasi besar | Konsultan pengukuran | Sesuai lingkup |

### 20.4 Tanda-Tanda Model Perlu Diperbaiki

Hentikan pemakaian dan lakukan peninjauan menyeluruh kalau salah satu hal ini terjadi:

1. MAPE terhadap transaksi nyata lebih dari 15% selama dua kuartal berturut-turut.
2. Faktor kalibrasi $k$ keluar dari rentang 0,85–1,15.
3. Lebih dari 30% kontrak baru disepakati di luar koridor harga model.
4. Tim pemasaran rutin mengabaikan daftar harga.
5. Ada perubahan besar di kawasan: gedung pesaing besar, infrastruktur transportasi baru, atau perubahan zonasi.

Poin keempat paling sering diabaikan, padahal paling menentukan. **Model yang tidak dipakai adalah model yang gagal**, sebagus apa pun rumusnya. Kalau tim lapangan terus-menerus menyimpang darinya, penyebabnya hampir selalu ada di modelnya, bukan di timnya.

---

## 21. Penerapan di Claude Code

### 21.1 Struktur Direktori

```
harga-sewa-menara/
├── CLAUDE.md                          Instruksi untuk Claude Code
├── README.md                          Ringkasan proyek dan cara mulai
├── CHANGELOG.md                       Riwayat perubahan
├── config/
│   └── parameters.yaml                Seluruh parameter model
├── data/
│   ├── dummy/
│   │   └── Model_Harga_Sewa_Menara_DUMMY.xlsx
│   └── template/                      Tempat data nyata diletakkan
├── docs/
│   ├── HANDBOOK-HARGA-SEWA-MENARA.md
│   └── HANDBOOK-HARGA-SEWA-MENARA.pdf
├── scripts/
│   ├── build_workbook.py              Membangun ulang berkas Excel
│   ├── build_pdf.py                   Mengubah handbook menjadi PDF
│   └── validate_data.py               Memeriksa mutu data
└── assets/
    └── style/handbook.css             Gaya tampilan PDF
```

### 21.2 Perintah Dasar

```bash
# Membangun ulang berkas Excel dari parameters.yaml
python3 scripts/build_workbook.py

# Memeriksa mutu data sebelum perhitungan
python3 scripts/validate_data.py data/template/master_unit.csv

# Menghasilkan PDF dari handbook
python3 scripts/build_pdf.py
```

### 21.3 Contoh Instruksi kepada Claude Code

Berikut contoh perintah yang efektif, disusun dari yang sederhana ke yang kompleks:

```
Baca config/parameters.yaml, ubah tarif dasar gedung menjadi 195000,
lalu bangun ulang berkas Excel dan laporkan perubahan faktor kalibrasi.
```

```
Impor data unit nyata dari data/template/master_unit.csv,
jalankan validate_data.py, perbaiki baris yang datanya tidak lengkap,
lalu perbarui lembar 02_MASTER_UNIT.
```

```
Saya punya 47 kontrak sewa di data/template/kontrak.csv dengan kolom
tarif, lantai, luas, dan kondisi_fitout. Lakukan regresi semi-logaritmik
sesuai Bab 12 handbook, laporkan koefisien beserta nilai-p dan R-kuadrat,
lalu perbarui nilai theta di parameters.yaml bila syarat minimum terpenuhi.
```

```
Bandingkan tarif model dengan tarif transaksi nyata di data/template/aktual.csv.
Hitung MAPE dan bias sesuai Rumus 17.2 dan 17.3, tampilkan sepuluh unit
dengan selisih terbesar, dan sarankan faktor mana yang perlu disetel ulang.
```

```
Tambahkan gedung kedua dengan kode MNS-02 ke dalam model.
Salin struktur asumsi yang ada, jangan ubah gedung pertama,
dan tambahkan perbandingan RevPAM antar gedung di lembar ringkasan.
```

### 21.4 Aturan yang Perlu Ditegaskan kepada Claude Code

Muat aturan berikut ke dalam `CLAUDE.md` agar setiap sesi mematuhinya:

1. Jangan pernah mengganti rumus di lembar `04_KALKULASI` dengan angka tetap.
2. Setiap perubahan parameter harus dicatat di `CHANGELOG.md` beserta alasannya.
3. Setelah setiap pembangunan ulang berkas, jalankan pemeriksaan formula dan pastikan tidak ada galat.
4. Jangan menghapus data dummy; salin ke berkas baru bila akan diganti.
5. Angka apa pun yang berasal dari luar wajib disertai sumber di lembar `11_SUMBER`.

---

## 22. Daftar Pustaka dan Sumber Data

### 22.1 Standar Pengukuran dan Penilaian

| Rujukan | Dipakai untuk | Tautan |
|---|---|---|
| BOMA International, *Office Buildings: Standard Methods of Measurement (ANSI/BOMA Z65.1)* | Bab 3 — definisi NLA, faktor beban, Metode A dan B | https://www.boma.org/BOMA/BOMA-Standards/BOMA_Floor_Measurement_Standards/Office_Buildings.aspx |
| BOMA International, daftar seluruh standar | Bab 3 — edisi terbaru tiap jenis properti | https://boma.org/boma-standards/ |
| IVSC, *IVS 105 Valuation Approaches and Methods* | Bab 4 — tiga pendekatan penilaian | https://www.ivsc.org/wp-content/uploads/2021/10/IVS105ValuationApproaches.pdf |
| IVSC, *International Valuation Standards* | Bab 4 — struktur standar umum dan standar aset | https://ivsc.org/standards/ |
| RICS, *RICS Valuation – Global Standards (Red Book)* | Bab 4 — kerangka praktik penilaian global | https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/valuation-standards/red-book/red-book-global |
| MAPPI, *KEPI & SPI Edisi VII 2018* | Bab 4, 6 — SPI 106, metode kapitalisasi langsung | https://ecommerce.mappi.or.id/home/products/kode-etik-penilai-indonesia-dan-standar-penilaian-indonesia-edisi-vii-2018-bundling |
| Penjelasan kedudukan hukum SPI | Bab 4 — sifat wajib SPI dan PMK 101/2014 | https://penilaian.id/2022/07/30/apa-itu-standar-penilaian-indonesia-spi/ |
| Penjelasan penyusunan SPI VII berdasar IVS 2017 | Bab 4 — keselarasan SPI dengan standar internasional | https://penilaian.id/2025/01/30/kepi-dan-spi-edisi-vii-2018-disusun-berdasarkan-ivs-2017/ |

### 22.2 Literatur Akademik

| Rujukan | Dipakai untuk |
|---|---|
| Rosen, S. (1974). "Hedonic Prices and Implicit Markets: Product Differentiation in Pure Competition." *Journal of Political Economy*, 82(1), 34–55. https://doi.org/10.1086/260169 | Bab 12 — landasan teori regresi hedonik. |
| Koster, H. R. A., van Ommeren, J., & Rietveld, P. (2014). "Is the sky the limit? High-rise buildings and office rents." *Journal of Economic Geography*, 14(1), 125–153. https://doi.org/10.1093/jeg/lbt008 | Bab 1, 9 — premi ketinggian gedung sekitar 4% per 10 meter. |
| Nase, I., van Assendelft, N., & Remøy, H. (2019). "Rent Premiums and Vertical Sorting in Amsterdam's Multi-Tenant Office Buildings." *The Journal of Real Estate Finance and Economics*, 59(3), 419–460. https://doi.org/10.1007/s11146-018-9684-x | Bab 1, 9, 10 — penguraian premi vertikal; porsi pemandangan sekitar 27%. |
| Nutt, O. D. (2016). *Uncovering the premium for higher floors in office space.* Tesis S.M., MIT Center for Real Estate. https://dspace.mit.edu/handle/1721.1/103450 | Bab 1, 9 — premi lantai positif di 23 dari 25 kota. |
| Liu, C. H., Rosenthal, S. S., & Strange, W. C. (2018). "The vertical city: Rent gradients, spatial structure, and agglomeration economies." *Journal of Urban Economics*, 106, 101–122. | Bab 9 — gradien sewa vertikal. |
| Chau, K. W., Wong, S. K., & Yiu, C. Y. (2012). "The value of the provision of a balcony and floor level premium." *Journal of Housing and the Built Environment.* https://doi.org/10.1007/s10901-010-9203-8 | Bab 9 — premi lantai mengecil seiring bertambahnya lantai. |
| Wheaton, W. C., & Torto, R. G. (1988). "Vacancy Rates and the Future of Office Rents." *Real Estate Economics*, 16(4), 430–436. | Bab 16 — hubungan kekosongan dan pergerakan sewa. |
| Danton, J., & Himbert, A. (2018). "Residential vertical rent curves." *Journal of Urban Economics*, 107, 89–100. https://doi.org/10.1016/j.jue.2018.08.002 | Bab 9 — bentuk kurva sewa vertikal tidak monoton; adanya premi lantai dasar. |

### 22.3 Sumber Data Pasar

| Rujukan | Dipakai untuk | Tautan |
|---|---|---|
| Colliers Indonesia, laporan kuartalan pasar perkantoran Jakarta | Angka dummy tarif dan service charge | https://www.colliers.com/en-id/research/colliers-quarterly-property-market-report-q1-2026-jakarta-office |
| Ringkasan laporan Colliers Kuartal II 2026 | Tarif CBD, luar CBD, Premium, Grade A, service charge | https://realestateasia.com/commercial-office/news/jakarta-non-cbd-office-rents-rise-2-3-annually-until-2029 |
| Cushman & Wakefield, *Jakarta MarketBeat* | Perbandingan base rent dan asking rent | https://www.cushmanwakefield.com/en/indonesia/insights/jakarta-marketbeat |
| CBRE Indonesia, *Jakarta Office Market Outlook Q1 2026* | Proyeksi pertumbuhan sewa dan okupansi | https://indonesia.cbre.com/insights/reports/jakarta-office-market-outlook-q1-2026 |
| JLL, *Jakarta Office Market Dynamics* | Kondisi pasokan dan permintaan | https://www.jll.com/en-sea/insights/market-dynamics/jakarta-office |
| Bank Indonesia, *Perkembangan Properti Komersial* | Indeks harga dan permintaan properti komersial | https://www.bi.go.id/id/publikasi/laporan/default.aspx?kategori=perkembangan+properti+komersial |
| Colliers Indonesia, panduan perencanaan ruang kantor | Acuan kebutuhan ruang per karyawan | https://www.colliers.com/en-id/countries/indonesia/office-services-contents/berapakah-harga-sewa-ruang-kantor-di-jakarta |

### 22.4 Peraturan Perpajakan

| Rujukan | Dipakai untuk | Tautan |
|---|---|---|
| Peraturan Pemerintah Nomor 34 Tahun 2017 tentang Pajak Penghasilan atas Penghasilan dari Persewaan Tanah dan/atau Bangunan | Bab 13 — PPh Final 10%, definisi jumlah bruto | https://peraturan.bpk.go.id/Download/54909/PP%20Nomor%2034%20Tahun%202017.pdf |
| Salinan PP 34/2017 pada JDIH Kementerian Keuangan | Bab 13 — naskah resmi | https://jdih.kemenkeu.go.id/dok/pp-34-tahun-2017/view |
| DDTCNews, penjelasan tarif dan dasar pengenaan pajak persewaan | Bab 13 — penerapan praktis | https://news.ddtc.co.id/literasi/kelas-pajak/39122/pajak-atas-persewaan-tanah-danatau-bangunan |
| Ortax, cakupan jumlah bruto termasuk service charge | Bab 13 — dasar pengenaan pajak | https://ortax.org/pajak-penghasilan-atas-persewaan-tanah-dan-atau-bangunan |

### 22.5 Catatan tentang Keterbatasan

Handbook ini punya keterbatasan yang perlu dikatakan secara jujur:

1. **Seluruh angka di berkas Excel adalah karangan.** Angka-angkanya disusun mirip kondisi pasar Jakarta pertengahan 2026, tapi tidak mewakili gedung nyata mana pun.
2. **Besaran faktor pengali masih sementara.** Nilai-nilainya wajib dikalibrasi dengan data setempat dulu sebelum dipakai untuk keputusan nyata.
3. **Kondisi pasar berubah.** Angka pasar yang dikutip berasal dari laporan sampai pertengahan 2026 dan perlu diperbarui berkala.
4. **Ketentuan pajak bisa berubah.** Tarif yang tercantum harus dicek ulang ke sumber resmi saat dipakai.
5. **Model ini tidak menggantikan penilaian profesional.** Untuk keperluan yang mengikat secara hukum, tetap perlu laporan dari Penilai Publik berizin.

---

## Lampiran A — Ringkasan Seluruh Rumus

| No | Nama | Rumus |
|---|---|---|
| 3.1 | Faktor beban | $LF = (A_{\text{rent}} - A_{\text{use}}) / A_{\text{use}}$ |
| 3.2 | Usable ke rentable | $A_{\text{rent}} = A_{\text{use}} \times (1 + LF)$ |
| 3.3 | Rasio efisiensi | $\eta = NLA / GFA$ |
| 5.1 | Pembanding disesuaikan | $R_i^{adj} = R_i \times \prod (1 + a_{ij})$ |
| 5.2 | Bobot kemiripan | $w_i = \frac{1/(\|A_i\|+\varepsilon)}{\sum 1/(\|A_k\|+\varepsilon)}$ |
| 5.3 | Tarif indikasi pasar | $R_{\text{pasar}} = \sum w_i R_i^{adj}$ |
| 6.1 | Potensi pendapatan kotor | $PGI = R \times NLA \times 12$ |
| 6.2 | Pendapatan kotor efektif | $EGI = PGI(1 - v - c) + I_{\text{lain}}$ |
| 6.3 | Pendapatan operasi bersih | $NOI = EGI - OpEx$ |
| 6.4 | Kapitalisasi | $V = NOI / r_{\text{cap}}$ |
| 6.5 | Tarif dibutuhkan | $R_{\text{butuh}} = \frac{NOI_{\text{tgt}} + OpEx - I_{\text{lain}}}{NLA(1-v-c) \times 12}$ |
| 6.6 | Tarif titik impas | $R_{\text{impas}} = \frac{OpEx + CapEx + Utang - I_{\text{lain}}}{NLA(1-v-c) \times 12}$ |
| 6.7 | Okupansi minimum impas | $o_{\min} = \frac{OpEx + CapEx + Utang - I_{\text{lain}}}{R \times NLA \times 12} + c$ |
| 7.1 | Batas bawah | $R_{\min} = \max(R_{\text{impas}}\phi, \; R_{\text{pasar}}(1-\delta))$ |
| 7.2 | Batas atas | $R_{\max} = R_{\text{premium}}(1+\gamma)$ |
| 7.3 | Tarif akhir | $R^{*} = \text{median}(R_{\min}, R_{\text{pasar}}, R_{\max})$ |
| 8.1 | Tarif unit awal | $R_u^{\text{awal}} = R^{*} \prod F_{k,u}$ |
| 9.1 | Faktor lantai zona | $F = 1 + \pi_z + \beta_z(\ell_u - \ell_{z,\text{awal}})$ |
| 9.2 | Faktor lantai logaritmik | $F = 1 + \theta \ln\!\left(\frac{\ell_u + \lambda}{\ell_{\text{ref}} + \lambda}\right)$ |
| 10.1 | Faktor pemandangan | $F = 1 + \nu_k$ |
| 10.2 | Faktor posisi | $F = 1 + \sum \rho_p$ |
| 10.3 | Faktor ukuran | $F = (A_{\text{ref}} / A_u)^{\sigma}$ |
| 10.4 | Faktor kondisi | $F = 1 + \kappa_c$ |
| 10.5 | Premi fit-out minimum | $\kappa_{\min} = C_{\text{fitout}} / (R^{*} T)$ |
| 10.6 | Faktor denah | $F = 1 + \tau_d$ |
| 11.1 | Faktor kalibrasi | $k = R^{*} \Big/ \frac{\sum A_u R_u^{\text{awal}}}{\sum A_u}$ |
| 11.2 | Tarif unit final | $R_u = R_u^{\text{awal}} \times k$ |
| 11.3 | Pembulatan | $R^{\text{pub}} = \text{ROUND}(R_u / \mu) \times \mu$ |
| 12.1 | Regresi hedonik | $\ln R_u = \beta_0 + \beta_1 \ell_u + \beta_2 \ln A_u + \ldots$ |
| 12.2 | Koefisien ke faktor | $F = \exp(\beta_j)$ |
| 13.3 | Tagihan kotor | $G_u = (R_u + SC) A_u$ |
| 13.5 | PPh Final | $0{,}10 \times (B_u + S_u)$ |
| 13.6 | PPN | $t_{\text{PPN}} \times (B_u + S_u)$ |
| 14.1 | NER sederhana | $NER = \frac{R(T - T_{\text{gratis}}) - C/A}{T}$ |
| 14.3 | Diskonto bulanan | $d = (1 + d_{\text{thn}})^{1/12} - 1$ |
| 14.4 | Batas bulan gratis | $T_{\text{gratis}}^{\max} = T\left(1 - \frac{R_{\min}}{R}\right) - \frac{C}{RA}$ |
| 15.1 | Eskalasi | $R_n = R_0 (1+g)^{n-1}$ |
| 15.3 | Nilai kini tumbuh | $PV = R_0 A \cdot 12 \cdot \frac{1 - \left(\frac{1+g}{1+d}\right)^N}{d - g}$ |
| 16.2 | RevPAM | $RevPAM = R \times o$ |
| 16.4 | Okupansi pada tarif baru | $o_{\text{baru}} = o_{\text{lama}} (R_{\text{baru}}/R_{\text{lama}})^{\varepsilon}$ |
| 17.1 | Koefisien variasi | $CV = s / \bar{x}$ |
| 17.2 | MAPE | $\frac{1}{n}\sum \left\|\frac{R^{\text{akt}} - R^{\text{mod}}}{R^{\text{akt}}}\right\| \times 100\%$ |
| 17.3 | Bias | $\frac{1}{n}\sum \frac{R^{\text{mod}} - R^{\text{akt}}}{R^{\text{akt}}} \times 100\%$ |

---

## Lampiran B — Daftar Periksa Sebelum Menerbitkan Daftar Harga

- [ ] Luas seluruh unit telah diverifikasi dengan satu standar pengukuran
- [ ] Standar pengukuran dan edisinya tercatat di lembar asumsi
- [ ] Minimal 4 data pembanding tersedia, seluruhnya berusia di bawah 6 bulan
- [ ] Tidak ada pembanding dengan total penyesuaian mutlak di atas 25%
- [ ] Koefisien variasi tarif pembanding yang disesuaikan di bawah 15%
- [ ] Tarif dasar berada di dalam koridor batas bawah dan batas atas
- [ ] Tarif dasar berada di atas titik impas, atau penyimpangannya telah disetujui tertulis
- [ ] Seluruh kolom wajib pada data unit telah terisi
- [ ] Faktor lantai telah dikalibrasi, atau ditandai sebagai belum terkalibrasi
- [ ] Faktor kalibrasi berada dalam rentang 0,90–1,10
- [ ] Sebaran faktor total berada dalam rentang 0,80–1,35
- [ ] Selisih akibat pembulatan di bawah 0,5%
- [ ] Tarif rata-rata per zona naik dari lantai bawah ke lantai atas
- [ ] Premi fit-out telah diuji terhadap biaya fit-out sebenarnya
- [ ] Sembilan pemeriksaan kualitas seluruhnya berstatus LULUS
- [ ] Berkas telah disimpan dengan nama bertanggal dan versi sebelumnya tidak ditimpa
- [ ] Perubahan asumsi telah dicatat di `CHANGELOG.md`

---

*Handbook Penentuan Harga Sewa Gedung Menara — Versi 1.0 — 23 Agustus 2026*
