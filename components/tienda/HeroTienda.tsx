import Image from "next/image";
import type { Cliente } from "@/lib/tienda/types";

export default function HeroTienda({ cliente }: { cliente: Cliente }) {
    const { banner } = cliente.marca;

    return (
        <section className="relative flex min-h-[70dvh] items-end overflow-hidden bg-[var(--c-primario)] md:min-h-[calc(100dvh-4rem)]">
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

            <div className="hero-content relative mx-auto w-full max-w-6xl px-4 pb-14 sm:pb-20">
                <p className="mb-3 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-white/80">
                    <span className="h-px w-8 bg-[var(--c-acento)]" aria-hidden />
                    {cliente.nombre}
                </p>
                <h1 className="font-display max-w-3xl text-4xl leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl">
                    {banner.titulo}
                </h1>
                <a
                    href={banner.cta.href}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--c-texto)] transition-transform hover:-translate-y-0.5"
                >
                    {banner.cta.texto}
                    <span aria-hidden>↓</span>
                </a>
            </div>
        </section>
    );
}
