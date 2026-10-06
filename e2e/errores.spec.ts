import { test, expect } from "@playwright/test";

test("slug inexistente → 404", async ({ page }) => {
    const res = await page.goto("/no-existe");
    expect(res?.status()).toBe(404);
});

test("producto inexistente → 404", async ({ page }) => {
    const res = await page.goto("/matesartesanales/producto/no-existe");
    expect(res?.status()).toBe(404);
});

test("las páginas legales responden 200", async ({ page }) => {
    for (const ruta of [
        "/terminos",
        "/privacidad",
        "/matesartesanales/terminos",
        "/matesartesanales/privacidad",
    ]) {
        const res = await page.goto(ruta);
        expect(res?.status(), ruta).toBe(200);
    }
});