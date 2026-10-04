# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dueños de pymes y emprendimientos pequeños, de cualquier lugar, que manejan su
catálogo en una planilla (Excel o Google Sheets), con o sin experiencia previa
vendiendo online. Quieren tener tienda online sin cambiar su forma de trabajar
ni aprender una plataforma nueva.

## Product Purpose

EquidaTy Shop convierte la planilla de un cliente en una tienda online con URL
propia: sync ~60s, logo, colores, tipografía y banner propios, carrito que cierra
por WhatsApp. Éxito = validar disposición a pagar en E0, primer cobro en E3 y que
la mensualidad cubra costos dejando margen.

## Positioning

La tienda online que nace de tu planilla. Mecanismo propio: no es SaaS
self-serve — el cliente copia nuestra plantilla de Google Sheets a su cuenta y
carga su catálogo; nosotros damos de alta todo a mano. Soporte humano por
WhatsApp en español; precio accesible (~$15.500/mes) contra Tiendanube Impulso
($78.999/mes) y SpreadSimple (inglés, USD).

## Operating Context

- Alta manual de cada cliente (config + dominio); sin panel ni self-serve.
- Cobro por Plan de Suscripción de Mercado Pago (link `init_point`), fuera de
  la web; sin botón de pago en la tienda.
- Arquitectura: 1 solo proyecto multi-tenant (Cloudflare Workers); alta de
  cliente = línea en `config/clients.json` + push.
- Hosting por fases (decisión del dueño): **fase 0** (0 clientes
  cobrados, desarrollo y demos) → Vercel Hobby gratis, $0. **Primer
  cliente cobrado** → migrar a **Cloudflare Workers Paid ($5/mes)**:
  mismo alcance que Vercel Pro ($20/mes) vía adaptador OpenNext, con más
  fricción. Reglas: verificar compatibilidad OpenNext + Next 16.3 + ISR
  y probar el deploy con las tiendas demo **antes** de tener al cliente
  esperando; Vercel Pro ($20) queda como respaldo si OpenNext/ISR da
  pelea. El consumo de requests a Google Sheets no cambia entre hosts.
- Etapa actual: E0 (validar con 5-10 pymes charladas); producto E1 en
  construcción. La landing `/` es el material de venta para las charlas de E0.

## Capabilities and Constraints

- Catálogo desde Google Sheets/planilla, revalidate ~60s; carrito → WhatsApp;
  colores/tipografía/banner configurables por cliente en `config/clients.json`.
  El banner es **opcional**: `banner.imagen` puede omitirse y la tienda muestra
  un banner de color primario con título y CTA (logo y banner siempre tienen
  fallback para no romperse si faltan los archivos).
- Plantilla de Google Sheets provista (títulos claros + fila de ejemplo que el
  cliente borra); la carga del catálogo la hace el cliente.
- Sin base de datos, sin auth, sin pagos online en la web.
- Precios confirmados y **visibles en la landing** (decisión del dueño):
  alta única **$80.000 ARS** (setup + plantilla lista) y mensual
  **~$15.500/mes** (10 USD al MEP, ajustable; la landing **no** muestra el
  equivalente en USD — decisión del dueño).

## Brand Commitments

- Nombre: **EquidaTy Shop** (producto de Equidaty).
- Estética fijada por el dueño: **rojo primario + blanco + negro** — "un
  e-commerce de nuestra autoría". Las paletas de tienda de cliente (ej.
  verde/ámbar de una tienda de indumentaria) son config de cliente, no la
  marca EquidaTy.
- Tipografía de marca elegida por el dueño: **Archivo** (variable 100–900).
  Display en **Black (800)** con tracking apretado; cuerpo en **regular (400)**.
  Una sola familia, cohesiva y con carácter retail.
- CTA de contacto: WhatsApp **5492612430088**.
- Voz: español rioplatense, directo, sin jerga técnica, trato de tú.

## Evidence on Hand

- `IDEA.md` con el modelo de negocio completo (precios, stack, etapas,
  comparación vs competencia).
- **No hay clientes, testimonios, métricas ni demo pública todavía** (E0
  pendiente). La landing no debe citar clientes, reseñas ni números de venta;
  nada de eso puede inventarse.

## Product Principles

1. La planilla del cliente ES su panel — no cambia su forma de trabajar.
2. Servicio, no software: setup y soporte humanos, en español.
3. Precio accesible que cierre para la pyme argentina.
4. Un solo deploy para todos los clientes (multi-tenant por configuración).
5. Toda claim de la landing es un hecho real de este archivo; nada inventado.

## Accessibility & Inclusion

Omitido: no se estableció un requisito específico más allá de una landing
usable en móvil (audiencia que navega desde Instagram/WhatsApp).
