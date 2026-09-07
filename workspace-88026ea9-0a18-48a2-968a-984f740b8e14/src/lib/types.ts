// Type definitions for SELF-PRINTVD

export type FileType = "pdf" | "docx" | "xlsx" | "doc" | "xls" | "unknown";

export type PrintColor = "bw" | "color";
export type PaperSize = "A4" | "A3" | "F4" | "Letter";
export type Orientation = "portrait" | "landscape";
export type PrintSide = "single" | "duplex";
export type FinishingOption = "none" | "staple" | "punch3" | "bind" | "spiral";

export interface UploadedDocument {
  id: string;
  name: string;
  type: FileType;
  sizeBytes: number;
  pages: number;
  uploadedAt: number;
  status: "uploading" | "ready" | "error";
  errorMessage?: string;
}

export interface PrintConfig {
  color: PrintColor;
  paperSize: PaperSize;
  orientation: Orientation;
  printSide: PrintSide;
  copies: number;
  pageRange: "all" | "custom";
  customRange?: string;
  finishing: FinishingOption;
}

export interface PriceBreakdown {
  basePerPage: number;
  pagesPerCopy: number;
  pricePerCopy: number;
  copies: number;
  subtotal: number;
  finishingFee: number;
  discount: number;
  total: number;
  currency: string;
}

export interface QuoteRequest {
  documents: { pages: number; type: FileType }[];
  config: PrintConfig;
  promoCode?: string;
}

export const DEFAULT_CONFIG: PrintConfig = {
  color: "bw",
  paperSize: "A4",
  orientation: "portrait",
  printSide: "single",
  copies: 1,
  pageRange: "all",
  finishing: "none",
};

// Pricing table (in IDR)
export const PRICING = {
  basePerPage: {
    bw: { A4: 300, A3: 600, F4: 350, Letter: 320 },
    color: { A4: 1000, A3: 2000, F4: 1100, Letter: 1050 },
  } as Record<PrintColor, Record<PaperSize, number>>,
  finishing: {
    none: 0,
    staple: 500,
    punch3: 1000,
    bind: 5000,
    spiral: 8000,
  } as Record<FinishingOption, number>,
  discount: {
    bulk: { threshold: 100, percent: 0.05 },
    student: { code: "PELANGIT", percent: 0.1 },
  },
} as const;
