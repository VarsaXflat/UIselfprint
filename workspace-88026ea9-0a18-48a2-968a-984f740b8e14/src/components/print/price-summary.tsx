"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Receipt, Loader2, Tag, Check, ArrowRight, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/print-pricing";
import type { PriceBreakdown, PrintConfig } from "@/lib/types";

interface PriceSummaryProps {
  breakdown: PriceBreakdown | null;
  loading: boolean;
  config: PrintConfig;
  documentsCount: number;
  onCheckout: () => void;
  promoCode: string;
  onPromoCodeChange: (v: string) => void;
}

export function PriceSummary({
  breakdown,
  loading,
  config,
  documentsCount,
  onCheckout,
  promoCode,
  onPromoCodeChange,
}: PriceSummaryProps) {
  const [promoApplied, setPromoApplied] = React.useState(false);
  const hasDocs = documentsCount > 0;

  const applyPromo = () => {
    if (!promoCode.trim()) return;
    setPromoApplied(true);
  };

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border bg-muted/30">
        <div className="grid place-items-center h-8 w-8 rounded-lg bg-primary text-primary-foreground">
          <Receipt className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold leading-none">Ringkasan Harga</h3>
          <p className="text-[11px] text-muted-foreground mt-1">Update otomatis</p>
        </div>
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="ml-auto"
            >
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Body */}
      <div className="p-5 space-y-4">
        {!hasDocs ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="mx-auto grid place-items-center h-12 w-12 rounded-full bg-muted mb-3">
              <Info className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">Belum ada dokumen</p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[220px] mx-auto">
              Upload dokumen untuk melihat estimasi harga cetak
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <Row
              label="Halaman per copy"
              value={`${breakdown?.pagesPerCopy ?? 0} lembar`}
            />
            <Row
              label={`Cetak ${config.color === "bw" ? "B/W" : "Berwarna"} × ${config.copies}`}
              value={formatCurrency(breakdown?.subtotal ?? 0)}
            />
            {breakdown && breakdown.finishingFee > 0 && (
              <Row
                label="Finishing"
                value={`+${formatCurrency(breakdown.finishingFee)}`}
              />
            )}
            {breakdown && breakdown.discount > 0 && (
              <Row
                label="Diskon"
                value={`−${formatCurrency(breakdown.discount)}`}
                accent
              />
            )}

            <div className="h-px bg-border my-1" />

            {/* Total */}
            <div className="flex items-end justify-between pt-1">
              <div>
                <p className="text-xs text-muted-foreground">Total Bayar</p>
                <p className="text-[11px] text-muted-foreground">termasuk pajak</p>
              </div>
              <div className="text-right">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={breakdown?.total ?? 0}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18 }}
                    className="text-2xl font-semibold tracking-tight font-display"
                  >
                    {formatCurrency(breakdown?.total ?? 0)}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {/* Promo code */}
        {hasDocs && (
          <div className="pt-2">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => {
                    onPromoCodeChange(e.target.value);
                    setPromoApplied(false);
                  }}
                  placeholder="Kode promo"
                  className="w-full h-9 pl-8 pr-3 rounded-lg border border-border bg-background text-xs focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
                />
              </div>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={applyPromo}
                disabled={!promoCode.trim() || promoApplied}
                className="h-9"
              >
                {promoApplied ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Dipakai
                  </>
                ) : (
                  "Pakai"
                )}
              </Button>
            </div>
            <p className="mt-1.5 text-[10px] text-muted-foreground">
              Coba kode{" "}
              <span className="font-mono font-semibold text-[var(--brand-deep)]">
                PELANGIT
              </span>{" "}
              untuk diskon 10%
            </p>
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="border-t border-border bg-muted/30 p-5 space-y-2.5">
        <Button
          type="button"
          onClick={onCheckout}
          disabled={!hasDocs || loading}
          className="w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 group"
        >
          <span>Lanjut ke Pembayaran</span>
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <p className="text-center text-[10px] text-muted-foreground">
          Bayar via QRIS · GoPay · OVO · DANA · Transfer
        </p>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={cn(
          "font-medium tabular-nums",
          accent && "text-[var(--brand-deep)]",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export default PriceSummary;
