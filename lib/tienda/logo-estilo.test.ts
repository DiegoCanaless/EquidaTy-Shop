import { describe, it, expect } from "vitest";
import { tratamientoLogo, logoSegunEstado } from "./logo-estilo";

describe("tratamientoLogo", () => {
    it("sobre el banner fuerza a blanco los logos oscuros (default)", () => {
        expect(tratamientoLogo({ flotante: true })).toBe("blanco");
    });

    it("sobre el banner respeta `logoEnBanner: original`", () => {
        expect(
            tratamientoLogo({ flotante: true, logoEnBanner: "original" })
        ).toBe("normal");
    });

    it("un valor desconocido de logoEnBanner cae al default blanco", () => {
        expect(
            tratamientoLogo({ flotante: true, logoEnBanner: "amarillo" })
        ).toBe("blanco");
    });

    it("en el header sólido el logo oscuro multiplica contra el fondo", () => {
        expect(tratamientoLogo({ flotante: false })).toBe("multiply");
    });

    it("con logoSolido el header sólido lo usa tal cual", () => {
        expect(
            tratamientoLogo({
                flotante: false,
                logoSolido: "/clients/x/logo-oscuro.webp",
            })
        ).toBe("normal");
    });

    it("un logo claro sin variante sólida se muestra tal cual", () => {
        expect(
            tratamientoLogo({ flotante: false, logoEnBanner: "original" })
        ).toBe("normal");
    });

    it("logoSolido también manda sobre el banner si el logo es claro", () => {
        expect(
            tratamientoLogo({
                flotante: true,
                logoEnBanner: "original",
                logoSolido: "/clients/x/logo-oscuro.webp",
            })
        ).toBe("normal");
    });
});

describe("logoSegunEstado", () => {
    it("sobre el banner usa siempre el logo principal", () => {
        expect(logoSegunEstado("a.webp", "b.webp", true)).toBe("a.webp");
    });

    it("en el header sólido prefiere logoSolido si está cargado", () => {
        expect(logoSegunEstado("a.webp", "b.webp", false)).toBe("b.webp");
    });

    it("sin logoSolido cae al principal", () => {
        expect(logoSegunEstado("a.webp", undefined, false)).toBe("a.webp");
    });

    it("sin principal devuelve logoSolido", () => {
        expect(logoSegunEstado(undefined, "b.webp", false)).toBe("b.webp");
    });

    it("sin nada devuelve undefined", () => {
        expect(logoSegunEstado(undefined, undefined, false)).toBeUndefined();
    });
});
