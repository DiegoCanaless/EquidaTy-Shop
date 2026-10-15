/**
 * Links de imagen que vienen de la planilla → URL que usa la tienda.
 *
 * Las fotos se suben a Google Drive y se pegan como links de "compartir". El
 * navegador **no** puede bajarlas directo de Google: Chrome bloquea la respuesta
 * (`ERR_BLOCKED_BY_ORB`) cuando el sitio corre en `localhost`, y el `<img>` queda
 * vacío. Del lado del servidor sí funciona siempre, así que las servimos por
 * `/api/img`, que las baja y las devuelve desde nuestro propio dominio.
 */

// Id de archivo de Drive dentro de los links conocidos:
//   https://drive.google.com/file/d/<id>/view?usp=sharing
//   https://drive.google.com/uc?id=<id>
//   https://lh3.googleusercontent.com/d/<id>=w1200
const RX_ID_DRIVE = /(?:file\/d\/|\/d\/|[?&]id=)([-\w]{25,})/;

/** Ancho al que se piden las fotos al proxy. */
const ANCHO = 1200;

/** URL del proxy interno que sirve un archivo de Drive. */
export function urlImagenDrive(id: string, ancho: number = ANCHO): string {
    return `/api/img?id=${id}&w=${ancho}`;
}

/**
 * Link de Drive (o `lh3.googleusercontent.com`) → URL del proxy.
 * Cualquier otro link se devuelve tal cual (no lo tocamos).
 */
export function normalizarImagen(url: string): string {
    const limpio = url.trim();
    if (!limpio) return "";

    const esGoogle =
        limpio.includes("drive.google.com") ||
        limpio.includes("docs.google.com") ||
        limpio.includes("lh3.googleusercontent.com");

    if (esGoogle) {
        const match = limpio.match(RX_ID_DRIVE);
        if (match) return urlImagenDrive(match[1]);
    }

    return limpio;
}
