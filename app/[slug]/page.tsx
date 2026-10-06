import { notFound } from "next/navigation";
import { getClient } from "@/lib/clients";
import { fetchProductos } from "@/lib/tienda/productos";
import HeroTienda from "@/components/tienda/HeroTienda";
import CabeceraTienda from "@/components/tienda/CabeceraTienda";
import CatalogoTienda from "@/components/tienda/CatalogoTienda";
import { baseTienda } from "@/lib/tienda/rutas";

export const revalidate = 60;

export default async function TiendaPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const cliente = getClient(slug);
    if (!cliente) notFound();

    const productos = await fetchProductos(cliente);
    const base = await baseTienda();

    return (
        <main>
            {cliente.marca.banner.imagen ? (
                <HeroTienda cliente={cliente} />
            ) : (
                <CabeceraTienda cliente={cliente} />
            )}
            <CatalogoTienda
                productos={productos}
                base={base}
                moneda={cliente.moneda}
            />
        </main>
    );
}
