import { test, expect } from "@playwright/test";

// --- Catálogo completo (/catalogo) ---

test("el catálogo lista los 4 productos del fixture", async ({ page }) => {
    await page.goto("/matesartesanales/catalogo");
    await expect(
        page.getByRole("heading", { name: "Mate Imperial" })
    ).toBeVisible();
    await expect(page.getByText("4 productos")).toBeVisible();
});

test("el buscador filtra productos", async ({ page }) => {
    await page.goto("/matesartesanales/catalogo");
    await page.getByLabel("Buscar productos").fill("imperial");
    await expect(
        page.getByRole("heading", { name: "Mate Imperial" })
    ).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Remera Algodón" })
    ).toHaveCount(0);
    await expect(page.getByText("1 producto")).toBeVisible();
});

test("sin resultados muestra el estado vacío", async ({ page }) => {
    await page.goto("/matesartesanales/catalogo");
    await page.getByLabel("Buscar productos").fill("zzzz");
    await expect(
        page.getByText("No encontramos productos con esos filtros.")
    ).toBeVisible();
});

test("el chip de categoría filtra", async ({ page }) => {
    await page.goto("/matesartesanales/catalogo");
    await page.getByRole("button", { name: "Mates" }).click();
    await expect(page.getByText("2 productos")).toBeVisible();
});

test("ordenar por menor precio pone la remera primero", async ({ page }) => {
    await page.goto("/matesartesanales/catalogo");
    await page.getByLabel("Ordenar por").selectOption("precio-asc");
    const titulos = page.getByRole("heading", { level: 3 });
    await expect(titulos.first()).toHaveText("Remera Algodón");
});

test("el filtro Ofertas muestra solo con descuento y stock", async ({
    page,
}) => {
    await page.goto("/matesartesanales/catalogo");
    await page.getByRole("button", { name: "Ofertas" }).click();
    await expect(page.getByText("1 producto")).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Mate Imperial" })
    ).toBeVisible();
    // Oferta agotada (Guampa Norte) no aparece al filtrar ofertas.
    await expect(
        page.getByRole("heading", { name: "Guampa Norte" })
    ).toHaveCount(0);
    await expect(
        page.getByRole("heading", { name: "Remera Algodón" })
    ).toHaveCount(0);
});

// --- Home curado ---

test("el home muestra la fila Destacados (sin agotados) y categorías", async ({
    page,
}) => {
    await page.goto("/matesartesanales");
    await expect(
        page.getByRole("heading", { name: "Destacados" })
    ).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Categorías" })
    ).toBeVisible();
    // Oferta con stock y marcado: se muestran.
    await expect(
        page.getByRole("heading", { name: "Mate Imperial" })
    ).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Remera Algodón" })
    ).toBeVisible();
    // Agotada (Guampa Norte) y sin marca ni oferta (Mate Chico) no aparecen.
    await expect(
        page.getByRole("heading", { name: "Guampa Norte" })
    ).toHaveCount(0);
    await expect(
        page.getByRole("heading", { name: "Mate Chico" })
    ).toHaveCount(0);
});

test("'Ver todos' del home lleva al catálogo completo", async ({ page }) => {
    await page.goto("/matesartesanales");
    await page.getByRole("link", { name: "Ver todos" }).first().click();
    await expect(page).toHaveURL(/\/matesartesanales\/catalogo/);
    await expect(page.getByText("4 productos")).toBeVisible();
});

test("la categoría del home abre el catálogo filtrado", async ({ page }) => {
    await page.goto("/matesartesanales");
    await page
        .locator("#categorias")
        .getByRole("link", { name: /^Mates/ })
        .click();
    await expect(page).toHaveURL(/cat=Mates/);
    await expect(page.getByText("2 productos")).toBeVisible();
});

// --- Footer y sucursales ---

test("el footer muestra contacto, envíos y redes", async ({ page }) => {
    await page.goto("/matesartesanales");
    const footer = page.getByRole("contentinfo");
    await expect(footer.getByRole("link", { name: "WhatsApp" })).toBeVisible();
    await expect(
        footer.getByRole("link", { name: "hola@matesartesanales.com" })
    ).toBeVisible();
    await expect(footer.getByText(/Enviamos a todo el país/)).toBeVisible();
    await expect(footer.getByRole("link", { name: "Instagram" })).toBeVisible();
});

test("la sección de sucursales muestra el mapa y cambia de local", async ({
    page,
}) => {
    await page.goto("/matesartesanales");
    await expect(
        page.getByRole("heading", { name: "Dónde encontrarnos" })
    ).toBeVisible();
    await expect(page.getByTitle("Mapa de Local Centro")).toBeVisible();

    await page.getByRole("button", { name: /Feria de Guaymallén/ }).click();
    await expect(
        page.getByTitle("Mapa de Feria de Guaymallén")
    ).toBeVisible();
});

// Sentido Sexto tiene 3 locales (Godoy Cruz, Guaymallén y Maipú): la sección se
// muestra y el mapa cambia al elegir otro local.
//
// Nota: hoy no hay ninguna tienda "solo online", así que no se puede probar el
// caso inverso (sección oculta). Si vuelve a haber una, recuperar ese test.
test("una tienda con varios locales muestra la sección y cambia de mapa", async ({
    page,
}) => {
    await page.goto("/sentidosextogc");

    await expect(
        page.getByRole("heading", { name: "Dónde encontrarnos" })
    ).toBeVisible();
    await expect(page.getByTitle(/Mapa de Local Godoy Cruz/)).toBeVisible();

    await page.getByRole("button", { name: /Local Maipu/ }).click();
    await expect(page.getByTitle(/Mapa de Local Maipu/)).toBeVisible();
});

// Las fotos de Drive se sirven por nuestro proxy (`/api/img`): el navegador no
// puede pedirlas directo a Google (Chrome las bloquea por ORB en localhost).
test("las fotos de producto pasan por el proxy /api/img", async ({ page }) => {
    await page.goto("/matesartesanales/catalogo");

    const srcs = await page
        .locator("img")
        .evaluateAll((imgs) => imgs.map((i) => i.getAttribute("src") ?? ""));

    expect(
        srcs.some((s) => s.startsWith("/api/img?id=1a2b3c4d5e6f7g8h9i0jklmnop"))
    ).toBe(true);
});
