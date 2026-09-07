"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  FileBox,
  Copy,
  RotateCw,
  Layers,
  Settings2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  type PrintColor,
  type PaperSize,
  type Orientation,
  type PrintSide,
  type FinishingOption,
  type PrintConfig,
} from "@/lib/types";

interface PrintConfigPanelProps {
  config: PrintConfig;
  onChange: (patch: Partial<PrintConfig>) => void;
  disabled?: boolean;
}

const COLOR_OPTIONS: { value: PrintColor; label: string; desc: string; price: string }[] = [
  { value: "bw", label: "Hitam Putih", desc: "Hemat untuk teks", price: "Rp300" },
  { value: "color", label: "Berwarna", desc: "Untuk grafis & foto", price: "Rp1.000" },
];

const PAPER_OPTIONS: { value: PaperSize; label: string; desc: string }[] = [
  { value: "A4", label: "A4", desc: "21 × 29.7 cm" },
  { value: "A3", label: "A3", desc: "29.7 × 42 cm" },
  { value: "F4", label: "F4", desc: "21.5 × 33 cm" },
  { value: "Letter", label: "Letter", desc: "21.6 × 27.9 cm" },
];

const ORIENTATION_OPTIONS: { value: Orientation; label: string }[] = [
  { value: "portrait", label: "Potret" },
  { value: "landscape", label: "Landscape" },
];

const SIDE_OPTIONS: { value: PrintSide; label: string; desc: string }[] = [
  { value: "single", label: "1 Sisi", desc: "Cetak depan saja" },
  { value: "duplex", label: "2 Sisi", desc: "Hemat kertas" },
];

const FINISHING_OPTIONS: {
  value: FinishingOption;
  label: string;
  desc: string;
  fee: string;
}[] = [
  { value: "none", label: "Tanpa Finishing", desc: "Polos saja", fee: "Gratis" },
  { value: "staple", label: "Jilid Staple", desc: "Klip baja 1 buah", fee: "+Rp500" },
  { value: "punch3", label: "Lubang 3", desc: "Untuk map folder", fee: "+Rp1.000" },
  { value: "bind", label: "Jilid Lem", desc: "Kuat & rapi", fee: "+Rp5.000" },
  { value: "spiral", label: "Jilid Spiral", desc: "Plastik fleksibel", fee: "+Rp8.000" },
];

function SectionLabel({
  icon: Icon,
  title,
  hint,
}: {
  icon: React.ElementType;
  title: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <div className="grid place-items-center h-7 w-7 rounded-lg bg-muted text-foreground/70">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <h4 className="text-sm font-semibold">{title}</h4>
      {hint && <span className="text-xs text-muted-foreground ml-auto">{hint}</span>}
    </div>
  );
}

function OptionCard({
  active,
  onClick,
  children,
  className,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative text-left rounded-xl border px-3.5 py-3 transition-all duration-200",
        active
          ? "border-[var(--brand)] bg-[var(--brand-soft)]/50 shadow-sm"
          : "border-border bg-card hover:border-foreground/20 hover:bg-muted/40",
        className,
      )}
    >
      {active && (
        <motion.span
          layoutId="option-check"
          className="absolute top-2 right-2 grid place-items-center h-4 w-4 rounded-full bg-[var(--brand)] text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 25 }}
        >
          <Check className="h-2.5 w-2.5" strokeWidth={3} />
        </motion.span>
      )}
      {children}
    </button>
  );
}

export function PrintConfigPanel({ config, onChange, disabled }: PrintConfigPanelProps) {
  return (
    <div
      className={cn(
        "space-y-7 transition-opacity",
        disabled && "opacity-50 pointer-events-none",
      )}
    >
      {/* Color */}
      <div>
        <SectionLabel icon={Palette} title="Mode Warna" />
        <div className="grid grid-cols-2 gap-2.5">
          {COLOR_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              active={config.color === opt.value}
              onClick={() => onChange({ color: opt.value })}
            >
              <div className="pr-5">
                <div className="text-sm font-semibold">{opt.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
                <div className="text-[11px] text-[var(--brand-deep)] font-medium mt-1">
                  mulai {opt.price}/lembar
                </div>
              </div>
            </OptionCard>
          ))}
        </div>
      </div>

      {/* Paper size */}
      <div>
        <SectionLabel icon={FileBox} title="Ukuran Kertas" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {PAPER_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              active={config.paperSize === opt.value}
              onClick={() => onChange({ paperSize: opt.value })}
            >
              <div className="text-center pr-3">
                <div className="text-base font-semibold font-display">{opt.label}</div>
                <div className="text-[10px] text-muted-foreground mt-0.5">{opt.desc}</div>
              </div>
            </OptionCard>
          ))}
        </div>
      </div>

      {/* Orientation & Side */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <SectionLabel icon={RotateCw} title="Orientasi" />
          <div className="grid grid-cols-2 gap-2.5">
            {ORIENTATION_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                active={config.orientation === opt.value}
                onClick={() => onChange({ orientation: opt.value })}
              >
                <div className="text-center text-sm font-medium pr-3">{opt.label}</div>
              </OptionCard>
            ))}
          </div>
        </div>
        <div>
          <SectionLabel icon={Layers} title="Sisi Cetak" />
          <div className="grid grid-cols-2 gap-2.5">
            {SIDE_OPTIONS.map((opt) => (
              <OptionCard
                key={opt.value}
                active={config.printSide === opt.value}
                onClick={() => onChange({ printSide: opt.value })}
              >
                <div className="pr-4">
                  <div className="text-sm font-semibold">{opt.label}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{opt.desc}</div>
                </div>
              </OptionCard>
            ))}
          </div>
        </div>
      </div>

      {/* Copies */}
      <div>
        <SectionLabel
          icon={Copy}
          title="Jumlah Copy"
          hint={`${config.copies} copy`}
        />
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Kurangi copy"
            onClick={() => onChange({ copies: Math.max(1, config.copies - 1) })}
            className="grid place-items-center h-10 w-10 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-foreground"
          >
            <span className="text-lg font-medium">−</span>
          </button>
          <input
            type="number"
            min={1}
            max={999}
            value={config.copies}
            onChange={(e) => {
              const v = parseInt(e.target.value, 10);
              onChange({ copies: isNaN(v) ? 1 : Math.max(1, Math.min(999, v)) });
            }}
            className="flex-1 max-w-[80px] h-10 text-center rounded-lg border border-border bg-card text-base font-semibold focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/30"
          />
          <button
            type="button"
            aria-label="Tambah copy"
            onClick={() => onChange({ copies: Math.min(999, config.copies + 1) })}
            className="grid place-items-center h-10 w-10 rounded-lg border border-border bg-card hover:bg-muted transition-colors text-foreground"
          >
            <span className="text-lg font-medium">+</span>
          </button>
          <div className="ml-2 flex flex-wrap gap-1.5">
            {[5, 10, 25, 50].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => onChange({ copies: n })}
                className="h-8 px-2.5 rounded-md text-xs font-medium border border-border bg-card hover:border-[var(--brand)]/50 hover:bg-muted/40 transition-colors"
              >
                {n}×
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Finishing */}
      <div>
        <SectionLabel icon={Settings2} title="Finishing" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {FINISHING_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              active={config.finishing === opt.value}
              onClick={() => onChange({ finishing: opt.value })}
            >
              <div className="pr-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium">{opt.label}</span>
                  <span className="text-[11px] text-[var(--brand-deep)] font-semibold">
                    {opt.fee}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">{opt.desc}</div>
              </div>
            </OptionCard>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PrintConfigPanel;
