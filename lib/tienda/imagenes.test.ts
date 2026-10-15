import { describe, it, expect } from "vitest";
import { normalizarImagen, urlImagenDrive } from "./imagenes";

const ID = "1a2b3c4d5e6f7g8h9i0jklmnop";
const PROXY = `/api/img?id=${ID}&w=1200`;

describe("normalizarImagen", () => {
    it("manda el link de 'compartir' de Drive al proxy interno", () => {
        expect(
            normalizarImagen(
                `https://drive.google.com/file/d/${ID}/view?usp=drive_link`
            )
        ).toBe(PROXY);
    });

    it("acepta el formato uc?id=", () => {
        expect(
            normalizarImagen(`https://drive.google.com/uc?export=view&id=${ID}`)
        ).toBe(PROXY);
    });

    it("normaliza también los links ya 'directos' de lh3", () => {
        expect(
            normalizarImagen(`https://lh3.googleusercontent.com/d/${ID}=w1200`)
        ).toBe(PROXY);
    });

    it("deja intacto un link que no es de Google", () => {
        expect(normalizarImagen("https://ejemplo.com/foto.jpg")).toBe(
            "https://ejemplo.com/foto.jpg"
        );
    });

    it("deja intacto un link de Drive sin id reconocible", () => {
        const carpeta = "https://drive.google.com/drive/folders/abc123";
        expect(normalizarImagen(carpeta)).toBe(carpeta);
    });

    it("recorta espacios y devuelve vacío si no hay link", () => {
        expect(normalizarImagen("   ")).toBe("");
        expect(normalizarImagen("  https://ejemplo.com/f.jpg  ")).toBe(
            "https://ejemplo.com/f.jpg"
        );
    });
});

describe("urlImagenDrive", () => {
    it("arma la URL del proxy con el ancho pedido", () => {
        expect(urlImagenDrive(ID, 600)).toBe(`/api/img?id=${ID}&w=600`);
    });
});
