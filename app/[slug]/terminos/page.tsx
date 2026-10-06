import type { Metadata } from "next";
import ContenidoTerminos from "@/components/legales/ContenidoTerminos";

export const metadata: Metadata = {
    title: "Términos y Condiciones",
};

export default function TerminosTienda() {
    return (
        <main className="mx-auto w-full max-w-3xl px-4 py-10">
            <ContenidoTerminos />
        </main>
    );
}
