import { IconoMas } from "@/components/Iconos";

const PREGUNTAS = [
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. Vos ya sabés usar una planilla, y con eso alcanza. Nosotros hacemos el alta de la tienda y te explicamos todo por WhatsApp, sin tecnicismos.",
  },
  {
    q: "¿Y si mi catálogo está en un Excel de la compu?",
    a: "Perfecto. Copiás nuestra plantilla de Google Sheets a tu cuenta y pasás tus productos desde el Excel. Te dejamos un producto de ejemplo para que veas cómo hacerlo, y lo borrás.",
  },
  {
    q: "¿Quién carga los productos?",
    a: "Vos, desde tu propia planilla. Cada cambio se refleja en la tienda en aproximadamente 60 segundos.",
  },
  {
    q: "¿Pierdo mi forma de trabajar?",
    a: "No. Tu planilla sigue siendo tu panel de control. La tienda se conecta a ella, no al revés.",
  },
  {
    q: "¿Hay comisiones por venta?",
    a: "No. Vos cobrás directo a tus clientes. EquidaTy Shop no se queda con ningún porcentaje de tus ventas.",
  },
  {
    q: "¿Cómo se paga?",
    a: "Te mandamos un link de Mercado Pago. No hay costo de alta: entrás con $10.000 por mes, o prepagás el año a $110.000 (1 mes de regalo) o 2 años a $220.000 (2 meses de regalo).",
  },
  {
    q: "¿Puedo cancelar o pedir reembolso?",
    a: "El plan mensual lo podés dar de baja cuando quieras. Los planes prepagos (Anual y 2 años) son un pago único y no son reembolsables.",
  },
];

export default function Faq() {
  return (
    <section id="faq">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <h2 className="mb-10 font-display text-[clamp(1.9rem,3.5vw,2.7rem)] leading-tight tracking-[-0.015em] text-tinta md:mb-12">
          Preguntas frecuentes
        </h2>

        <div className="max-w-3xl">
          {PREGUNTAS.map((p) => (
            <details key={p.q} className="group border-t border-linea last:border-b">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="font-display text-lg text-tinta">{p.q}</h3>
                <IconoMas className="h-5 w-5 shrink-0 text-bordo transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="max-w-[68ch] pb-6 pr-8 text-[15px] leading-relaxed text-tenue">
                {p.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
