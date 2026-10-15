// Genera la variante de un logo clara para usarse sobre fondos claros
// (header sólido y footer): los píxeles neutros (blancos/grises) pasan a
// negro puro y los cromáticos (p. ej. el dorado del script) se conservan.
// El alfa se mantiene intacto.
//
// Uso: node scripts/logo-a-negro.mjs <entrada> <salida> [umbral]
//   umbral: croma mínimo para conservar el color (default 70; subir si el
//   color se come bordes claros, bajar si quedan píxeles blancos de más)
import sharp from "sharp";

const [entrada, salida, umbralTxt] = process.argv.slice(2);
if (!entrada || !salida) {
    console.error("Uso: node scripts/logo-a-negro.mjs <entrada> <salida> [umbral]");
    process.exit(1);
}
const umbral = Number(umbralTxt ?? 70);

const { data, info } = await sharp(entrada)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

let aNegro = 0;
for (let i = 0; i < data.length; i += 4) {
    const croma =
        Math.max(data[i], data[i + 1], data[i + 2]) -
        Math.min(data[i], data[i + 1], data[i + 2]);
    if (croma < umbral) {
        data[i] = data[i + 1] = data[i + 2] = 0;
        aNegro++;
    }
}

await sharp(data, { raw: info }).png({ compressionLevel: 9 }).toFile(salida);
console.log(
    `${salida}: ${info.width}x${info.height}, ` +
        `${((aNegro / (data.length / 4)) * 100).toFixed(1)}% de píxeles en negro`
);
