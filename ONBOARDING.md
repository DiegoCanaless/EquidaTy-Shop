# Onboarding de clientes — EquidaTy Shop

Guía para cuando un cliente arrance a cargar sus productos en la plantilla
(Modelo 2). Mantener sincronizado con `config/clients.json` y el parser de E1.

---

## 1. Mensaje de WhatsApp (copy-paste)

```
Hola [nombre]! Mirá, te dejo la planilla con la que armamos tu tienda. Es
simple: la copiás a tu cuenta y cargás tus productos. Cualquier cosa me
escribís. 🙌

1️⃣ Copiá la planilla a tu cuenta
Abrila y andá a Archivo → Crear copia. La copia queda tuya y ahí editás con
tranquilidad.

2️⃣ Cargá tus productos
Una fila = un producto. Las columnas:

• nombre — cómo se llama el producto
• categoria — Mates, Remeras, etc. (agrupa en la web)
• precio — solo números, ej: 18500
• precio_antes — si tiene precio tachado; si no, dejalo vacío
• stock — cuántas unidades tenés
• variante_1 a variante_4 — lo que el cliente ELIGE (talle, color, sabor...).
  Lo que escribas después de ":" es el título que se ve en la web. Las opciones
  se separan con coma: S, M, L, XL  ⚠️ La coma SIEMPRE separa opciones — si un
  valor tiene coma adentro, escribilo sin coma. Las columnas que no uses,
  dejalas vacías.
• detalle_1 a detalle_4 — datos fijos que NO se eligen (material, qué incluye,
  medidas...). Ej: `detalle_1: Material` → "Lino". Acá la coma NO separa nada
  (podés escribir "mate, bombilla y yerbera").
• imagen_1 a imagen_4 — hasta 4 fotos del producto (la 1ª es la que se ve en
  la grilla). Subilas a Google Drive, "Compartir → Acceso general → **Cualquiera
  con el link** → Copiar link" y pegá ese link. ⚠️ Drive lo deja en
  "Restringido" por defecto: **si no lo cambiás, la foto no se ve**. Si tenés
  una sola, usá `imagen_1`.
• descripcion — una o dos oraciones

3️⃣ Borrá el producto de ejemplo que dejamos en la primera fila de datos
(dejá la fila de encabezados, esa no se toca).

4️⃣ Mandame el link
Compartir → Cualquiera con el link → Lector (solo lectura, así nadie te
puede editar nada) y pasame el link. Ahí lo conectamos a tu tienda.
```

---

## 2. Referencia interna (nosotros)

### Columnas exactas (formato de las hojas reales)

| Columna | Contenido | Ejemplo |
|---|---|---|
| `nombre` | Nombre del producto | Mate Imperial "Raíz" |
| `categoria` | Agrupación en la web | Mates |
| `precio` | Número entero, sin $ ni puntos | 18500 |
| `precio_antes` | Opcional (precio tachado) | 21000 / vacío |
| `stock` | Unidades del producto (total, no por variante) | 5 |
| `variante_1: Talle` | Opción que el cliente elige (chip) | S, M, L, XL |
| `variante_2: Color` | Opción | Negro, Gris |
| `variante_3: Material` | Opción (o vacío) | Cuero, Acero |
| `variante_4: Presentación` | Opción (o vacío) | 1, 3, 6 |
| `detalle_1: Incluye` | Dato fijo (no se elige) | Bombilla incluida |
| `detalle_2: Medidas` | Dato fijo | 12 cm de alto |
| `detalle_3: Origen` | Dato fijo | Hecho en Mendoza |
| `detalle_4: Cuidados` | Dato fijo | Lavar a mano |
| `imagen_1` … `imagen_4` | URLs de las fotos (la 1ª es la principal) | https://... |
| `descripcion` | Texto libre | Mate de calabaza... |

### Reglas del parser (E1)

- Encabezado de variante: `variante_N: Etiqueta` → la web muestra **solo la
  Etiqueta** (nunca "variante_1").
- Opciones: `valor.split(",").map(trim).filter(Boolean)` — espacios alrededor
  da igual (`S, M` ≡ `S,M`), comas dobles o finales se descartan solas.
- **La coma separa opciones**: una opción no puede contener coma.
- Cantidad de grupos: **sin tope**; la plantilla trae 4 de cada tipo y las
  columnas vacías no se muestran.
- **El orden importa para la web, no para el parser.** El parser busca por
  NOMBRE de encabezado, así que la posición no rompe nada; pero arma las listas
  en el orden de las columnas (izq→der) y **así se muestran en la página**. Por
  eso: agrupar variantes juntas, detalles juntos, y numerar `_1.._4` de
  izquierda a derecha.
- Orden de columnas recomendado:
  `nombre · categoria · precio · precio_antes · stock · variante_1..4 ·
  detalle_1..4 · imagen_1..4 · descripcion · destacado`.
- **Destacado (opcional):** columna `destacado` con `Sí`/`x`/`1` en los
  productos que querés que aparezcan en la sección **Destacados** del inicio.
  Los que no marques siguen estando en el catálogo completo (`/catalogo`).
- **Variante vs detalle:** `variante_N` = el cliente **elige** (chips en la
  web); `detalle_N` = **dato fijo** del producto (línea de especificación, no
  se elige). El detalle es **texto único**: no se separa por comas.
- **Opción sin stock (temporal):** si te quedás sin una opción pero querés
  seguir mostrándola, agregale `(sin stock)` al final (ej.
  `Marrón (sin stock)`). La opción queda visible pero tachada y no se puede
  elegir; cuando vuelve el stock, borrás la marca. También acepta `(agotado)`.
- Imágenes: `imagen_1..N` (se ordenan por el número); si no hay ninguna, se
  usa la columna vieja `imagen`. Las celdas vacías se ignoran (un producto
  puede tener 1, 2, 3 o 4 fotos). Los links de **Google Drive** (de "compartir")
  se normalizan solos a URL directa; cualquier otro link se usa tal cual.
- Stock y precio son **del producto**, no por combinación de variantes
  (decisión v1: formato "1 fila = 1 producto", sin matriz de SKU).
- Pestaña de datos: `Productos` (`rango: Productos!A1:Z1000` en clients.json).
- Acceso: hoja con "Cualquiera con el link → Lector" (fetch CSV anónimo).

### Pendientes relacionados

- [ ] Crear la plantilla oficial Modelo 2 (fila de ejemplo real + notas en
  celdas) y actualizar este mensaje con su link.
- [ ] Cuando exista el producto E1, validar este mensaje contra el parser
  real (encabezados, formatos, notas de celdas).
