"use client";
import React, { useRef, useState } from "react";
import type { Unit, KategoriView, Posisi, KondisiFitout, Denah, StatusHunian } from "@/lib/types";
import { num } from "@/lib/format";
import { Card } from "@/components/ui";

const VIEW: KategoriView[] = ["Terhalang", "Terbatas", "Terbuka", "Penanda"];
const POSISI: Posisi[] = ["Sudut", "Hadap_Lift", "Dekat_Servis", "Ujung_Buntu", "Standar"];
const KONDISI: KondisiFitout[] = ["Shell_Core", "Warm_Shell", "Semi_Fitted", "Fully_Fitted"];
const DENAH: Denah[] = ["Bebas_Kolom", "Standar", "Banyak_Kolom", "Plafon_Tinggi"];
const STATUS: StatusHunian[] = ["Terisi", "Kosong"];

export function UnitEditor({ units, setUnits }: { units: Unit[]; setUnits: (u: Unit[]) => void }) {
  const [q, setQ] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const editRow = (i: number, patch: Partial<Unit>) => {
    const c = units.slice();
    c[i] = { ...c[i], ...patch };
    setUnits(c);
  };
  const addRow = () => {
    const kode = units[0]?.Kode_Gedung ?? "MNS-01";
    setUnits([
      ...units,
      {
        Kode_Gedung: kode,
        Kode_Unit: `${kode}-BARU-${units.length + 1}`,
        Lantai: 1,
        Luas_NLA_m2: 300,
        Kategori_View: "Terbatas",
        Posisi: "Standar",
        Kondisi_Fitout: "Shell_Core",
        Denah: "Standar",
        Status_Hunian: "Kosong",
        Nama_Penyewa: "",
        Catatan: "",
      },
    ]);
  };
  const delRow = (i: number) => {
    if (confirm(`Hapus unit ${units[i].Kode_Unit}?`)) setUnits(units.filter((_, j) => j !== i));
  };

  const importCsv = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const text = String(reader.result);
        const lines = text.split(/\r?\n/).filter((l) => l.trim());
        const header = lines[0].split(",").map((h) => h.trim());
        const idx = (name: string) => header.indexOf(name);
        const out: Unit[] = lines.slice(1).map((line) => {
          const cols = line.split(",");
          const get = (n: string) => (idx(n) >= 0 ? (cols[idx(n)] ?? "").trim() : "");
          return {
            Kode_Gedung: get("Kode_Gedung") || "MNS-01",
            Kode_Unit: get("Kode_Unit"),
            Lantai: Number(get("Lantai")) || 0,
            Luas_NLA_m2: Number(get("Luas_NLA_m2")) || 0,
            Kategori_View: (get("Kategori_View") as KategoriView) || "Terbatas",
            Posisi: (get("Posisi") as Posisi) || "Standar",
            Kondisi_Fitout: (get("Kondisi_Fitout") as KondisiFitout) || "Shell_Core",
            Denah: (get("Denah") as Denah) || "Standar",
            Status_Hunian: (get("Status_Hunian") as StatusHunian) || "Kosong",
            Nama_Penyewa: get("Nama_Penyewa"),
            Catatan: get("Catatan"),
          };
        });
        if (out.length) setUnits(out);
        alert(`Berhasil memuat ${out.length} unit dari CSV.`);
      } catch (err) {
        alert("Gagal membaca CSV: " + err);
      }
    };
    reader.readAsText(f);
    e.target.value = "";
  };

  const rows = units
    .map((u, i) => ({ u, i }))
    .filter(({ u }) => !q || u.Kode_Unit.toLowerCase().includes(q.toLowerCase()) || u.Nama_Penyewa.toLowerCase().includes(q.toLowerCase()));

  const totNla = units.reduce((a, b) => a + b.Luas_NLA_m2, 0);

  return (
    <Card
      title="Data Unit"
      subtitle={`${units.length} unit · total luas disewakan ${num(totNla)} m² — klik langsung di tabel untuk mengubah`}
      right={
        <div className="flex gap-2">
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={importCsv} />
          <button onClick={() => fileRef.current?.click()} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            Impor CSV
          </button>
          <button onClick={addRow} className="rounded-lg bg-teal-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-800">
            + Tambah unit
          </button>
        </div>
      }
    >
      <div className="mb-3">
        <input className="cell max-w-[260px]" placeholder="Cari kode unit / penyewa…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="tbl-wrap rounded-lg border border-slate-100" style={{ maxHeight: 620, overflowY: "auto" }}>
        <table className="data">
          <thead>
            <tr>
              <th>Kode Unit</th>
              <th className="num">Lantai</th>
              <th className="num">Luas m²</th>
              <th>View</th>
              <th>Posisi</th>
              <th>Kondisi</th>
              <th>Denah</th>
              <th>Status</th>
              <th>Penyewa</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ u, i }) => (
              <tr key={i}>
                <td style={{ minWidth: 130 }}>
                  <input className="cell" value={u.Kode_Unit} onChange={(e) => editRow(i, { Kode_Unit: e.target.value })} />
                </td>
                <td className="num" style={{ width: 80 }}>
                  <input className="cell num" type="number" value={u.Lantai} onChange={(e) => editRow(i, { Lantai: Number(e.target.value) })} />
                </td>
                <td className="num" style={{ width: 90 }}>
                  <input className="cell num" type="number" value={u.Luas_NLA_m2} onChange={(e) => editRow(i, { Luas_NLA_m2: Number(e.target.value) })} />
                </td>
                <td><Sel value={u.Kategori_View} opts={VIEW} on={(v) => editRow(i, { Kategori_View: v as KategoriView })} /></td>
                <td><Sel value={u.Posisi} opts={POSISI} on={(v) => editRow(i, { Posisi: v as Posisi })} /></td>
                <td><Sel value={u.Kondisi_Fitout} opts={KONDISI} on={(v) => editRow(i, { Kondisi_Fitout: v as KondisiFitout })} /></td>
                <td><Sel value={u.Denah} opts={DENAH} on={(v) => editRow(i, { Denah: v as Denah })} /></td>
                <td><Sel value={u.Status_Hunian} opts={STATUS} on={(v) => editRow(i, { Status_Hunian: v as StatusHunian })} /></td>
                <td style={{ minWidth: 160 }}>
                  <input className="cell" value={u.Nama_Penyewa} onChange={(e) => editRow(i, { Nama_Penyewa: e.target.value })} />
                </td>
                <td>
                  <button onClick={() => delRow(i)} className="rounded px-2 py-1 text-xs text-rose-600 hover:bg-rose-50">✕</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-slate-400">
        Impor CSV memakai kolom yang sama dengan <code>master_unit_DUMMY.csv</code>: Kode_Gedung, Kode_Unit, Lantai, Luas_NLA_m2, Kategori_View, Posisi, Kondisi_Fitout, Denah, Status_Hunian, Nama_Penyewa, Catatan.
      </p>
    </Card>
  );
}

function Sel({ value, opts, on }: { value: string; opts: string[]; on: (v: string) => void }) {
  return (
    <select className="cell" value={value} onChange={(e) => on(e.target.value)} style={{ minWidth: 120 }}>
      {opts.map((o) => (
        <option key={o} value={o}>{o.replace(/_/g, " ")}</option>
      ))}
    </select>
  );
}
