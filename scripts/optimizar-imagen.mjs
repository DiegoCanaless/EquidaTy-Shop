// Comprime una imagen a WebP (mantiene transparencia). Uso:
//   node scripts/optimizar-imagen.mjs <entrada> <salida> [anchoMax] [calidad] [calidadAlfa]
//
// Ejemplos:
//   node scripts/optimizar-imagen.mjs public/clients/<slug>/banner.png public/clients/<slug>/banner.webp 1536 75 75
//   node scripts/optimizar-imagen.mjs public/clients/<slug>/logo.png   public/clients/<slug>/logo.webp   600 90
import sharp from "sharp";
import { stat } from "node:fs/promises";

const [entrada, salida, anchoMaxArg, calidadArg, calidadAlfaArg] = process.argv.slice(2);

if (!entrada || !salida) {
  console.error("Uso: node scripts/optimizar-imagen.mjs <entrada> <salida> [anchoMax] [calidad] [calidadAlfa]");
  process.exit(1);
}

const anchoMax = anchoMaxArg ? Number(anchoMaxArg) : 2000;
const calidad = calidadArg ? Number(calidadArg) : 80;
const calidadAlfa = calidadAlfaArg ? Number(calidadAlfaArg) : undefined;

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

const meta = await sharp(entrada).metadata();

await sharp(entrada)
  .resize({ width: anchoMax, withoutEnlargement: true })
  .webp({
    quality: calidad,
    ...(calidadAlfa !== undefined ? { alphaQuality: calidadAlfa } : {}),
  })
  .toFile(salida);

const antes = (await stat(entrada)).size;
const despues = (await stat(salida)).size;
const ahorro = (100 - (despues / antes) * 100).toFixed(0);

console.log(
  `${entrada} (${meta.width}x${meta.height}, ${kb(antes)}) -> ${salida} (${kb(despues)}) · -${ahorro}%`
);
