const NUMERO = "5492612430088";

/** Link a WhatsApp con mensaje prellenado. */
export function wa(
  mensaje = "Hola! Vi EquidaTy Shop y quiero mi tienda.",
): string {
  return `https://wa.me/${NUMERO}?text=${encodeURIComponent(mensaje)}`;
}

/** Link directo a WhatsApp sin mensaje. */
export const WA = wa();

/** Teléfono visible para humanos. */
export const WA_VISIBLE = "+54 9 261 243-0088";

/** URL pública del sitio (links absolutos, metadata). Se puede override con
    NEXT_PUBLIC_SITE_URL cuando el dominio propio esté listo. */
export const SITIO_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://equida-ty-shop.vercel.app";
