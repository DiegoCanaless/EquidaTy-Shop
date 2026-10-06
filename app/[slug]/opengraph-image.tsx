import { ImageResponse } from "next/og";
import { getClient } from "@/lib/clients";

export const alt = "Tienda online";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const cliente = getClient(slug);

    const nombre = cliente?.nombre ?? "Tienda";
    const titulo = cliente?.marca.banner.titulo ?? "";
    const primario = cliente?.marca.colores.primario ?? "#171717";
    const acento = cliente?.marca.colores.acento ?? "#8b1a2b";
    const fondo = cliente?.marca.colores.fondo ?? "#ffffff";
    const texto = cliente?.marca.colores.texto ?? "#171717";
    const inicial = nombre.trim().charAt(0).toUpperCase();

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    background: fondo,
                    color: texto,
                    padding: 72,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: 999,
                            background: primario,
                            color: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 40,
                            fontWeight: 700,
                        }}
                    >
                        {inicial}
                    </div>
                    <span style={{ fontSize: 40, fontWeight: 700 }}>{nombre}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    <span style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
                        {titulo}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div
                            style={{
                                width: 48,
                                height: 6,
                                background: acento,
                                display: "flex",
                            }}
                        />
                        <span style={{ fontSize: 32, color: acento }}>
                            Pedí por WhatsApp
                        </span>
                    </div>
                </div>
            </div>
        ),
        size
    );
}
