"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useParams } from "next/navigation";
import { IconoWhatsApp } from "@/components/Iconos";
import { WA } from "@/lib/site";

export default function TiendaError({
    error,
    retry,
}: {
    error: Error & { digest?: string };
    retry: () => void;
}) {
    const params = useParams<{ slug?: string }>();
    const pathname = usePathname();

    // En dominio propio la URL es limpia (/producto/…); en el compartido,
    // empieza con /{slug}. Derivamos la base sin depender del contexto.
    const slug = params?.slug;
    const base = slug && pathname.startsWith(`/${slug}`) ? `/${slug}` : "";

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col items-center justify-center px-4 py-16 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/45">
                Ups
            </p>
            <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-[var(--c-texto)] sm:text-4xl">
                Algo salió mal
            </h1>
            <p className="mt-4 max-w-[48ch] text-sm leading-relaxed text-black/60">
                No pudimos cargar esta parte de la tienda. Probá de nuevo; si sigue
                igual, escribinos y lo vemos.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={retry}
                    className="inline-flex items-center justify-center rounded-full bg-[var(--c-primario)] px-6 py-3 text-sm font-medium text-white transition-colors hover:opacity-90"
                >
                    Reintentar
                </button>
                <Link
                    href={base || "/"}
                    className="inline-flex items-center justify-center rounded-full border border-[var(--c-primario)] px-6 py-3 text-sm font-medium text-[var(--c-primario)] transition-colors hover:bg-[var(--c-primario)] hover:text-white"
                >
                    Volver a la tienda
                </Link>
                <a
                    href={WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-black/50 transition-colors hover:text-[var(--c-texto)]"
                >
                    <IconoWhatsApp className="h-4 w-4" />
                    Escribinos
                </a>
            </div>
        </main>
    );
}
