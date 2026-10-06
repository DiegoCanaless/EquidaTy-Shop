import { notFound } from "next/navigation";
import { getClient } from "@/lib/clients";
import CarritoContenido from "@/components/tienda/CarritoContenido";

export const revalidate = 60;

export default async function CarritoPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const cliente = getClient(slug);
    if (!cliente) notFound();

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-6">
            <h1 className="mb-5 font-display text-2xl text-[var(--c-texto)]">
                Tu carrito
            </h1>
            <CarritoContenido
                whatsapp={cliente.whatsapp}
                moneda={cliente.moneda}
            />
        </main>
    );
}
