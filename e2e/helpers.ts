import type { Page } from "@playwright/test";

export async function stubWindowOpen(page: Page): Promise<void> {
    await page.addInitScript(() => {
        (window as unknown as { __abiertos: string[] }).__abiertos = [];
        window.open = ((url?: string | URL) => {
            const arr = (window as unknown as { __abiertos: string[] }).__abiertos;
            arr.push(String(url ?? ""));
            return null;
        }) as typeof window.open;
    });
}

export async function urlsAbiertas(page: Page): Promise<string[]> {
    return page.evaluate(
        () => (window as unknown as { __abiertos: string[] }).__abiertos ?? []
    );
}