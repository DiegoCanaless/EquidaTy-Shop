/**
 * Estilo del logo en el header, según el estado y la config del cliente.
 *
 * Módulo **puro** (sin `fs` ni APIs de servidor) para poder importarlo desde
 * componentes cliente. La comprobación de que el archivo exista vive en
 * `lib/tienda/logo.ts` (server-only).
 */

/** Cómo se pinta el logo en el header. */
export type TratamientoLogo =
    /** Fuerza el logo a blanco (logos oscuros sobre el banner). */
    | "blanco"
    /** Se muestra tal cual (sin filtros ni blend). */
    | "normal"
    /** Multiplica contra el fondo (logo oscuro sobre fondo claro). */
    | "multiply";

/**
 * Decide el tratamiento del logo según el estado del header:
 * - **Flotante** (transparente, sobre el banner): los logos oscuros se fuerzan
 *   a blanco; los que ya son claros (`logoEnBanner: "original"`) van tal cual.
 * - **Sólido** (fondo claro): si hay `logoSolido` se usa tal cual; si no, el
 *   logo claro va tal cual y el oscuro multiplica contra el fondo.
 *
 * Cualquier valor desconocido de `logoEnBanner` cae al default `"blanco"`.
 */
export function tratamientoLogo({
    flotante,
    logoEnBanner,
    logoSolido,
}: {
    flotante: boolean;
    logoEnBanner?: string;
    logoSolido?: string;
}): TratamientoLogo {
    const original = logoEnBanner === "original";
    if (flotante) return original ? "normal" : "blanco";
    return logoSolido || original ? "normal" : "multiply";
}

/**
 * Qué archivo de logo corresponde al estado: sobre el banner siempre va el
 * principal; en el header sólido se prefiere `logoSolido` si está cargado.
 */
export function logoSegunEstado(
    logo?: string,
    logoSolido?: string,
    flotante?: boolean
): string | undefined {
    return !flotante && logoSolido ? logoSolido : logo;
}
