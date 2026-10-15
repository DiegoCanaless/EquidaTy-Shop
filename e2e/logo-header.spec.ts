import { test, expect } from "@playwright/test";

// Regresión del tratamiento del logo en el header de la tienda:
//
// - Logo oscuro (default): se fuerza a blanco sobre el banner del home y
//   multiplica contra el fondo en el header sólido.
// - Logo claro (`logoEnBanner: "original"`, caso Sentido Sexto): se muestra tal
//   cual en ambos estados, sin filtros.

test("logo oscuro: blanco sobre el banner y multiply al scrollear", async ({
    page,
}) => {
    await page.goto("/matesartesanales");

    const logo = page.locator("header img");
    await expect(logo).toHaveClass(/brightness\(0\)/);

    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(logo).toHaveClass(/mix-blend-multiply/);
});

test("logo claro: se muestra tal cual en ambos estados", async ({ page }) => {
    await page.goto("/sentidosextogc");

    const logo = page.locator("header img");
    await expect(logo).toHaveAttribute("src", /logo\.webp/);
    await expect(logo).not.toHaveClass(/brightness\(0\)/);

    await page.evaluate(() => window.scrollTo(0, 600));
    await expect(logo).toHaveAttribute("src", /logo\.webp/);
    await expect(logo).not.toHaveClass(/mix-blend-multiply/);
});
