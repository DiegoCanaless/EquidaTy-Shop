import type { MetadataRoute } from "next";
import { getClient, listSlugs } from "@/lib/clients";
import { fetchProductos } from "@/lib/tienda/productos";
import { hostActual } from "@/lib/tienda/host";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const { base, slugPropio } = await hostActual();

    // Dominio propio: solo la tienda de ese cliente.
    if (slugPropio) {
        const cliente = getClient(slugPropio);
        if (!cliente) return [];

        const productos = await fetchProductos(cliente);
        const urls: MetadataRoute.Sitemap = [
            { url: base, changeFrequency: "weekly", priority: 1 },
        ];
        for (const p of productos) {
            urls.push({
                url: `${base}/producto/${p.id}`,
                changeFrequency: "weekly",
                priority: 0.7,
            });
        }
        return urls;
    }

    // Dominio compartido: landing + cada tienda + sus productos.
    const urls: MetadataRoute.Sitemap = [
        { url: base, changeFrequency: "weekly", priority: 1 },
    ];
    for (const slug of listSlugs()) {
        const cliente = getClient(slug);
        if (!cliente) continue;

        urls.push({
            url: `${base}/${slug}`,
            changeFrequency: "weekly",
            priority: 0.9,
        });

        const productos = await fetchProductos(cliente);
        for (const p of productos) {
            urls.push({
                url: `${base}/${slug}/producto/${p.id}`,
                changeFrequency: "weekly",
                priority: 0.6,
            });
        }
    }
    return urls;
}
