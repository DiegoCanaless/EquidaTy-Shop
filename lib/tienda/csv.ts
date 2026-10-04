const URL_EXPORT = "https://docs.google.com/spreadsheets/d";

export async function fetchCsv(sheetId: string): Promise<string> {
    const url = `${URL_EXPORT}/${sheetId}/export?format=csv&gid=0`;


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
