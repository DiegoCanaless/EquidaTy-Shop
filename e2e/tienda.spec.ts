import { test, expect } from "@playwright/test";

test("la tienda lista los 4 productos del fixture", async ({ page }) => {
    await page.goto("/matesartesanales");
    await expect(
        page.getByRole("heading", { name: "Mate Imperial" })
    ).toBeVisible();
    await expect(page.getByText("4 productos")).toBeVisible();
});

test("el buscador filtra productos", async ({ page }) => {
    await page.goto("/matesartesanales");
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
    await page.goto("/matesartesanales");
    await page.getByLabel("Buscar productos").fill("zzzz");
    await expect(
        page.getByText("No encontramos productos con esos filtros.")
    ).toBeVisible();
});

test("el chip de categoría filtra", async ({ page }) => {
    await page.goto("/matesartesanales");
    await page.getByRole("button", { name: "Mates" }).click();
    await expect(page.getByText("2 productos")).toBeVisible();
});

test("ordenar por menor precio pone la remera primero", async ({ page }) => {
    await page.goto("/matesartesanales");
    await page.getByLabel("Ordenar por").selectOption("precio-asc");
    const titulos = page.getByRole("heading", { level: 3 });
    await expect(titulos.first()).toHaveText("Remera Algodón");
});

test("solo ofertas muestra solo productos con descuento", async ({ page }) => {
    await page.goto("/matesartesanales");
    await page.getByRole("button", { name: "Ofertas" }).click();
    await expect(page.getByText("2 productos")).toBeVisible();
    await expect(
        page.getByRole("heading", { name: "Remera Algodón" })
    ).toHaveCount(0);
});