const PASOS = [
  {
    numero: "01",
    titulo: "Copiás tu plantilla",
    texto:
      "Te mandamos nuestra plantilla de Google Sheets: títulos claros y un producto de ejemplo. La copiás a tu cuenta en un clic, borrás el ejemplo y cargás tu catálogo.",
  },
  {
    numero: "02",
    titulo: "Configuramos tu tienda",
    texto: "Colores, logo, nombre y dirección propia. Vos revisás, das el visto bueno y queda online.",
  },
  {
    numero: "03",
    titulo: "Actualizás y vendés",
    texto: "Cargás productos desde tu planilla como siempre. El carrito cierra por WhatsApp y los pedidos te llegan al chat.",
  },
];

export default function Pasos() {
  return (
    <section id="como-funciona">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <h2 className="mb-12 max-w-[22ch] font-display text-[clamp(1.9rem,3.5vw,2.7rem)] leading-tight tracking-[-0.015em] text-tinta md:mb-14">
          De tu planilla a tu tienda, en tres pasos
        </h2>

        <ol className="grid gap-x-10 gap-y-10 md:grid-cols-3">
          {PASOS.map((p) => (
            <li key={p.numero} className="border-t border-linea pt-6">
              <span
                aria-hidden="true"
                className="font-display text-4xl text-bordo"
              >
                {p.numero}
              </span>
              <h3 className="mt-4 font-display text-xl text-tinta">
                {p.titulo}
              </h3>
              <p className="mt-3 max-w-[40ch] text-[15px] leading-relaxed text-tenue">
                {p.texto}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
