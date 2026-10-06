import { ImageResponse } from "next/og";

export const alt = "EquidaTy Shop";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 28,
                    background: "#8b1a2b",
                    color: "#ffffff",
                    padding: 80,
                }}
            >
                <span
                    style={{
                        fontSize: 34,
                        letterSpacing: 6,
                        textTransform: "uppercase",
                        color: "#f7e9ed",
                    }}
                >
                    EquidaTy Shop
                </span>
                <span style={{ fontSize: 82, fontWeight: 700, lineHeight: 1.05 }}>
                    Tu planilla de Excel es tu tienda online
                </span>
                <span style={{ fontSize: 34, color: "#f7e9ed" }}>
                    Catálogo y pedidos por WhatsApp
                </span>
            </div>
        ),
        size
    );
}
