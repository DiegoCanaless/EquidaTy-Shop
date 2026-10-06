"use client";

import { useState } from "react";
import Image from "next/image";

function IconoFlecha({ dir }: { dir: "izq" | "der" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            {dir === "izq" ? <path d="M15 5l-7 7 7 7" /> : <path d="M9 5l7 7-7 7" />}
        </svg>
    );
}

export default function GaleriaProducto({
    imagenes,
    alt,
}: {
    imagenes: string[];
    alt: string;
}) {
    const [indice, setIndice] = useState(0);
    const total = imagenes.length;

    if (total === 0) {
        return (
            <div className="aspect-square rounded-xl border border-black/10 bg-white" />
        );
    }

    const mover = (paso: number) => setIndice((i) => (i + paso + total) % total);

    return (
        <div>
            <div className="relative aspect-square overflow-hidden rounded-xl border border-black/10 bg-white">
                <div
                    className="flex h-full w-full transition-transform duration-300 ease-out motion-reduce:transition-none"
                    style={{ transform: `translateX(-${indice * 100}%)` }}
                >
                    {imagenes.map((url, i) => (
                        <div key={url} className="relative h-full w-full shrink-0">
                            <Image
                                src={url}
                                alt={i === 0 ? alt : ""}
                                fill
                                priority={i === 0}
                                unoptimized
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>
                    ))}
                </div>

                {total > 1 && (
                    <>
                        <button
                            type="button"
                            aria-label="Imagen anterior"
                            onClick={() => mover(-1)}
                            className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[var(--c-texto)] shadow-sm transition-colors hover:bg-white"
                        >
                            <IconoFlecha dir="izq" />
                        </button>
                        <button
                            type="button"
                            aria-label="Imagen siguiente"
                            onClick={() => mover(1)}
                            className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[var(--c-texto)] shadow-sm transition-colors hover:bg-white"
                        >
                            <IconoFlecha dir="der" />
                        </button>
                    </>
                )}
            </div>

            {total > 1 && (
                <div className="mt-3 flex justify-center gap-2">
                    {imagenes.map((url, i) => (
                        <button
                            key={url}
                            type="button"
                            aria-label={`Ir a la imagen ${i + 1}`}
                            onClick={() => setIndice(i)}
                            className={`h-2 w-2 rounded-full transition-colors ${
                                i === indice ? "bg-[var(--c-texto)]" : "bg-black/20"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
