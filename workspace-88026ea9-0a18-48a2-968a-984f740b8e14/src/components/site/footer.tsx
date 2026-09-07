"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Printer, Mail, MapPin, Phone, Instagram, Twitter, Linkedin, ArrowUpRight } from "lucide-react";

const FOOTER_LINKS = {
  produk: [
    { label: "Cetak Dokumen", href: "#cetak" },
    { label: "Fitur", href: "#fitur" },
    { label: "Cara Kerja", href: "#cara-kerja" },
    { label: "Harga", href: "#fitur" },
  ],
  perusahaan: [
    { label: "Tentang Kami", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Karier", href: "#" },
    { label: "Kontak", href: "#" },
  ],
  bantuan: [
    { label: "FAQ", href: "#faq" },
    { label: "Panduan Upload", href: "#" },
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
  ],
};

const SOCIALS = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/60 bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top */}
        <div className="py-14 md:py-20 grid gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="grid place-items-center h-9 w-9 rounded-xl bg-primary text-primary-foreground">
                <Printer className="h-4.5 w-4.5" strokeWidth={2.2} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-semibold tracking-tight">
                  SELF-PRINT<span className="text-[var(--brand-deep)]">VD</span>
                </span>
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase mt-0.5">
                  Cetak Online
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Platform cetak dokumen self-service tercepat di Indonesia.
              Upload, atur, cetak — selesai dalam hitungan menit.
            </p>
            <div className="space-y-2 text-sm">
              <a href="mailto:halo@selfprintvd.id" className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4 text-[var(--brand-deep)]" />
                halo@selfprintvd.id
              </a>
              <a href="tel:+622112345678" className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4 text-[var(--brand-deep)]" />
                +62 21 1234 5678
              </a>
              <div className="flex items-center gap-2.5 text-muted-foreground">
                <MapPin className="h-4 w-4 text-[var(--brand-deep)]" />
                Jl. Cendana No. 12, Jakarta Pusat
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title} className="space-y-3.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {title}
                </h4>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border/60 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SELF-PRINTVD. Dibuat dengan rasa di Jakarta.
          </p>
          <div className="flex items-center gap-1">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid place-items-center h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
