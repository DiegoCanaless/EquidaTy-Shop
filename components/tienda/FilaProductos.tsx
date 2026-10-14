import Link from "next/link";
import ProductoCard from "./ProductoCard";
import { IconoFlechaDer } from "@/components/Iconos";
import type { Producto } from "@/lib/tienda/types";

// Fila curada del home: título + grilla de a 4 + link sutil "Ver todos" abajo.
export default function FilaProductos({
    id,
    titulo,
    productos,
    base,
    moneda,
    hrefVerTodos,
}: {
    id?: string;
    titulo: string;
    productos: Producto[];
    base: string;
    moneda: string;
    hrefVerTodos?: string;
}) {
    if (productos.length === 0) return null;

    return (
        <section id={id} className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-8">
            <h2 className="mb-5 font-display text-2xl text-[var(--c-texto)] sm:text-3xl">
                {titulo}
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {productos.map((p) => (
                    <ProductoCard key={p.id} producto={p} base={base} moneda={moneda} />
                ))}
            </div>

            {hrefVerTodos && (
                <div className="mt-8 flex justify-center">
                    <Link
                        href={hrefVerTodos}
                        className="group inline-flex items-center gap-2 text-sm text-[var(--c-texto)]"
                    >
                        <span className="underline decoration-black/25 underline-offset-4 transition-colors group-hover:decoration-current">
                            Ver todos los productos
                        </span>
                        <IconoFlechaDer className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
                    </Link>
                </div>
            )}
        </section>
    );
}
