import { WA, WA_VISIBLE } from "@/lib/site";

const EMAIL = "diegocanales112@gmail.com";
const DOMICILIO = "Pasaje La Alianza 577, Mendoza, Argentina";

export default function ContenidoTerminos() {
    return (
        <>
            <h1 className="font-display text-[clamp(2rem,4vw,2.8rem)] leading-tight tracking-[-0.02em] text-tinta">
                Términos y Condiciones
            </h1>
            <p className="mt-3 text-sm text-tenue">
                Última actualización: octubre de 2026
            </p>

            <div className="mt-10 flex flex-col gap-9 text-[15px] leading-relaxed text-tenue">
                <section>
                    <h2 className="font-display text-xl text-tinta">
                        1. Quiénes somos
                    </h2>
                    <p className="mt-2">
                        EquidaTy Shop es un producto de Equidaty («nosotros»).
                        Ofrecemos un servicio de puesta en marcha y operación de
                        tiendas online que se alimentan de una planilla del cliente
                        (Google Sheets) y cuyos pedidos se cierran por WhatsApp.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        2. El servicio
                    </h2>
                    <p className="mt-2">
                        Incluye: la tienda con URL propia, la conexión a la planilla
                        del cliente, la configuración de marca (logo, colores,
                        tipografía, banner), el carrito que arma el pedido y lo envía
                        por WhatsApp, y soporte por WhatsApp.
                    </p>
                    <p className="mt-2">
                        <strong className="text-tinta">No incluye:</strong> panel de
                        administración, pagos online dentro de la tienda, facturación
                        del cliente, gestión de envíos ni control de stock en tiempo
                        real.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        3. Alta del servicio
                    </h2>
                    <p className="mt-2">
                        El alta se realiza de forma manual. El cliente provee los
                        datos de su marca y el enlace público de su planilla
                        (lectura). La tienda queda publicada en la URL acordada.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        4. Planes y precios
                    </h2>
                    <ul className="mt-2 list-disc pl-5">
                        <li>
                            <strong className="text-tinta">Mensual:</strong> alta de
                            $20.000 (por única vez) + $15.000 por mes.
                        </li>
                        <li>
                            <strong className="text-tinta">Anual:</strong> $180.000
                            por 12 meses (alta bonificada), pago único.
                        </li>
                        <li>
                            <strong className="text-tinta">2 años:</strong> $350.000
                            (alta bonificada + 2 meses bonificados), pago único.
                        </li>
                    </ul>
                    <p className="mt-2">
                        Los precios están expresados en pesos argentinos y pueden
                        actualizarse. Las actualizaciones no afectan los períodos ya
                        abonados.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">5. Pagos</h2>
                    <p className="mt-2">
                        El servicio se abona por Mercado Pago. El plan mensual se cobra
                        por suscripción; los planes prepagos, mediante un pago único.
                        No cobramos comisión por venta.
                    </p>
                    <p className="mt-2">
                        EquidaTy Shop <strong className="text-tinta">no</strong>{" "}
                        procesa los pagos de los compradores: el cobro de cada venta lo
                        resuelve el cliente directamente con su comprador, por fuera de
                        la plataforma.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        6. Reembolsos
                    </h2>
                    <p className="mt-2">
                        Los planes <strong className="text-tinta">Anual</strong> y{" "}
                        <strong className="text-tinta">2 años</strong> son un{" "}
                        <strong className="text-tinta">
                            pago único y no reembolsable
                        </strong>
                        . El plan <strong className="text-tinta">mensual</strong>{" "}
                        puede darse de baja en cualquier momento, sin penalidad, y deja
                        de renovarse al finalizar el período en curso. No se reembolsan
                        períodos ya comenzados.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        7. Obligaciones del cliente
                    </h2>
                    <ul className="mt-2 list-disc pl-5">
                        <li>
                            La veracidad y legalidad de su catálogo (descripciones,
                            precios, stock, imágenes).
                        </li>
                        <li>
                            Contar con los derechos sobre las imágenes y marcas que
                            utiliza.
                        </li>
                        <li>
                            Cumplir la normativa aplicable a su actividad (fiscal,
                            defensa del consumidor, etc.).
                        </li>
                        <li>No publicar contenido ilícito.</li>
                    </ul>
                    <p className="mt-2">
                        El cliente mantiene el acceso a su planilla y la comparte en
                        modo lectura pública («cualquiera con el link»). Si la hoja se
                        vuelve privada o se elimina, la tienda puede quedar sin
                        catálogo; no somos responsables por esa situación.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        8. Dominio propio
                    </h2>
                    <p className="mt-2">
                        El cliente puede utilizar un dominio propio (por ejemplo,{" "}
                        <em>matesartesanales.com</em>). El dominio lo compra y lo paga
                        el cliente a su nombre; nosotros lo configuramos para publicar
                        la tienda.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        9. Disponibilidad
                    </h2>
                    <p className="mt-2">
                        Prestamos el servicio con la mejor diligencia razonable. No
                        garantizamos disponibilidad ininterrumpida ni un nivel de
                        servicio (SLA). Podemos suspender el servicio por mantenimiento
                        o por causas ajenas a nosotros (caídas de Google, Mercado Pago,
                        WhatsApp o proveedores de hosting).
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        10. Propiedad intelectual
                    </h2>
                    <p className="mt-2">
                        El software, el diseño de la plataforma y la marca EquidaTy
                        Shop son nuestros (o de nuestros licenciantes). El contenido
                        del cliente (catálogo, textos, imágenes, marca) sigue siendo
                        suyo; no adquirimos derechos sobre él.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        11. Responsabilidad
                    </h2>
                    <p className="mt-2">
                        En la medida permitida por la ley, no somos responsables por
                        daños indirectos, lucro cesante, pérdida de ventas o de datos
                        derivados del uso del servicio; por ejemplo, por fallas en la
                        planilla, en servicios de terceros o en los enlaces de las
                        imágenes.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        12. Modificaciones
                    </h2>
                    <p className="mt-2">
                        Podemos actualizar estos términos. Publicaremos la versión
                        vigente con su fecha; el uso continuado del servicio implica su
                        aceptación.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        13. Baja del servicio
                    </h2>
                    <p className="mt-2">
                        El cliente puede solicitar la baja en cualquier momento. Ante
                        falta de pago, podemos suspender la tienda. La baja no genera
                        reembolso de los planes prepagos (ver punto 6).
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        14. Ley aplicable y jurisdicción
                    </h2>
                    <p className="mt-2">
                        Estos términos se rigen por las leyes de la República
                        Argentina. Toda controversia se somete a los tribunales
                        ordinarios de Mendoza, Argentina. Domicilio: {DOMICILIO}.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        15. Contacto
                    </h2>
                    <p className="mt-2">
                        WhatsApp{" "}
                        <a
                            href={WA}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                        >
                            {WA_VISIBLE}
                        </a>{" "}
                        ·{" "}
                        <a href={`mailto:${EMAIL}`} className="underline">
                            {EMAIL}
                        </a>
                    </p>
                </section>
            </div>
        </>
    );
}
