"use client";

import { motion } from "framer-motion";
import {
  Upload,
  Wallet,
  Zap,
  Sparkles,
  Shield,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: Upload,
    title: "Upload Sekali, Cetak Langsung",
    description:
      "Drag & drop PDF, Word, atau Excel. Tidak perlu install apa-apa.",
  },
  {
    icon: Wallet,
    title: "Harga Transparan",
    description:
      "Lihat harga real-time sebelum cetak. Tidak ada biaya tersembunyi.",
  },
  {
    icon: Zap,
    title: "Cetak dalam 3 Menit",
    description:
      "Dari upload sampai dokumen siap diambil, rata-rata hanya 3 menit.",
  },
  {
    icon: Sparkles,
    title: "Kualitas Premium",
    description:
      "Printer profesional 1200 dpi, hasil tajam dan konsisten.",
  },
  {
    icon: Shield,
    title: "Privasi Terjaga",
    description:
      "File otomatis dihapus 1 jam setelah dicetak. Data Anda aman.",
  },
  {
    icon: Leaf,
    title: "Ramah Lingkungan",
    description:
      "Kertas FSC-certified dan opsi hemat kertas duplex.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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

export function Features() {
  return (
    <section
      id="fitur"
      aria-labelledby="fitur-heading"
      className="py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border border-border bg-[var(--brand-soft)] px-3 py-1 text-xs font-medium tracking-wide text-[var(--brand-deep)]">
            Fitur Unggulan
          </span>
          <h2
            id="fitur-heading"
            className="mt-5 font-display text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl"
          >
            Kenapa <em className="font-display italic text-[var(--brand-deep)]">SELF-PRINTVD</em>?
          </h2>
          <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
            Kami menggabungkan kecepatan, transparansi, dan kualitas dalam satu
            platform cetak dokumen self-service. Semua diatur dari layar Anda,
            selesai dalam hitungan menit.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card
                className="group h-full transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-md"
              >
                <CardContent className="flex h-full flex-col gap-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-[var(--brand-soft)] text-[var(--brand-deep)] transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="size-5" aria-hidden="true" />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <h3 className="text-base font-semibold leading-snug text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Features;
