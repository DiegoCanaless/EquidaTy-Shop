import Image from "next/image";
import { IconoFlechaAbajo } from "@/components/Iconos";
import type { Cliente } from "@/lib/tienda/types";

export default function HeroTienda({ cliente }: { cliente: Cliente }) {
    const { banner } = cliente.marca;

    return (
        <section className="relative flex min-h-[70dvh] items-end overflow-hidden bg-[var(--c-primario)] md:min-h-[100dvh]">
            {banner.imagen && (
                <Image
                    src={banner.imagen}
                    alt={banner.alt ?? ""}
                    fill
                    priority
                    sizes="100vw"
                    className="hero-media object-cover"
                />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/25" />

            {/* Velo superior: garantiza el contraste del header flotante sobre
                cualquier foto (deja ≥53% de negro donde va el texto). */}
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/80 via-black/55 to-transparent"
                aria-hidden
            />

            <div className="hero-content relative mx-auto w-full max-w-6xl px-4 pb-14 sm:pb-20">
                <p
                    className="hero-item mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/80"
                    style={{ animationDelay: "0.05s" }}
                >
                    {cliente.nombre}
                </p>
                <h1
                    className="hero-item font-display max-w-3xl text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
                    style={{ animationDelay: "0.14s" }}
                >
                    {banner.titulo}
                </h1>
                <span className="hero-regla mt-6" aria-hidden />
                <a
                    href={banner.cta.href}
                    className="hero-item mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--c-texto)] transition-transform hover:-translate-y-0.5"
                    style={{ animationDelay: "0.42s" }}
                >
                    {banner.cta.texto}
                    <IconoFlechaAbajo className="h-4 w-4" />
                </a>
            </div>
        </section>
    );
}
