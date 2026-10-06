
import { describe, expect, it } from "vitest";
import { formatearPrecio } from "./formato";



const normalizar = (s: string) => s.replace(/\s/g, " ").trim();


describe("Formateador de precios", () => {
    it("Formatea peso sin decimales", () => {
        expect(normalizar(formatearPrecio(15000, "ARS"))).toBe("$ 15.000")
    })


    it("Sepasra miles con puntos", () => {
        expect(normalizar(formatearPrecio(1000000, "ARS"))).toBe("$ 1.000.000")
    })

    it("Redondea decimales a entero", () => {
        expect(normalizar(formatearPrecio(1234.5, "ARS"))).toBe("$ 1.235")
    })

    it("Formatea cero", () => {
        expect(normalizar(formatearPrecio(0, "ARS"))).toBe("$ 0")
    })
})
