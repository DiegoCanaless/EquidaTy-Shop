import { IconoCheck, IconoWhatsApp } from "@/components/Iconos";
import { WA } from "@/lib/site";

const INCLUIDOS = [
  "Tienda con URL propia",
  "Catálogo desde tu planilla",
  "Carrito que cierra por WhatsApp",
  "Soporte humano en español",
  "Sin comisiones por venta",
];

export default function Precio() {
  return (
    <section id="precio" className="bg-bordo text-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <h2 className="max-w-[20ch] font-display text-[clamp(1.9rem,3.5vw,2.7rem)] leading-tight tracking-[-0.015em]">
          Precio claro, sin vueltas
        </h2>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-0">
          <div className="md:pr-12">
            <p className="text-[13px] uppercase tracking-[0.14em] text-white/70">
              Alta única
            </p>
            <p className="mt-3 font-display text-5xl tabular-nums md:text-6xl">
              $80.000
            </p>
            <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-white/85">
              Setup y plantilla lista para tu tienda. Se paga una vez, cuando
              damos de alta tu tienda.
            </p>
          </div>

          <div className="md:border-l md:border-white/25 md:pl-12">
            <p className="text-[13px] uppercase tracking-[0.14em] text-white/70">
              Mensual
            </p>
            <p className="mt-3 font-display text-5xl tabular-nums md:text-6xl">
              $15.500
              <span className="ml-2 font-body text-xl text-white/70">
                /mes
              </span>
            </p>
            <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-white/85">
              Mantenimiento, soporte y tu tienda funcionando todo el mes.
            </p>
          </div>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-3">
          {INCLUIDOS.map((i) => (
            <li key={i} className="flex items-center gap-2.5 text-[15px]">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                <IconoCheck className="h-3.5 w-3.5" />
              </span>
              {i}
            </li>
          ))}
        </ul>

        <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[15px] text-bordo transition-colors hover:bg-tinta hover:text-white"
          >
            <IconoWhatsApp className="h-[18px] w-[18px]" />
            Hablanos por WhatsApp
          </a>
          <p className="text-sm text-white/70">
            Precios en pesos argentinos. Se abona por Mercado Pago.
          </p>
        </div>
      </div>
    </section>
  );
}
