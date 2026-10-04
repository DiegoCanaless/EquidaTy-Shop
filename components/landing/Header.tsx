import Image from "next/image";
import Link from "next/link";
import { IconoWhatsApp } from "@/components/Iconos";
import { WA } from "@/lib/site";

const ENLACES = [
  { href: "#como-funciona", texto: "Cómo funciona" },
  { href: "#que-incluye", texto: "Qué incluye" },
  { href: "#precio", texto: "Precio" },
  { href: "#faq", texto: "Preguntas" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-linea bg-white">
      <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" aria-label="EquidaTy Shop — ir al inicio">
          <Image
            src="/ImagoTipoWhite.png"
            alt="EquidaTy Shop"
            width={216}
            height={72}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav
          aria-label="Secciones"
          className="hidden items-center gap-7 text-sm text-tenue md:flex"
        >
          {ENLACES.map((e) => (
            <a
              key={e.href}
              href={e.href}
              className="transition-colors hover:text-tinta"
            >
              {e.texto}
            </a>
          ))}
        </nav>

        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-bordo px-4 py-2.5 text-sm text-white transition-colors hover:bg-bordo-hover sm:px-5"
        >
          <IconoWhatsApp className="h-4 w-4" />
          Hablanos
        </a>
      </div>
    </header>
  );
}
