"use client";

import React, { useEffect, useMemo, useState } from "react";
import { DEFAULT_PARAMS, DEFAULT_UNITS, DEFAULT_PEMBANDING, DEFAULT_MODE_TARIF } from "@/lib/defaults";
import type { Parameters, Unit, Pembanding } from "@/lib/types";
import { hitungModel, type ModeTarif } from "@/lib/model";
import { rp, pct } from "@/lib/format";
import { Badge } from "@/components/ui";
import { Panduan } from "@/components/tab-panduan";
import { Ringkasan } from "@/components/tab-ringkasan";
import { RateCard } from "@/components/tab-ratecard";
import { ParameterEditor } from "@/components/tab-parameter";
import { UnitEditor } from "@/components/tab-unit";
import { PembandingTab } from "@/components/tab-pembanding";
import { Sensitivitas } from "@/components/tab-sensitivitas";
import { NerTab } from "@/components/tab-ner";

const STORAGE_KEY = "harga-sewa-menara:v1";

type State = {
  params: Parameters;
  units: Unit[];
  pembanding: Pembanding[];
  modeTarif: ModeTarif;
};

const TABS = [
  { id: "panduan", label: "Panduan" },
  { id: "ringkasan", label: "Ringkasan" },
  { id: "ratecard", label: "Daftar Harga" },
  { id: "parameter", label: "Parameter" },
  { id: "unit", label: "Data Unit" },
  { id: "pembanding", label: "Gedung Pembanding" },
  { id: "sensitivitas", label: "Simulasi Tarif" },
  { id: "ner", label: "Sewa Efektif & Insentif" },
] as const;

type TabId = (typeof TABS)[number]["id"];

function initialState(): State {
  return {
    params: structuredClone(DEFAULT_PARAMS),
    units: structuredClone(DEFAULT_UNITS),
    pembanding: structuredClone(DEFAULT_PEMBANDING),
    modeTarif: DEFAULT_MODE_TARIF,
  };
}

export default function Page() {
  const [state, setState] = useState<State>(initialState);
  const [tab, setTab] = useState<TabId>("panduan");
  const [loaded, setLoaded] = useState(false);

  // muat dari localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({
          params: { ...structuredClone(DEFAULT_PARAMS), ...parsed.params },
          units: parsed.units ?? structuredClone(DEFAULT_UNITS),
          pembanding: parsed.pembanding ?? structuredClone(DEFAULT_PEMBANDING),
          modeTarif: parsed.modeTarif ?? DEFAULT_MODE_TARIF,
        });
      }
    } catch {}
    setLoaded(true);
  }, []);

  // simpan ke localStorage
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state, loaded]);

  const hasil = useMemo(
    () => hitungModel(state.params, state.units, state.pembanding, state.modeTarif),
    [state]
  );

  const setParams = (p: Parameters) => setState((s) => ({ ...s, params: p }));
  const setUnits = (u: Unit[]) => setState((s) => ({ ...s, units: u }));
  const setPembanding = (pb: Pembanding[]) => setState((s) => ({ ...s, pembanding: pb }));
  const setModeTarif = (m: ModeTarif) => setState((s) => ({ ...s, modeTarif: m }));

  const reset = () => {
    if (confirm("Kembalikan seluruh data ke bawaan dummy? Perubahan Anda akan hilang.")) {
      setState(initialState());
    }
  };

  const gagal = hasil.cek_mutu.filter((c) => c.status === "PERIKSA").length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-teal-700 text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
                <path d="M2 22h20M9 6h.01M14 6h.01M9 10h.01M14 10h.01M9 14h.01M14 14h.01" />
              </svg>
            </div>
            <div>
              <div className="text-sm font-bold leading-tight text-slate-900">
                {state.params.gedung.nama}
              </div>
              <div className="text-[11px] text-slate-500">
                Model Harga Sewa Menara · {state.params.gedung.kode} · Grade {state.params.gedung.grade}
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <div className="text-[10px] uppercase tracking-wide text-slate-400">Tarif Dasar Gedung</div>
              <div className="text-lg font-bold text-teal-800 tnum">{rp(Math.round(hasil.r_dipakai))}</div>
            </div>
            <div className="hidden text-right md:block">
              <div className="text-[10px] uppercase tracking-wide text-slate-400">Uji Mutu</div>
              <div>
                {gagal === 0 ? (
                  <Badge tone="good">Semua LULUS</Badge>
                ) : (
                  <Badge tone="warn">{gagal} PERIKSA</Badge>
                )}
              </div>
            </div>
            <button
              onClick={reset}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
            >
              Reset dummy
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-auto max-w-[1400px] px-2">
          <nav className="flex gap-1 overflow-x-auto">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm font-medium transition ${
                  tab === t.id
                    ? "border-teal-700 text-teal-800"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-[1400px] px-4 py-5">
        {tab === "panduan" && <Panduan />}
        {tab === "ringkasan" && <Ringkasan hasil={hasil} params={state.params} modeTarif={state.modeTarif} />}
        {tab === "ratecard" && <RateCard hasil={hasil} params={state.params} />}
        {tab === "parameter" && (
          <ParameterEditor
            params={state.params}
            setParams={setParams}
            modeTarif={state.modeTarif}
            setModeTarif={setModeTarif}
            hasil={hasil}
          />
        )}
        {tab === "unit" && <UnitEditor units={state.units} setUnits={setUnits} />}
        {tab === "pembanding" && (
          <PembandingTab pembanding={state.pembanding} setPembanding={setPembanding} hasil={hasil} />
        )}
        {tab === "sensitivitas" && <Sensitivitas params={state.params} hasil={hasil} />}
        {tab === "ner" && <NerTab params={state.params} hasil={hasil} />}
      </main>

      <footer className="mx-auto max-w-[1400px] px-4 pb-8 pt-2 text-center text-[11px] leading-relaxed text-slate-400">
        Seluruh angka adalah <b>data dummy</b> menyerupai pasar perkantoran Jakarta pertengahan 2026.
        Model ini alat bantu analisis internal, bukan laporan penilaian resmi. Untuk keperluan yang
        mengikat secara hukum, hasil wajib diverifikasi Penilai Publik berizin (SPI).
      </footer>
    </div>
  );
}
