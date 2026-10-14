import Link from "next/link";
import GaleriaCard from "./GaleriaCard";
import type { Producto } from "@/lib/tienda/types";
import { formatearPrecio } from "@/lib/tienda/formato";

export default function ProductoCard({
    producto,
    base,
    moneda,
}: {
    producto: Producto;
    base: string;
    moneda: string;
}) {
    const agotado = producto.stock === 0;
    const antes =
        producto.precioAntes !== undefined && producto.precioAntes > producto.precio
            ? producto.precioAntes
            : undefined;

    return (
        <Link
            href={`${base}/producto/${producto.id}`}
            className={`group flex flex-col overflow-hidden rounded-xl border bg-white transition-colors ${
                agotado
                    ? "border-black/5"
                    : "border-black/10 hover:border-black/30"
            }`}
        >
            <div className="relative aspect-square overflow-hidden bg-black/5">
                <GaleriaCard
                    imagenes={producto.imagenes}
                    alt={producto.nombre}
                    agotado={agotado}
                />

                {agotado ? (
                    <>
                        <span className="absolute inset-0 bg-black/15" aria-hidden />
                        <span className="absolute left-3 top-3 rounded-full bg-[var(--c-texto)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-white">
                            Agotado
                        </span>
                    </>
                ) : (
                    antes !== undefined && (
                        <span className="absolute left-3 top-3 rounded-full bg-[var(--c-acento)] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--c-texto)]">
                            Oferta
                        </span>
                    )
                )}
            </div>

            <div className="flex flex-1 flex-col gap-1 p-4">
                <h3
                    className={`line-clamp-2 text-sm leading-snug ${
                        agotado ? "text-black/40" : "text-[var(--c-texto)]"
                    }`}
                >
                    {producto.nombre}
                </h3>

                <div className="mt-auto flex items-baseline gap-2 pt-1.5">
                    {antes !== undefined && (
                        <span
                            className={`tabular-nums text-xs line-through ${
                                agotado ? "text-black/30" : "text-black/40"
                            }`}
                        >
                            {formatearPrecio(antes, moneda)}
                        </span>
                    )}
                    <span
                        className={`font-display text-lg leading-none tabular-nums ${
                            agotado ? "text-black/35" : "text-[var(--c-texto)]"
                        }`}
                    >
                        {formatearPrecio(producto.precio, moneda)}
                    </span>
                </div>
            </div>
        </Link>
    );
}
