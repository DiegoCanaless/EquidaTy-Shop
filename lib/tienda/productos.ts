import { fetchCsv, parseCsv, nombrePestana } from "./csv";
import { normalizarImagen } from "./imagenes";
import type { Cliente, Detalle, Producto, Variante, OpcionVariante } from "./types";


function slugify(texto: string): string {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}


// Marca de opción agotada al final: "Marrón (sin stock)" / "Rojo (agotado)".
// La opción sigue listada, pero no se puede elegir.
const RX_AGOTADA = /\s*\(\s*(?:sin\s+stock|agotado)\s*\)\s*$/i;

// Valores que cuentan como "sí" en columnas de bandera (ej. `destacado`).
const SI = new Set(["si", "sí", "x", "1", "true", "yes", "s"]);
function esSi(valor: string): boolean {
    return SI.has(valor.trim().toLowerCase());
}



export async function fetchProductos(cliente: Cliente): Promise<Producto[]> {
    const texto = await fetchCsv(
        cliente.catalogo.sheetId,
        nombrePestana(cliente.catalogo.rango)
    );
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
    const idsUsados = new Set<string>();

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


        // Variantes, columna por grupo. Una opción con "(sin stock)" o
        // "(agotado)" queda listada pero no se puede elegir.
        const variantes: Variante[] = [];
        for (const { col, etiqueta } of columnasVariante) {
            const opciones: OpcionVariante[] = (fila[col] ?? "")
                .split(",")
                .map((o) => o.trim())
                .filter(Boolean)
                .map((o) => ({
                    valor: o.replace(RX_AGOTADA, "").trim(),
                    agotada: RX_AGOTADA.test(o),
                }))
                .filter((o) => o.valor);
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

        // id único: si el slug ya existe, sufijo -2, -3… (nombres que colapsan)
        let id = slugify(nombre);
        if (idsUsados.has(id)) {
            let n = 2;
            while (idsUsados.has(`${id}-${n}`)) n++;
            console.warn(
                `[productos] fila ${f + 1} (${nombre}): id "${id}" repetido, se usa "${id}-${n}"`
            );
            id = `${id}-${n}`;
        }
        idsUsados.add(id);

        productos.push({
            id,
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
            destacado: esSi(celda("destacado")),
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
