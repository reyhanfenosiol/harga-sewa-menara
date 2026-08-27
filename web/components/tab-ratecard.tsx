"use client";
import React, { useMemo, useState } from "react";
import type { HasilModel, HasilUnit, Parameters } from "@/lib/types";
import { rp, fak, num } from "@/lib/format";
import { Card, Badge, Info } from "@/components/ui";

type SortKey = keyof HasilUnit | "Kode_Unit" | "Lantai" | "Luas_NLA_m2";

export function RateCard({ hasil, params }: { hasil: HasilModel; params: Parameters }) {
  const [q, setQ] = useState("");
  const [zona, setZona] = useState("");
  const [status, setStatus] = useState("");
  const [sortKey, setSortKey] = useState<string>("Kode_Unit");
  const [asc, setAsc] = useState(true);

  const zonaOpsi = params.faktor_lantai.zona.map((z) => z.nama);

  const rows = useMemo(() => {
    let r = hasil.units.filter((u) => {
      if (q && !u.unit.Kode_Unit.toLowerCase().includes(q.toLowerCase()) && !u.unit.Nama_Penyewa.toLowerCase().includes(q.toLowerCase()))
        return false;
      if (zona && u.zona !== zona) return false;
      if (status && u.unit.Status_Hunian !== status) return false;
      return true;
    });
    const val = (u: HasilUnit): number | string => {
      switch (sortKey) {
        case "Kode_Unit": return u.unit.Kode_Unit;
        case "Lantai": return u.unit.Lantai;
        case "Luas_NLA_m2": return u.unit.Luas_NLA_m2;
        default: return (u as any)[sortKey];
      }
    };
    r = [...r].sort((a, b) => {
      const va = val(a), vb = val(b);
      const cmp = typeof va === "number" && typeof vb === "number" ? va - vb : String(va).localeCompare(String(vb));
      return asc ? cmp : -cmp;
    });
    return r;
  }, [hasil.units, q, zona, status, sortKey, asc]);

  const sum = (f: (u: HasilUnit) => number) => rows.reduce((a, b) => a + f(b), 0);
  const totNla = sum((u) => u.unit.Luas_NLA_m2);
  const avgPub = totNla > 0 ? sum((u) => u.unit.Luas_NLA_m2 * u.r_publikasi) / totNla : 0;

  const sortBtn = (key: string) => () => {
    if (sortKey === key) setAsc(!asc);
    else { setSortKey(key); setAsc(true); }
  };
  const arrow = (key: string) => (sortKey === key ? (asc ? " ▲" : " ▼") : "");

  const exportCsv = () => {
    const head = [
      "Kode_Unit", "Lantai", "Luas_m2", "Zona", "Status", "Penyewa",
      "F_lantai", "F_view", "F_posisi", "F_ukuran", "F_kondisi", "F_denah", "F_total",
      "R_awal", "R_final", "R_publikasi", "Tarif_kotor",
      "Sewa_bulan", "SC_bulan", "Tagihan_kotor", "PPN", "Total_ditagih", "PPh_final", "Diterima_pemilik",
    ];
    const lines = hasil.units.map((u) =>
      [
        u.unit.Kode_Unit, u.unit.Lantai, u.unit.Luas_NLA_m2, u.zona, u.unit.Status_Hunian, u.unit.Nama_Penyewa,
        u.f_lantai, u.f_view, u.f_posisi, u.f_ukuran, u.f_kondisi, u.f_denah, u.f_total,
        Math.round(u.r_awal), Math.round(u.r_final), u.r_publikasi, u.tarif_kotor,
        Math.round(u.sewa_bulan), Math.round(u.sc_bulan), Math.round(u.tagihan_kotor),
        Math.round(u.ppn), Math.round(u.total_ditagih), Math.round(u.pph_final), Math.round(u.diterima_pemilik),
      ].join(",")
    );
    const csv = [head.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rate_card_${params.gedung.kode}_${params.meta.tanggal}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card
      title="Daftar Harga per Unit (Rate Card)"
      subtitle={`${rows.length} unit ditampilkan · rata-rata tarif final ${rp(Math.round(avgPub))}/m²/bln`}
      right={
        <button
          onClick={exportCsv}
          className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-800"
        >
          Ekspor CSV
        </button>
      }
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <input
          className="cell max-w-[220px]"
          placeholder="Cari kode unit / penyewa…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select className="cell max-w-[150px]" value={zona} onChange={(e) => setZona(e.target.value)}>
          <option value="">Semua zona</option>
          {zonaOpsi.map((z) => (
            <option key={z} value={z}>{z}</option>
          ))}
        </select>
        <select className="cell max-w-[150px]" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Semua status</option>
          <option value="Terisi">Terisi</option>
          <option value="Kosong">Kosong</option>
        </select>
      </div>

      <div className="tbl-wrap rounded-lg border border-slate-100">
        <table className="data">
          <thead>
            <tr>
              <Th onClick={sortBtn("Kode_Unit")}>Kode{arrow("Kode_Unit")}</Th>
              <Th onClick={sortBtn("Lantai")} num>Lt{arrow("Lantai")}</Th>
              <Th onClick={sortBtn("Luas_NLA_m2")} num>Luas m²{arrow("Luas_NLA_m2")}</Th>
              <Th>Zona</Th>
              <Th num>F lantai</Th>
              <Th num>F view</Th>
              <Th num>F posisi</Th>
              <Th num>F ukuran</Th>
              <Th num>F kondisi</Th>
              <Th num>F denah</Th>
              <Th onClick={sortBtn("f_total")} num>F total{arrow("f_total")}<Info text="Perkalian seluruh faktor (F lantai × F view × F posisi × F ukuran × F kondisi × F denah). Angka 1,00 = netral; 1,10 = tarif 10% lebih mahal dari tarif dasar gedung." /></Th>
              <Th onClick={sortBtn("r_publikasi")} num>Tarif final{arrow("r_publikasi")}</Th>
              <Th num>Tarif kotor<Info text="Tarif sewa ditambah service charge — angka yang biasanya dibandingkan calon penyewa." /></Th>
              <Th onClick={sortBtn("tagihan_kotor")} num>Tagihan/bln{arrow("tagihan_kotor")}</Th>
              <Th num>Diterima pemilik<Info text="Tagihan kotor dikurangi PPh Final 10% — belum dikurangi biaya operasional gedung." /></Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((u) => (
              <tr key={u.unit.Kode_Unit}>
                <td className="font-medium">{u.unit.Kode_Unit}</td>
                <td className="num">{u.unit.Lantai}</td>
                <td className="num">{num(u.unit.Luas_NLA_m2)}</td>
                <td>{u.zona}</td>
                <td className="num">{fak(u.f_lantai, 3)}</td>
                <td className="num">{fak(u.f_view, 3)}</td>
                <td className="num">{fak(u.f_posisi, 3)}</td>
                <td className="num">{fak(u.f_ukuran, 3)}</td>
                <td className="num">{fak(u.f_kondisi, 3)}</td>
                <td className="num">{fak(u.f_denah, 3)}</td>
                <td className="num font-semibold">{fak(u.f_total, 3)}</td>
                <td className="num font-bold text-teal-800">{rp(u.r_publikasi)}</td>
                <td className="num">{rp(u.tarif_kotor)}</td>
                <td className="num">{rp(Math.round(u.tagihan_kotor))}</td>
                <td className="num">{rp(Math.round(u.diterima_pemilik))}</td>
                <td>
                  {u.unit.Status_Hunian === "Terisi" ? (
                    <Badge tone="good">Terisi</Badge>
                  ) : (
                    <Badge tone="warn">Kosong</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 font-semibold">
              <td colSpan={2}>TOTAL / RATA²</td>
              <td className="num">{num(totNla)}</td>
              <td colSpan={8}></td>
              <td className="num text-teal-800">{rp(Math.round(avgPub))}</td>
              <td></td>
              <td className="num">{rp(Math.round(sum((u) => u.tagihan_kotor)))}</td>
              <td className="num">{rp(Math.round(sum((u) => u.diterima_pemilik)))}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-slate-400">
        Kolom "F ..." adalah faktor pengali per atribut unit (lantai, pemandangan, posisi, ukuran, kondisi ruang, bentuk denah) — 1,00 berarti netral.
        F view sudah dikurangi supaya tidak dihitung dobel dengan faktor lantai (porsi {fak(params.faktor_view.porsi_view_dalam_faktor_lantai, 2)}).
        Tagihan & pajak dihitung dari jumlah bruto termasuk service charge, sesuai PP 34/2017.
      </p>
    </Card>
  );
}

function Th({ children, num, onClick }: { children: React.ReactNode; num?: boolean; onClick?: () => void }) {
  return (
    <th className={num ? "num" : ""} onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      {children}
    </th>
  );
}
