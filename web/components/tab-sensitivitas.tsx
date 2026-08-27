"use client";
import React, { useState } from "react";
import type { HasilModel, Parameters } from "@/lib/types";
import {
  pendapatanTahunan,
  okupansiPadaTarif,
  tarifTahunKe,
  nilaiKiniTumbuh,
} from "@/lib/model";
import { rp, rpJt, pct, num } from "@/lib/format";
import { Card, Stat, Field, NumInput, Info } from "@/components/ui";

export function Sensitivitas({ params, hasil }: { params: Parameters; hasil: HasilModel }) {
  const k = params.keuangan;
  const nla = params.gedung.nla_m2;
  const rBase = hasil.r_dipakai;

  const [elastis, setElastis] = useState(params.sensitivitas.elastisitas_okupansi);

  // ambang impas tahunan (kewajiban kas)
  const kewajiban = k.opex_tahunan_rp + k.cadangan_capex_tahunan_rp + k.cicilan_utang_tahunan_rp - k.pendapatan_lain_tahunan_rp;

  const tarifVar = params.sensitivitas.variasi_tarif.map((d) => Math.round(rBase * (1 + d)));
  const okVar = params.sensitivitas.variasi_okupansi;

  // Elastisitas: okupansi & RevPAM pada tiap tarif
  const oBase = k.okupansi_target;
  const revBase = rBase * oBase;

  // Eskalasi 5 tahun
  const g = k.eskalasi_sewa_tahunan;
  const tahun = [1, 2, 3, 4, 5].map((n) => ({ n, tarif: tarifTahunKe(rBase, g, n) }));
  const luasContoh = 400;
  const pv = nilaiKiniTumbuh(rBase, luasContoh, g, k.diskonto_tahunan, 5);
  const nominal5 = tahun.reduce((a, t) => a + t.tarif * luasContoh * 12, 0);

  return (
    <div className="space-y-5">
      {/* Two-way */}
      <Card
        title="Simulasi Pendapatan Sewa Tahunan"
        subtitle={`Baris = tarif, kolom = tingkat isi gedung. Merah = pendapatan di bawah kebutuhan kas ${rpJt(kewajiban)}/thn (biaya operasional + renovasi + cicilan utang).`}
      >
        <div className="tbl-wrap rounded-lg border border-slate-100">
          <table className="data">
            <thead>
              <tr>
                <th>Tarif ↓ / Okupansi →</th>
                {okVar.map((o) => (
                  <th key={o} className="num">{pct(o, 0)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tarifVar.map((t) => (
                <tr key={t}>
                  <td className="font-semibold">{rp(t)}{t === Math.round(rBase) && <span className="ml-1 text-[10px] text-teal-700">(dasar)</span>}</td>
                  {okVar.map((o) => {
                    const p = pendapatanTahunan(t, nla, o); // per tahun sudah × 12 di fungsi
                    const bahaya = p < kewajiban;
                    return (
                      <td key={o} className="num" style={{ background: bahaya ? "#fef2f2" : "#ecfdf5", color: bahaya ? "#b91c1c" : "#065f46" }}>
                        {rpJt(p)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Elastisitas */}
        <Card title={<>Dampak Perubahan Tarif<Info text="Menaikkan tarif biasanya menurunkan tingkat isi gedung, dan sebaliknya. Kartu ini memperkirakan berapa besar dampaknya terhadap pendapatan." /></>} subtitle="Bagaimana kenaikan/penurunan tarif memengaruhi tingkat isi & pendapatan per m²">
          <div className="mb-3 max-w-[200px]">
            <Field label={<>Sensitivitas tingkat isi terhadap tarif<Info text="Contoh: −0,6 berarti kenaikan tarif 10% menurunkan tingkat isi gedung sekitar 6%. Simbol di handbook: ε (epsilon)." /></>} hint="lazimnya −0,4 s.d. −0,8">
              <NumInput value={elastis} step={0.05} onChange={setElastis} />
            </Field>
          </div>
          <div className="tbl-wrap rounded-lg border border-slate-100">
            <table className="data">
              <thead>
                <tr>
                  <th className="num">Tarif</th>
                  <th className="num">Perubahan tarif</th>
                  <th className="num">Perkiraan tingkat isi</th>
                  <th className="num">Pendapatan per m² (RevPAM)</th>
                  <th className="num">vs tarif dasar</th>
                </tr>
              </thead>
              <tbody>
                {tarifVar.map((t) => {
                  const oBaru = Math.min(1, okupansiPadaTarif(oBase, rBase, t, elastis));
                  const rev = t * oBaru;
                  const naik = rev >= revBase;
                  return (
                    <tr key={t}>
                      <td className="num font-medium">{rp(t)}</td>
                      <td className="num">{pct((t - rBase) / rBase)}</td>
                      <td className="num">{pct(oBaru)}</td>
                      <td className="num font-semibold">{rp(Math.round(rev))}</td>
                      <td className="num" style={{ color: naik ? "#059669" : "#dc2626" }}>{pct((rev - revBase) / revBase)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">
            Menaikkan tarif masih menguntungkan selama angka sensitivitas di atas berada antara −1 dan 1. Saat ini nilainya {Math.abs(elastis).toFixed(2)} →{" "}
            <b>{Math.abs(elastis) < 1 ? "aman menaikkan tarif (pendapatan tetap naik meski tingkat isi sedikit turun)" : "berisiko (kenaikan tarif justru bisa menurunkan pendapatan total)"}</b>.
          </p>
        </Card>

        {/* Eskalasi & PV */}
        <Card title={<>Kenaikan Sewa Tahunan & Nilai Uang Sekarang<Info text="Nilai kini (present value): karena uang di masa depan bernilai lebih rendah dari uang hari ini, pendapatan sewa beberapa tahun ke depan perlu 'didiskon' supaya bisa dibandingkan secara adil." /></>} subtitle={`Kenaikan sewa ${pct(g)}/thn · tingkat diskonto ${pct(k.diskonto_tahunan)}/thn`}>
          <div className="tbl-wrap rounded-lg border border-slate-100">
            <table className="data">
              <thead>
                <tr>
                  <th className="num">Tahun</th>
                  <th className="num">Tarif Rp/m²/bln</th>
                  <th className="num">Pendapatan/thn (400 m²)</th>
                </tr>
              </thead>
              <tbody>
                {tahun.map((t) => (
                  <tr key={t.n}>
                    <td className="num">{t.n}</td>
                    <td className="num font-medium">{rp(Math.round(t.tarif))}</td>
                    <td className="num">{rpJt(t.tarif * luasContoh * 12)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Stat label="Nilai sekarang dari sewa 5 thn (400 m²)" value={rpJt(pv)} hint="setelah didiskon" tone="brand" />
            <Stat label="Total nominal 5 thn" value={rpJt(nominal5)} hint={`selisih akibat nilai waktu uang ${rpJt(nominal5 - pv)}`} />
          </div>
        </Card>
      </div>

      {/* Skenario baku */}
      <Card title="Tiga Skenario Perencanaan" subtitle="Konservatif · Dasar · Optimistis">
        <div className="grid gap-3 md:grid-cols-3">
          {[
            { nama: "Konservatif", dTarif: -0.08, dOk: -0.07, esk: 0.02, tone: "bad" as const },
            { nama: "Dasar", dTarif: 0, dOk: 0, esk: 0.03, tone: "brand" as const },
            { nama: "Optimistis", dTarif: 0.06, dOk: 0.05, esk: 0.04, tone: "good" as const },
          ].map((s) => {
            const t = rBase * (1 + s.dTarif);
            const o = Math.min(1, oBase + s.dOk);
            const pend = pendapatanTahunan(t, nla, o);
            return (
              <div key={s.nama} className={`rounded-xl border p-4 ${s.tone === "good" ? "border-emerald-200 bg-emerald-50" : s.tone === "bad" ? "border-rose-200 bg-rose-50" : "border-teal-200 bg-teal-50"}`}>
                <div className="text-sm font-bold text-slate-800">{s.nama}</div>
                <dl className="mt-2 space-y-1 text-xs text-slate-600">
                  <div className="flex justify-between"><dt>Tarif</dt><dd className="font-semibold tnum">{rp(Math.round(t))}</dd></div>
                  <div className="flex justify-between"><dt>Okupansi</dt><dd className="font-semibold tnum">{pct(o)}</dd></div>
                  <div className="flex justify-between"><dt>Eskalasi</dt><dd className="font-semibold tnum">{pct(s.esk)}</dd></div>
                  <div className="flex justify-between border-t border-slate-200 pt-1"><dt>Pendapatan/thn</dt><dd className="font-bold tnum">{rpJt(pend)}</dd></div>
                </dl>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
