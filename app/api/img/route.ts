import type { NextRequest } from "next/server";

/**
 * Proxy de las fotos de producto que viven en Google Drive.
 *
 * El navegador no puede bajar la imagen directo de Google: Chrome bloquea la
 * respuesta (`ERR_BLOCKED_BY_ORB`) cuando el sitio corre en `localhost`, y el
 * `<img>` queda vacío. Del lado del servidor la descarga funciona siempre, así
 * que la hacemos acá y la servimos desde nuestro dominio: mismo resultado en
 * desarrollo y en producción.
 *
 * Seguridad: solo se acepta un **id** de Drive (nunca una URL), así que el fetch
 * siempre apunta a Google: no hay forma de redirigirlo a otro host (SSRF).
 */

// Los ids de Drive tienen ~28-33 caracteres.
const RX_ID = /^[-\w]{20,}$/;

const ANCHO_MIN = 200;
const ANCHO_MAX = 2400;
const ANCHO_DEF = 1200;

// El id identifica al archivo: se puede cachear fuerte (navegador 1 día,
// CDN 7 días, con revalidación en segundo plano).
const CACHE =
    "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400";

function error(mensaje: string, status: number) {
    return new Response(mensaje, {
        status,
        headers: { "Cache-Control": "no-store" },
    });
}

export async function GET(req: NextRequest) {
    const id = (req.nextUrl.searchParams.get("id") ?? "").trim();
    if (!RX_ID.test(id)) return error("id inválido", 400);

    const pedido = Number(req.nextUrl.searchParams.get("w"));
    const ancho = Number.isFinite(pedido)
        ? Math.min(ANCHO_MAX, Math.max(ANCHO_MIN, Math.round(pedido)))
        : ANCHO_DEF;

    let res: Response;
    try {
        res = await fetch(
            `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w${ancho}`,
            { redirect: "follow" }
        );
    } catch {
        return error("no se pudo bajar la imagen", 502);
    }

    const tipo = res.headers.get("content-type") ?? "";
    if (!res.ok || !tipo.startsWith("image/")) {
        // Drive responde HTML cuando el archivo no es público ("Cualquiera con
        // el link"): mejor un error explícito que servir HTML como imagen.
        return error("imagen no disponible", 502);
    }

    return new Response(res.body, {
        status: 200,
        headers: { "Content-Type": tipo, "Cache-Control": CACHE },
    });
}
