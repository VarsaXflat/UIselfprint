"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Step = {
  number: string;
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    number: "01",
    title: "Upload Dokumen",
    description:
      "Tarik file Anda ke kotak upload. Kami mendukung PDF, DOCX, dan XLSX hingga 50MB.",
  },
  {
    number: "02",
    title: "Atur Opsi Cetak",
    description:
      "Pilih warna, ukuran kertas, jumlah copy, dan finishing. Harga update otomatis.",
  },
  {
    number: "03",
    title: "Bayar & Ambil",
    description:
      "Bayar via QRIS/e-wallet. Dokumen siap diambil di loket atau diantar same-day.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HowItWorks() {
  return (
    <section
      id="cara-kerja"
      aria-labelledby="cara-kerja-heading"
      className="bg-[var(--brand-soft)]/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border border-border bg-background px-3 py-1 text-xs font-medium tracking-wide text-[var(--brand-deep)]">
            Cara Kerja
          </span>
          <h2
            id="cara-kerja-heading"
            className="mt-5 font-display text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl"
          >
            Tiga langkah, <em className="font-display italic text-[var(--brand-deep)]">selesai</em>.
          </h2>
          <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
            Dari file mentah sampai dokumen tercetak, semua proses dirancang
            sederhana dan transparan.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="relative mt-16"
        >
          {/* Dashed connecting line on desktop */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[2.25rem] hidden border-t-2 border-dashed border-[var(--brand)]/40 md:block"
          />

          <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((step) => (
              <motion.li
                key={step.number}
                variants={itemVariants}
                className="relative flex flex-col items-center text-center md:items-start md:text-left"
              >
                <div className="relative z-10 flex size-18 items-center justify-center rounded-full bg-background shadow-sm ring-1 ring-border">
                  <span className="font-display text-2xl italic text-[var(--brand-deep)]">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </motion.li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex justify-center"
        >
          <Button
            asChild
            size="lg"
            className="group bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <a href="#cetak" aria-label="Mulai cetak sekarang">
              Mulai Cetak Sekarang
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default HowItWorks;
