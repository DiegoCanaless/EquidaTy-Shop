import type { Metadata } from "next";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import ContenidoPrivacidad from "@/components/legales/ContenidoPrivacidad";

export const metadata: Metadata = {
    title: "Política de Privacidad · EquidaTy Shop",
    description:
        "Cómo trata EquidaTy Shop los datos: qué recopilamos, para qué, con quién se comparten, cookies y derechos (Ley 25.326).",
};

export default function Privacidad() {
    return (
        <>
            <Header />
            <main className="mx-auto max-w-3xl px-5 py-16 md:py-20">
                <ContenidoPrivacidad />
            </main>
            <Footer />
        </>
    );
}
