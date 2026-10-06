"use client";

import { useMemo, useState } from "react";
import ProductoCard from "./ProductoCard";
import type { Producto } from "@/lib/tienda/types";

type Orden = "relevancia" | "precio-asc" | "precio-desc";

export default function CatalogoTienda({
    productos,
    base,
    moneda,
}: {
    productos: Producto[];
    base: string;
    moneda: string;
}) {
    const [busqueda, setBusqueda] = useState("");
    const [categoria, setCategoria] = useState("");
    const [orden, setOrden] = useState<Orden>("relevancia");
    const [soloOfertas, setSoloOfertas] = useState(false);

    const categorias = useMemo(() => {
        const set = new Set<string>();
        productos.forEach((p) => p.categoria && set.add(p.categoria));
        return Array.from(set).sort((a, b) => a.localeCompare(b, "es"));
    }, [productos]);

    const filtrados = useMemo(() => {
        const q = busqueda.trim().toLowerCase();

        const lista = productos.filter((p) => {
            if (categoria && p.categoria !== categoria) return false;
            if (
                soloOfertas &&
                !(p.precioAntes !== undefined && p.precioAntes > p.precio)
            )
                return false;
            if (q && !p.nombre.toLowerCase().includes(q)) return false;
            return true;
        });

        if (orden === "precio-asc") {
            lista.sort((a, b) => a.precio - b.precio);
        } else if (orden === "precio-desc") {
            lista.sort((a, b) => b.precio - a.precio);
        } else {
            // Relevancia: agotados al final (orden estable).
            lista.sort((a, b) => Number(a.stock === 0) - Number(b.stock === 0));
        }

        return lista;
    }, [productos, categoria, soloOfertas, busqueda, orden]);

    return (
        <section
            id="catalogo"
            className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-6"
        >
            <div className="mb-5 flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-2">
                    <input
                        type="search"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        placeholder="Buscar productos…"
                        aria-label="Buscar productos"
                        className="min-w-[11rem] flex-1 rounded-full border border-black/15 bg-white px-4 py-2 text-sm text-[var(--c-texto)]"
                    />

                    <select
                        value={orden}
                        onChange={(e) => setOrden(e.target.value as Orden)}
                        aria-label="Ordenar por"
                        className="rounded-full border border-black/15 bg-white px-3 py-2 text-sm text-[var(--c-texto)]"
                    >
                        <option value="relevancia">Relevancia</option>
                        <option value="precio-asc">Menor precio</option>
                        <option value="precio-desc">Mayor precio</option>
                    </select>

                    <button
                        type="button"
                        onClick={() => setSoloOfertas((v) => !v)}
                        aria-pressed={soloOfertas}
                        className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                            soloOfertas
                                ? "border-transparent bg-[var(--c-primario)] text-white"
                                : "border-black/15 text-[var(--c-texto)] hover:border-black/30"
                        }`}
                    >
                        Ofertas
                    </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Chip activa={categoria === ""} onClick={() => setCategoria("")}>
                        Todas
                    </Chip>
                    {categorias.map((c) => (
                        <Chip
                            key={c}
                            activa={categoria === c}
                            onClick={() => setCategoria(c)}
                        >
                            {c}
                        </Chip>
                    ))}
                    <span className="ml-auto text-sm tabular-nums text-black/50">
                        {filtrados.length}{" "}
                        {filtrados.length === 1 ? "producto" : "productos"}
                    </span>
                </div>
            </div>

            {filtrados.length === 0 ? (
                <p className="rounded-lg border border-dashed border-black/15 p-8 text-center text-sm text-black/60">
                    No encontramos productos con esos filtros.
                </p>
            ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                    {filtrados.map((p) => (
                        <ProductoCard
                            key={p.id}
                            producto={p}
                            base={base}
                            moneda={moneda}
                        />
                    ))}
                </div>
            )}
        </section>
    );
}

function Chip({
    activa,
    onClick,
    children,
}: {
    activa: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={activa}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                activa
                    ? "border-transparent bg-[var(--c-primario)] text-white"
                    : "border-black/15 text-[var(--c-texto)] hover:border-black/30"
            }`}
        >
            {children}
        </button>
    );
}
