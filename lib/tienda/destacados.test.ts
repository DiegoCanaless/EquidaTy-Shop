import { describe, it, expect } from "vitest";
import { esOferta, seleccionarDestacados } from "./destacados";
import type { Producto } from "./types";

let n = 0;
function p(over: Partial<Producto>): Producto {
    n++;
    return {
        id: over.id ?? `p${n}`,
        nombre: over.nombre ?? `P${n}`,
        categoria: over.categoria ?? "Cat",
        precio: over.precio ?? 1000,
        precioAntes: over.precioAntes,
        stock: over.stock ?? 0,
        descripcion: over.descripcion,
        imagenes: [],
        variantes: [],
        detalles: [],
        destacado: over.destacado ?? false,
    };
}

describe("esOferta", () => {
    it("es oferta solo si precio_antes > precio", () => {
        expect(esOferta(p({ precio: 100, precioAntes: 200 }))).toBe(true);
        expect(esOferta(p({ precio: 200, precioAntes: 100 }))).toBe(false);
        expect(esOferta(p({ precio: 100 }))).toBe(false);
    });
});

describe("seleccionarDestacados", () => {
    it("prioriza ofertas con stock y rellena con los últimos cargados", () => {
        const a = p({ id: "a", precio: 100, precioAntes: 200, stock: 5 }); // oferta
        const b = p({ id: "b", precio: 100, precioAntes: 200, stock: 0 }); // oferta agotada
        const c = p({ id: "c", stock: 3 });
        const d = p({ id: "d", stock: 3 });
        const e = p({ id: "e", stock: 3 });
        const f = p({ id: "f", stock: 3 }); // último cargado

        const r = seleccionarDestacados([a, b, c, d, e, f], 4);
        expect(r.map((x) => x.id)).toEqual(["a", "f", "e", "d"]);
    });

    it("nunca incluye agotados", () => {
        const a = p({ id: "a", stock: 0, destacado: true, precio: 1, precioAntes: 9 });
        expect(seleccionarDestacados([a], 4)).toEqual([]);
    });

    it("pone los marcados con `destacado` después de las ofertas, sin repetir", () => {
        const a = p({ id: "a", precio: 100, precioAntes: 200, stock: 5 }); // oferta + marcado?
        const b = p({ id: "b", stock: 5, destacado: true });
        const c = p({ id: "c", stock: 5, destacado: true });
        const r = seleccionarDestacados([a, b, c], 4);
        expect(r.map((x) => x.id)).toEqual(["a", "b", "c"]);
    });

    it("sin ofertas ni marcados, rellena con los últimos cargados", () => {
        const p1 = p({ id: "1", stock: 2 });
        const p2 = p({ id: "2", stock: 2 });
        const p3 = p({ id: "3", stock: 2 });
        expect(seleccionarDestacados([p1, p2, p3], 2).map((x) => x.id)).toEqual([
            "3",
            "2",
        ]);
    });

    it("si hay menos que el límite, devuelve los que haya", () => {
        const a = p({ id: "a", stock: 5 });
        const b = p({ id: "b", stock: 5 });
        expect(seleccionarDestacados([a, b], 4).map((x) => x.id)).toEqual([
            "b",
            "a",
        ]);
    });
});
