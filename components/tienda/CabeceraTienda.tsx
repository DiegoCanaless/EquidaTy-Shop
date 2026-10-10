import { IconoFlechaAbajo } from "@/components/Iconos";
import type { Cliente } from "@/lib/tienda/types";

export default function CabeceraTienda({ cliente }: { cliente: Cliente }) {
    const { banner } = cliente.marca;

    return (
        <section className="bg-[var(--c-primario)]">
            <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:py-14">
                <div>
                    <h1
                        className="hero-item font-display max-w-2xl text-3xl leading-tight tracking-tight text-white sm:text-4xl"
                        style={{ animationDelay: "0.05s" }}
                    >
                        {banner.titulo}
                    </h1>
                    <span className="hero-regla mt-5" aria-hidden />
                </div>

                <a
                    href={banner.cta.href}
                    className="hero-item inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-[var(--c-texto)] transition-transform hover:-translate-y-0.5"
                    style={{ animationDelay: "0.42s" }}
                >
                    {banner.cta.texto}
                    <IconoFlechaAbajo className="h-4 w-4" />
                </a>
            </div>
        </section>
    );
}
