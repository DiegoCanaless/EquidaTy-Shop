import Link from "next/link";
import Image from "next/image";
import { IconoWhatsApp } from "@/components/Iconos";
import BotonCarrito from "@/components/tienda/BotonCarrito";
import { logoExiste } from "@/lib/tienda/logo";
import type { Cliente } from "@/lib/tienda/types";

export default function HeaderTienda({
    cliente,
    base,
}: {
    cliente: Cliente;
    base: string;
}) {
    const { nombre, marca, whatsapp, redes } = cliente;
    const haySucursales = !!cliente.sucursales && cliente.sucursales.length > 0;

    return (
        <header className="header-tienda sticky top-0 z-50 border-b border-black/10">
            <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4">
                <Link href={base || "/"} className="flex items-center gap-3">
                    {logoExiste(marca.logo) ? (
                        <Image
                            src={marca.logo}
                            alt={nombre}
                            width={1600}
                            height={576}
                            className="h-9 w-auto object-contain mix-blend-multiply"
                        />
                    ) : (
                        <span className="font-display text-lg text-[var(--c-texto)]">
                            {nombre}
                        </span>
                    )}
                </Link>

                <nav className="ml-5 hidden items-center gap-5 text-sm md:flex">
                    <Link
                        href={base || "/"}
                        className="text-[var(--c-texto)] hover:opacity-70"
                    >
                        Inicio
                    </Link>
                    <Link
                        href={`${base}/catalogo`}
                        className="text-[var(--c-texto)] hover:opacity-70"
                    >
                        Catálogo
                    </Link>
                    {haySucursales && (
                        <Link
                            href={`${base}/#sucursales`}
                            className="text-[var(--c-texto)] hover:opacity-70"
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
                            className="hidden text-sm text-[var(--c-texto)] hover:opacity-70 sm:inline"
                        >
                            Instagram
                        </a>
                    )}

                    <BotonCarrito />

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
