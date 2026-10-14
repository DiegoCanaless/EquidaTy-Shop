import { readFile } from "node:fs/promises";
import path from "node:path"

const URL_EXPORT = "https://docs.google.com/spreadsheets/d";

/**
 * "Productos!A1:Z1000" → "Productos"; "Productos" → "Productos"; "" → "".
 * La pestaña de la config (`rango`) es la que se le pide a Google por nombre.
 */
export function nombrePestana(rango: string): string {
    return (rango.split("!")[0] ?? "").trim();
}

export async function fetchCsv(sheetId: string, pestana?: string): Promise<string> {

    // Modo E2E
    const fixture = process.env.E2E_CSV_FIXTURE;

    if (fixture) {
        try {
            return await readFile(path.join(process.cwd(), "e2e", "fixtures", fixture), "utf8");
        } catch (error) {
            console.warn(`[csv] No se pudo leer el fixture ${fixture}:`, error);
            return "";
        }
    }



    // Con nombre de pestaña → export por nombre (mismo formato fiable que gid).
    // Google cae a la primera hoja si el nombre no existe (o si no se pasa).
    const url = pestana
        ? `${URL_EXPORT}/${sheetId}/export?format=csv&sheet=${encodeURIComponent(pestana)}`
        : `${URL_EXPORT}/${sheetId}/export?format=csv&gid=0`;


    try {
        const res = await fetch(url, { next: { revalidate: 60 } })
        if (!res.ok) {
            console.warn(`[csv] HTTP ${res.status} bajando ${sheetId}`);
            return "";
        }

        const tipo = res.headers.get("content-type") ?? "";
        if (tipo.includes("text/html")) {
            console.warn(`[csv] ${sheetId} devolvió HTML (¿hoja privada o borrada?)`);
            return "";
        };

        return await res.text();

    } catch (error) {
        console.warn(`[csv] Excepción bajando ${sheetId}:`, error);
        return "";
    }
}


export function parseCsv(texto: string): string[][] {
    const filas: string[][] = [];
    let fila: string[] = [];
    let celda = "";
    let enComillas = false;


    // c = celda pero no podia repetir nombre, chupete
    for (let i = 0; i < texto.length; i++) {
        const c = texto[i]

        if (c === "\r") continue

        if (enComillas) {
            if (c === '"') {
                if (texto[i + 1] === '"') {
                    celda += '"';
                    i++;
                } else {
                    enComillas = false
                }
            } else {
                celda += c;
            }
        } else if (c === '"') {
            enComillas = true;
        } else if (c === ",") {
            fila.push(celda);
            celda = "";
        } else if (c === "\n") {
            fila.push(celda)
            filas.push(fila);
            fila = [];
            celda = "";
        } else {
            celda += c;
        }
    }



    if (celda !== "" || fila.length > 0) {
        fila.push(celda);
        filas.push(fila)
    }


    return filas;
}
