import HeaderTienda from "@/components/tienda/HeaderTienda";
import FooterTienda from "@/components/tienda/FooterTienda";
import { CarritoProvider } from "@/components/tienda/carrito-contexto";
import CarritoDrawer from "@/components/tienda/CarritoDrawer";
import { baseTienda } from "@/lib/tienda/rutas";
import { hostActual } from "@/lib/tienda/host";
import { getClient } from "@/lib/clients";
import { logoExiste } from "@/lib/tienda/logo";
import { Metadata } from "next";
import { Archivo, Bebas_Neue, Bodoni_Moda, Manrope, Oswald } from "next/font/google";
import { notFound } from "next/navigation";
import React from "react";


const archivo = Archivo({ subsets: ["latin"], variable: "--f-archivo", display: "swap" });
const bodoni  = Bodoni_Moda({ subsets: ["latin"], variable: "--f-bodoni", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], variable: "--f-manrope", display: "swap" });
const bebas   = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--f-bebas", display: "swap" });
const oswald  = Oswald({ subsets: ["latin"], variable: "--f-oswald", display: "swap" });

type Fuente = { css: string; peso: number; tracking: string };

const FUENTES: Record<string, Fuente> = {
  "Archivo":     { css: "var(--f-archivo)", peso: 800, tracking: "-0.02em" },
  "Bodoni Moda": { css: "var(--f-bodoni)",  peso: 500, tracking: "-0.01em" },
  "Manrope":     { css: "var(--f-manrope)", peso: 700, tracking: "-0.02em" },
  "Bebas Neue":  { css: "var(--f-bebas)",   peso: 400, tracking: "0.02em" },
  "Oswald":      { css: "var(--f-oswald)",  peso: 500, tracking: "-0.01em" },
};



export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const cliente = getClient(slug);
    if (!cliente) return {};
    const { base } = await hostActual();
    return {
        metadataBase: new URL(base),
        title: cliente.nombre,
        description: cliente.marca.banner.titulo,
    };
}


export default async function TiendaLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params;
    const cliente = getClient(slug);

    if (!cliente) notFound();


    const { colores, tipografia } = cliente.marca;
    const base = await baseTienda();

    // Tipografía por cliente: nombre del JSON → variables CSS (fallback Archivo)
    const fuenteDisplay = FUENTES[tipografia.display] ?? FUENTES.Archivo;
    const fuenteCuerpo = FUENTES[tipografia.cuerpo] ?? FUENTES.Archivo;

    const logo = logoExiste(cliente.marca.logo)
        ? cliente.marca.logo
        : undefined;

    // Variante opcional para fondos claros (header sólido y footer).
    const logoSolido = logoExiste(cliente.marca.logoSolido)
        ? cliente.marca.logoSolido
        : undefined;

    return (
        <div
            className={`tienda ${archivo.variable} ${bodoni.variable} ${manrope.variable} ${bebas.variable} ${oswald.variable} min-h-screen bg-[var(--c-fondo)] text-[var(--c-texto)]`}
            style={
                {
                    "--c-primario": colores.primario,
                    "--c-acento": colores.acento,
                    "--c-fondo": colores.fondo,
                    "--c-texto": colores.texto,
                    "--f-display": fuenteDisplay.css,
                    "--f-display-peso": `${fuenteDisplay.peso}`,
                    "--f-display-tracking": fuenteDisplay.tracking,
                    "--f-cuerpo": fuenteCuerpo.css,
                } as React.CSSProperties
            }>
            <CarritoProvider slug={cliente.slug} base={base}>
                <HeaderTienda
                    cliente={cliente}
                    base={base}
                    logo={logo}
                    logoSolido={logoSolido}
                />
                <div className="pt-16">{children}</div>
                <FooterTienda cliente={cliente} base={base} />
                <CarritoDrawer moneda={cliente.moneda} />
            </CarritoProvider>
        </div>
    )
}
