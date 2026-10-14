"use client";

import { IconoCarrito } from "@/components/Iconos";
import { useCarrito } from "./carrito-contexto";

export default function BotonCarrito({ claro = false }: { claro?: boolean }) {
    const { listo, cantidadTotal, abrir } = useCarrito();

    return (
        <button
            type="button"
            onClick={abrir}
            aria-label={
                listo && cantidadTotal > 0
                    ? `Abrir carrito, ${cantidadTotal} ítems`
                    : "Abrir carrito"
            }
            className={`relative grid h-10 w-10 place-items-center rounded-full transition-colors ${
                claro
                    ? "text-white hover:bg-white/15"
                    : "text-[var(--c-texto)] hover:bg-black/5"
            }`}
        >
            <IconoCarrito className="h-5 w-5" />
            {listo && cantidadTotal > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-[var(--c-primario)] px-1 text-[11px] font-medium text-white">
                    {cantidadTotal}
                </span>
            )}
        </button>
    );
}
