import Link from "next/link";
import Image from "next/image";
import type { ComponentType } from "react";
import {
    IconoWhatsApp,
    IconoMail,
    IconoTelefono,
    IconoEnvio,
    IconoPago,
    IconoInstagram,
    IconoFacebook,
    IconoTikTok,
} from "@/components/Iconos";
import { SITIO_URL } from "@/lib/site";
import { logoExiste } from "@/lib/tienda/logo";
import type { Cliente } from "@/lib/tienda/types";

type IconoRed = ComponentType<{ className?: string }>;

export default function FooterTienda({
    cliente,
    base,
}: {
    cliente: Cliente;
    base: string;
}) {
    const { nombre, marca, whatsapp, info, sucursales, redes } = cliente;
    const anio = new Date().getFullYear();

    // Los legales son de la agencia, pero se muestran dentro de la tienda
    // (mismo dominio): el path va después de la base.
    const legal = (ruta: string) => `${base}/${ruta}`;

    const redesItems: { label: string; href: string; Icono?: IconoRed }[] = [];
    if (redes?.instagram)
        redesItems.push({ label: "Instagram", href: redes.instagram, Icono: IconoInstagram });
    if (redes?.facebook)
        redesItems.push({ label: "Facebook", href: redes.facebook, Icono: IconoFacebook });
    if (redes?.tiktok)
        redesItems.push({ label: "TikTok", href: redes.tiktok, Icono: IconoTikTok });
    if (redes?.x) redesItems.push({ label: "X", href: redes.x });

    const haySucursales = !!sucursales && sucursales.length > 0;
    const hayCompra = !!info?.envios || !!info?.pagos || haySucursales;

    return (
        <footer className="mt-10 border-t border-black/10">
            <div className="mx-auto max-w-6xl px-4 py-10">
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Marca */}
                    <div className="flex flex-col gap-3">
                        <Link href={base || "/"} className="flex items-center gap-3">
                            {logoExiste(marca.logo) ? (
                                <Image
                                    src={marca.logo}
                                    alt={nombre}
                                    width={1600}
                                    height={576}
                                    className="h-8 w-auto object-contain"
                                />
                            ) : (
                                <span className="font-display text-lg text-[var(--c-texto)]">
                                    {nombre}
                                </span>
                            )}
                        </Link>

                        {info?.descripcion && (
                            <p className="max-w-[36ch] text-sm leading-relaxed text-black/60">
                                {info.descripcion}
                            </p>
                        )}

                        {redesItems.length > 0 && (
                            <ul className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
                                {redesItems.map(({ label, href, Icono }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm text-[var(--c-texto)] hover:opacity-70"
                                        >
                                            {Icono && <Icono className="h-4 w-4" />}
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Contacto */}
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-black/45">
                            Contacto
                        </h2>
                        <ul className="flex flex-col gap-2 text-sm">
                            <li>
                                <a
                                    href={`https://wa.me/${whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[var(--c-texto)] hover:opacity-70"
                                >
                                    <IconoWhatsApp className="h-4 w-4" /> WhatsApp
                                </a>
                            </li>
                            {info?.email && (
                                <li>
                                    <a
                                        href={`mailto:${info.email}`}
                                        className="inline-flex items-center gap-2 text-[var(--c-texto)] hover:opacity-70"
                                    >
                                        <IconoMail className="h-4 w-4" /> {info.email}
                                    </a>
                                </li>
                            )}
                            {info?.telefono && (
                                <li>
                                    <a
                                        href={`tel:${info.telefono.replace(/[^\d+]/g, "")}`}
                                        className="inline-flex items-center gap-2 text-[var(--c-texto)] hover:opacity-70"
                                    >
                                        <IconoTelefono className="h-4 w-4" /> {info.telefono}
                                    </a>
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Compra / envíos / sucursales */}
                    {hayCompra && (
                        <div className="flex flex-col gap-3">
                            <h2 className="text-xs font-medium uppercase tracking-[0.16em] text-black/45">
                                Comprá
                            </h2>
                            <ul className="flex flex-col gap-2 text-sm text-black/70">
                                {info?.envios && (
                                    <li className="flex gap-2">
                                        <IconoEnvio className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span>{info.envios}</span>
                                    </li>
                                )}
                                {info?.pagos && (
                                    <li className="flex gap-2">
                                        <IconoPago className="mt-0.5 h-4 w-4 shrink-0" />
                                        <span>{info.pagos}</span>
                                    </li>
                                )}
                                {haySucursales && (
                                    <li>
                                        <Link
                                            href={`${base}/#sucursales`}
                                            className="text-[var(--c-texto)] underline hover:opacity-70"
                                        >
                                            Ver sucursales
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-6 text-sm text-black/50 sm:flex-row sm:items-center sm:justify-between">
                    <span>
                        © {anio} {nombre}
                    </span>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <Link
                            href={legal("terminos")}
                            className="hover:text-[var(--c-texto)]"
                        >
                            Términos
                        </Link>
                        <Link
                            href={legal("privacidad")}
                            className="hover:text-[var(--c-texto)]"
                        >
                            Privacidad
                        </Link>
                        <Link href={SITIO_URL} className="hover:text-[var(--c-texto)]">
                            Creado con EquidaTy Shop
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
