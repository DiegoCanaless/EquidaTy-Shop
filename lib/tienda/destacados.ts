import type { Producto } from "./types";

/** Una oferta es un producto con `precio_antes` mayor al precio actual. */
export function esOferta(p: Producto): boolean {
    return p.precioAntes !== undefined && p.precioAntes > p.precio;
}

/**
 * Arma la fila "Destacados" del home. Reglas:
 *  - Nunca incluye agotados (stock 0).
 *  - Prioridad: ofertas con stock, después los marcados con `destacado`.
 *  - Rellena hasta `limite` con los últimos cargados (los del final de la
 *    planilla), sin repetir.
 */
export function seleccionarDestacados(
    productos: Producto[],
    limite = 4
): Producto[] {
    const enStock = productos.filter((p) => p.stock > 0);

    const vistos = new Set<string>();
    const fila: Producto[] = [];
    const agregar = (p: Producto) => {
        if (vistos.has(p.id)) return;
        vistos.add(p.id);
        fila.push(p);
    };

    enStock.filter(esOferta).forEach(agregar);
    enStock.filter((p) => p.destacado).forEach(agregar);
    [...enStock].reverse().forEach(agregar);

    return fila.slice(0, limite);
}
