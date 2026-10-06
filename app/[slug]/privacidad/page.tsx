import type { Metadata } from "next";
import ContenidoPrivacidad from "@/components/legales/ContenidoPrivacidad";

export const metadata: Metadata = {
    title: "Política de Privacidad",
};

export default function PrivacidadTienda() {
    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-10">
            <ContenidoPrivacidad />
        </main>
    );
}
