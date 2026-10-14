const PROBLEMAS = [
  {
    problema: "No quiero aprender otra plataforma",
    solucion: "No vas a tener que aprender una: tu planilla es el panel.",
  },
  {
    problema: "Ya manejo todo en mi planilla",
    solucion: "Perfecto, así sigue siendo. Solo la conectamos con tu tienda.",
  },
  {
    problema: "Las tiendas online salen una fortuna",
    solucion:
      "Sin costo de alta: $10.000 por mes. Sin comisiones por venta.",
  },
  {
    problema: "Quiero vender por WhatsApp sin enredos",
    solucion:
      "El carrito arma el pedido y se manda al chat. Lo cerrás vos, en persona.",
  },
];

export default function Problemas() {
  return (
    <section className="bg-superficie">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <h2 className="mb-12 max-w-[22ch] font-display text-[clamp(1.9rem,3.5vw,2.7rem)] leading-tight tracking-[-0.015em] text-tinta md:mb-14">
          Los problemas que resolvemos
        </h2>

        <div className="grid gap-5 sm:grid-cols-2">
          {PROBLEMAS.map((p) => (
            <div
              key={p.problema}
              className="rounded-2xl border border-linea bg-white p-6 md:p-7"
            >
              <h3 className="font-display text-xl leading-snug text-tinta">
                {p.problema}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-tenue">
                {p.solucion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
