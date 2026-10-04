import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

/* Tipografía de marca: Archivo (variable 100–900). Display en Black (800)
   con tracking apretado; cuerpo en regular (400). Ver globals.css. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EquidaTy Shop — Tu planilla de Excel es tu tienda online",
  description:
    "Convertimos tu Google Sheet o Excel en una tienda online con carrito que cierra por WhatsApp. Alta única $80.000 y $15.500 por mes, sin comisiones por venta.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  // data-scroll-behavior="smooth": Next 16 ya no overridea el scroll-behavior
  // CSS durante navegaciones SPA (upgrade guide v16); este atributo restaura
  // el override: scroll instantáneo al tope entre rutas, suave solo para
  // anclas (#) dentro de la misma página.
  return (
    <html lang="es" className={archivo.variable} data-scroll-behavior="smooth">
      <body className="font-body min-h-full antialiased">{children}</body>
    </html>
  );
}
