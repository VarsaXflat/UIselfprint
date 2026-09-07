import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/site/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "SELF-PRINTVD — Cetak Dokumen Online, Tanpa Ribet",
  description:
    "Platform cetak dokumen self-service. Upload PDF, Word, atau Excel — atur opsi cetak, lihat harga real-time, antar selesai dalam hitungan menit.",
  keywords: [
    "cetak dokumen online",
    "print online",
    "self service print",
    "cetak PDF",
    "cetak Word",
    "print dokumen",
  ],
  authors: [{ name: "SELF-PRINTVD" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "SELF-PRINTVD — Cetak Dokumen Online",
    description: "Upload, atur, cetak. Selesai dalam hitungan menit.",
    siteName: "SELF-PRINTVD",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "SELF-PRINTVD",
    description: "Cetak dokumen online, tanpa ribet.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
