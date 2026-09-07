import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/print/hero";
import { PrintStudio } from "@/components/print/print-studio";
import { Features } from "@/components/print/features";
import { HowItWorks } from "@/components/print/how-it-works";
import { Testimonials } from "@/components/print/testimonials";
import { Faq as FAQ } from "@/components/print/faq";
import { Cta as CTA } from "@/components/print/cta";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <PrintStudio />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
