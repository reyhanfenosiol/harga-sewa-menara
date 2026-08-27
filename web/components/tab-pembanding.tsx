"use client";
import React from "react";
import type { HasilModel, Pembanding } from "@/lib/types";
import { LABEL_PEMBANDING } from "@/lib/defaults";
import { hitungPasar } from "@/lib/model";
import { rp, pct, fak } from "@/lib/format";
import { Card, Stat, Badge, Info } from "@/components/ui";

export function PembandingTab({
  pembanding,
  setPembanding,
  hasil,
}: {
  pembanding: Pembanding[];
  setPembanding: (p: Pembanding[]) => void;
  hasil: HasilModel;
}) {
  const pasar = hitungPasar(pembanding);

  const editNama = (i: number, v: string) => {
    const c = structuredClone(pembanding);
    c[i].nama = v;
    setPembanding(c);
  };
  const editTarif = (i: number, v: number) => {
    const c = structuredClone(pembanding);
    c[i].tarif_awal = v;
    setPembanding(c);
  };
  const editAdj = (i: number, j: number, v: number) => {
    const c = structuredClone(pembanding);
    c[i].penyesuaian[j] = v;
    setPembanding(c);
  };
  const addRow = () => {
    setPembanding([...pembanding, { nama: `Pembanding ${pembanding.length + 1}`, tarif_awal: 180000, penyesuaian: [0, 0, 0, 0, 0, 0] }]);
  };
  const delRow = (i: number) => {
    if (pembanding.length <= 2) return alert("Minimal 2 pembanding.");
    setPembanding(pembanding.filter((_, j) => j !== i));
  };

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label={<>Harga pasar<Info text="Rata-rata tarif gedung pembanding di bawah, setelah disesuaikan dan diberi bobot menurut kemiripannya dengan gedung kita." /></>} value={rp(Math.round(pasar.r_pasar))} hint="rata-rata tertimbang pembanding" tone="brand" />
        <Stat label="Jumlah pembanding" value={pembanding.length} hint="idealnya 6–8 gedung" tone={pembanding.length >= 4 ? "good" : "warn"} />
        <Stat label={<>Sebaran data<Info text="Mengukur seberapa jauh tarif antar pembanding berbeda-beda satu sama lain setelah disesuaikan. Makin kecil, makin seragam dan makin bisa dipercaya." /></>} value={pct(pasar.cv)} hint="idealnya ≤ 15%" tone={pasar.cv <= 0.15 ? "good" : "warn"} />
        <Stat label="Penyesuaian terbesar" value={pct(pasar.maks_abs)} hint="idealnya ≤ 25%" tone={pasar.maks_abs <= 0.25 ? "good" : "warn"} />
      </div>

      <Card
        title="Tabel Penyesuaian Gedung Pembanding"
        subtitle="Kalau pembanding LEBIH BAIK dari gedung kita → penyesuaian NEGATIF (turunkan tarifnya). Kalau LEBIH BURUK → POSITIF (naikkan). Angka ditulis sebagai pecahan (0,03 = 3%)."
        right={
          <button onClick={addRow} className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-800">
            + Tambah pembanding
          </button>
        }
      >
        <div className="tbl-wrap rounded-lg border border-slate-100">
          <table className="data">
            <thead>
              <tr>
                <th>Nama gedung</th>
                <th className="num">Tarif awal</th>
                {LABEL_PEMBANDING.map((l) => (
                  <th key={l} className="num">Adj {l}</th>
                ))}
                <th className="num">Jml penyesuaian<Info text="Jumlah bersih seluruh penyesuaian (positif dan negatif saling mengurangi)." /></th>
                <th className="num">Total mutlak<Info text="Jumlah besar penyesuaian tanpa memandang tanda plus/minus — dipakai untuk menilai seberapa mirip pembanding ini dengan gedung kita." /></th>
                <th className="num">Bobot<Info text="Pembanding yang butuh sedikit penyesuaian (lebih mirip) diberi bobot lebih besar dalam rata-rata." /></th>
                <th className="num">Tarif disesuaikan</th>
                <th className="num">Kontribusi<Info text="Sumbangan pembanding ini terhadap angka Harga Pasar akhir (bobot × tarif disesuaikan)." /></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {pembanding.map((p, i) => {
                const h = pasar.pembanding[i];
                return (
                  <tr key={i}>
                    <td style={{ minWidth: 170 }}>
                      <input className="cell" value={p.nama} onChange={(e) => editNama(i, e.target.value)} />
                    </td>
                    <td className="num" style={{ width: 110 }}>
                      <input className="cell num" type="number" step={1000} value={p.tarif_awal} onChange={(e) => editTarif(i, Number(e.target.value))} />
                    </td>
                    {p.penyesuaian.map((a, j) => (
                      <td key={j} className="num" style={{ width: 90 }}>
                        <input className="cell num" type="number" step={0.01} value={a} onChange={(e) => editAdj(i, j, Number(e.target.value))} />
                      </td>
                    ))}
                    <td className="num">{pct(h.total_penyesuaian)}</td>
                    <td className="num">
                      {h.total_abs > 0.25 ? <Badge tone="warn">{pct(h.total_abs)}</Badge> : pct(h.total_abs)}
                    </td>
                    <td className="num font-semibold">{pct(h.bobot)}</td>
                    <td className="num font-bold text-teal-800">{rp(Math.round(h.tarif_disesuaikan))}</td>
                    <td className="num">{rp(Math.round(h.bobot * h.tarif_disesuaikan))}</td>
                    <td>
                      <button onClick={() => delRow(i)} className="rounded px-2 py-1 text-xs text-rose-600 hover:bg-rose-50">✕</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-50 font-semibold">
                <td colSpan={2}>HARGA PASAR (rata-rata tertimbang)</td>
                <td colSpan={LABEL_PEMBANDING.length}></td>
                <td colSpan={3} className="num">100%</td>
                <td className="num text-teal-800">{rp(Math.round(pasar.r_pasar))}</td>
                <td colSpan={2}></td>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="mt-2 text-[11px] text-slate-400">
          Pembanding yang butuh sedikit penyesuaian (lebih mirip gedung kita) diberi bobot lebih besar.
          Perubahan di tabel ini langsung memengaruhi Harga Pasar dan Tarif Dasar Gedung di seluruh model. Sumber acuan pasar Jakarta: Colliers, Cushman &amp; Wakefield, CBRE, JLL, Bank Indonesia (semua angka contoh/dummy).
        </p>
      </Card>
    </div>
  );
}
