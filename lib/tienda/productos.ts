import { fetchCsv, parseCsv } from "./csv";
import type { Cliente, Detalle, Producto, Variante } from "./types";


function slugify(texto: string): string {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}


// Link de Google Drive (compartir) → URL de imagen directa. Otros links, tal cual.
const RX_ID_DRIVE = /(?:file\/d\/|\/d\/|[?&]id=)([-\w]{25,})/;

function normalizarImagen(url: string): string {
    const limpio = url.trim();
    if (!limpio) return "";
    if (limpio.includes("lh3.googleusercontent.com")) return limpio;
    if (
        limpio.includes("drive.google.com") ||
        limpio.includes("docs.google.com")
    ) {
        const match = limpio.match(RX_ID_DRIVE);
        if (match) return `https://lh3.googleusercontent.com/d/${match[1]}=w1200`;
    }
    return limpio;
}



export async function fetchProductos(cliente: Cliente): Promise<Producto[]> {
    const texto = await fetchCsv(cliente.catalogo.sheetId);
    if (!texto) return [];

    const filas = parseCsv(texto);
    if (filas.length < 2) return [];

    const headers = filas[0];

    const idx = new Map<string, number>();
    headers.forEach((h, i) => idx.set(h.trim(), i))


    // Variantes: el cliente las elige (chips en la web)
    const columnasVariante = headers
        .map((h, i) => ({ h, i }))
        .filter(({ h }) => h.includes("variante_"))
        .map(({ h, i }) => ({
            col: i,
            etiqueta: h.split(":")[1]?.trim() ?? h.trim(),
        }))

    // Detalles: dato fijo del producto (no se elige)
    const columnasDetalle = headers
        .map((h, i) => ({ h, i }))
        .filter(({ h }) => h.includes("detalle_"))
        .map(({ h, i }) => ({
            col: i,
            etiqueta: h.split(":")[1]?.trim() ?? h.trim(),
        }))

    // Imágenes: imagen_1..N (ordenadas por número)
    const columnasImagen = headers
        .map((h, i) => ({ h: h.trim(), i }))
        .filter(({ h }) => /^imagen_\d+$/.test(h))
        .sort((a, b) => Number(a.h.split("_")[1]) - Number(b.h.split("_")[1]))

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

        // Detalles, dato fijo (sin separar por coma)
        const detalles: Detalle[] = [];
        for (const { col, etiqueta } of columnasDetalle) {
            const valor = (fila[col] ?? "").trim();
            if (valor) detalles.push({ etiqueta, valor });
        }

        // Imágenes: imagen_1..N; si no hay ninguna, la `imagen` vieja
        const imagenes: string[] = [];
        for (const { i } of columnasImagen) {
            const url = normalizarImagen(fila[i] ?? "");
            if (url) imagenes.push(url);
        }
        if (imagenes.length === 0) {
            const legacy = normalizarImagen(celda("imagen"));
            if (legacy) imagenes.push(legacy);
        }

        const descripcion = celda("descripcion").trim();

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
            imagenes,
            variantes,
            detalles,
        });
    }

    return productos;
}


export async function getProducto(
    cliente: Cliente,
    id: string
): Promise<Producto | undefined> {
    const productos = await fetchProductos(cliente);
    return productos.find((p) => p.id === id);
}
