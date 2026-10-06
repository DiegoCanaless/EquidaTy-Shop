"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCarrito, claveItem } from "./carrito-contexto";
import { formatearPrecio } from "@/lib/tienda/formato";

export default function CarritoDrawer({ moneda }: { moneda: string }) {
    const {
        base,
        abierto,
        cerrar,
        items,
        cantidadTotal,
        subtotal,
        cambiarCantidad,
        quitar,
    } = useCarrito();

    useEffect(() => {
        if (!abierto) return;

        const previo = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") cerrar();
        }
        window.addEventListener("keydown", onKey);

        return () => {
            document.body.style.overflow = previo;
            window.removeEventListener("keydown", onKey);
        };
    }, [abierto, cerrar]);

    if (!abierto) return null;

    return (
        <div className="fixed inset-0 z-[60]">
            <button
                type="button"
                aria-label="Cerrar carrito"
                onClick={cerrar}
                className="drawer-velo absolute inset-0 bg-black/40"
            />

            <aside
                role="dialog"
                aria-modal="true"
                aria-label="Carrito"
                className="drawer-panel absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            >
                <header className="flex items-center justify-between border-b border-black/10 px-5 py-4">
                    <h2 className="font-display text-lg text-[var(--c-texto)]">
                        Tu carrito{cantidadTotal > 0 ? ` (${cantidadTotal})` : ""}
                    </h2>
                    <button
                        type="button"
                        onClick={cerrar}
                        aria-label="Cerrar"
                        className="grid h-9 w-9 place-items-center rounded-full text-[var(--c-texto)] hover:bg-black/5"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={1.8}
                            strokeLinecap="round"
                            aria-hidden="true"
                        >
                            <path d="M6 6l12 12M18 6L6 18" />
                        </svg>
                    </button>
                </header>

                {items.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                        <p className="text-sm text-black/60">Tu carrito está vacío.</p>
                        <Link
                            href={base || "/"}
                            onClick={cerrar}
                            className="rounded-full bg-[var(--c-primario)] px-5 py-2.5 text-sm text-white"
                        >
                            Ver productos
                        </Link>
                    </div>
                ) : (
                    <>
                        <ul className="flex-1 divide-y divide-black/10 overflow-y-auto px-5">
                            {items.map((item) => {
                                const clave = claveItem(item);
                                return (
                                    <li key={clave} className="flex gap-3 py-4">
                                        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black/5">
                                            {item.imagen && (
                                                <Image
                                                    src={item.imagen}
                                                    alt={item.nombre}
                                                    fill
                                                    unoptimized
                                                    sizes="64px"
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
                                                        .map(
                                                            (v) => `${v.etiqueta}: ${v.opcion}`
                                                        )
                                                        .join(" · ")}
                                                </p>
                                            )}
                                            <div className="mt-1 flex items-center gap-3">
                                                <div className="flex items-center rounded-full border border-black/15">
                                                    <button
                                                        type="button"
                                                        aria-label="Restar"
                                                        onClick={() =>
                                                            cambiarCantidad(
                                                                clave,
                                                                item.cantidad - 1
                                                            )
                                                        }
                                                        className="grid h-7 w-7 place-items-center text-[var(--c-texto)]"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="w-6 text-center text-sm tabular-nums text-[var(--c-texto)]">
                                                        {item.cantidad}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        aria-label="Sumar"
                                                        onClick={() =>
                                                            cambiarCantidad(
                                                                clave,
                                                                item.cantidad + 1
                                                            )
                                                        }
                                                        className="grid h-7 w-7 place-items-center text-[var(--c-texto)]"
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

                                        <span className="text-sm tabular-nums text-[var(--c-texto)]">
                                            {formatearPrecio(
                                                item.precio * item.cantidad,
                                                moneda
                                            )}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="border-t border-black/10 px-5 py-4">
                            <div className="mb-3 flex items-baseline justify-between">
                                <span className="text-sm text-black/60">Total</span>
                                <span className="font-display text-xl tabular-nums text-[var(--c-texto)]">
                                    {formatearPrecio(subtotal, moneda)}
                                </span>
                            </div>
                            <Link
                                href={`${base}/carrito`}
                                onClick={cerrar}
                                className="flex items-center justify-center rounded-full bg-[var(--c-primario)] px-6 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
                            >
                                Finalizar
                            </Link>
                        </div>
                    </>
                )}
            </aside>
        </div>
    );
}
