"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FileStack, Wand2 } from "lucide-react";
import { UploadZone, DocumentList } from "./upload-zone";
import { PrintConfigPanel } from "./print-config";
import { PriceSummary } from "./price-summary";
import { calculatePrice } from "@/lib/print-pricing";
import { DEFAULT_CONFIG, type PrintConfig, type PriceBreakdown, type UploadedDocument } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

export function PrintStudio() {
  const [documents, setDocuments] = React.useState<UploadedDocument[]>([]);
  const [config, setConfig] = React.useState<PrintConfig>(DEFAULT_CONFIG);
  const [promoCode, setPromoCode] = React.useState("");
  const [breakdown, setBreakdown] = React.useState<PriceBreakdown | null>(null);
  const [loading, setLoading] = React.useState(false);
  const { toast } = useToast();

  // Upsert documents (handles both add new and update existing by id)
  const upsertDocuments = React.useCallback((newDocs: UploadedDocument[]) => {
    setDocuments((prev) => {
      const map = new Map(prev.map((d) => [d.id, d]));
      for (const doc of newDocs) {
        map.set(doc.id, doc);
      }
      return Array.from(map.values());
    });
  }, []);

  const removeDocument = React.useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const updateConfig = React.useCallback((patch: Partial<PrintConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  }, []);

  // Recalculate price whenever inputs change (debounced)
  React.useEffect(() => {
    const readyDocs = documents.filter((d) => d.status === "ready");
    if (readyDocs.length === 0) {
      setBreakdown(null);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      const result = calculatePrice(readyDocs, config, promoCode);
      setBreakdown(result);
      setLoading(false);
    }, 220);
    return () => clearTimeout(t);
  }, [documents, config, promoCode]);

  const handleCheckout = () => {
    const readyDocs = documents.filter((d) => d.status === "ready");
    if (readyDocs.length === 0 || !breakdown) return;
    toast({
      title: "Pesanan siap diproses!",
      description: `Total ${new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(breakdown.total)} — ${readyDocs.length} dokumen, ${config.copies} copy.`,
    });
  };

  const readyCount = documents.filter((d) => d.status === "ready").length;

  return (
    <section id="cetak" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="absolute inset-0 mesh-gradient opacity-30 pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mb-10 md:mb-14"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 backdrop-blur px-3 py-1 text-xs font-medium text-muted-foreground mb-4">
            <Wand2 className="h-3 w-3 text-[var(--brand-deep)]" />
            Print Studio
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
            Upload & atur cetakan
            <br />
            <em className="font-display italic text-[var(--brand-deep)] font-normal">
              dalam satu layar.
            </em>
          </h2>
          <p className="mt-4 text-base md:text-lg text-muted-foreground text-pretty">
            Tarik dokumen Anda, pilih opsi cetak, dan lihat harga update real-time.
            Tidak perlu login, tidak perlu antri.
          </p>
        </motion.div>

        {/* Studio grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left: Upload + Config */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Upload */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="grid place-items-center h-7 w-7 rounded-lg bg-primary text-primary-foreground">
                  <span className="text-xs font-bold">1</span>
                </div>
                <h3 className="text-sm font-semibold">Upload Dokumen</h3>
                {readyCount > 0 && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    {readyCount} dokumen siap
                  </span>
                )}
              </div>
              <UploadZone onAddDocuments={upsertDocuments} />
              {documents.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2.5 text-xs text-muted-foreground">
                    <FileStack className="h-3.5 w-3.5" />
                    Antrian dokumen
                  </div>
                  <DocumentList documents={documents} onRemove={removeDocument} />
                </div>
              )}
            </div>

            {/* Config */}
            <div className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <div className="flex items-center gap-2 mb-5">
                <div className="grid place-items-center h-7 w-7 rounded-lg bg-primary text-primary-foreground">
                  <span className="text-xs font-bold">2</span>
                </div>
                <h3 className="text-sm font-semibold">Atur Opsi Cetak</h3>
              </div>
              <PrintConfigPanel
                config={config}
                onChange={updateConfig}
                disabled={readyCount === 0}
              />
            </div>
          </motion.div>

          {/* Right: Price Summary (sticky on desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <div className="lg:sticky lg:top-24">
              <PriceSummary
                breakdown={breakdown}
                loading={loading}
                config={config}
                documentsCount={readyCount}
                onCheckout={handleCheckout}
                promoCode={promoCode}
                onPromoCodeChange={setPromoCode}
              />

              {/* Trust note */}
              <div className="mt-4 rounded-xl border border-border bg-muted/20 p-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  💡 Harga di atas adalah estimasi. Harga final ditentukan saat
                  dokumen di loket. Pembayaran dilakukan setelah cetakan selesai.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default PrintStudio;
