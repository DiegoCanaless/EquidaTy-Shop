import Link from "next/link";
import Image from "next/image";

type CategoriaVista = {
    nombre: string;
    cantidad: number;
    imagen?: string;
    descripcion?: string;
};

// Categorías del home, alineadas a la izquierda: imagen retrato + nombre en
// display debajo de una hairline. Un solo momento de movimiento (zoom sutil).
export default function Categorias({
    categorias,
    base,
}: {
    categorias: CategoriaVista[];
    base: string;
}) {
    if (categorias.length === 0) return null;

    return (
        <section
            id="categorias"
            className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-8"
        >
            <h2 className="mb-5 font-display text-2xl text-[var(--c-texto)] sm:text-3xl">
                Categorías
            </h2>

            <ul className="flex flex-wrap gap-3 sm:gap-5">
                {categorias.map((c) => (
                    <li key={c.nombre} className="w-40 shrink-0 sm:w-52">
                        <Link
                            href={`${base}/catalogo?cat=${encodeURIComponent(c.nombre)}`}
                            className="group block"
                        >
                            <span className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-[var(--c-primario)]">
                                {c.imagen && (
                                    <Image
                                        src={c.imagen}
                                        alt={c.nombre}
                                        fill
                                        unoptimized
                                        sizes="(max-width: 640px) 160px, 208px"
                                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                                    />
                                )}
                            </span>

                            <span className="mt-3 flex items-baseline justify-between gap-2 border-t border-black/10 pt-3">
                                <span className="font-display text-base uppercase tracking-[0.01em] text-[var(--c-texto)] group-hover:underline">
                                    {c.nombre}
                                </span>
                                <span className="text-xs tabular-nums text-black/45">
                                    {c.cantidad}
                                </span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}
