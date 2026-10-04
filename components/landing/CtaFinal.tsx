import { IconoWhatsApp } from "@/components/Iconos";
import { WA, WA_VISIBLE } from "@/lib/site";

export default function CtaFinal() {
  return (
    <section className="bg-superficie">
      <div className="mx-auto max-w-4xl px-5 py-20 text-center md:py-24">
        <h2 className="font-display text-[clamp(1.9rem,3.8vw,2.9rem)] leading-tight tracking-[-0.015em] text-tinta">
          Tu tienda online empieza con una planilla
        </h2>
        <p className="mx-auto mt-5 max-w-[52ch] text-lg leading-relaxed text-tenue">
          Contanos qué vendés y te mostramos cómo quedaría la tuya. Sin
          compromiso.
        </p>
        <div className="mt-9 flex flex-col items-center gap-4">
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-bordo px-7 py-3.5 text-[15px] text-white shadow-[0_14px_34px_-16px_rgba(139,26,43,0.7)] transition-colors hover:bg-bordo-hover"
          >
            <IconoWhatsApp className="h-[18px] w-[18px]" />
            Hablanos por WhatsApp
          </a>
          <p className="text-sm text-tenue">
            o escribinos al{" "}
            <span className="text-tinta tabular-nums">
              {WA_VISIBLE}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
