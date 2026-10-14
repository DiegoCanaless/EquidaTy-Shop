"use client";

import { useState } from "react";
import { IconoReloj, IconoUbicacion, IconoNavegar } from "@/components/Iconos";
import type { Sucursal } from "@/lib/tienda/types";

// URL del iframe de Google Maps (sin API key). Usa `mapa` si viene, si no
// arma la búsqueda con las coordenadas o la dirección.
function urlMapa(s: Sucursal): string {
    if (s.mapa) return s.mapa;
    const q = s.coords?.trim() || s.direccion;
    return `https://www.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;
}

// Link "Cómo llegar" (abre la app/Google Maps en una pestaña nueva).
function urlComoLlegar(s: Sucursal): string {
    const destino = s.coords?.trim() || s.direccion;
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        destino
    )}`;
}

export default function Sucursales({ sucursales }: { sucursales: Sucursal[] }) {
    const [activa, setActiva] = useState(0);
    const sucursal = sucursales[activa];

    if (!sucursal) return null;

    const varias = sucursales.length > 1;

    return (
        <section
            id="sucursales"
            className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-10"
        >
            <h2 className="font-display text-2xl text-[var(--c-texto)] sm:text-3xl">
                Dónde encontrarnos
            </h2>

            <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,20rem)_1fr]">
                <div className="flex flex-col gap-2">
                    {sucursales.map((s, i) => {
                        const sel = i === activa;
                        return (
                            <button
                                key={`${s.nombre}-${i}`}
                                type="button"
                                onClick={() => setActiva(i)}
                                aria-pressed={sel}
                                className={`rounded-xl border p-4 text-left transition-colors ${
                                    sel
                                        ? "border-[var(--c-primario)] bg-white"
                                        : "border-black/10 hover:border-black/25"
                                }`}
                            >
                                <span className="font-display block text-base text-[var(--c-texto)]">
                                    {s.nombre}
                                </span>
                                <span className="mt-1 flex items-start gap-2 text-sm text-black/60">
                                    <IconoUbicacion className="mt-0.5 h-4 w-4 shrink-0" />
                                    {s.direccion}
                                </span>
                                {s.horarios && (
                                    <span className="mt-1 flex items-start gap-2 text-sm text-black/60">
                                        <IconoReloj className="mt-0.5 h-4 w-4 shrink-0" />
                                        {s.horarios}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="flex flex-col gap-3">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-black/10 bg-black/5">
                        <iframe
                            key={urlMapa(sucursal)}
                            title={`Mapa de ${sucursal.nombre}`}
                            src={urlMapa(sucursal)}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="absolute inset-0 h-full w-full border-0"
                        />
                    </div>

                    <a
                        href={urlComoLlegar(sucursal)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--c-primario)] px-5 py-2.5 text-sm font-medium text-[var(--c-primario)] transition-colors hover:bg-[var(--c-primario)] hover:text-white"
                    >
                        <IconoNavegar className="h-4 w-4" />
                        {varias ? `Cómo llegar a ${sucursal.nombre}` : "Cómo llegar"}
                    </a>
                </div>
            </div>
        </section>
    );
}
