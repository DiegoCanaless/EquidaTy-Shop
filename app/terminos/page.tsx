import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import ContenidoTerminos from "@/components/legales/ContenidoTerminos";

export const metadata: Metadata = {
    title: "Términos y Condiciones · EquidaTy Shop",
    description:
        "Términos y condiciones del servicio EquidaTy Shop: planes, precios, pagos, reembolsos, obligaciones del cliente y responsabilidad.",
};

export default function Terminos() {
    return (
        <>
            <Header />
            <main className="mx-auto max-w-3xl px-5 py-16 md:py-20">
                <ContenidoTerminos />
            </main>
            <Footer />
        </>
    );
}
