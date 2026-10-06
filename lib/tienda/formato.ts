export function formatearPrecio(precio: number, moneda: string): string {
    return new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: moneda,
        maximumFractionDigits: 0,
    }).format(precio)
}