import { IconoCheck, IconoWhatsApp } from "@/components/Iconos";
import { WA } from "@/lib/site";

type Plan = {
  nombre: string;
  precio: string;
  unidad: string;
  alta: string;
  detalle: string;
  destacado?: boolean;
};

const PLANES: Plan[] = [
  {
    nombre: "Mensual",
    precio: "$10.000",
    unidad: "/mes",
    alta: "Sin costo de alta",
    detalle: "Arrancás hoy mismo. Mes a mes, sin contrato y sin carga inicial.",
  },
  {
    nombre: "Anual",
    precio: "$110.000",
    unidad: "/año",
    alta: "1 mes de regalo",
    detalle: "Un pago. Equivale a $9.167 por mes contra $10.000 del plan mensual.",
    destacado: true,
  },
  {
    nombre: "2 años",
    precio: "$220.000",
    unidad: "/2 años",
    alta: "2 meses de regalo",
    detalle: "Un pago por 24 meses. Equivale a $9.167 por mes.",
  },
];

const INCLUIDOS = [
  "Tienda con URL propia",
  "Catálogo desde tu planilla",
  "Carrito que cierra por WhatsApp",
  "Sin panel que aprender",
  "Cargás tus productos con plantilla y videos",
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
        <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-white/85">
          Empezá mes a mes, o prepagá y ahorrá.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PLANES.map((p) => (
            <div
              key={p.nombre}
              className={`flex flex-col rounded-2xl border p-6 md:p-7 ${
                p.destacado
                  ? "border-transparent bg-white text-tinta"
                  : "border-white/20 bg-white/5 text-white"
              }`}
            >
              {p.destacado && (
                <span className="mb-4 w-fit rounded-full bg-bordo px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white">
                  Más elegido
                </span>
              )}

              <p
                className={`text-[13px] uppercase tracking-[0.14em] ${
                  p.destacado ? "text-bordo" : "text-white/70"
                }`}
              >
                {p.nombre}
              </p>

              <p className="mt-3 font-display text-4xl tabular-nums md:text-5xl">
                {p.precio}
                <span
                  className={`ml-1.5 font-body text-lg ${
                    p.destacado ? "text-tinta/60" : "text-white/60"
                  }`}
                >
                  {p.unidad}
                </span>
              </p>

              <p
                className={`mt-3 text-sm font-medium ${
                  p.destacado ? "text-bordo" : "text-white/90"
                }`}
              >
                {p.alta}
              </p>

              <p
                className={`mt-3 text-sm leading-relaxed ${
                  p.destacado ? "text-tinta/70" : "text-white/70"
                }`}
              >
                {p.detalle}
              </p>
            </div>
          ))}
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
          <p className="max-w-[60ch] text-sm text-white/70">
            Precios en pesos argentinos. Se abona por Mercado Pago. Los planes{" "}
            <strong className="text-white/90">Anual</strong> y{" "}
            <strong className="text-white/90">2 años</strong> son un pago único y{" "}
            <strong className="text-white/90">no son reembolsables</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
