import Link from "next/link";
import { IconoWhatsApp } from "@/components/Iconos";
import { SITIO_URL } from "@/lib/site";
import type { Cliente } from "@/lib/tienda/types";

export default function FooterTienda({
    cliente,
    base,
}: {
    cliente: Cliente;
    base: string;
}) {
    const { nombre, whatsapp, redes } = cliente;

    // Los legales son de la agencia, pero se muestran dentro de la tienda
    // (mismo dominio): el path va después de la base.
    const legal = (ruta: string) => `${base}/${ruta}`;

    return (
        <footer className="mt-10 border-t border-black/10">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm text-[var(--c-texto)] sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-4">
                    <span className="font-display">{nombre}</span>
                    {redes?.instagram && (
                        <a
                            href={redes.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70"
                        >
                            Instagram
                        </a>
                    )}
                    <a
                        href={`https://wa.me/${whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 hover:opacity-70"
                    >
                        <IconoWhatsApp className="h-4 w-4" /> WhatsApp
                    </a>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-black/50">
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
                    <Link
                        href={SITIO_URL}
                        className="hover:text-[var(--c-texto)]"
                    >
                        Creado con EquidaTy Shop
                    </Link>
                </div>
            </div>
        </footer>
    );
}
