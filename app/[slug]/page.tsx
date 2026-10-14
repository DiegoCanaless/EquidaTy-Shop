import { notFound } from "next/navigation";
import { getClient } from "@/lib/clients";
import { fetchProductos } from "@/lib/tienda/productos";
import HeroTienda from "@/components/tienda/HeroTienda";
import CabeceraTienda from "@/components/tienda/CabeceraTienda";
import FilaProductos from "@/components/tienda/FilaProductos";
import Categorias from "@/components/tienda/Categorias";
import Sucursales from "@/components/tienda/Sucursales";
import { baseTienda } from "@/lib/tienda/rutas";
import { seleccionarDestacados } from "@/lib/tienda/destacados";

export const revalidate = 60;

// Cuántos productos muestra la fila "Destacados".
const FILA = 4;

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

    // Fila "Destacados": ofertas con stock primero, luego marcados, luego los
    // últimos cargados. Nunca agotados, hasta 4.
    const destacados = seleccionarDestacados(productos, FILA);

    // Categorías (imagen = primera foto de un producto de la categoría).
    const conteo = new Map<string, number>();
    for (const p of productos) {
        conteo.set(p.categoria, (conteo.get(p.categoria) ?? 0) + 1);
    }
    const imagenDeCategoria = (nombre: string) =>
        productos.find((p) => p.categoria === nombre && p.imagenes.length > 0)
            ?.imagenes[0];
    const categorias =
        cliente.categorias && cliente.categorias.length > 0
            ? cliente.categorias.map((c) => ({
                  nombre: c.nombre,
                  descripcion: c.descripcion,
                  cantidad: conteo.get(c.nombre) ?? 0,
                  imagen: c.imagen ?? imagenDeCategoria(c.nombre),
              }))
            : [...conteo.entries()]
                  .map(([nombre, cantidad]) => ({
                      nombre,
                      cantidad,
                      descripcion: undefined,
                      imagen: imagenDeCategoria(nombre),
                  }))
                  .sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));

    return (
        <main className={cliente.marca.banner.imagen ? "-mt-16" : undefined}>
            {cliente.marca.banner.imagen ? (
                <HeroTienda cliente={cliente} />
            ) : (
                <CabeceraTienda cliente={cliente} />
            )}

            <div id="catalogo" className="scroll-mt-20">
                {destacados.length > 0 && (
                    <FilaProductos
                        titulo="Destacados"
                        productos={destacados}
                        base={base}
                        moneda={cliente.moneda}
                        hrefVerTodos={`${base}/catalogo`}
                    />
                )}
            </div>

            <Categorias categorias={categorias} base={base} />

            {cliente.sucursales && cliente.sucursales.length > 0 && (
                <Sucursales sucursales={cliente.sucursales} />
            )}
        </main>
    );
}
