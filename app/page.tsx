import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Pasos from "@/components/landing/Pasos";
import Incluye from "@/components/landing/Incluye";
import Problemas from "@/components/landing/Problemas";
import Precio from "@/components/landing/Precio";
import Faq from "@/components/landing/Faq";
import CtaFinal from "@/components/landing/CtaFinal";
import Footer from "@/components/landing/Footer";
import ScrollAlVolver from "@/components/ScrollAlVolver";

export default function Home() {
  return (
    <>
      <ScrollAlVolver />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-bordo focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Pasos />
        <Incluye />
        <Problemas />
        <Precio />
        <Faq />
        <CtaFinal />
      </main>
      <Footer />
    </>
  );
}
