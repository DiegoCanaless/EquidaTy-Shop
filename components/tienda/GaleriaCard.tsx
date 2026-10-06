"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GaleriaCard({
    imagenes,
    alt,
    agotado,
}: {
    imagenes: string[];
    alt: string;
    agotado: boolean;
}) {
    const [activo, setActivo] = useState(false);
    const [indice, setIndice] = useState(0);
    const total = imagenes.length;

    useEffect(() => {
        if (!activo || total < 2) return;

        const timer = window.setInterval(
            () => setIndice((i) => (i + 1) % total),
            900
        );
        return () => window.clearInterval(timer);
    }, [activo, total]);

    if (total === 0) return null;

    function entrar() {
        if (total < 2) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setActivo(true);
    }

    function salir() {
        setActivo(false);
        setIndice(0);
    }

    const clase = (visible: boolean) =>
        `object-cover transition-opacity duration-500 motion-reduce:transition-none ${
            visible ? "opacity-100" : "opacity-0"
        }`;

    return (
        <div
            className={`absolute inset-0 ${agotado ? "opacity-60 grayscale" : ""}`}
            onMouseEnter={entrar}
            onMouseLeave={salir}
        >
            <Image
                src={imagenes[0]}
                alt={alt}
                fill
                unoptimized
                sizes="(max-width: 640px) 50vw, 25vw"
                className={clase(indice === 0)}
            />
            {activo &&
                imagenes.slice(1).map((url, i) => (
                    <Image
                        key={url}
                        src={url}
                        alt=""
                        fill
                        unoptimized
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className={clase(indice === i + 1)}
                    />
                ))}
        </div>
    );
}
