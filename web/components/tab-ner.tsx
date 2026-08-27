"use client";
import React, { useState } from "react";
import type { HasilModel, Parameters } from "@/lib/types";
import { hitungNER, batasBulanGratis } from "@/lib/model";
import { rp, pct, num } from "@/lib/format";
import { Card, Stat, Field, NumInput, Badge, Info } from "@/components/ui";

export function NerTab({ params, hasil }: { params: Parameters; hasil: HasilModel }) {
  const ins = params.insentif;
  const [tarif, setTarif] = useState(Math.round(hasil.r_dipakai));
  const [masa, setMasa] = useState(ins.masa_sewa_baku_bulan);
  const [gratis, setGratis] = useState(ins.bulan_gratis_baku);
  const [luas, setLuas] = useState(400);
  const [ti, setTi] = useState(ins.biaya_ti_rp_m2);
  const [komisi, setKomisi] = useState(ins.komisi_agen_persen_nilai_kontrak);
  const [diskonto, setDiskonto] = useState(params.keuangan.diskonto_tahunan);

  const r = hitungNER({
    tarif,
    masaSewaBulan: masa,
    bulanGratis: gratis,
    luas,
    biayaTiRpM2: ti,
    komisiPersen: komisi,
    diskontoTahunan: diskonto,
  });

  const rMin = hasil.r_min;
  const cAwalPerM2 = r.cAwal / luas;
  const maxGratis = batasBulanGratis(tarif, rMin, masa, cAwalPerM2);

  const nerVsMin = r.nerSederhana >= rMin;
  const gratisAman = gratis <= maxGratis;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 lg:grid-cols-3">
        <Card title="Input Kontrak" subtitle="Untuk menghitung sewa efektif bersih (NER)" className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Tarif nominal" hint="Rp/m²/bln"><NumInput value={tarif} step={1000} onChange={setTarif} /></Field>
            <Field label="Luas unit" hint="m²"><NumInput value={luas} step={10} onChange={setLuas} /></Field>
            <Field label="Masa sewa" hint="bulan"><NumInput value={masa} step={6} onChange={setMasa} /></Field>
            <Field label="Bulan gratis"><NumInput value={gratis} step={1} onChange={setGratis} /></Field>
            <Field label="Biaya TI" hint="Rp/m²"><NumInput value={ti} step={50000} onChange={setTi} /></Field>
            <Field label="Komisi agen" hint="% nilai kontrak"><NumInput value={komisi} step={0.005} onChange={setKomisi} /></Field>
            <Field label="Diskonto tahunan"><NumInput value={diskonto} step={0.005} onChange={setDiskonto} /></Field>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-5">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label={<>Sewa efektif bersih (NER)<Info text="Rata-rata pendapatan sewa riil per m² setelah dikurangi bulan gratis dan biaya insentif — angka yang lebih jujur dibanding tarif nominal di kontrak." /></>} value={rp(Math.round(r.nerSederhana))} hint="Rp/m²/bln" tone="brand" />
            <Stat label={<>NER dengan nilai waktu uang<Info text="Sama seperti NER biasa, tapi memperhitungkan bahwa uang yang diterima nanti bernilai lebih rendah dari uang hari ini." /></>} value={rp(Math.round(r.nerPV))} hint={`tingkat diskonto bulanan ${pct(r.d, 3)}`} />
            <Stat
              label="NER vs batas bawah aman"
              value={pct((r.nerSederhana - rMin) / rMin)}
              hint={`batas bawah ${rp(Math.round(rMin))}`}
              tone={nerVsMin ? "good" : "bad"}
            />
            <Stat
              label={<>Batas maksimum bulan gratis<Info text="Jumlah bulan gratis paling banyak yang boleh diberikan tanpa membuat sewa efektif bersih jatuh di bawah batas bawah aman." /></>}
              value={maxGratis.toFixed(1)}
              hint="bulan"
              tone={gratisAman ? "good" : "bad"}
            />
          </div>

          <Card title="Rincian Biaya Insentif">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              <Row k="Biaya tenant improvement (TI)" v={rp(Math.round(r.cTI))} />
              <Row k="Komisi agen" v={rp(Math.round(r.cKomisi))} />
              <Row k="Total biaya awal pemilik" v={rp(Math.round(r.cAwal))} bold />
              <Row k="Biaya awal per m²" v={rp(Math.round(cAwalPerM2))} />
              <Row k="Nilai kontrak (bruto sewa)" v={rp(Math.round(r.nilaiKontrak))} />
              <Row k="Bulan efektif membayar" v={`${masa - gratis} dari ${masa}`} />
            </dl>
            <div className="mt-3 flex flex-wrap gap-2">
              {nerVsMin ? <Badge tone="good">NER di atas batas bawah</Badge> : <Badge tone="bad">NER di bawah batas bawah</Badge>}
              {gratisAman ? (
                <Badge tone="good">Bulan gratis aman (≤ {maxGratis.toFixed(1)})</Badge>
              ) : (
                <Badge tone="bad">Bulan gratis melebihi batas {maxGratis.toFixed(1)}</Badge>
              )}
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
              NER membandingkan kontrak secara adil setelah memperhitungkan bulan gratis dan biaya insentif —
              dua kontrak dengan tarif nominal berbeda bisa saja nilainya hampir sama.
              Batas maksimum bulan gratis berguna sebagai pagar bagi tim pemasaran agar NER tidak jatuh di bawah batas bawah aman ({rp(Math.round(rMin))}).
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-1.5">
      <dt className="text-slate-500">{k}</dt>
      <dd className={`tnum ${bold ? "font-bold text-slate-900" : "font-semibold text-slate-700"}`}>{v}</dd>
    </div>
  );
}
