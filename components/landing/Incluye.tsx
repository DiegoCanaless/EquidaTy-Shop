import {
  IconoAuricular,
  IconoCarrito,
  IconoColores,
  IconoEnlace,
  IconoHoja,
  IconoPorcentaje,
} from "@/components/Iconos";

const INCLUYEN = [
  {
    icono: IconoHoja,
    titulo: "La planilla es tu panel",
    texto: "Tus cambios se reflejan en la tienda en ~60 segundos. No hay panel nuevo que aprender.",
  },
  {
    icono: IconoCarrito,
    titulo: "Carrito que cierra por WhatsApp",
    texto: "El cliente arma el pedido y te lo manda al chat, completo y ordenado.",
  },
  {
    icono: IconoColores,
    titulo: "Tu identidad, tus colores",
    texto: "Logo, colores, tipografía y banner de tu marca. Tu tienda, no una genérica.",
  },
  {
    icono: IconoAuricular,
    titulo: "Soporte humano en español",
    texto: "Nos escribís por WhatsApp y te contestamos nosotros, sin tickets ni robots.",
  },
  {
    icono: IconoPorcentaje,
    titulo: "Sin comisiones por venta",
    texto: "Vendés y cobrás vos. Nosotros no nos quedamos con ningún porcentaje.",
  },
  {
    icono: IconoEnlace,
    titulo: "URL propia para compartir",
    texto: "Tu tienda con dirección propia, lista para mandar por WhatsApp e Instagram.",
  },
];

export default function Incluye() {
  return (
    <section id="que-incluye">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <h2 className="mb-12 max-w-[20ch] font-display text-[clamp(1.9rem,3.5vw,2.7rem)] leading-tight tracking-[-0.015em] text-tinta md:mb-14">
          Qué incluye tu tienda
        </h2>

        <div className="grid gap-x-12 sm:grid-cols-2">
          {INCLUYEN.map(({ icono: Icono, titulo, texto }) => (
            <div key={titulo} className="border-t border-linea py-7">
              <div className="flex items-start gap-3.5">
                <Icono className="mt-0.5 h-5 w-5 shrink-0 text-bordo" />
                <div>
                  <h3 className="font-display text-lg text-tinta">
                    {titulo}
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-tenue">
                    {texto}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
