


export interface Variante {
    etiqueta: string,
    opciones: string[]
}

export interface Producto {
    id: string
    nombre: string
    categoria: string
    precio: number
    precioAntes?: number
    stock: number
    descripcion?: string
    imagen?: string
    variantes: Variante[]
}

export interface Cliente {
    slug: string;
    nombre: string;
    activo: boolean;
    moneda: string;
    marca: {
        logo?: string;
        colores: {
            primario: string;
            acento: string;
            fondo: string;
            texto: string;
        };
        tipografia: {
            display: string;
            cuerpo: string;
        };
        banner: {
            imagen?: string;
            alt?: string;
            titulo: string;
            cta: {
                texto: string;
                href: string;
            }
        }
    };
    catalogo: {
        sheetId: string;
        rango: string
    }
    whatsapp: string;
    redes?: {
        instagram?: string;
        facebook?: string;
        x?: string
    }
}