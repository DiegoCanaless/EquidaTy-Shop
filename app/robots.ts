import type { MetadataRoute } from "next";
import { hostActual } from "@/lib/tienda/host";

export default async function robots(): Promise<MetadataRoute.Robots> {
    const { base } = await hostActual();
    return {
        rules: { userAgent: "*", allow: "/" },
        sitemap: `${base}/sitemap.xml`,
    };
}
