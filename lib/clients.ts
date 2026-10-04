import data from "@/config/clients.json"
import type { Cliente } from "./tienda/types";


const clientes: Cliente[] = data.clients;

export function listSlugs(): string[] {
    return clientes.filter((c) => c.activo).map((c) => c.slug)
}


export function getClient(slug: string): Cliente | undefined {
    return clientes.find(( c) => c.slug === slug);
}