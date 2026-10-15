# Guiones — Videos tutoriales (EquidaTy Shop)

4 videos cortos (2–3 min) para mandarle al cliente cuando paga el alta.
Formato: **grabación de pantalla** (celular o compu) + tu voz. Nada editado de
más: que se entienda y se vea simple.

> Tip: grabá el audio con el celu bien cerca y hacelo **en una sola toma**. Un
> video "casero" y claro convence más que uno pulido y frío.

---

## Video 1 — Copiar la plantilla y cargar tu primer producto (2 min)

**Objetivo:** que entienda "1 fila = 1 producto" y cargue el primero.

**Guion:**
1. *"Hola, soy [tu nombre] de EquidaTy Shop. En 2 minutos vas a tener tu
   catálogo andando. Te mandé un link a una planilla de Google Sheets — abrilo."*
2. Mostrar la planilla abierta. *"Esta es la plantilla. Fijate que arriba están
   los títulos de las columnas."*
3. *"Andá a **Archivo → Crear una copia**. Esto te hace tu propia copia, y ahí
   edita tranquilo: es tuya."* (mostrar el menú y la copia nueva)
4. *"Mirá: **cada fila es un producto**. Estos son los datos de cada uno."*
   Pasar por las columnas principales sin detenerse: `nombre`, `categoria`,
   `precio`, `stock`, imagen, descripcion.
5. *"Cargá un producto tuyo: escribí el nombre, el precio (solo números, sin
   $ ni puntos), y la cantidad en stock."*
6. *"Y muy importante: **borrá la fila de ejemplo** que dejamos. Dejá los
   títulos, borrá solo ese producto de ejemplo."*
7. Cierre: *"Listo, ya sabés cargar. En el próximo video te muestro las
   variantes (talle, color) y los detalles."*

---

## Video 2 — Variantes y detalles (2–3 min)

**Objetivo:** que entienda la diferencia entre lo que el cliente **elige**
(variante) y un **dato fijo** (detalle).

**Guion:**
1. *"Dos cosas que confunden y son clave: **variantes** y **detalles**."*
2. *"**Variante** es algo que tu cliente **elige**. Por ejemplo: Talle (S, M,
   L), Color (Negro, Azul). Van en las columnas `variante_1`, `variante_2`…"*
   Mostrar: escribir `S, M, L` en una columna de variante.
3. *"Ojo con un detalle: **la coma separa las opciones**. Entonces `S, M, L`
   son tres talles. Y si una opción tuviera coma adentro, escribila sin coma."*
4. *"**Detalle** es un dato fijo, que **no se elige**: el material, qué incluye,
   las medidas. Van en `detalle_1`, `detalle_2`…"*
   Mostrar: escribir en `detalle_1: Material` → `Lino`.
5. *"Ejemplo real: un mate que viene en cuero **o** acero → eso es **variante**
   (lo elige). Pero un buzo que es de algodón y punto → eso es **detalle**
   (es así y listo)."*
6. *"No hace falta llenar todo. Si una columna no la usás, **dejala vacía**."*
7. Cierre: *"Ahora las fotos, en el próximo."*

---

## Video 3 — Las fotos (2 min)

**Objetivo:** que suba hasta 4 fotos por producto.

**Guion:**
1. *"Las fotos van en las columnas `imagen_1`, `imagen_2`, `imagen_3`,
   `imagen_4`. Podés poner **hasta 4**. La **primera** es la que se ve en la
   grilla; las otras aparecen al pasar el mouse y en la página del producto."*
2. *"Acá va el **link de la foto**, no la foto pegada."*
3. **Cómo sacar el link (mostrarlo):**
   - Subí la foto a Google Drive.
   - **Compartir → Acceso general → "Cualquiera con el link" → Lector.**
   - **Copiar link** y pegalo **tal cual** en `imagen_1`.
   - ⚠️ **Ojo:** Drive lo deja en **"Restringido"** por defecto. Si no lo
     cambiás a "Cualquiera con el link", **la foto no se ve**.
   *(También sirve cualquier link que empiece con `https://…`.)*
4. *"Si tenés una sola foto, ponela en `imagen_1` y listo."*
5. Cierre: *"Último video: cómo me compartís la planilla y los errores que hay
   que evitar."*

> Nota para nosotros: el parser **normaliza los links de Drive** y los sirve por
> nuestro proxy (`/api/img`), que baja la foto del lado del servidor (el navegador
> no puede pedirla directo a Google: Chrome la bloquea por ORB en `localhost`). El
> archivo tiene que ser **"cualquiera con el link"**. Si a futuro molesta,
> evaluamos un subidor propio (Cloudflare R2).

---

## Video 4 — Compartir la planilla (y errores a evitar) (2 min)

**Objetivo:** que te pase el link correcto y no se equivoque con los datos.

**Guion:**
1. *"Cuando termines (o tengas 5 productos), me pasás el link. Así:"*
2. *"Arriba a la derecha: **Compartir → Cualquiera con el link → Lector**.
   Después, **Copiar link**, y me lo mandás por WhatsApp."* (mostrarlo)
3. *"Yo lo conecto a tu tienda y en un rato te mando tu URL."*
4. **Errores comunes (decirlos rápido, ideal con ejemplo en pantalla):**
   - Precio con `$` o puntos → *"precio es solo número: `18500`."*
   - No borrar la **fila de ejemplo** → *"borrala."*
   - Poner **coma adentro de una opción** de variante → *"la coma separa
     opciones."*
   - **Nombre vacío** en una fila → *"esa fila no aparece."*
   - Link de imagen que no empieza con `https://` → *"no se va a ver."*
5. Cierre: *"Con eso estás. Cualquier cosa me escribís. ¡Ya vas a tener tu
   tienda!"*

---

## Orden para mandarlos

1. Video 1 + la plantilla (link) — el día que paga.
2. Video 2 y 3 — cuando empieza a cargar.
3. Video 4 — cuando termina, para que te pase el link.
