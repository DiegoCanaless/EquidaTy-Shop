"use client";

import Image from "next/image";
import Link from "next/link";
import { useCarrito, claveItem } from "./carrito-contexto";
import { formatearPrecio } from "@/lib/tienda/formato";
import { IconoWhatsApp } from "@/components/Iconos";

export default function CarritoContenido({
    whatsapp,
    moneda,
}: {
    whatsapp: string;
    moneda: string;
}) {
    const { base, listo, items, subtotal, cambiarCantidad, quitar, vaciar } =
        useCarrito();

    if (!listo) {
        return <p className="text-sm text-black/50">Cargando carrito…</p>;
    }

    if (items.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-black/15 p-10 text-center">
                <p className="text-sm text-black/60">Tu carrito está vacío.</p>
                <Link
                    href={base || "/"}
                    className="mt-4 inline-block rounded-full bg-[var(--c-primario)] px-5 py-2.5 text-sm text-white"
                >
                    Ver productos
                </Link>
            </div>
        );
    }

    function finalizar() {
        const lineas = [
            "¡Hola! Quiero hacer este pedido:",
            "",
            ...items.map((item) => {
                const vars = item.variantes
                    .map((v) => `${v.etiqueta}: ${v.opcion}`)
                    .join(", ");
                const detalle = vars ? ` (${vars})` : "";
                return `• ${item.cantidad}× ${item.nombre}${detalle} — ${formatearPrecio(
                    item.precio * item.cantidad,
                    moneda
                )}`;
            }),
            "",
            `Total: ${formatearPrecio(subtotal, moneda)}`,
        ];

        window.open(
            `https://wa.me/${whatsapp}?text=${encodeURIComponent(lineas.join("\n"))}`,
            "_blank",
            "noopener"
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <ul className="flex flex-col divide-y divide-black/10 rounded-xl border border-black/10">
                {items.map((item) => {
                    const clave = claveItem(item);
                    return (
                        <li key={clave} className="flex gap-4 p-4">
                            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-black/5">
                                {item.imagen && (
                                    <Image
                                        src={item.imagen}
                                        alt={item.nombre}
                                        fill
                                        unoptimized
                                        sizes="80px"
                                        className="object-cover"
                                    />
                                )}
                            </div>

                            <div className="flex flex-1 flex-col gap-1">
                                <p className="text-sm text-[var(--c-texto)]">
                                    {item.nombre}
                                </p>
                                {item.variantes.length > 0 && (
                                    <p className="text-xs text-black/50">
                                        {item.variantes
                                            .map((v) => `${v.etiqueta}: ${v.opcion}`)
                                            .join(" · ")}
                                    </p>
                                )}

                                <div className="mt-auto flex items-center gap-3">
                                    <div className="flex items-center rounded-full border border-black/15">
                                        <button
                                            type="button"
                                            aria-label="Restar"
                                            onClick={() =>
                                                cambiarCantidad(clave, item.cantidad - 1)
                                            }
                                            className="grid h-8 w-8 place-items-center text-[var(--c-texto)]"
                                        >
                                            −
                                        </button>
                                        <span className="w-7 text-center text-sm tabular-nums text-[var(--c-texto)]">
                                            {item.cantidad}
                                        </span>
                                        <button
                                            type="button"
                                            aria-label="Sumar"
                                            onClick={() =>
                                                cambiarCantidad(clave, item.cantidad + 1)
                                            }
                                            className="grid h-8 w-8 place-items-center text-[var(--c-texto)]"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => quitar(clave)}
                                        className="text-xs text-black/50 underline hover:text-[var(--c-texto)]"
                                    >
                                        Quitar
                                    </button>
                                </div>
                            </div>

                            <span className="font-display text-base tabular-nums text-[var(--c-texto)]">
                                {formatearPrecio(item.precio * item.cantidad, moneda)}
                            </span>
                        </li>
                    );
                })}
            </ul>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <button
                    type="button"
                    onClick={vaciar}
                    className="self-start text-sm text-black/50 underline hover:text-[var(--c-texto)]"
                >
                    Vaciar carrito
                </button>

                <div className="flex flex-col items-stretch gap-3">
                    <div className="flex items-baseline justify-between gap-6">
                        <span className="text-sm text-black/60">Total</span>
                        <span className="font-display text-2xl tabular-nums text-[var(--c-texto)]">
                            {formatearPrecio(subtotal, moneda)}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={finalizar}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--c-primario)] px-6 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
                    >
                        <IconoWhatsApp className="h-4 w-4" />
                        Finalizar por WhatsApp
                    </button>
                </div>
            </div>
        </div>
    );
}
