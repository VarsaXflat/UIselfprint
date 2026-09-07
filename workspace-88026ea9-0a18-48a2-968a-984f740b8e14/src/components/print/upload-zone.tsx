"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  Upload,
  FileText,
  X,
  Loader2,
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  FileType2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  formatBytes,
  getFileType,
  getFileTypeLabel,
  estimatePagesFromSize,
} from "@/lib/print-pricing";
import type { FileType, UploadedDocument } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface UploadZoneProps {
  onAddDocuments: (docs: UploadedDocument[]) => void;
  disabled?: boolean;
}

const ACCEPTED = ".pdf,.docx,.doc,.xlsx,.xls";
const MAX_SIZE = 50 * 1024 * 1024; // 50 MB

export function UploadZone({ onAddDocuments, disabled }: UploadZoneProps) {
  const reduce = useReducedMotion();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const { toast } = useToast();

  const processFiles = React.useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      const accepted: UploadedDocument[] = [];
      const rejected: string[] = [];

      for (const file of files) {
        const type = getFileType(file.name);
        if (type === "unknown") {
          rejected.push(`${file.name} (format tidak didukung)`);
          continue;
        }
        if (file.size > MAX_SIZE) {
          rejected.push(`${file.name} (melebihi 50MB)`);
          continue;
        }
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
        const doc: UploadedDocument = {
          id,
          name: file.name,
          type: type as FileType,
          sizeBytes: file.size,
          pages: estimatePagesFromSize(file.size),
          uploadedAt: Date.now(),
          status: "uploading",
        };
        accepted.push(doc);
      }

      if (accepted.length > 0) {
        // Add immediately as "uploading", then mark ready
        onAddDocuments(accepted);
        // Simulate upload completion
        for (const doc of accepted) {
          await new Promise((r) => setTimeout(r, 400 + Math.random() * 600));
          onAddDocuments([
            { ...doc, status: "ready" },
          ]);
          // Replace existing one in parent — but parent dedup by id via addOrUpdate
        }
      }

      if (rejected.length > 0) {
        toast({
          title: "Beberapa file ditolak",
          description: rejected.join(", "),
          variant: "destructive",
        });
      }
    },
    [onAddDocuments, toast],
  );

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      processFiles(e.dataTransfer.files);
    },
    [processFiles, disabled],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
    // Reset so same file can be re-selected
    e.target.value = "";
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      className={cn(
        "relative group rounded-2xl border-2 border-dashed transition-all duration-300 p-8 md:p-12",
        isDragging
          ? "border-[var(--brand)] bg-[var(--brand-soft)]/40 scale-[1.01]"
          : "border-border hover:border-[var(--brand)]/60 hover:bg-muted/30",
        disabled && "opacity-60 pointer-events-none",
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        multiple
        className="sr-only"
        onChange={handleInputChange}
        disabled={disabled}
      />

      <motion.div
        animate={
          reduce
            ? {}
            : isDragging
              ? { scale: 1.05 }
              : { scale: 1 }
        }
        className="flex flex-col items-center text-center"
      >
        {/* Animated upload icon */}
        <motion.div
          animate={reduce ? {} : { y: isDragging ? -4 : [0, -4, 0] }}
          transition={
            reduce
              ? {}
              : isDragging
                ? { duration: 0.2 }
                : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative mb-5"
        >
          <div className="absolute inset-0 bg-[var(--brand)] blur-xl opacity-30" />
          <div
            className={cn(
              "relative grid place-items-center h-16 w-16 rounded-2xl border transition-colors",
              isDragging
                ? "border-[var(--brand)] bg-[var(--brand-soft)]"
                : "border-border bg-card",
            )}
          >
            <Upload
              className={cn(
                "h-7 w-7 transition-colors",
                isDragging ? "text-[var(--brand-deep)]" : "text-foreground",
              )}
              strokeWidth={1.6}
            />
          </div>
        </motion.div>

        <h3 className="text-lg md:text-xl font-semibold tracking-tight">
          {isDragging ? "Lepaskan file di sini" : "Tarik file atau klik untuk upload"}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md">
          Mendukung PDF, Word (.docx/.doc), dan Excel (.xlsx/.xls). Maksimal 50MB per file.
        </p>

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-5 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-5 text-sm font-medium transition-colors"
        >
          <FileText className="h-4 w-4" />
          Pilih file
        </button>

        {/* Format chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          {[
            { label: "PDF", icon: FileType2 },
            { label: "DOCX", icon: FileText },
            { label: "XLSX", icon: FileSpreadsheet },
          ].map((f) => (
            <span
              key={f.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1"
            >
              <f.icon className="h-3 w-3 text-[var(--brand-deep)]" />
              {f.label}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function FileTypeIcon({ type, className }: { type: FileType; className?: string }) {
  if (type === "xlsx" || type === "xls") return <FileSpreadsheet className={className} />;
  if (type === "docx" || type === "doc") return <FileText className={className} />;
  return <FileType2 className={className} />;
}

interface DocumentListProps {
  documents: UploadedDocument[];
  onRemove: (id: string) => void;
}

export function DocumentList({ documents, onRemove }: DocumentListProps) {
  if (documents.length === 0) return null;

  return (
    <div className="space-y-2.5">
      <AnimatePresence mode="popLayout">
        {documents.map((doc) => (
          <motion.div
            key={doc.id}
            layout
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 hover:border-[var(--brand)]/40 transition-colors"
          >
            {/* Icon */}
            <div className="relative shrink-0 grid place-items-center h-10 w-10 rounded-lg bg-[var(--brand-soft)]">
              <FileTypeIcon type={doc.type} className="h-5 w-5 text-[var(--brand-deep)]" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{doc.name}</p>
                <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                  {getFileTypeLabel(doc.type)}
                </span>
              </div>
              <div className="mt-0.5 flex items-center gap-3 text-xs text-muted-foreground">
                <span>{formatBytes(doc.sizeBytes)}</span>
                {doc.status === "ready" ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-[var(--brand-deep)]" />
                    {doc.pages} halaman
                  </span>
                ) : doc.status === "uploading" ? (
                  <span className="flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Mengunggah...
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-destructive">
                    <AlertCircle className="h-3 w-3" />
                    {doc.errorMessage ?? "Gagal"}
                  </span>
                )}
              </div>
            </div>

            {/* Remove */}
            <button
              type="button"
              onClick={() => onRemove(doc.id)}
              aria-label="Hapus file"
              className="shrink-0 grid place-items-center h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors opacity-0 group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default UploadZone;
