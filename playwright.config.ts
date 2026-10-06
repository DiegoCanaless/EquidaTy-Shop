import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    timeout: 30_000,
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    reporter: [["list"], ["html", { open: "never" }]],
    use: {
        baseURL: "http://localhost:3100",
        locale: "es-AR",
        trace: "on-first-retry",
    },
    projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
    webServer: {
        command: "npm run build && npm start -- -p 3100",
        url: "http://localhost:3100",
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
        env: {
            E2E_CSV_FIXTURE: "catalogo.csv",
        },
    },
});