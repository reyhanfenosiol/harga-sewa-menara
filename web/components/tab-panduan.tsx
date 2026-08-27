"use client";
import React from "react";
import { Card, Badge } from "@/components/ui";

const LANGKAH = [
  {
    tab: "Gedung Pembanding",
    apa: "Masukkan data gedung sejenis di sekitar (tarif, lokasi, usia, dll.). Dari sini aplikasi menghitung \"harga pasar\" sebagai acuan awal.",
  },
  {
    tab: "Parameter",
    apa: "Isi data keuangan gedung Anda (nilai aset, target untung, biaya operasional) dan atur besar tiap faktor pengali (lantai, pemandangan, ukuran unit, dll.).",
  },
  {
    tab: "Data Unit",
    apa: "Masukkan daftar unit gedung — lantai, luas, kategori pemandangan, dst. Bisa diketik satu-satu atau impor dari CSV.",
  },
  {
    tab: "Ringkasan",
    apa: "Lihat hasil akhirnya: harga dasar gedung yang dipakai, aman tidaknya secara keuangan, dan 11 pengecekan otomatis (semua wajib \"LULUS\" sebelum harga dipakai beneran).",
  },
  {
    tab: "Daftar Harga",
    apa: "Tabel harga per unit — ini yang dicetak/dibagikan ke tim pemasaran.",
  },
  {
    tab: "Simulasi Tarif",
    apa: "Coba-coba: kalau tarif dinaikkan/diturunkan, kira-kira okupansi dan pendapatan jadi berapa?",
  },
  {
    tab: "Sewa Efektif & Insentif",
    apa: "Mau kasih promo bulan gratis ke penyewa? Hitung dulu di sini supaya tidak rugi.",
  },
];

export function Panduan() {
  return (
    <div className="space-y-5">
      <Card title="Apa aplikasi ini" subtitle="Ringkasan singkat sebelum mulai">
        <p className="text-sm leading-relaxed text-slate-700">
          Aplikasi ini membantu menentukan <b>berapa harga sewa yang wajar untuk tiap unit</b> di gedung
          perkantoran — supaya unit lantai tinggi dengan pemandangan bagus tidak disewakan dengan harga
          sama seperti unit lantai bawah menghadap tembok. Caranya: tentukan satu <b>harga dasar</b> untuk
          seluruh gedung, lalu kalikan dengan beberapa <b>faktor per unit</b> (lantai, pemandangan, ukuran,
          dst).
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Data yang sudah ada saat ini adalah <b>contoh karangan</b> (gedung &quot;Menara Nusantara&quot;, 65
          unit dummy) — silakan diganti dengan data gedung Anda sendiri lewat tab Parameter, Data Unit, dan
          Gedung Pembanding.
        </p>
      </Card>

      <Card title="Urutan tab yang disarankan" subtitle="Kalau mulai dari nol dengan data gedung sendiri">
        <ol className="space-y-3">
          {LANGKAH.map((l, i) => (
            <li key={l.tab} className="flex gap-3">
              <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-teal-700 text-xs font-bold text-white">
                {i + 1}
              </span>
              <div>
                <div className="text-sm font-semibold text-slate-800">{l.tab}</div>
                <div className="text-sm text-slate-600">{l.apa}</div>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-slate-500">
          Cuma mau coba-coba dulu pakai data contoh? Langsung saja buka tab <b>Ringkasan</b> — semua sudah
          terisi dan hasilnya bisa langsung dilihat.
        </p>
      </Card>

      <Card title="Hal yang perlu diketahui">
        <ul className="space-y-2 text-sm text-slate-700">
          <li>
            <b>Data tersimpan otomatis</b> di browser ini (localStorage) — tidak ada tombol &quot;Simpan&quot;.
            Ganti browser atau bersihkan cache berarti data hilang.
          </li>
          <li>
            Tombol <b>&quot;Reset dummy&quot;</b> di kanan atas mengembalikan semua data ke contoh awal —
            perubahan Anda akan hilang.
          </li>
          <li>
            Ikon <b>ⓘ</b> kecil di sebelah label yang agak asing (RevPAM, cap rate, faktor kalibrasi, dst.)
            bisa di-hover atau diklik untuk penjelasan singkat.
          </li>
          <li>
            Angka dalam kurung seperti &quot;(5.3)&quot; atau simbol Yunani seperti φ, θ, σ adalah rujukan
            ke nomor rumus di handbook — boleh diabaikan kalau tidak perlu dicocokkan ke sana.
          </li>
          <li className="flex items-start gap-1.5">
            <Badge tone="warn">Penting</Badge>
            <span>
              Ini bukan laporan penilaian resmi. Untuk urusan yang mengikat secara hukum (jaminan bank,
              laporan keuangan), tetap perlu Penilai Publik berizin.
            </span>
          </li>
        </ul>
      </Card>

      <Card title="Masih bingung dengan satu istilah?">
        <ol className="list-decimal space-y-1.5 pl-4 text-sm text-slate-700">
          <li>Coba klik ikon ⓘ di sebelah istilah itu dulu.</li>
          <li>
            Belum cukup jelas? Cari istilahnya di <b>Bab 2 — Kamus Istilah Wajib</b> pada handbook lengkap.
          </li>
          <li>
            Mau paham logikanya? Baca kotak <b>&quot;Intinya:&quot;</b> di bawah tiap rumus di handbook —
            ringkasan bahasa awam, tanpa notasi matematis.
          </li>
        </ol>
        <a
          href="/HANDBOOK-HARGA-SEWA-MENARA.pdf"
          download
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-800"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
          </svg>
          Unduh Handbook lengkap (PDF)
        </a>
      </Card>
    </div>
  );
}
