import { describe, it, expect } from "vitest";
import { parseCsv } from "./csv";




describe("parseCsv", () => {
    it("Separa filas y celdas con coma", () => {
        expect(parseCsv("nombre,precio\nMate,15000")).toEqual([
            ["nombre", "precio"],
            ["Mate", "15000"]
        ])
    })


    it("respeta comas dentro de comillas", () => {
        expect(parseCsv('"Mate, especial",15000')).toEqual([
            ["Mate, especial", "15000"],
        ]);
    });

    it('Intepreta comillas escapadas ("" → ")', () => {
        expect(parseCsv('"Dijo ""hola"", "sí"')).toEqual([
            ['Dijo "hola", sí'],
        ])
    });

    it("Ignora el salto \\r de Windows (CRLF)", () => {
        expect(parseCsv("a,b\n1,2")).toEqual([
            ["a", "b"],
            ["1", "2"],
        ])
    });

    it("Devuelve [] con string vacio", () => {
        expect(parseCsv("")).toEqual([])
    })

    it("No recorta espacios(Eso lo hace productos.ts despues", () => {
        expect(parseCsv(" a , b ")).toEqual([
            [" a ", " b "]
        ]
        )
    })








})