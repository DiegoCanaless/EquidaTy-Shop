import { test, expect } from "@playwright/test";
import { stubWindowOpen, urlsAbiertas } from "./helpers";

async function agregarMateImperial(page: import("@playwright/test").Page) {
    await page.goto("/matesartesanales/producto/mate-imperial");
    await page.getByRole("button", { name: "Marrón" }).click();
    await page.getByRole("button", { name: "Agregar al carrito" }).click();
}

test("finalizar por WhatsApp arma la URL del pedido", async ({ page }) => {
    await stubWindowOpen(page);
    await agregarMateImperial(page);
    const drawer = page.getByRole("dialog", { name: "Carrito" });
    await drawer.getByRole("link", { name: "Finalizar" }).click();
    await expect(page).toHaveURL(/\/matesartesanales\/carrito/);
    await page.getByRole("button", { name: "Finalizar por WhatsApp" }).click();
    const urls = await urlsAbiertas(page);
    expect(urls).toHaveLength(1);
    expect(urls[0]).toContain("https://wa.me/5492612430088");
    const texto = decodeURIComponent(urls[0].split("text=")[1] ?? "");
    expect(texto).toContain("Mate Imperial");
    expect(texto).toContain("Total:");
});

test("vaciar el carrito deja la página vacía", async ({ page }) => {
    await agregarMateImperial(page);
    const drawer = page.getByRole("dialog", { name: "Carrito" });
    await drawer.getByRole("link", { name: "Finalizar" }).click();
    await page.getByRole("button", { name: "Vaciar carrito" }).click();
    await expect(page.getByText("Tu carrito está vacío.")).toBeVisible();
});