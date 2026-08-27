export const rp = (x: number, digits = 0) =>
  "Rp " +
  x.toLocaleString("id-ID", { maximumFractionDigits: digits, minimumFractionDigits: digits });

export const rpJt = (x: number) => {
  const abs = Math.abs(x);
  if (abs >= 1e12) return "Rp " + (x / 1e12).toLocaleString("id-ID", { maximumFractionDigits: 2 }) + " T";
  if (abs >= 1e9) return "Rp " + (x / 1e9).toLocaleString("id-ID", { maximumFractionDigits: 2 }) + " M";
  if (abs >= 1e6) return "Rp " + (x / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 1 }) + " jt";
  return rp(x);
};

export const pct = (x: number, digits = 1) =>
  (x * 100).toLocaleString("id-ID", { maximumFractionDigits: digits, minimumFractionDigits: digits }) + "%";

export const fak = (x: number, digits = 4) =>
  x.toLocaleString("id-ID", { maximumFractionDigits: digits, minimumFractionDigits: digits });

export const num = (x: number, digits = 0) =>
  x.toLocaleString("id-ID", { maximumFractionDigits: digits });
