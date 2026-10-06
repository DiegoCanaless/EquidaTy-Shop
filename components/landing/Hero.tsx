import Image from "next/image";
import Link from "next/link";
import { IconoWhatsApp } from "@/components/Iconos";
import { WA } from "@/lib/site";

export default function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-14 md:pb-24 md:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <h1 className="max-w-[22ch] font-display text-[clamp(2.35rem,5.2vw,3.7rem)] leading-[1.07] tracking-[-0.02em] text-tinta">
              Tu planilla de Excel es{" "}
              <span className="text-bordo">tu tienda online</span>.
            </h1>

            <p className="mt-6 max-w-[54ch] text-lg leading-relaxed text-tenue">
              Te damos una plantilla de Google Sheets: la copiás a tu cuenta,
              cargás tu catálogo y listo. Vos actualizás productos como siempre;
              el carrito cierra por WhatsApp.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-bordo px-7 py-3.5 text-[15px] text-white shadow-[0_14px_34px_-16px_rgba(139,26,43,0.7)] transition-colors hover:bg-bordo-hover"
              >
                <IconoWhatsApp className="h-[18px] w-[18px]" />
                Hablanos por WhatsApp
              </a>
              <Link
                href="/matesartesanales"
                className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-tinta px-7 py-3.5 text-[15px] text-tinta transition-colors hover:bg-tinta hover:text-white"
              >
                Ver tienda demo
              </Link>
            </div>

            <p className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-linea pt-6 text-sm text-tenue">
              <span>
                Alta única{" "}
                <strong className="font-display text-bordo">
                  $20.000
                </strong>
              </span>
              <span aria-hidden="true" className="text-linea">
                ·
              </span>
              <span>
                Mensual{" "}
                <strong className="font-display text-bordo">
                  $15.000
                </strong>
              </span>
              <span aria-hidden="true" className="text-linea">
                ·
              </span>
              <span>Soporte por WhatsApp</span>
            </p>
          </div>

          <Image
            src="/hero-productos.jpg"
            alt="Mate, zapatillas, hoodie, reloj y perfume flotando"
            width={1024}
            height={1280}
            priority
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="h-auto w-full border-0 rounded-2xl "
          />
        </div>
      </div>
    </section>
  );
}
