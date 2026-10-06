import { headers } from "next/headers";

/**
 * Base pública para los links de la tienda, según el dominio:
 * - dominio propio del cliente → "" (links en la raíz: /producto/x, /carrito)
 * - dominio compartido (equidaty.shop) → "/{slug}" (links: /{slug}/producto/x)
 *
 * La setea el middleware en el header `x-store-base`.
 */
export async function baseTienda(): Promise<string> {
    const h = await headers();
    return h.get("x-store-base") ?? "";
}
