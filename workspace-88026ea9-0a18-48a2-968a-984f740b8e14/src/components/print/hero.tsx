"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Shield,
  Star,
  Sparkles,
  Printer,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATS = [
  { value: "12rb+", label: "Dokumen dicetak" },
  { value: "3 mnt", label: "Rata-rata waktu" },
  { value: "4.9", label: "Rating pelanggan" },
];

const FLOATING_TAGS = [
  { label: "PDF", className: "top-[18%] left-[8%]", delay: 0 },
  { label: "DOCX", className: "top-[68%] left-[14%]", delay: 0.4 },
  { label: "XLSX", className: "top-[28%] right-[10%]", delay: 0.2 },
  { label: "A4", className: "bottom-[14%] right-[18%]", delay: 0.6 },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden pt-28 md:pt-36 pb-20 md:pb-28">
      {/* Background mesh + grain */}
      <div className="absolute inset-0 mesh-gradient opacity-70 pointer-events-none" />
      <div className="absolute inset-0 grain pointer-events-none" />
      {/* Decorative blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-[var(--brand-soft)] blur-3xl opacity-50 pointer-events-none"
        animate={reduce ? {} : { scale: [1, 1.08, 1], opacity: [0.4, 0.55, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-accent blur-3xl opacity-40 pointer-events-none"
        animate={reduce ? {} : { scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3.5 py-1.5 text-xs font-medium text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand)] opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--brand-deep)]" />
              </span>
              Layanan cetak 24/7 — buka sekarang
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-balance leading-[1.05]"
            >
              Cetak dokumen
              <br />
              <em className="font-display italic text-[var(--brand-deep)] font-normal">
                tanpa ribet,
              </em>{" "}
              selesai dalam menit.
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-base md:text-lg text-muted-foreground text-pretty max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Upload PDF, Word, atau Excel — atur opsi cetak, lihat harga
              real-time. Tanpa antri, tanpa instal software, tanpa kejutan biaya.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="group w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 text-base shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/20 transition-all"
              >
                <Link href="#cetak">
                  Mulai cetak sekarang
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto h-12 px-6 text-base bg-card/50 backdrop-blur hover:bg-card"
              >
                <Link href="#cara-kerja">Lihat cara kerja</Link>
              </Button>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 flex items-center gap-5 justify-center lg:justify-start text-xs text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-[var(--brand-deep)]" />
                Tanpa registrasi
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5 text-[var(--brand-deep)]" />
                File terenkripsi
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-[var(--brand-deep)] fill-[var(--brand)]" />
                4.9/5 dari 2.300+ ulasan
              </span>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            >
              {STATS.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="text-2xl md:text-3xl font-semibold tracking-tight font-display">
                    {s.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-sm">
              {/* Floating tags */}
              {FLOATING_TAGS.map((t) => (
                <motion.div
                  key={t.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 + t.delay * 0.2 }}
                  className={cn(
                    "absolute z-20 hidden sm:flex items-center gap-1.5 rounded-full border border-border bg-card/90 backdrop-blur px-3 py-1.5 text-xs font-semibold shadow-lg",
                    t.className,
                  )}
                >
                  <motion.span
                    animate={reduce ? {} : { y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: t.delay }}
                  >
                    {t.label === "PDF" || t.label === "DOCX" || t.label === "XLSX" ? (
                      <FileText className="h-3 w-3 text-[var(--brand-deep)]" />
                    ) : (
                      <Sparkles className="h-3 w-3 text-[var(--brand-deep)]" />
                    )}
                  </motion.span>
                  {t.label}
                </motion.div>
              ))}

              {/* Main visual card — printer illustration */}
              <motion.div
                animate={reduce ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative rounded-3xl border border-border bg-card/80 backdrop-blur shadow-2xl shadow-primary/5 p-6 overflow-hidden"
              >
                {/* Top bar */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--brand-deep)]/30" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--brand-deep)]/30" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--brand-deep)]/30" />
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    LIVE PREVIEW
                  </div>
                </div>

                {/* Printer illustration */}
                <div className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-muted/60 to-muted/20 border border-border/60 overflow-hidden">
                  <div className="absolute inset-0 grid place-items-center">
                    <motion.div
                      animate={reduce ? {} : { rotate: [0, 2, -2, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Printer className="h-20 w-20 text-foreground/80" strokeWidth={1.2} />
                    </motion.div>
                  </div>

                  {/* Paper coming out */}
                  <motion.div
                    initial={{ y: -8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
                    className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-40 bg-card rounded-md border border-border shadow-md p-3 space-y-1.5"
                  >
                    <div className="h-1.5 w-3/4 bg-foreground/20 rounded-full" />
                    <div className="h-1.5 w-full bg-foreground/10 rounded-full" />
                    <div className="h-1.5 w-full bg-foreground/10 rounded-full" />
                    <div className="h-1.5 w-2/3 bg-foreground/10 rounded-full" />
                    <div className="h-1.5 w-full bg-foreground/10 rounded-full" />
                    <div className="h-1.5 w-1/2 bg-foreground/10 rounded-full" />
                    <div className="mt-2 h-4 w-10 bg-[var(--brand)] rounded-sm" />
                  </motion.div>
                </div>

                {/* Stats overlay */}
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { label: "Halaman", value: "24" },
                    { label: "Copy", value: "2" },
                    { label: "Total", value: "Rp14.4k" },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                      className="rounded-lg bg-muted/40 p-2.5"
                    >
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                        {item.label}
                      </div>
                      <div className="text-sm font-semibold mt-0.5">{item.value}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="absolute -bottom-4 -right-4 sm:-right-8 z-20 rounded-2xl border border-border bg-card shadow-xl p-3 flex items-center gap-2.5"
              >
                <div className="grid place-items-center h-9 w-9 rounded-xl bg-[var(--brand-soft)]">
                  <Sparkles className="h-4 w-4 text-[var(--brand-deep)]" />
                </div>
                <div>
                  <div className="text-xs font-semibold leading-none">Selesai!</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">3 menit 12 detik</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
