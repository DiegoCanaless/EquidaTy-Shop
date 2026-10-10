import Link from "next/link";
import ProductoCard from "./ProductoCard";
import type { Producto } from "@/lib/tienda/types";

// Fila curada del home: título + grilla de a 4 + link opcional "Ver todos".
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
            <div className="mb-4 flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl text-[var(--c-texto)] sm:text-3xl">
                    {titulo}
                </h2>
                {hrefVerTodos && (
                    <Link
                        href={hrefVerTodos}
                        className="shrink-0 text-sm text-[var(--c-texto)] underline hover:opacity-70"
                    >
                        Ver todos
                    </Link>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {productos.map((p) => (
                    <ProductoCard key={p.id} producto={p} base={base} moneda={moneda} />
                ))}
            </div>
        </section>
    );
}
