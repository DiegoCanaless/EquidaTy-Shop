import type { Cliente } from "@/lib/tienda/types";

export default function CabeceraTienda({ cliente }: { cliente: Cliente }) {
    const { banner } = cliente.marca;

    return (
        <section className="bg-[var(--c-primario)]">
            <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:py-14">
                <div>
                    <span
                        className="mb-4 block h-px w-12 bg-[var(--c-acento)]"
                        aria-hidden
                    />
                    <h1 className="font-display max-w-2xl text-3xl leading-tight tracking-tight text-white sm:text-4xl">
                        {banner.titulo}
                    </h1>
                </div>

                <a
                    href={banner.cta.href}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--c-texto)] transition-transform hover:-translate-y-0.5"
                >
                    {banner.cta.texto}
                    <span aria-hidden>↓</span>
                </a>
            </div>
        </section>
    );
}
