import { getClient } from "../lib/clients";
import { fetchProductos } from "../lib/tienda/productos";

async function main(): Promise<void> {
    for (const slug of ["matesartesanales", "norte-indumentaria"]) {
        const cliente = getClient(slug);
        if (!cliente) {
            console.error(`No existe la tienda "${slug}"`);
            continue;
        }
        const productos = await fetchProductos(cliente);
        console.log(`\n== ${cliente.nombre}: ${productos.length} productos ==`);
        console.log(productos[0]);
    }
}

main().catch((error) => {
    console.error("[test] falló:", error);
    process.exitCode = 1;
});