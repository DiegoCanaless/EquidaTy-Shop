# EquidaTy Shop — De tu Google Sheet a una tienda online

## Qué es

Producto de Equidaty: el cliente copia nuestra plantilla de Google Sheets a su
cuenta, carga su catálogo (la plantilla trae títulos claros y un producto de
ejemplo que borra) y su tienda queda online con URL propia, sync ~60s, logo,
colores, banner y botón de WhatsApp. Servicio con mensualidad, **sin costo de
alta** — **no es SaaS self-serve**: yo doy de alta cada cliente a mano (config +
dominio).

## Modelo de negocio

- **Mensual**: $10.000/mes (sin costo de alta; mes a mes, sin contrato).
- **Anual**: $110.000 (un pago; **1 mes de regalo** = $9.167/mes).
- **2 años**: $220.000 (un pago; **2 meses de regalo** vs mensual = $9.167/mes).
- **Prepagos (Anual y 2 años): un pago único y SIN reembolsos** (el cliente debe
  saberlo). El mensual se da de baja cuando quiera.
- **Cobro**: **Plan de Suscripción de la app de Mercado Pago** — creás el plan
  (monto + frecuencia) en tu cuenta, mandás el link (`init_point`) al cliente
  una vez y MP le cobra solo cada mes con reintentos automáticos.
  **Sin panel ni botón en la web**: el control de pagos es la app de MP.
  Si algún día hace falta, la API + webhook queda para E4.
- **Costo fijo**: Cloudflare Workers Paid $5 USD/mes ≈ $93k/año
- **La cuenta** ($10k×12 = $120k/año por cliente; infra Cloudflare $93k/año):
  1 cliente deja ≈ **+$27k/año**; 2 clientes ≈ **+$147k/año**. Ojo:
  con Vercel Pro ($20 USD/mes) 2 clientes apenas empataban — por eso Cloudflare.
- **MP comisión**: ~5-7% + IVA por cobro online (elegir acreditación a 10-18
  días para bajar de 6.29% a 4.39%/3.39%)

## Arquitectura

- **1 SOLO proyecto** (Cloudflare Workers) para todos los clientes
- `config/clients.json` por cliente (ya existe con 2 clientes simulados):
  `{ slug, nombre, activo, moneda, marca: { logo, colores, tipografia, banner },
    catalogo: { sheetId, rango }, whatsapp, redes }`
- **Alta de cliente** = 1 línea en el JSON + push (deploy automático)
- **URLs**: por defecto `equidaty.shop/[slug]` (demo/respaldo). **Dominio propio
  por cliente** (lo paga él, ~$15k/año): se agrega `dominio` en `clients.json` y
  `proxy.ts` detecta el Host y sirve la tienda en la **raíz** con links sin slug
  (`matesartesanales.com` y `matesartesanales.com/producto/…`). Plataforma: en
  Vercel se agrega el dominio al proyecto; en Cloudflare, *Custom Domain* del Worker.
- **Fetch del CSV**:
  `https://docs.google.com/spreadsheets/d/{id}/gviz/tq?tqx=out:csv&sheet=Nombre`
  (requiere Sheet con permiso "cualquiera con el link"); cache `revalidate 60s`
  - Gotcha: columnas con formato mixto pierden texto en el CSV → usar
    `export?format=csv&gid=` y/o pedir en el onboarding que las dejen en
    "Texto simple"
- **SIN base de datos, SIN auth, SIN panel** (los pagos son con el Plan de
  Suscripción de la app MP, fuera de la web)

## Stack

- **Next.js 16** (App Router) + **vinext** → **Cloudflare Workers** ($5 USD/mes)
- **Deploy**: GitHub Actions en Linux (evita los bugs del CLI de CF en Windows)
- **Fallback**: si Cloudflare pelea → Vercel Pro ($20 USD/mes) y subir la
  mensual a $20.000 para que la cuenta cierre
- **Producto completo de una vez** (sin versiones ni fases a medio entregar):
  catálogo + buscador/filtros + **carrito → WhatsApp** + logo + colores + slug
- **Tests**: Vitest (unit) + Playwright (e2e) en CI

## Etapas

1. **E0 · Validar**: copy del pitch + 5-10 pymes charladas
   (¿usan Sheets? ¿pagarían $10.000/mes sin costo de alta?)
2. **E1 · Construir el producto completo**: catálogo desde CSV, slug,
   colores/logo/banner, buscador, carrito → WhatsApp (~1 semana)
3. **E2 · Beta** con los testers (yo les paso la plantilla para que la copien y les doy de alta la tienda)
4. **E3 · Primer cobro MP** → activar CF Workers Paid → publicar
5. **E4 · Extras**: subdominios propios masivos (sin panel: el diferencial es
   "sin panel que aprender")

## Posicionamiento vs competencia

| | Empretienda | Tiendanube | EquidaTy Shop |
|---|---|---|---|
| Precio | ~$10k/mes, alta $0 | Desde $26.999/mes (+ comisión) | **$10k/mes, alta $0** |
| Panel | Sí | Sí | **No: tu planilla es el panel** |
| Checkout | Online (Mercado Pago) | Online (Mercado Pago) | **Por WhatsApp** |
| Carga del catálogo | Panel | Panel | **Tu Google Sheet** |
| Soporte | Centro de ayuda | Tickets | **WhatsApp humano, español** |
| Para quién | Auto-servicio | Negocios que escalan | **El que no quiere aprender nada** |

**Embudo**: producto de entrada → upsell a
[web a medida $150k / Sistemas $350k / equidaty-shop (template, pausado)].

## Reglas de oro

- **Nunca compro infra antes de cobrar** (CF Paid recién con el 1er cliente)
- Precios en ARS vía MP, ajustables; no competir en USD contra SaaS globales
- Monotributo: dar de alta la **semana del primer cobro**
  (cat. A servicios ~$49.527/mes, topa ~$12M/año; sin IVA = precio final;
  IIBB Mendoza vía MUM en la misma boleta)
