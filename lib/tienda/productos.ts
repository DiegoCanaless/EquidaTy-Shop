import { fetchCsv, parseCsv } from "./csv";
import type { Cliente, Producto, Variante } from "./types";


function slugify(texto: string): string {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}



export async function fetchProductos(cliente: Cliente): Promise<Producto[]> {
    const texto = await fetchCsv(cliente.catalogo.sheetId);
    if (!texto) return [];

    const filas = parseCsv(texto);
    if (filas.length < 2) return [];

    const headers = filas[0];

    const idx = new Map<string, number>();
    headers.forEach((h, i) => idx.set(h.trim(), i))


    // Variantes
    const columnasVariante = headers
        .map((h, i) => ({ h, i }))
        .filter(({ h }) => h.includes("variante_"))
        .map(({ h, i }) => ({
            col: i,
            etiqueta: h.split(":")[1]?.trim() ?? h.trim(),
        }))

    const productos: Producto[] = [];

    for (let f = 1; f < filas.length; f++) {
        const fila = filas[f];

        // Traemos celda por Nombre de columna

        const celda = (col: string): string => {
            const i = idx.get(col);
            return i === undefined ? "" : (fila[i] ?? "");
        }


        // Campo Nucleo, falla avisamos y skipeamos
        const nombre = celda("nombre").trim();
        if (!nombre) {
            console.warn(`[productos] fila ${f + 1}: sin nombre, se saltea`);
            continue;
        }

        const precio = Number(celda("precio").trim());
        if (!Number.isFinite(precio) || precio <= 0) {
            console.warn(
                `[productos] fila ${f + 1} (${nombre}): precio "${celda("precio")}" inválido, se saltea`
            );
            continue;
        }

        // Campos opcionales
        const precioAntesTxt = celda("precio_antes").trim();
        const precioAntesN = Number(precioAntesTxt);
        const stockTxt = celda("stock").trim();
        const stockN = Number(stockTxt)


        // Variantes, columna por grupo
        const variantes: Variante[] = [];
        for (const { col, etiqueta } of columnasVariante) {
            const opciones = (fila[col] ?? "")
                .split(",")
                .map((o) => o.trim())
                .filter(Boolean);
            if (opciones.length > 0) variantes.push({ etiqueta, opciones });
        }

        const descripcion = celda("descripcion").trim();
        const imagen = celda("imagen").trim();

        productos.push({
            id: slugify(nombre),
            nombre,
            categoria: celda("categoria").trim() || "Sin categoría",
            precio,
            precioAntes:
                precioAntesTxt !== "" && Number.isFinite(precioAntesN)
                    ? precioAntesN
                    : undefined,
            stock: stockTxt !== "" && Number.isFinite(stockN) ? stockN : 0,
            descripcion: descripcion || undefined,
            imagen: imagen || undefined,
            variantes,
        });
    }

    return productos;
}