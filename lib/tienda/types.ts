


export interface OpcionVariante {
    valor: string,
    agotada: boolean
}

export interface Variante {
    etiqueta: string,
    opciones: OpcionVariante[]
}

export interface Detalle {
    etiqueta: string,
    valor: string
}

// Local físico de la tienda. Todo opcional salvo nombre y dirección.
// `coords` ("lat,lng") o `mapa` (URL de embed) permiten afinar el pin.
export interface Sucursal {
    nombre: string;
    direccion: string;
    horarios?: string;
    telefono?: string;
    coords?: string;
    mapa?: string;
}

// Datos de contacto/identidad de la tienda para el footer. Todos opcionales.
export interface InfoTienda {
    descripcion?: string;
    email?: string;
    telefono?: string;
    envios?: string;
    pagos?: string;
}

// Categoría del negocio que se muestra en el home. Si no se configuran,
// se derivan de la planilla y la imagen sale del primer producto de la
// categoría.
export interface CategoriaTienda {
    nombre: string;
    imagen?: string;
    descripcion?: string;
}

export interface Producto {
    id: string
    nombre: string
    categoria: string
    precio: number
    precioAntes?: number
    stock: number
    descripcion?: string
    imagenes: string[]
    variantes: Variante[]
    detalles: Detalle[]
    // Columna opcional `destacado` de la planilla: lo muestra el home.
    destacado: boolean
}

export interface Cliente {
    slug: string;
    nombre: string;
    dominio?: string;
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
    info?: InfoTienda;
    categorias?: CategoriaTienda[];
    sucursales?: Sucursal[];
    redes?: {
        instagram?: string;
        facebook?: string;
        tiktok?: string;
        x?: string
    }
}