"use client";

import { motion } from "framer-motion";
import { Printer, ArrowRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-[var(--brand)]/30 bg-[var(--brand-soft)] px-6 py-16 md:px-16 md:py-20"
        >
          {/* Decorative floating printer */}
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 0.12, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none absolute -right-8 -top-8 hidden md:block"
          >
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Printer className="size-64 text-[var(--brand-deep)]" />
            </motion.div>
          </motion.div>

          {/* Soft gradient glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 bottom-0 size-72 rounded-full bg-[var(--brand)]/10 blur-3xl"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-[var(--brand)]/30 bg-background/70 px-3 py-1 text-xs font-medium tracking-wide text-[var(--brand-deep)] backdrop-blur-sm">
              Mulai Sekarang
            </span>
            <h2
              id="cta-heading"
              className="mt-5 font-display text-3xl leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl"
            >
              Siap <em className="font-display italic text-[var(--brand-deep)]">mencetak</em> dokumen Anda?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-foreground/80 md:text-lg">
              Gratis daftar, bayar hanya saat cetak. Tanpa langganan, tanpa
              ribet.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
              >
                <a href="#cetak" aria-label="Mulai cetak dokumen">
                  Mulai Cetak
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group w-full border-[var(--brand)]/40 bg-background/60 backdrop-blur-sm hover:bg-background hover:text-[var(--brand-deep)] sm:w-auto"
              >
                <a href="#fitur" aria-label="Lihat harga dan fitur">
                  <Eye className="size-4" />
                  Lihat Harga
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Cta;
