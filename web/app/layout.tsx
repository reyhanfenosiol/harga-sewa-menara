import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Model Harga Sewa Menara — Menara Nusantara",
  description:
    "Aplikasi penetapan harga sewa gedung perkantoran bertingkat berbasis handbook: tarif dasar, faktor pengali per unit, kalibrasi, dan uji mutu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
