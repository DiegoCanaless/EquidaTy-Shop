import { test, expect } from "@playwright/test";

test("la landing carga con el hero y los precios", async ({ page }) => {
    await page.goto("/");
    await expect(
        page.getByRole("heading", { level: 1 })
    ).toContainText("tu tienda online");
    await expect(page.getByText("Sin costo de alta").first()).toBeVisible();
    await expect(page.getByText("$10.000").first()).toBeVisible();
});

test("el CTA de demo lleva a la tienda", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Ver tienda demo" }).click();
    await expect(page).toHaveURL(/\/matesartesanales/);
});