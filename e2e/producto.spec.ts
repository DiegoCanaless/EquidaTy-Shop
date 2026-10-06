import { test, expect } from "@playwright/test";

test("agregar está deshabilitado hasta elegir la variante", async ({ page }) => {
    await page.goto("/matesartesanales/producto/mate-imperial");
    const boton = page.getByRole("button", { name: "Agregar al carrito" });
    await expect(boton).toBeDisabled();
    await expect(page.getByText("Elegí Color para agregarlo.")).toBeVisible();
});

test("elegir variante habilita y agregar abre el carrito", async ({ page }) => {
    await page.goto("/matesartesanales/producto/mate-imperial");
    await page.getByRole("button", { name: "Marrón" }).click();
    const boton = page.getByRole("button", { name: "Agregar al carrito" });
    await expect(boton).toBeEnabled();
    await boton.click();
    const drawer = page.getByRole("dialog", { name: "Carrito" });
    await expect(drawer).toBeVisible();
    await expect(drawer.getByText("Mate Imperial")).toBeVisible();
    await expect(drawer.getByText("Color: Marrón")).toBeVisible();
});

test("cantidad 2 se refleja en el total del carrito", async ({ page }) => {
    await page.goto("/matesartesanales/producto/mate-imperial");
    await page.getByRole("button", { name: "Marrón" }).click();
    await page.getByRole("button", { name: "Sumar" }).first().click();
    await page.getByRole("button", { name: "Agregar al carrito" }).click();
    const drawer = page.getByRole("dialog", { name: "Carrito" });
    await expect(drawer.getByText(/36\.000/).first()).toBeVisible();
});