"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    useSyncExternalStore,
    type ReactNode,
} from "react";

export interface ItemCarrito {
    id: string;
    nombre: string;
    precio: number;
    imagen?: string;
    variantes: { etiqueta: string; opcion: string }[];
    cantidad: number;
}

type Store = {
    items: ItemCarrito[];
    listeners: Set<() => void>;
};

type ValorCarrito = {
    slug: string;
    base: string;
    listo: boolean;
    items: ItemCarrito[];
    cantidadTotal: number;
    subtotal: number;
    abierto: boolean;
    abrir: () => void;
    cerrar: () => void;
    agregar: (item: Omit<ItemCarrito, "cantidad">, cantidad: number) => void;
    quitar: (clave: string) => void;
    cambiarCantidad: (clave: string, cantidad: number) => void;
    vaciar: () => void;
};

const Ctx = createContext<ValorCarrito | null>(null);

const VACIO: ItemCarrito[] = [];
const stores = new Map<string, Store>();

function claveLS(slug: string): string {
    return `equidaty:carrito:${slug}`;
}

function leer(slug: string): ItemCarrito[] {
    try {
        const crudo = window.localStorage.getItem(claveLS(slug));
        if (!crudo) return VACIO;
        const datos = JSON.parse(crudo);
        return Array.isArray(datos) ? datos : VACIO;
    } catch {
        return VACIO;
    }
}

function getStore(slug: string): Store {
    let store = stores.get(slug);
    if (!store) {
        store = {
            items: typeof window === "undefined" ? VACIO : leer(slug),
            listeners: new Set(),
        };
        stores.set(slug, store);
    }
    return store;
}

function mutar(slug: string, fn: (items: ItemCarrito[]) => ItemCarrito[]) {
    const store = getStore(slug);
    store.items = fn(store.items);
    try {
        window.localStorage.setItem(claveLS(slug), JSON.stringify(store.items));
    } catch {
        // modo privado sin storage: seguimos igual
    }
    store.listeners.forEach((l) => l());
}

// Un mismo producto con distinta selección de variantes es una línea distinta.
export function claveItem(item: Pick<ItemCarrito, "id" | "variantes">): string {
    const vars = item.variantes
        .map((v) => `${v.etiqueta}:${v.opcion}`)
        .sort()
        .join("|");
    return `${item.id}__${vars}`;
}

// Sustituto para saber cuándo ya hidratamos en el cliente (evita parpadeo).
function subscribeNoop() {
    return () => {};
}
const devolverTrue = () => true;
const devolverFalse = () => false;

export function CarritoProvider({
    slug,
    base,
    children,
}: {
    slug: string;
    base: string;
    children: ReactNode;
}) {
    const [abierto, setAbierto] = useState(false);

    const subscribe = useCallback(
        (cb: () => void) => {
            const store = getStore(slug);
            store.listeners.add(cb);
            return () => {
                store.listeners.delete(cb);
            };
        },
        [slug]
    );

    const getSnapshot = useCallback(() => getStore(slug).items, [slug]);

    const items = useSyncExternalStore(subscribe, getSnapshot, () => VACIO);
    const listo = useSyncExternalStore(subscribeNoop, devolverTrue, devolverFalse);

    const abrir = useCallback(() => setAbierto(true), []);
    const cerrar = useCallback(() => setAbierto(false), []);

    function agregar(item: Omit<ItemCarrito, "cantidad">, cantidad: number) {
        const clave = claveItem(item);
        mutar(slug, (prev) => {
            const existe = prev.find((p) => claveItem(p) === clave);
            if (existe) {
                return prev.map((p) =>
                    claveItem(p) === clave
                        ? { ...p, cantidad: p.cantidad + cantidad }
                        : p
                );
            }
            return [...prev, { ...item, cantidad }];
        });
    }

    function quitar(clave: string) {
        mutar(slug, (prev) => prev.filter((p) => claveItem(p) !== clave));
    }

    function cambiarCantidad(clave: string, cantidad: number) {
        if (cantidad < 1) {
            quitar(clave);
            return;
        }
        mutar(slug, (prev) =>
            prev.map((p) => (claveItem(p) === clave ? { ...p, cantidad } : p))
        );
    }

    function vaciar() {
        mutar(slug, () => []);
    }

    const cantidadTotal = useMemo(
        () => items.reduce((s, i) => s + i.cantidad, 0),
        [items]
    );

    const subtotal = useMemo(
        () => items.reduce((s, i) => s + i.precio * i.cantidad, 0),
        [items]
    );

    const valor: ValorCarrito = {
        slug,
        base,
        listo,
        items,
        cantidadTotal,
        subtotal,
        abierto,
        abrir,
        cerrar,
        agregar,
        quitar,
        cambiarCantidad,
        vaciar,
    };

    return <Ctx.Provider value={valor}>{children}</Ctx.Provider>;
}

export function useCarrito(): ValorCarrito {
    const ctx = useContext(Ctx);
    if (!ctx) {
        throw new Error("useCarrito debe usarse dentro de CarritoProvider");
    }
    return ctx;
}
