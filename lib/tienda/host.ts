import { headers } from "next/headers";
import data from "@/config/clients.json";

type ClienteCfg = { slug: string; dominio?: string };

const clientes = data.clients as ClienteCfg[];

function limpio(h: string): string {
    return h.replace(/^www\./, "").toLowerCase();
}

/**
 * Info del request según el dominio:
 * - `base`: URL absoluta (proto://host)
 * - `slugPropio`: si el dominio es el propio de un cliente, su slug
 */
export async function hostActual(): Promise<{
    host: string;
    base: string;
    slugPropio?: string;
}> {
    const h = await headers();
    const host = limpio(h.get("host") ?? "localhost:3000");
    const proto = (h.get("x-forwarded-proto") ?? "https")
        .split(",")[0]
        .trim();

    const cliente = clientes.find(
        (c) => c.dominio && limpio(c.dominio) === host
    );

    return { host, base: `${proto}://${host}`, slugPropio: cliente?.slug };
}
