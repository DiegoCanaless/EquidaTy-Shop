import { describe, it, expect, vi, afterEach } from "vitest";
import { parseCsv, fetchCsv, nombrePestana } from "./csv";




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

describe("nombrePestana", () => {
    it("extrae la pestaña antes del !", () => {
        expect(nombrePestana("Productos!A1:Z1000")).toBe("Productos");
    });

    it("si no hay !, usa el texto tal cual", () => {
        expect(nombrePestana("Productos")).toBe("Productos");
    });

    it("con string vacío devuelve vacío", () => {
        expect(nombrePestana("")).toBe("");
    });
});

describe("fetchCsv", () => {
    afterEach(() => vi.unstubAllGlobals());

    it("pide la pestaña por nombre cuando se la pasan", async () => {
        const fetchMock = vi.fn().mockResolvedValue(
            new Response("nombre,precio\nMate,100", {
                status: 200,
                headers: { "content-type": "text/csv" },
            })
        );
        vi.stubGlobal("fetch", fetchMock);

        await fetchCsv("SHEETID", "Productos");

        const url = String(fetchMock.mock.calls[0]?.[0] ?? "");
        expect(url).toContain("/SHEETID/export?format=csv&sheet=Productos");
    });

    it("sin pestaña cae al export de la primera hoja (gid=0)", async () => {
        const fetchMock = vi.fn().mockResolvedValue(
            new Response("nombre,precio\nMate,100", {
                status: 200,
                headers: { "content-type": "text/csv" },
            })
        );
        vi.stubGlobal("fetch", fetchMock);

        await fetchCsv("SHEETID");

        const url = String(fetchMock.mock.calls[0]?.[0] ?? "");
        expect(url).toContain("/SHEETID/export?format=csv&gid=0");
    });
});
