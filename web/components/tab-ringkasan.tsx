"use client";
import React from "react";
import type { HasilModel, Parameters } from "@/lib/types";
import type { ModeTarif } from "@/lib/model";
import { rp, rpJt, pct, fak, num } from "@/lib/format";
import { Card, Stat, Badge, Info } from "@/components/ui";

export function Ringkasan({
  hasil,
  params,
  modeTarif,
}: {
  hasil: HasilModel;
  params: Parameters;
  modeTarif: ModeTarif;
}) {
  const g = params.gedung;
  const zonaNama = params.faktor_lantai.zona.map((z) => z.nama);
  const tarifZona = zonaNama.map((zn) => {
    const set = hasil.units.filter((h) => h.zona === zn);
    const l = set.reduce((a, b) => a + b.unit.Luas_NLA_m2, 0);
    const lr = set.reduce((a, b) => a + b.unit.Luas_NLA_m2 * b.r_publikasi, 0);
    const fl = set.length ? set.reduce((a, b) => a + b.f_lantai, 0) / set.length : 0;
    return { nama: zn, unit: set.length, nla: l, tarif: l > 0 ? lr / l : 0, fLantai: fl };
  });

  const pgiTahunan = hasil.rata_publikasi_tertimbang * hasil.total_nla * 12;
  const pendapatanOkupansi = pgiTahunan * params.keuangan.okupansi_target;
  const revpam = hasil.rata_publikasi_tertimbang * params.keuangan.okupansi_target;

  const koridorTone =
    hasil.status_koridor === "DI DALAM KORIDOR" ? "good" : "warn";
  const impasTone = hasil.status_impas === "AMAN" ? "good" : "bad";

  return (
    <div className="space-y-5">
      {/* KPI utama */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat
          label={<>Tarif Dasar Gedung (R*)<Info text="Angka acuan harga sewa per m² untuk seluruh gedung. Tarif tiap unit dihitung dari angka ini dikalikan faktor lantai, pemandangan, dsb." /></>}
          value={rp(Math.round(hasil.r_dipakai))}
          hint={modeTarif === "OTOMATIS" ? "Otomatis · nilai tengah dari batas bawah, harga pasar, batas atas" : "Diisi manual"}
          tone="brand"
        />
        <Stat label="Service Charge" value={rp(params.tarif.service_charge_rp_m2_bulan)} hint="biaya pengelolaan gedung, per m²/bulan" />
        <Stat
          label={<>Faktor Penyeimbang (k)<Info text="Angka koreksi otomatis agar rata-rata tarif seluruh unit tetap sama dengan Tarif Dasar Gedung, walau komposisi unit berubah." /></>}
          value={fak(hasil.k, 4)}
          hint="Sehat di kisaran 0,90–1,10"
          tone={hasil.k >= 0.9 && hasil.k <= 1.1 ? "good" : "warn"}
        />
        <Stat
          label="Tingkat Isi Gedung Saat Ini"
          value={pct(hasil.okupansi_aktual)}
          hint={`${num(hasil.nla_terisi)} / ${num(hasil.total_nla)} m² terisi`}
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Penentuan tarif dasar */}
        <Card
          title="Bagaimana Tarif Dasar Ditentukan"
          subtitle="Tiga cara pandang harga digabung jadi satu angka, dengan batas aman atas & bawah"
          className="lg:col-span-2"
        >
          <Koridor hasil={hasil} />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <MiniStat label={<>Harga pasar<Info text="Rata-rata tarif gedung-gedung pembanding di sekitar, setelah disesuaikan dengan kondisi gedung kita." /></>} value={rp(Math.round(hasil.r_pasar))} note="dari gedung pembanding" />
            <MiniStat label={<>Harga yang dibutuhkan<Info text="Tarif minimum agar gedung mencapai target keuntungan (cap rate) yang diinginkan pemilik." /></>} value={rp(Math.round(hasil.r_butuh))} note="agar target untung tercapai" tone={hasil.r_butuh > hasil.r_dipakai ? "warn" : "good"} />
            <MiniStat label={<>Titik impas<Info text="Tarif serendah-rendahnya agar gedung tidak rugi kas — di bawah ini, makin banyak yang disewa justru makin rugi." /></>} value={rp(Math.round(hasil.r_impas))} note="batas aman minimum" tone={impasTone} />
            <MiniStat label="Batas bawah yang diizinkan" value={rp(Math.round(hasil.r_min))} note="tidak boleh di bawah ini" />
            <MiniStat label="Batas atas yang diizinkan" value={rp(Math.round(hasil.r_maks))} note="tidak boleh di atas ini" />
            <MiniStat label="Tarif dasar terpilih (R*)" value={rp(Math.round(hasil.r_bintang))} note="nilai tengah dari ketiganya" tone="brand" />
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <Badge tone={koridorTone as any}>{hasil.status_koridor}</Badge>
            <Badge tone={impasTone as any}>Titik impas: {hasil.status_impas}</Badge>
            <span className="text-slate-500">
              Selisih thd harga yang dibutuhkan: <b className={hasil.r_dipakai < hasil.r_butuh ? "text-amber-700" : "text-emerald-700"}>
                {pct((hasil.r_dipakai - hasil.r_butuh) / hasil.r_butuh)}
              </b>
              {" · "}Untung riil yang tercapai: <b>{pct(hasil.cap_rate_riil, 2)}</b> (target {pct(params.keuangan.cap_rate_target, 2)})
              <Info text="Cap rate: persentase keuntungan tahunan dibanding nilai gedung. 'Riil' artinya dihitung dari tarif yang benar-benar dipakai, bukan target di atas kertas." />
            </span>
          </div>
        </Card>

        {/* Keuangan */}
        <Card title="Ikhtisar Keuangan Gedung" subtitle="Berdasarkan target tingkat isi gedung">
          <dl className="space-y-2.5 text-sm">
            <Row k={<>Untung bersih target (NOI)<Info text="Net Operating Income: pendapatan sewa dikurangi biaya operasional gedung, sebelum pajak & cicilan." /></>} v={rpJt(hasil.noi_target)} />
            <Row k={<>Potensi pendapatan penuh/thn<Info text="Pendapatan bila 100% gedung terisi sepanjang tahun (belum dikurangi kekosongan)." /></>} v={rpJt(pgiTahunan)} />
            <Row k="Pendapatan pada tingkat isi target" v={rpJt(pendapatanOkupansi)} />
            <Row k={<>Pendapatan per m² tersedia (RevPAM)<Info text="Gabungan tarif dan tingkat isi gedung jadi satu angka kinerja — makin tinggi makin baik." /></>} v={rp(Math.round(revpam)) + " /m²/bln"} />
            <Row k={<>Batas isi minimum agar tidak rugi<Info text="Selama gedung terisi di atas persentase ini, arus kas masih aman meski di tarif pasar." /></>} v={pct(hasil.o_min)} tone={hasil.o_min < params.keuangan.okupansi_target ? "good" : "bad"} />
            <Row k="Nilai aset" v={rpJt(params.keuangan.nilai_aset_rp)} />
          </dl>
        </Card>
      </div>

      {/* Uji mutu + zona */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card title="Uji Kualitas Model" subtitle="11 pemeriksaan otomatis yang memastikan angka masuk akal">
          <div className="overflow-hidden rounded-lg border border-slate-100">
            <table className="w-full text-sm">
              <tbody>
                {hasil.cek_mutu.map((c) => (
                  <tr key={c.no} className="border-b border-slate-100 last:border-0">
                    <td className="px-3 py-2 text-slate-700">
                      <span className="mr-1.5 text-slate-400">{c.no}.</span>
                      {c.nama}
                    </td>
                    <td className="px-2 py-2 text-right tnum text-slate-600">{c.nilai}</td>
                    <td className="px-2 py-2 text-right text-xs text-slate-400">{c.ambang}</td>
                    <td className="px-3 py-2 text-right">
                      <Badge tone={c.status === "LULUS" ? "good" : "warn"}>{c.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Tarif Rata-rata per Zona Lantai" subtitle="Wajarnya naik dari lantai bawah ke lantai atas">
          <div className="space-y-2">
            {tarifZona.map((z) => {
              const maxT = Math.max(...tarifZona.map((x) => x.tarif), 1);
              return (
                <div key={z.nama} className="flex items-center gap-3">
                  <div className="w-16 text-xs font-medium text-slate-600">{z.nama}</div>
                  <div className="relative h-6 flex-1 rounded bg-slate-100">
                    <div
                      className="absolute inset-y-0 left-0 rounded bg-teal-600"
                      style={{ width: `${(z.tarif / maxT) * 100}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-end pr-2 text-[11px] font-semibold text-slate-700 tnum">
                      {z.tarif > 0 ? rp(Math.round(z.tarif)) : "—"}
                    </div>
                  </div>
                  <div className="w-24 text-right text-[11px] text-slate-400">
                    {z.unit} unit · f {fak(z.fLantai, 3)}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Koridor({ hasil }: { hasil: HasilModel }) {
  const lo = hasil.r_min;
  const hi = hasil.r_maks;
  const span = hi - lo || 1;
  const posPasar = ((hasil.r_pasar - lo) / span) * 100;
  const posStar = ((hasil.r_dipakai - lo) / span) * 100;
  const posButuh = ((hasil.r_butuh - lo) / span) * 100;
  const clamp = (x: number) => Math.max(0, Math.min(100, x));
  return (
    <div className="pt-6">
      <div className="relative h-2 rounded-full bg-gradient-to-r from-amber-200 via-emerald-200 to-amber-200">
        {/* R* marker */}
        <Marker pos={clamp(posStar)} color="#0f766e" label="R*" top value={rp(Math.round(hasil.r_dipakai))} />
        {/* R pasar */}
        <Marker pos={clamp(posPasar)} color="#64748b" label="pasar" value={rp(Math.round(hasil.r_pasar))} />
        {/* R butuh (bisa di luar) */}
        {posButuh <= 105 && (
          <Marker pos={clamp(posButuh)} color="#b45309" label="butuh" value={rp(Math.round(hasil.r_butuh))} />
        )}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-slate-400">
        <span>min {rp(Math.round(lo))}</span>
        <span>maks {rp(Math.round(hi))}</span>
      </div>
      {posButuh > 105 && (
        <div className="mt-1 text-[10px] text-amber-600">
          R butuh {rp(Math.round(hasil.r_butuh))} berada di atas koridor — target imbal hasil belum tercapai pada tarif pasar.
        </div>
      )}
    </div>
  );
}

function Marker({
  pos,
  color,
  label,
  value,
  top,
}: {
  pos: number;
  color: string;
  label: string;
  value: string;
  top?: boolean;
}) {
  return (
    <div className="absolute -translate-x-1/2" style={{ left: `${pos}%`, top: top ? -20 : 10 }}>
      <div className="flex flex-col items-center">
        {top && <span className="mb-0.5 text-[10px] font-semibold tnum" style={{ color }}>{label} {value}</span>}
        <div className="h-3 w-3 rounded-full border-2 border-white shadow" style={{ background: color }} />
        {!top && <span className="mt-0.5 text-[10px] tnum" style={{ color }}>{label}</span>}
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  note,
  tone = "default",
}: {
  label: React.ReactNode;
  value: string;
  note?: string;
  tone?: "default" | "good" | "warn" | "bad" | "brand";
}) {
  const c: Record<string, string> = {
    default: "text-slate-900",
    good: "text-emerald-700",
    warn: "text-amber-700",
    bad: "text-rose-700",
    brand: "text-teal-800",
  };
  return (
    <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5">
      <div className="text-[10px] font-medium uppercase tracking-wide text-slate-400">{label}</div>
      <div className={`text-base font-bold tnum ${c[tone]}`}>{value}</div>
      {note && <div className="text-[10px] leading-tight text-slate-400">{note}</div>}
    </div>
  );
}

function Row({ k, v, tone }: { k: React.ReactNode; v: string; tone?: "good" | "bad" }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-slate-50 pb-1.5">
      <dt className="text-slate-500">{k}</dt>
      <dd className={`font-semibold tnum ${tone === "good" ? "text-emerald-700" : tone === "bad" ? "text-rose-700" : "text-slate-800"}`}>
        {v}
      </dd>
    </div>
  );
}
