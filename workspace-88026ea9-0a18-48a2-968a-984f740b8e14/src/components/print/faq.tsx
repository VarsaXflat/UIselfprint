"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Faq = {
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    question: "Apa saja format file yang didukung?",
    answer:
      "Saat ini kami mendukung PDF, DOC/DOCX (Microsoft Word), dan XLS/XLSX (Microsoft Excel). Maksimal ukuran file 50MB per dokumen.",
  },
  {
    question: "Berapa lama proses cetaknya?",
    answer:
      "Rata-rata 3 menit untuk dokumen 1-50 halaman. Untuk dokumen lebih besar atau dengan finishing khusus, estimasi waktu akan ditampilkan saat konfigurasi.",
  },
  {
    question: "Apakah file saya aman?",
    answer:
      "Sangat aman. Semua file dienkripsi saat upload dan otomatis dihapus dari server kami 1 jam setelah dicetak. Kami tidak pernah membuka atau membaca isi dokumen Anda.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer:
      "Kami menerima QRIS (semua bank & e-wallet), GoPay, OVO, DANA, ShopeePay, dan transfer bank. Pembayaran dilakukan setelah dokumen selesai dicetak.",
  },
  {
    question: "Apakah bisa diantar?",
    answer:
      "Ya! Untuk area kota, kami menyediakan layanan antar same-day dengan biaya Rp8.000. Ambil sendiri di loket tetap gratis.",
  },
  {
    question: "Bagaimana jika hasil cetak rusak?",
    answer:
      "Kami menjamin kualitas. Jika hasil cetak tidak sesuai (karena kesalahan teknis kami), kami akan mencetak ulang gratis. Kebijakan ini berlaku 24 jam setelah pengambilan.",
  },
];

export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="inline-block rounded-full border border-border bg-[var(--brand-soft)] px-3 py-1 text-xs font-medium tracking-wide text-[var(--brand-deep)]">
            FAQ
          </span>
          <h2
            id="faq-heading"
            className="mt-5 font-display text-3xl leading-tight tracking-tight md:text-4xl lg:text-5xl"
          >
            Pertanyaan yang <em className="font-display italic text-[var(--brand-deep)]">sering ditanyakan</em>
          </h2>
          <p className="mt-5 text-pretty text-base text-muted-foreground md:text-lg">
            Belum menemukan jawaban yang dicari? Tim kami siap membantu via
            WhatsApp dan email.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="faq-0"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="group border-b border-border transition-colors data-[state=open]:border-l-[3px] data-[state=open]:border-l-[var(--brand)] data-[state=open]:pl-4"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground md:text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

export default Faq;
