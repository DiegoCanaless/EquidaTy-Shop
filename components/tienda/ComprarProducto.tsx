"use client";

import { useState } from "react";
import { formatearPrecio } from "@/lib/tienda/formato";
import { IconoWhatsApp, IconoCarrito } from "@/components/Iconos";
import { useCarrito } from "./carrito-contexto";
import type { Producto } from "@/lib/tienda/types";

export default function ComprarProducto({
    producto,
    base,
    whatsapp,
    moneda,
}: {
    producto: Producto;
    base: string;
    whatsapp: string;
    moneda: string;
}) {
    const { agregar, abrir } = useCarrito();
    const [seleccion, setSeleccion] = useState<Record<string, string>>({});
    const [cantidad, setCantidad] = useState(1);

    // Si algún grupo se quedó sin opciones disponibles, el producto no se puede
    // comprar (aunque tenga stock). `faltante` solo mira grupos elegibles.
    const sinOpciones = producto.variantes.some((v) =>
        v.opciones.every((o) => o.agotada)
    );
    const agotado = producto.stock === 0 || sinOpciones;
    const maxCantidad = producto.stock > 0 ? producto.stock : 1;
    const faltante = producto.variantes.find(
        (v) => v.opciones.some((o) => !o.agotada) && !seleccion[v.etiqueta]
    );

    function elegir(etiqueta: string, opcion: string) {
        setSeleccion((s) => ({ ...s, [etiqueta]: opcion }));
    }

    function agregarAlCarrito() {
        if (faltante) return;

        agregar(
            {
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagenes[0],
                variantes: producto.variantes.map((v) => ({
                    etiqueta: v.etiqueta,
                    opcion: seleccion[v.etiqueta],
                })),
            },
            cantidad
        );
        abrir();
    }

    function consultar() {
        const url =
            typeof window !== "undefined"
                ? window.location.href
                : `${base}/producto/${producto.id}`;

        const lineas = [
            "¡Hola! Me interesa este producto:",
            "",
            `• ${producto.nombre}`,
            ...producto.variantes.map(
                (v) => `   ${v.etiqueta}: ${seleccion[v.etiqueta] ?? "a definir"}`
            ),
            ...producto.detalles.map((d) => `   ${d.etiqueta}: ${d.valor}`),
            `   Cantidad: ${cantidad}`,
            `   Precio: ${formatearPrecio(producto.precio, moneda)}`,
            "",
            url,
        ];

        window.open(
            `https://wa.me/${whatsapp}?text=${encodeURIComponent(lineas.join("\n"))}`,
            "_blank",
            "noopener"
        );
    }

    return (
        <div className="flex flex-col gap-5">
            {producto.variantes.map((variante) => (
                <div key={variante.etiqueta}>
                    <p className="mb-2 text-sm font-medium text-[var(--c-texto)]">
                        {variante.etiqueta}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {variante.opciones.map((opcion) => {
                            const activa =
                                seleccion[variante.etiqueta] === opcion.valor;
                            return (
                                <button
                                    key={opcion.valor}
                                    type="button"
                                    onClick={() =>
                                        elegir(variante.etiqueta, opcion.valor)
                                    }
                                    aria-pressed={activa}
                                    disabled={opcion.agotada}
                                    title={opcion.agotada ? "Sin stock" : undefined}
                                    className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                                        opcion.agotada
                                            ? "cursor-not-allowed border-black/10 text-black/30 line-through"
                                            : activa
                                            ? "border-transparent bg-[var(--c-primario)] text-white"
                                            : "border-black/15 text-[var(--c-texto)] hover:border-black/30"
                                    }`}
                                >
                                    {opcion.valor}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}

            <div className="flex items-center gap-4">
                <div className="flex items-center rounded-full border border-black/15">
                    <button
                        type="button"
                        aria-label="Restar"
                        onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                        disabled={agotado}
                        className="grid h-10 w-10 place-items-center text-lg text-[var(--c-texto)]"
                    >
                        −
                    </button>
                    <span className="w-8 text-center tabular-nums text-[var(--c-texto)]">
                        {cantidad}
                    </span>
                    <button
                        type="button"
                        aria-label="Sumar"
                        onClick={() => setCantidad((c) => Math.min(maxCantidad, c + 1))}
                        disabled={agotado}
                        className="grid h-10 w-10 place-items-center text-lg text-[var(--c-texto)]"
                    >
                        +
                    </button>
                </div>

                {producto.stock > 0 && producto.stock <= 5 && (
                    <span className="text-sm text-black/50">
                        Últimas {producto.stock} unidades
                    </span>
                )}
            </div>

            {agotado ? (
                <button
                    type="button"
                    disabled
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-black/10 px-6 py-3 text-sm font-medium text-black/40"
                >
                    Sin stock
                </button>
            ) : (
                <div className="flex flex-col gap-2">
                    <button
                        type="button"
                        onClick={agregarAlCarrito}
                        disabled={!!faltante}
                        className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors ${
                            faltante
                                ? "cursor-not-allowed bg-black/10 text-black/40"
                                : "bg-[var(--c-primario)] text-white hover:opacity-90"
                        }`}
                    >
                        <IconoCarrito className="h-4 w-4" />
                        Agregar al carrito
                    </button>

                    {faltante && (
                        <p className="text-xs text-black/50">
                            Elegí <strong>{faltante.etiqueta}</strong> para agregarlo.
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={consultar}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-[var(--c-primario)] px-6 py-3 text-sm font-medium text-[var(--c-primario)] transition-colors hover:bg-[var(--c-primario)] hover:text-white"
                    >
                        <IconoWhatsApp className="h-4 w-4" />
                        Consultar por WhatsApp
                    </button>
                </div>
            )}
        </div>
    );
}
