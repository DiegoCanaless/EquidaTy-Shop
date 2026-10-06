import { describe, it, expect, vi, beforeEach } from "vitest";
import type { Cliente } from "./types";
import { fetchCsv } from "./csv";
import { fetchProductos, getProducto } from "./productos";

// Mockeamos SOLO fetchCsv (la red); parseCsv se usa real.
vi.mock("./csv", async (importOriginal) => {
    const original = await importOriginal<typeof import("./csv")>();
    return { ...original, fetchCsv: vi.fn() };
});

const fetchCsvMock = vi.mocked(fetchCsv);

const cliente: Cliente = {
    slug: "demo",
    nombre: "Demo",
    activo: true,
    moneda: "ARS",
    marca: {
        colores: {
            primario: "#000",
            acento: "#f00",
            fondo: "#fff",
            texto: "#111",
        },
        tipografia: { display: "Archivo", cuerpo: "Archivo" },
        banner: { titulo: "Hola", cta: { texto: "Ver", href: "#catalogo" } },
    },
    catalogo: { sheetId: "sheet-demo", rango: "Productos!A1:Z1000" },
    whatsapp: "5492610000000",
};

const HEADER =
    "nombre,categoria,precio,precio_antes,stock,variante_1:Color,detalle_1:Material,imagen_1,imagen_2,descripcion";

beforeEach(() => {
    fetchCsvMock.mockReset();
});

describe("fetchProductos", () => {
    it("devuelve [] si no hay CSV", async () => {
        fetchCsvMock.mockResolvedValue("");
        expect(await fetchProductos(cliente)).toEqual([]);
    });

    it("devuelve [] si solo hay encabezados", async () => {
        fetchCsvMock.mockResolvedValue(HEADER + "\n");
        expect(await fetchProductos(cliente)).toEqual([]);
    });

    it("parsea un producto completo", async () => {
        fetchCsvMock.mockResolvedValue(
            [
                HEADER,
                'Mate Imperial,Mates,18000,22000,3,"Marrón,Natural",Algarrobo,https://lh3.googleusercontent.com/d/abc=w1200,https://ejemplo.com/f2.jpg,Hecho a mano',
            ].join("\n")
        );

        const productos = await fetchProductos(cliente);

        expect(productos).toHaveLength(1);
        const p = productos[0];
        expect(p.id).toBe("mate-imperial");
        expect(p.nombre).toBe("Mate Imperial");
        expect(p.categoria).toBe("Mates");
        expect(p.precio).toBe(18000);
        expect(p.precioAntes).toBe(22000);
        expect(p.stock).toBe(3);
        expect(p.descripcion).toBe("Hecho a mano");
        expect(p.variantes).toEqual([
            { etiqueta: "Color", opciones: ["Marrón", "Natural"] },
        ]);
        expect(p.detalles).toEqual([
            { etiqueta: "Material", valor: "Algarrobo" },
        ]);
        expect(p.imagenes).toEqual([
            "https://lh3.googleusercontent.com/d/abc=w1200",
            "https://ejemplo.com/f2.jpg",
        ]);
    });

    it("convierte link de Google Drive en imagen directa", async () => {
        fetchCsvMock.mockResolvedValue(
            [
                HEADER,
                "Mate,Mates,10000,,,,,https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0jklmnop/view?usp=sharing,,",
            ].join("\n")
        );

        const [p] = await fetchProductos(cliente);
        expect(p.imagenes[0]).toBe(
            "https://lh3.googleusercontent.com/d/1a2b3c4d5e6f7g8h9i0jklmnop=w1200"
        );
    });

    it("ordena imagen_1, imagen_2 (no alfabéticamente)", async () => {
        fetchCsvMock.mockResolvedValue(
            ["nombre,precio,imagen_2,imagen_1", "Mate,10000,segunda,primera"].join("\n")
        );
        const [p] = await fetchProductos(cliente);
        expect(p.imagenes).toEqual(["primera", "segunda"]);
    });

    it("usa la columna imagen legacy si no hay imagen_N", async () => {
        fetchCsvMock.mockResolvedValue(
            "nombre,precio,imagen\nMate,10000,https://x.com/mate.jpg\n"
        );
        const [p] = await fetchProductos(cliente);
        expect(p.imagenes).toEqual(["https://x.com/mate.jpg"]);
    });

    it("saltea filas sin nombre", async () => {
        fetchCsvMock.mockResolvedValue(
            ["nombre,precio", ",10000", "Mate,10000"].join("\n")
        );
        const productos = await fetchProductos(cliente);
        expect(productos.map((p) => p.nombre)).toEqual(["Mate"]);
    });

    it("saltea precios inválidos (texto, 0 y negativos)", async () => {
        fetchCsvMock.mockResolvedValue(
            ["nombre,precio", "Mate,abc", "Bolígrafo,0", "Cuaderno,-5", "Zapatillas,20000"].join(
                "\n"
            )
        );
        const productos = await fetchProductos(cliente);
        expect(productos.map((p) => p.nombre)).toEqual(["Zapatillas"]);
    });

    it("default: categoría vacía → 'Sin categoría' y stock 0", async () => {
        fetchCsvMock.mockResolvedValue(
            ["nombre,precio,categoria,stock", "Mate,10000,,"].join("\n")
        );
        const [p] = await fetchProductos(cliente);
        expect(p.categoria).toBe("Sin categoría");
        expect(p.stock).toBe(0);
    });
});

describe("getProducto", () => {
    it("encuentra el producto por id", async () => {
        fetchCsvMock.mockResolvedValue(
            ["nombre,precio", "Mate Imperial,18000", "Mate Chico,12000"].join("\n")
        );
        const p = await getProducto(cliente, "mate-chico");
        expect(p?.nombre).toBe("Mate Chico");
    });

    it("devuelve undefined si no existe", async () => {
        fetchCsvMock.mockResolvedValue(["nombre,precio", "Mate,10000"].join("\n"));
        expect(await getProducto(cliente, "no-existe")).toBeUndefined();
    });
});