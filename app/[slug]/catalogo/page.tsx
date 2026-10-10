import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getClient } from "@/lib/clients";
import { fetchProductos } from "@/lib/tienda/productos";
import CatalogoTienda from "@/components/tienda/CatalogoTienda";
import { baseTienda } from "@/lib/tienda/rutas";

export const revalidate = 60;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const cliente = getClient(slug);
    if (!cliente) return {};
    return { title: `Catálogo · ${cliente.nombre}` };
}

export default async function CatalogoPage({
    params,
    searchParams,
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ cat?: string | string[] }>;
}) {
    const { slug } = await params;
    const { cat } = await searchParams;

    const cliente = getClient(slug);
    if (!cliente) notFound();

    const productos = await fetchProductos(cliente);
    const base = await baseTienda();

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-6">
            <h1 className="mb-5 font-display text-2xl text-[var(--c-texto)]">
                Catálogo
            </h1>
            <CatalogoTienda
                productos={productos}
                base={base}
                moneda={cliente.moneda}
                categoriaInicial={typeof cat === "string" ? cat : undefined}
            />
        </main>
    );
}
