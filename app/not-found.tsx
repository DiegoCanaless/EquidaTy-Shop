import Image from "next/image";
import Link from "next/link";
import { IconoWhatsApp } from "@/components/Iconos";
import BotonVolver from "@/components/BotonVolver";
import { WA } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center">
      <Link href="/" aria-label="EquidaTy Shop — ir al inicio">
        <Image
          src="/ImagoTipoWhite.png"
          alt="EquidaTy Shop"
          width={216}
          height={72}
          className="h-9 w-auto"
        />
      </Link>

      <p className="mt-10 font-display text-6xl text-bordo">404</p>
      <h1 className="mt-4 max-w-[20ch] font-display text-[clamp(1.8rem,4vw,2.6rem)] leading-tight tracking-[-0.02em] text-tinta">
        Esta tienda todavía no existe
      </h1>
      <p className="mt-4 max-w-[52ch] text-lg leading-relaxed text-tenue">
        Puede que el link esté malo o que todavía no la hayamos creado. Si
        esperabas ver una tienda, escribinos y vemos qué pasó.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <BotonVolver className="rounded-full border-[1.5px] border-tinta px-7 py-3.5 text-[15px] text-tinta transition-colors hover:bg-tinta hover:text-white">
          Volver atrás
        </BotonVolver>
        <a
          href={WA}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-full bg-bordo px-7 py-3.5 text-[15px] text-white shadow-[0_14px_34px_-16px_rgba(139,26,43,0.7)] transition-colors hover:bg-bordo-hover"
        >
          <IconoWhatsApp className="h-[18px] w-[18px]" />
          Hablanos por WhatsApp
        </a>
      </div>
    </main>
  );
}
