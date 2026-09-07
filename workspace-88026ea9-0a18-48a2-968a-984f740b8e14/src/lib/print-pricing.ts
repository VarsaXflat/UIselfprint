import {
  PRICING,
  type FinishingOption,
  type PaperSize,
  type PrintColor,
  type PrintConfig,
  type PriceBreakdown,
  type UploadedDocument,
} from "./types";

export function getFileType(filename: string) {
  const ext = filename.toLowerCase().split(".").pop() ?? "";
  if (ext === "pdf") return "pdf" as const;
  if (ext === "docx") return "docx" as const;
  if (ext === "doc") return "doc" as const;
  if (ext === "xlsx") return "xlsx" as const;
  if (ext === "xls") return "xls" as const;
  return "unknown" as const;
}

export function getFileTypeLabel(type: string): string {
  switch (type) {
    case "pdf":
      return "PDF";
    case "docx":
    case "doc":
      return "Word";
    case "xlsx":
    case "xls":
      return "Excel";
    default:
      return "File";
  }
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function parsePageRange(
  range: string,
  totalPages: number,
): number {
  if (!range.trim()) return totalPages;
  let count = 0;
  const parts = range.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    const match = trimmed.match(/^(\d+)\s*(-\s*(\d+))?$/);
    if (match) {
      const start = parseInt(match[1], 10);
      const end = match[3] ? parseInt(match[3], 10) : start;
      if (!isNaN(start) && !isNaN(end)) {
        count += Math.max(0, Math.min(end, totalPages) - Math.max(1, start) + 1);
      }
    }
  }
  return count === 0 ? totalPages : count;
}

export function calculatePrice(
  documents: UploadedDocument[],
  config: PrintConfig,
  promoCode?: string,
): PriceBreakdown {
  const totalPages = documents.reduce((sum, d) => sum + (d.pages || 0), 0);

  let pagesPerCopy = totalPages;
  if (config.pageRange === "custom" && config.customRange) {
    pagesPerCopy = parsePageRange(config.customRange, totalPages);
  }

  // Duplex reduces effective sheet count but pages stay same for pricing logic
  // For simplicity: duplex = same page count, but we can apply small discount
  const basePerPage =
    PRICING.basePerPage[config.color as PrintColor][
      config.paperSize as PaperSize
    ];

  const pricePerCopy = pagesPerCopy * basePerPage;
  const subtotal = pricePerCopy * config.copies;
  const finishingFee =
    PRICING.finishing[config.finishing as FinishingOption] * config.copies;

  let discount = 0;
  // Bulk discount
  if (pagesPerCopy * config.copies >= PRICING.discount.bulk.threshold) {
    discount += Math.round((subtotal + finishingFee) * PRICING.discount.bulk.percent);
  }
  // Promo code
  if (promoCode && promoCode.toUpperCase() === PRICING.discount.student.code) {
    discount += Math.round(
      (subtotal + finishingFee - discount) * PRICING.discount.student.percent,
    );
  }

  const total = Math.max(0, subtotal + finishingFee - discount);

  return {
    basePerPage,
    pagesPerCopy,
    pricePerCopy,
    copies: config.copies,
    subtotal,
    finishingFee,
    discount,
    total,
    currency: "IDR",
  };
}

export function estimatePagesFromSize(sizeBytes: number): number {
  // Rough heuristic: ~50KB per page for PDF/DOCX, ~30KB for XLSX
  if (sizeBytes < 50_000) return 1;
  const estimate = Math.ceil(sizeBytes / 50_000);
  return Math.min(Math.max(estimate, 1), 500);
}
