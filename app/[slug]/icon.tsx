import { ImageResponse } from "next/og";
import { getClient } from "@/lib/clients";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const cliente = getClient(slug);

    const nombre = cliente?.nombre ?? "T";
    const primario = cliente?.marca.colores.primario ?? "#171717";
    const inicial = nombre.trim().charAt(0).toUpperCase();

    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: primario,
                    color: "#ffffff",
                    fontSize: 42,
                    fontWeight: 700,
                }}
            >
                {inicial}
            </div>
        ),
        size
    );
}
