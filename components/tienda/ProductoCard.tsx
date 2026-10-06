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
            className={`group flex flex-col overflow-hidden rounded-lg border border-black/10 ${
                agotado ? "bg-black/[0.04]" : "bg-white transition-shadow hover:shadow-md"
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
                        <span className="absolute inset-0 bg-black/20" aria-hidden />
                        <span className="absolute left-2 top-2 rounded bg-[var(--c-texto)] px-2 py-0.5 text-xs font-medium text-white">
                            Agotado
                        </span>
                    </>
                ) : (
                    antes !== undefined && (
                        <span className="absolute left-2 top-2 rounded bg-[var(--c-acento)] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--c-texto)] shadow-sm">
                            Oferta
                        </span>
                    )
                )}
            </div>

            <div className="flex flex-1 flex-col gap-1 p-3">
                <h3
                    className={`line-clamp-2 text-sm ${
                        agotado ? "text-black/40" : "text-[var(--c-texto)]"
                    }`}
                >
                    {producto.nombre}
                </h3>

                {antes !== undefined && (
                    <span
                        className={`tabular-nums text-xs line-through ${
                            agotado ? "text-black/30" : "text-black/50"
                        }`}
                    >
                        {formatearPrecio(antes, moneda)}
                    </span>
                )}
                <span
                    className={`font-display text-lg tabular-nums ${
                        agotado ? "text-black/35" : "text-[var(--c-texto)]"
                    }`}
                >
                    {formatearPrecio(producto.precio, moneda)}
                </span>
            </div>
        </Link>
    );
}
