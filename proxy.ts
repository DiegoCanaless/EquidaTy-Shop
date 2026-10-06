import { NextResponse, type NextRequest } from "next/server";
import data from "@/config/clients.json";

type ClienteCfg = { slug: string; dominio?: string; activo?: boolean };

const clientes = data.clients as ClienteCfg[];

function hostLimpio(host: string): string {
    return host.replace(/^www\./, "").toLowerCase();
}

// Multidominio: si el Host es el dominio propio de un cliente, servimos su
// tienda en la raíz (links sin slug). En el dominio compartido, el slug va en
// el path y lo dejamos como está.
export function proxy(req: NextRequest) {
    const host = hostLimpio(req.headers.get("host") ?? "");
    const cliente = clientes.find(
        (c) => c.dominio && hostLimpio(c.dominio) === host
    );

    const requestHeaders = new Headers(req.headers);

    if (cliente) {
        requestHeaders.set("x-store-base", "");
        requestHeaders.set("x-store-slug", cliente.slug);

        const url = req.nextUrl.clone();
        url.pathname = `/${cliente.slug}${
            url.pathname === "/" ? "" : url.pathname
        }`;
        return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    }

    const seg = req.nextUrl.pathname.split("/")[1] ?? "";
    if (seg) {
        requestHeaders.set("x-store-base", `/${seg}`);
        requestHeaders.set("x-store-slug", seg);
    }
    return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
