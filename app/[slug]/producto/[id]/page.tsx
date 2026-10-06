import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getClient } from "@/lib/clients";
import { getProducto } from "@/lib/tienda/productos";
import { formatearPrecio } from "@/lib/tienda/formato";
import ComprarProducto from "@/components/tienda/ComprarProducto";
import GaleriaProducto from "@/components/tienda/GaleriaProducto";
import { baseTienda } from "@/lib/tienda/rutas";

export const revalidate = 60;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; id: string }>;
}): Promise<Metadata> {
    const { slug, id } = await params;
    const cliente = getClient(slug);
    if (!cliente) return {};

    const producto = await getProducto(cliente, id);
    if (!producto) return {};

    return {
        title: `${producto.nombre} · ${cliente.nombre}`,
        description:
            producto.descripcion ??
            `${producto.nombre} por ${formatearPrecio(producto.precio, cliente.moneda)}`,
    };
}

export default async function ProductoPage({
    params,
}: {
    params: Promise<{ slug: string; id: string }>;
}) {
    const { slug, id } = await params;
    const cliente = getClient(slug);
    if (!cliente) notFound();

    const producto = await getProducto(cliente, id);
    if (!producto) notFound();

    const { moneda } = cliente;
    const base = await baseTienda();
    const antes =
        producto.precioAntes !== undefined && producto.precioAntes > producto.precio
            ? producto.precioAntes
            : undefined;

    return (
        <main className="mx-auto w-full max-w-6xl px-4 py-6">
            <nav className="mb-5 text-sm text-black/50">
                <Link
                    href={base || "/"}
                    className="hover:text-[var(--c-texto)]"
                >
                    ← Volver a la tienda
                </Link>
            </nav>

            <div className="grid gap-6 md:grid-cols-2 md:gap-10">
                <GaleriaProducto
                    imagenes={producto.imagenes}
                    alt={producto.nombre}
                />

                <div className="flex flex-col gap-5">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/45">
                            {producto.categoria}
                        </p>
                        <h1 className="mt-1 font-display text-3xl leading-tight tracking-tight text-[var(--c-texto)] sm:text-4xl">
                            {producto.nombre}
                        </h1>
                    </div>

                    <div className="flex flex-col gap-2">
                        {antes !== undefined && (
                            <span className="w-fit rounded bg-[var(--c-acento)] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--c-texto)]">
                                Oferta
                            </span>
                        )}
                        <div className="flex items-baseline gap-3">
                            {antes !== undefined && (
                                <span className="tabular-nums text-base text-black/40 line-through">
                                    {formatearPrecio(antes, moneda)}
                                </span>
                            )}
                            <span className="font-display text-3xl tabular-nums text-[var(--c-texto)]">
                                {formatearPrecio(producto.precio, moneda)}
                            </span>
                        </div>
                    </div>

                    <ComprarProducto
                        producto={producto}
                        base={base}
                        whatsapp={cliente.whatsapp}
                        moneda={moneda}
                    />

                    {producto.detalles.length > 0 && (
                        <dl className="flex flex-col gap-1 text-sm">
                            {producto.detalles.map((detalle) => (
                                <div key={detalle.etiqueta} className="flex gap-2">
                                    <dt className="text-black/45">{detalle.etiqueta}:</dt>
                                    <dd className="text-[var(--c-texto)]">{detalle.valor}</dd>
                                </div>
                            ))}
                        </dl>
                    )}

                    {producto.descripcion && (
                        <p className="max-w-prose text-sm leading-relaxed text-black/70">
                            {producto.descripcion}
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
}
