"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IconoWhatsApp } from "@/components/Iconos";
import BotonCarrito from "@/components/tienda/BotonCarrito";
import {
    logoSegunEstado,
    tratamientoLogo,
    type TratamientoLogo,
} from "@/lib/tienda/logo-estilo";
import type { Cliente } from "@/lib/tienda/types";

// Clases Tailwind por tratamiento del logo (se animan con transition-[filter]).
const CLASES_LOGO: Record<TratamientoLogo, string> = {
    blanco: "[filter:brightness(0)_invert(1)]",
    normal: "",
    multiply: "mix-blend-multiply",
};

export default function HeaderTienda({
    cliente,
    base,
    logo,
    logoSolido,
}: {
    cliente: Cliente;
    base: string;
    logo?: string;
    logoSolido?: string;
}) {
    const { nombre, marca, whatsapp, redes, sucursales } = cliente;
    const haySucursales = !!sucursales && sucursales.length > 0;
    const tieneBanner = !!marca.banner.imagen;

    const pathname = usePathname();
    const [solido, setSolido] = useState(false);

    useEffect(() => {
        const onScroll = () => setSolido(window.scrollY > 24);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // En el home con banner el header flota transparente sobre el hero; en el
    // resto de las páginas, o al scrollear, se vuelve sólido.
    const enHome = pathname === (base || "/");
    const flotante = enHome && tieneBanner && !solido;
    const tinta = flotante ? "text-white" : "text-[var(--c-texto)]";

    // Logo según el estado (ver `lib/tienda/logo-estilo.ts`): sobre el banner se
    // fuerza a blanco salvo `logoEnBanner: "original"`; en el header sólido va
    // `logoSolido` si existe.
    const srcLogo = logoSegunEstado(logo, logoSolido, flotante);
    const claseLogo =
        CLASES_LOGO[
            tratamientoLogo({
                flotante,
                logoEnBanner: marca.logoEnBanner,
                logoSolido,
            })
        ];

    return (
        <header
            className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
                flotante ? "bg-transparent" : "header-tienda border-b border-black/10"
            }`}
        >
            <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
                <Link href={base || "/"} className="flex items-center gap-3">
                    {srcLogo ? (
                        <Image
                            src={srcLogo}
                            alt={nombre}
                            width={1600}
                            height={576}
                            className={`h-9 w-auto object-contain transition-[filter] duration-300 ${claseLogo}`}
                        />
                    ) : (
                        <span className={`font-display text-lg ${tinta}`}>
                            {nombre}
                        </span>
                    )}
                </Link>

                <nav
                    className={`ml-5 hidden items-center gap-5 text-sm md:flex ${tinta}`}
                >
                    <Link
                        href={base || "/"}
                        className="transition-opacity hover:opacity-70"
                    >
                        Inicio
                    </Link>
                    <Link
                        href={`${base}/catalogo`}
                        className="transition-opacity hover:opacity-70"
                    >
                        Catálogo
                    </Link>
                    {haySucursales && (
                        <Link
                            href={`${base}/#sucursales`}
                            className="transition-opacity hover:opacity-70"
                        >
                            Sucursales
                        </Link>
                    )}
                </nav>

                <div className="ml-auto flex items-center gap-3">
                    {redes?.instagram && (
                        <a
                            href={redes.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hidden text-sm sm:inline ${tinta} hover:opacity-70`}
                        >
                            Instagram
                        </a>
                    )}

                    <BotonCarrito claro={flotante} />

                    <a
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--c-primario)] px-4 py-2 text-sm text-white"
                    >
                        <IconoWhatsApp className="h-4 w-4" />
                        Escribinos
                    </a>
                </div>
            </div>
        </header>
    );
}
