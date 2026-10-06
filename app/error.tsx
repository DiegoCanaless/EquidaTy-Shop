"use client";

import Link from "next/link";
import { useEffect } from "react";
import { IconoWhatsApp } from "@/components/Iconos";
import { WA } from "@/lib/site";

export default function Error({
    error,
    retry,
}: {
    error: Error & { digest?: string };
    retry: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center">
            <p className="font-display text-5xl text-bordo">Ups</p>
            <h1 className="mt-4 max-w-[24ch] font-display text-3xl leading-tight tracking-[-0.02em] text-tinta">
                Algo salió mal
            </h1>
            <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-tenue">
                No pudimos cargar la página. Probá de nuevo; si sigue igual, escribinos.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={retry}
                    className="rounded-full bg-bordo px-7 py-3.5 text-[15px] text-white transition-colors hover:bg-bordo-hover"
                >
                    Reintentar
                </button>
                <Link
                    href="/"
                    className="rounded-full border-[1.5px] border-tinta px-7 py-3.5 text-[15px] text-tinta transition-colors hover:bg-tinta hover:text-white"
                >
                    Volver al inicio
                </Link>
                <a
                    href={WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-3.5 text-[15px] text-tenue transition-colors hover:text-tinta"
                >
                    <IconoWhatsApp className="h-[18px] w-[18px]" />
                    Escribinos
                </a>
            </div>
        </main>
    );
}
