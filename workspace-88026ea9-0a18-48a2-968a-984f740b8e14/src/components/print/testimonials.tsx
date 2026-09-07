"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Cepat banget, upload PDF langsung jadi. Harganya juga jelas dari awal, nggak kaget pas bayar.",
    name: "Sari Wulandari",
    role: "Mahasiswa UI",
    initials: "SW",
  },
  {
    quote:
      "Saya cetak skripsi 200 halaman di sini. Kualitasnya rapi, bindingnya kokoh. Recommended!",
    name: "Budi Santoso",
    role: "Fresh Graduate",
    initials: "BS",
  },
  {
    quote:
      "Sebagai freelancer, sering banget butuh cetak dokumen mendadak. SELF-PRINTVD solusi banget.",
    name: "Maya Putri",
    role: "Freelance Designer",
    initials: "MP",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

export function Testimonials() {
  return (
    <section
      id="testimoni"
      aria-labelledby="testimoni-heading"
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
            Testimoni
          </span>
          <h2
            id="testimoni-heading"
            className="mt-5 font-display text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl"
          >
            Dipercaya <em className="font-display italic text-[var(--brand-deep)]">ribuan pelanggan</em>
          </h2>
          <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
            Dari mahasiswa, freelancer, hingga profesional — mereka memilih
            SELF-PRINTVD untuk kebutuhan cetak harian.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={itemVariants}>
              <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-md">
                <CardContent className="flex h-full flex-col gap-5">
                  <div
                    className="flex items-center gap-1"
                    aria-label="Rating 5 dari 5"
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-[var(--brand)] text-[var(--brand)]"
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <blockquote className="flex-1 text-pretty text-sm leading-relaxed text-foreground md:text-base">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-3 border-t border-border pt-4">
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[var(--brand-soft)] text-sm font-semibold text-[var(--brand-deep)]"
                      aria-hidden="true"
                    >
                      {testimonial.initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">
                        {testimonial.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {testimonial.role}
                      </span>
                    </div>
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

export default Testimonials;
