import Image from "next/image";
import { WA } from "@/lib/site";

const PRODUCTO = [
  { href: "#como-funciona", texto: "Cómo funciona" },
  { href: "#que-incluye", texto: "Qué incluye" },
  { href: "#precio", texto: "Precio" },
  { href: "#faq", texto: "Preguntas frecuentes" },
  { href: "/matesartesanales", texto: "Tienda demo" },
];

const CONTACTO = [
  { href: WA, texto: "WhatsApp" },
  { href: "mailto:info@equidaty.com", texto: "info@equidaty.com" },
  { href: "https://instagram.com/equidaty", texto: "@equidaty" },
];

export default function Footer() {
  return (
    <footer className="bg-tinta text-white">
      <div className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            {/* Imagotipo (texto blanco) directo sobre tinta: sin chip,
                que lo taparía. */}
            <Image
              src="/Imagotipo-remove.png"
              alt="EquidaTy Shop"
              width={2172}
              height={724}
              className="h-10 w-auto"
            />
            <p className="mt-4 max-w-[38ch] text-[15px] leading-relaxed text-white/70">
              La tienda online que nace de tu planilla. Un producto de Equidaty
              para pymes y emprendimientos.
            </p>
          </div>

          <nav aria-label="Producto">
            <h2 className="text-[13px] uppercase tracking-[0.14em] text-white/50">
              Producto
            </h2>
            <ul className="mt-4 space-y-2.5 text-[15px] text-white/70">
              {PRODUCTO.map((l) => (
                <li key={l.texto}>
                  <a
                    href={l.href}
                    className="transition-colors hover:text-white"
                  >
                    {l.texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Contacto">
            <h2 className="text-[13px] uppercase tracking-[0.14em] text-white/50">
              Contacto
            </h2>
            <ul className="mt-4 space-y-2.5 text-[15px] text-white/70">
              {CONTACTO.map((l) => (
                <li key={l.texto}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      l.href.startsWith("http") ? "noopener noreferrer" : undefined
                    }
                    className="transition-colors hover:text-white"
                  >
                    {l.texto}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-white/50">
          <p>© 2026 Equidaty. Todos los derechos reservados.</p>
          <p>EquidaTy Shop es un producto de Equidaty.</p>
        </div>
      </div>
    </footer>
  );
}
