# EquidaTy Shop

[![CI](https://github.com/DiegoCanaless/EquidaTy-Shop/actions/workflows/ci.yml/badge.svg)](https://github.com/DiegoCanaless/EquidaTy-Shop/actions/workflows/ci.yml)

Tienda online que **nace de una planilla**. El cliente carga su catálogo en un
Google Sheet y nosotros le dejamos una tienda con URL propia: el carrito cierra
**por WhatsApp**. Multi-tenant: **un solo proyecto** sirve a todos los clientes.

---

## Cómo funciona

1. El catálogo vive en un **Google Sheet del cliente** (lectura pública:
   *Cualquiera con el link → Lector*).
2. La app lo baja como CSV, lo parsea y arma la tienda (`revalidate` ~60s).
3. Cada cliente se configura en **`config/clients.json`** (colores, logo, banner,
   sheet, WhatsApp, dominio).
4. El **carrito es del navegador** (localStorage) y el **checkout arma un mensaje
   de WhatsApp** con los ítems, variantes y total.

Sin base de datos, sin auth, sin pagos online — por diseño.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** estricto
  · **Tailwind v4**
- **Deploy:** Vercel (fase 0, gratis) → **Cloudflare Workers** al primer cobro
  (ver `IDEA.md`).

## Empezar

```bash
npm install
npm run dev
```

- Landing: <http://localhost:3000>
- Tienda demo: <http://localhost:3000/matesartesanales>

## Estructura

```
app/                    rutas
  page.tsx              landing (material de venta)
  [slug]/               tienda del cliente
    layout.tsx          CSS vars del cliente + header + footer + carrito
    page.tsx            home curado (destacados, ofertas, categorías, sucursales)
    catalogo/           catálogo completo (buscador + filtros + "Ver más")
    producto/[id]/      detalle de producto (galería + variantes + carrito)
    carrito/            carrito + checkout por WhatsApp
    error.tsx           error de tienda
  error.tsx             error global
  not-found.tsx         404
components/
  landing/              secciones de la landing
  tienda/               componentes de tienda (server + client)
lib/
  clients.ts            lee config/clients.json
  tienda/               types, csv, productos (parser), formato, rutas
config/clients.json     configuración de cada cliente
proxy.ts                multi-dominio (Host → slug)
scripts/                utilidades (smoke test del parser)
plantilla/              plantilla CSV del catálogo
```

## Alta de un cliente

1. El cliente **copia la plantilla** (`plantilla/modelo-2-productos.csv`) a su
   Google Sheets, carga el catálogo y comparte la hoja
   (**Cualquiera con el link → Lector**).
2. Se agrega el cliente a **`config/clients.json`**:

   ```json
   {
     "slug": "matesartesanales",
     "nombre": "Mates Artesanales",
     "dominio": "matesartesanales.com",
     "activo": true,
     "moneda": "ARS",
     "marca": {
       "logo": "/clients/matesartesanales/logo.jpg",
       "colores": { "primario": "#6B3A22", "acento": "#C9A227", "fondo": "#FAF6F1", "texto": "#2B1B12" },
       "tipografia": { "display": "Archivo", "cuerpo": "Archivo" },
       "banner": { "imagen": "/clients/matesartesanales/banner.jpg", "titulo": "...", "cta": { "texto": "...", "href": "#catalogo" } }
     },
     "catalogo": { "sheetId": "...", "rango": "Productos!A1:Z1000" },
     "whatsapp": "5492612430088",
     "info": {
       "descripcion": "Mates hechos a mano en Mendoza.",
       "email": "hola@matesartesanales.com",
       "telefono": "+54 9 261 243-0088",
       "envios": "Enviamos a todo el país.",
       "pagos": "Efectivo, transferencia y Mercado Pago."
     },
     "sucursales": [
       {
         "nombre": "Local Centro",
         "direccion": "Av. San Martín 1234, Mendoza",
         "horarios": "Lun a Sáb, 10 a 19 hs"
       }
     ],
     "redes": { "instagram": "..." }
   }
   ```

   El **logo** se pinta distinto según el estado del header (transparente sobre
   el banner del home / sólido al scrollear). Dos campos **opcionales** para
   ajustarlo cuando un solo archivo no alcanza:

   - **`logoSolido`** — variante del logo para **fondos claros** (header sólido y
     footer). Ej: `/clients/x/logo-oscuro.webp`.
   - **`logoEnBanner`** — `"blanco"` (default: fuerza el logo a blanco sobre el
     banner, pensado para **logos oscuros**) o `"original"` (lo muestra tal cual,
     para logos que ya son claros, ej. blanco + dorado con contorno).

   Sin estos campos, un logo oscuro funciona solo. Para generar la variante
   oscura de un logo claro: `node scripts/logo-a-negro.mjs <entrada> <salida>`.

3. Push → la tienda queda en `equidaty.shop/{slug}` (o en su **dominio propio** si
   tiene `dominio`).

El **formato de la planilla** (columnas, variantes vs detalles, imágenes) está en
**[`ONBOARDING.md`](ONBOARDING.md)**.

## Multi-dominio

`proxy.ts` mira el **Host**: si es el dominio propio de un cliente (campo
`dominio`), sirve su tienda **en la raíz** (`matesartesanales.com`,
`matesartesanales.com/producto/…`, sin slug). Si no, usa el modo compartido
`equidaty.shop/{slug}`. Los dominios propios se asignan en la plataforma (Vercel
*Domains* o Cloudflare *Custom Domain* del Worker).

## Scripts

| Comando | Qué hace |
|---|---|
| `npm run dev` | Desarrollo |
| `npm run build` | Build de producción |
| `npm start` | Servir el build |
| `npm run lint` | ESLint |
| `npx --yes tsx scripts/test-productos.ts` | Smoke test del parser (baja los Sheets y muestra cuántos productos leyó) |
| `node scripts/logo-a-negro.mjs <entrada> <salida>` | Variante oscura de un logo claro (letras negras, conserva los colores) |

## Documentación

- **`IDEA.md`** — modelo de negocio, precios, stack, etapas.
- **`PRODUCT.md`** — qué es, para quién, decisiones de producto.
- **`ONBOARDING.md`** — formato de la planilla + mensaje al cliente.
- **`VENTAS.md`** — pitch de venta, objeciones y cierre.
- **`GUIONES-VIDEOS.md`** — guiones de los videos tutoriales.

## Notas

- Las **fotos** de producto se pegan como links de **Google Drive** (compartidos
  como *Cualquiera con el link*); el parser los normaliza solo y los sirve por
  **`/api/img`** (proxy propio: el navegador no puede pedirlos directo a Google,
  Chrome los bloquea por ORB cuando el sitio corre en `localhost`).
- Un producto puede tener **1 a 4 fotos** (`imagen_1..imagen_4`), **variantes**
  (lo que el cliente elige) y **detalles** (datos fijos).
- El bloque `info` (footer: descripción, contacto, envíos, pagos) y `sucursales`
  (sección "Dónde encontrarnos" con mapa de Google) son **opcionales**. Una
  tienda 100% online omite `sucursales` y la sección no aparece.
- Una variante con `(sin stock)` o `(agotado)` queda listada pero no se puede
  elegir (útil para cortes temporales de una opción).
- Las **categorías** del home salen solas de la planilla, con la **primera foto
  de un producto** de esa categoría como imagen principal. Para curarlas (orden,
  nombre, imagen o descripción propios) se agrega un array `categorias` en
  `clients.json`:
  ```json
  "categorias": [
    { "nombre": "Mates", "imagen": "/clients/x/categorias/mates.jpg", "descripcion": "Acero y madera" }
  ]
  ```
