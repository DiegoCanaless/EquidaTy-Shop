# EquidaTy Shop — De tu Google Sheet a una tienda online

## Qué es

Producto de Equidaty: el cliente copia nuestra plantilla de Google Sheets a su
cuenta, carga su catálogo (la plantilla trae títulos claros y un producto de
ejemplo que borra) y su tienda queda online con URL propia, sync ~60s, logo,
colores, banner y botón de WhatsApp. Servicio con alta cobrada + mensualidad —
**no es SaaS self-serve**: yo doy de alta cada cliente a mano (config + dominio).

## Modelo de negocio

- **Alta (único)**: $80.000 ARS (setup + plantilla lista; la carga del catálogo la hace el cliente)
- **Mensual**: 10 USD en pesos (~$15.500/mes, ajustar por MEP)
- **Cobro**: **Plan de Suscripción de la app de Mercado Pago** — creás el plan
  (monto + frecuencia) en tu cuenta, mandás el link (`init_point`) al cliente
  una vez y MP le cobra solo cada mes con reintentos automáticos.
  **Sin panel ni botón en la web**: el control de pagos es la app de MP.
  Si algún día hace falta, la API + webhook queda para E4.
- **Costo fijo**: Cloudflare Workers Paid $5 USD/mes ≈ $93k/año
- **La cuenta**: 1 cliente ya cubre el costo y deja ~+$157k/año de ganancia
  (2 clientes ≈ +$407k). Ojo: con Vercel Pro ($20 USD/mes) 2 clientes apenas
  empataban — por eso Cloudflare.
- **MP comisión**: ~5-7% + IVA por cobro online (elegir acreditación a 10-18
  días para bajar de 6.29% a 4.39%/3.39%)

## Arquitectura

- **1 SOLO proyecto** (Cloudflare Workers) para todos los clientes
- `config/clients.json` por cliente (ya existe con 2 clientes simulados):
  `{ slug, nombre, activo, moneda, marca: { logo, colores, tipografia, banner },
    catalogo: { sheetId, rango }, whatsapp, redes }`
- **Alta de cliente** = 1 línea en el JSON + push (deploy automático)
- **URLs**: `equidaty.shop/[slug]` o dominio propio del cliente (lo paga él,
  ~$15k/año, apunta con DNS a Cloudflare)
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
   (¿usan Sheets? ¿pagarían $15.500/mes?)
2. **E1 · Construir el producto completo**: catálogo desde CSV, slug,
   colores/logo/banner, buscador, carrito → WhatsApp (~1 semana)
3. **E2 · Beta** con los testers (yo les paso la plantilla para que la copien y les doy de alta la tienda)
4. **E3 · Primer cobro MP** → activar CF Workers Paid → publicar
5. **E4 · Extras**: subdominios propios masivos, panel admin si hace falta

## Posicionamiento vs competencia

| | Competencia | EquidaTy Shop |
|---|---|---|
| Precio | Tiendanube Impulso $78.999/mes · SpreadSimple $13.90 USD | ~$15.500/mes en ARS |
| Soporte | Inglés / tickets | **WhatsApp en español** |
| Setup | Self-service | **Plantilla lista + alta a mano** |
| Pagos del cliente | Stripe (inviable para pyme AR) | **WhatsApp / MP** |

**Embudo**: producto de entrada → upsell a
[web a medida $150k / Sistemas $350k / equidaty-shop (template, pausado)].

## Reglas de oro

- **Nunca compro infra antes de cobrar** (CF Paid recién con el 1er cliente)
- Precios en ARS vía MP, ajustables; no competir en USD contra SaaS globales
- Monotributo: dar de alta la **semana del primer cobro**
  (cat. A servicios ~$49.527/mes, topa ~$12M/año; sin IVA = precio final;
  IIBB Mendoza vía MUM en la misma boleta)
