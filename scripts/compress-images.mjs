import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, basename } from "node:path";
import sharp from "sharp";

const TARGET_MAX = 380_000;
const OUTPUT_DIR = "public/images";
const SOURCE_DIRS = [
  "capycosas/images",
  "/opt/cursor/artifacts/assets",
  "/cursor/stores/bc-25c081bb-d43c-4a21-bac4-4990e5d3d429/artifacts/assets",
];

const files = [
  "hero.jpg",
  "snack.jpg",
  "cama.jpg",
  "cepillo.jpg",
  "juguete.jpg",
  "pileta.jpg",
  "vitamina.jpg",
];

function findSource(name) {
  for (const dir of SOURCE_DIRS) {
    const path = join(dir, name);
    if (existsSync(path)) return path;
  }
  return null;
}

mkdirSync(OUTPUT_DIR, { recursive: true });

for (const name of files) {
  const source = findSource(name);
  if (!source) {
    console.error(`Missing source for ${name}`);
    process.exitCode = 1;
    continue;
  }

  const isHero = name === "hero.jpg";
  let image = sharp(source).rotate();
  const meta = await image.metadata();

  const maxWidth = isHero ? 1400 : 1100;
  if (meta.width && meta.width > maxWidth) {
    image = image.resize({ width: maxWidth, withoutEnlargement: true });
  }

  let quality = 82;
  let output;

  while (quality >= 55) {
    output = await image.jpeg({ quality, mozjpeg: true }).toBuffer();
    if (output.length <= TARGET_MAX) break;
    quality -= 4;
  }

  if (!output || output.length > TARGET_MAX) {
    output = await image
      .resize({
        width: isHero ? 1100 : 900,
        withoutEnlargement: true,
      })
      .jpeg({ quality: 72, mozjpeg: true })
      .toBuffer();
  }

  const outPath = join(OUTPUT_DIR, name);
  await sharp(output).toFile(outPath);
  const size = statSync(outPath).size;
  console.log(`${name}: ${Math.round(size / 1024)}KB (q≈${quality}) from ${source}`);
}
