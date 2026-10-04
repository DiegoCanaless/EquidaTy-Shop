"use client";

import { useEffect } from "react";

/**
 * Fuerza el scroll al tope cuando el usuario VUELVE a la landing sin hash
 * (botón "atrás"/"adelante" del navegador o restauración bfcache).
 *
 * Sin esto, el navegador restaura la posición donde el usuario estaba al
 * salir (p. ej. el footer al clickear "Ver tienda demo") y quedaba al final
 * de todo. Si la vuelta es a una ancla (/#precio) no se toca nada.
 */
export default function ScrollAlVolver() {
  useEffect(() => {
    const forzarTope = () => {
      if (window.location.pathname !== "/" || window.location.hash) return;
      // Doble rAF: dejamos que el navegador y Next apliquen su restauración
      // primero; en el segundo frame vamos al tope de forma instantánea.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        })
      );
    };

    const alVolver = () => forzarTope();
    const alRestaurar = (e: PageTransitionEvent) => {
      if (e.persisted) forzarTope();
    };

    window.addEventListener("popstate", alVolver);
    window.addEventListener("pageshow", alRestaurar);
    return () => {
      window.removeEventListener("popstate", alVolver);
      window.removeEventListener("pageshow", alRestaurar);
    };
  }, []);

  return null;
}
