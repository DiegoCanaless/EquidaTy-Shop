import HeaderTienda from "@/components/tienda/HeaderTienda";
import FooterTienda from "@/components/tienda/FooterTienda";
import { CarritoProvider } from "@/components/tienda/carrito-contexto";
import CarritoDrawer from "@/components/tienda/CarritoDrawer";
import { baseTienda } from "@/lib/tienda/rutas";
import { hostActual } from "@/lib/tienda/host";
import { getClient } from "@/lib/clients";
import { Metadata } from "next";
import { Archivo } from "next/font/google";
import { notFound } from "next/navigation";
import React from "react";



const archivo = Archivo({
    subsets: ["latin"],
    variable: "--f-archivo",
    display: "swap",
});


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


    const { colores } = cliente.marca;
    const base = await baseTienda();

    return (
        <div
            className={`tienda ${archivo.variable} min-h-screen bg-[var(--c-fondo)] text-[var(--c-texto)]`}
            style={
                {
                    "--c-primario": colores.primario,
                    "--c-acento": colores.acento,
                    "--c-fondo": colores.fondo,
                    "--c-texto": colores.texto,
                    "--f-display": "var(--f-archivo)",
                    "--f-cuerpo": "var(--f-archivo)",
                } as React.CSSProperties
            }>
            <CarritoProvider slug={cliente.slug} base={base}>
                <HeaderTienda cliente={cliente} base={base} />
                {children}
                <FooterTienda cliente={cliente} base={base} />
                <CarritoDrawer moneda={cliente.moneda} />
            </CarritoProvider>
        </div>
    )
}
