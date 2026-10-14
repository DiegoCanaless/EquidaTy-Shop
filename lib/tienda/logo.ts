import fs from "node:fs";
import path from "node:path";

/**
 * Comprueba que el logo configurado exista en `public/`. Evita un <Image> roto
 * cuando el cliente todavía no subió el archivo.
 *
 * Nota: usa `fs`, por lo que no funcionaría tal cual en Cloudflare Workers
 * (ver pendiente de assets en ese runtime).
 */
export function logoExiste(logo?: string): logo is string {
    return !!logo && fs.existsSync(path.join(process.cwd(), "public", logo));
}
