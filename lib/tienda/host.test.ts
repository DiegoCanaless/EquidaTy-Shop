import { describe, it, expect, vi, beforeEach } from "vitest";
import { headers } from "next/headers";
import { hostActual } from "./host";

vi.mock("next/headers", () => ({
    headers: vi.fn(),
}));

const headersMock = vi.mocked(headers);

function stubHeaders(pares: Record<string, string>) {
    headersMock.mockResolvedValue({
        get: (k: string) => pares[k] ?? null,
    } as unknown as Awaited<ReturnType<typeof headers>>);
}

beforeEach(() => {
    headersMock.mockReset();
});

describe("hostActual", () => {
    it("dominio propio → slugPropio + base https", async () => {
        stubHeaders({
            host: "matesartesanales.com",
            "x-forwarded-proto": "https",
        });
        const r = await hostActual();
        expect(r.slugPropio).toBe("matesartesanales");
        expect(r.base).toBe("https://matesartesanales.com");
    });

    it("limpia el www.", async () => {
        stubHeaders({
            host: "www.matesartesanales.com",
            "x-forwarded-proto": "https",
        });
        const r = await hostActual();
        expect(r.slugPropio).toBe("matesartesanales");
    });

    it("dominio compartido → sin slugPropio", async () => {
        stubHeaders({ host: "equidaty.shop", "x-forwarded-proto": "https" });
        const r = await hostActual();
        expect(r.slugPropio).toBeUndefined();
    });

    it("si falta x-forwarded-proto, asume https", async () => {
        stubHeaders({ host: "localhost:3100" });
        const r = await hostActual();
        expect(r.base).toBe("https://localhost:3100");
    });

    it("si el header trae varios protos, usa el primero", async () => {
        stubHeaders({
            host: "equidaty.shop",
            "x-forwarded-proto": "https, http",
        });
        const r = await hostActual();
        expect(r.base).toBe("https://equidaty.shop");
    });

    it("sin host en el header, usa localhost:3000", async () => {
        stubHeaders({});
        const r = await hostActual();
        expect(r.host).toBe("localhost:3000");
        expect(r.base).toBe("https://localhost:3000");
    });
});