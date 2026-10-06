import { WA, WA_VISIBLE } from "@/lib/site";

const EMAIL = "diegocanales112@gmail.com";
const DOMICILIO = "Pasaje La Alianza 577, Mendoza, Argentina";

export default function ContenidoPrivacidad() {
    return (
        <>
            <h1 className="font-display text-[clamp(2rem,4vw,2.8rem)] leading-tight tracking-[-0.02em] text-tinta">
                Política de Privacidad
            </h1>
            <p className="mt-3 text-sm text-tenue">
                Última actualización: octubre de 2026
            </p>

            <div className="mt-10 flex flex-col gap-9 text-[15px] leading-relaxed text-tenue">
                <section>
                    <h2 className="font-display text-xl text-tinta">
                        1. Responsable
                    </h2>
                    <p className="mt-2">
                        EquidaTy Shop (producto de Equidaty), con domicilio en{" "}
                        {DOMICILIO}, es responsable del tratamiento de los datos que
                        se describen en esta política, conforme a la Ley 25.326 de
                        Protección de Datos Personales de la República Argentina.
                        Contacto: WhatsApp{" "}
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

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        2. Qué datos tratamos
                    </h2>
                    <ul className="mt-2 list-disc pl-5">
                        <li>
                            <strong className="text-tinta">
                                Datos del cliente
                            </strong>{" "}
                            (quien contrata la tienda): nombre, número de WhatsApp,
                            datos de su marca (logo, colores, textos) y el contenido
                            de su catálogo (productos, precios, imágenes).
                        </li>
                        <li>
                            <strong className="text-tinta">
                                Datos de los compradores:
                            </strong>{" "}
                            la tienda <strong>no</strong> pide registro ni datos
                            personales. El carrito se guarda en el navegador del
                            comprador y el pedido se envía por WhatsApp, un servicio
                            de un tercero (Meta), cuyo tratamiento se rige por su
                            propia política.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        3. Para qué los usamos
                    </h2>
                    <p className="mt-2">
                        Para publicar y operar la tienda del cliente, prestar soporte,
                        y gestionar el cobro del servicio. No usamos los datos para
                        publicidad ni para perfilado.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        4. Base del tratamiento
                    </h2>
                    <p className="mt-2">
                        El tratamiento se basa en la relación contractual con el
                        cliente y en su consentimiento. El cliente es responsable de
                        contar con base legal para publicar los datos de productos e
                        imágenes que carga en su planilla.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        5. Con quién se comparten
                    </h2>
                    <p className="mt-2">
                        Trabajamos con proveedores que tratan datos por nosotros:
                    </p>
                    <ul className="mt-2 list-disc pl-5">
                        <li>
                            <strong className="text-tinta">Google</strong> — la
                            planilla del catálogo (Google Sheets).
                        </li>
                        <li>
                            <strong className="text-tinta">Mercado Pago</strong> — el
                            cobro del servicio.
                        </li>
                        <li>
                            <strong className="text-tinta">WhatsApp / Meta</strong> —
                            la mensajería con compradores y soporte.
                        </li>
                        <li>
                            <strong className="text-tinta">
                                Proveedores de hosting
                            </strong>{" "}
                            (Vercel / Cloudflare) — donde se publica la tienda.
                        </li>
                    </ul>
                    <p className="mt-2">No vendemos ni alquilamos datos personales.</p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        6. Cookies y almacenamiento local
                    </h2>
                    <p className="mt-2">
                        No usamos cookies de seguimiento ni de publicidad. El carrito
                        de la tienda utiliza el{" "}
                        <strong className="text-tinta">
                            almacenamiento local del navegador
                        </strong>{" "}
                        (localStorage) para recordar los productos elegidos; se puede
                        borrar desde la configuración del navegador.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        7. Conservación
                    </h2>
                    <p className="mt-2">
                        Conservamos los datos del cliente mientras dure la relación
                        del servicio y, luego, durante el plazo necesario para cumplir
                        obligaciones legales o contables.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        8. Tus derechos
                    </h2>
                    <p className="mt-2">
                        Podés solicitar el acceso, la rectificación, actualización o
                        supresión de tus datos personales (Ley 25.326)
                        escribiéndonos a{" "}
                        <a href={`mailto:${EMAIL}`} className="underline">
                            {EMAIL}
                        </a>
                        . La autoridad de control es la Agencia de Acceso a la
                        Información Pública (AAIP).
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">
                        9. Seguridad
                    </h2>
                    <p className="mt-2">
                        Adoptamos medidas técnicas y organizativas razonables para
                        proteger los datos frente a accesos no autorizados, pérdida o
                        alteración.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">10. Menores</h2>
                    <p className="mt-2">
                        El servicio no está dirigido a menores de 18 años.
                    </p>
                </section>

                <section>
                    <h2 className="font-display text-xl text-tinta">11. Cambios</h2>
                    <p className="mt-2">
                        Podemos actualizar esta política. Publicaremos la versión
                        vigente con su fecha de actualización.
                    </p>
                </section>
            </div>
        </>
    );
}
