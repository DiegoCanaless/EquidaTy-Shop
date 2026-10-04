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
• variante_1: Talle / variante_2: Color / variante_3: — lo que escribas
  después de ":" es el título que se ve en la web (Talle, Color, Material,
  Accesorios... lo que necesites). Las opciones se separan con coma:
  S, M, L, XL  ⚠️ La coma SIEMPRE separa opciones — si un valor tiene coma
  adentro, escribilo sin coma.
• stock — cuántas unidades tenés
• imagen — pegá el link de la foto
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
| `variante_1: Talle` | Grupo de variantes (etiqueta editable) | S, M, L, XL |
| `variante_2: Color` | Grupo de variantes | Negro, Gris |
| `variante_3: Material` | Grupo de variantes (o vacío) | Cuero, Acero |
| `stock` | Unidades del producto (stock total, no por variante) | 5 |
| `imagen` | URL de la foto | https://... |
| `descripcion` | Texto libre | Mate de calabaza... |

### Reglas del parser (E1)

- Encabezado de variante: `variante_N: Etiqueta` → la web muestra **solo la
  Etiqueta** (nunca "variante_1").
- Opciones: `valor.split(",").map(trim).filter(Boolean)` — espacios alrededor
  da igual (`S, M` ≡ `S,M`), comas dobles o finales se descartan solas.
- **La coma separa opciones**: una opción no puede contener coma.
- Cantidad de grupos: 0 a 3, dinámico por cliente (columna vacía = no se
  muestra).
- Stock y precio son **del producto**, no por combinación de variantes
  (decisión v1: formato "1 fila = 1 producto", sin matriz de SKU).
- Pestaña de datos: `Productos` (`rango: Productos!A1:Z1000` en clients.json).
- Acceso: hoja con "Cualquiera con el link → Lector" (fetch CSV anónimo).

### Pendientes relacionados

- [ ] Crear la plantilla oficial Modelo 2 (fila de ejemplo real + notas en
  celdas) y actualizar este mensaje con su link.
- [ ] Cuando exista el producto E1, validar este mensaje contra el parser
  real (encabezados, formatos, notas de celdas).
