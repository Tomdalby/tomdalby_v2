/**
 * Conservative web image optimize for GitHub Pages.
 * - Cap long edge at 2400px (no upscaling)
 * - JPEG quality 86 (mozjpeg)
 * - Only replace a file if the new version is smaller
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOTS = [
  path.join(__dirname, "..", "public", "images", "collections"),
  path.join(__dirname, "..", "public", "images", "About"),
];

const MAX_EDGE = 2400;
const JPEG_QUALITY = 86;
const SKIP_IF_UNDER_BYTES = 700 * 1024; // already light enough and small enough dims

const EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function* walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (EXT.has(path.extname(entry.name).toLowerCase())) yield full;
  }
}

async function optimizeFile(file) {
  const originalSize = fs.statSync(file).size;
  const ext = path.extname(file).toLowerCase();

  const image = sharp(file, { failOn: "none" }).rotate(); // honor EXIF orientation
  const meta = await image.metadata();
  const w = meta.width || 0;
  const h = meta.height || 0;
  const longEdge = Math.max(w, h);

  if (longEdge > 0 && longEdge <= MAX_EDGE && originalSize <= SKIP_IF_UNDER_BYTES) {
    return { file, status: "skip", originalSize, newSize: originalSize };
  }

  let pipeline = image;
  if (longEdge > MAX_EDGE) {
    pipeline = pipeline.resize({
      width: w >= h ? MAX_EDGE : undefined,
      height: h > w ? MAX_EDGE : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  // Keep JPEG/PNG/WebP containers; photos get high-quality JPEG encode when jpg/jpeg
  let outBuffer;
  if (ext === ".jpg" || ext === ".jpeg") {
    outBuffer = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, chromaSubsampling: "4:4:4" })
      .toBuffer();
  } else if (ext === ".webp") {
    outBuffer = await pipeline.webp({ quality: JPEG_QUALITY }).toBuffer();
  } else if (ext === ".png") {
    // Prefer keeping PNG; if still huge after resize, leave as optimized PNG
    outBuffer = await pipeline.png({ compressionLevel: 8, palette: false }).toBuffer();
  } else {
    return { file, status: "skip", originalSize, newSize: originalSize };
  }

  if (outBuffer.length >= originalSize) {
    return { file, status: "keep", originalSize, newSize: originalSize };
  }

  fs.writeFileSync(file, outBuffer);
  return { file, status: "optimized", originalSize, newSize: outBuffer.length };
}

async function main() {
  const files = [];
  for (const root of ROOTS) {
    for await (const f of walk(root)) files.push(f);
  }

  console.log(`Found ${files.length} images. Conservative settings: max ${MAX_EDGE}px, q${JPEG_QUALITY}.`);

  let optimized = 0;
  let skipped = 0;
  let kept = 0;
  let before = 0;
  let after = 0;
  const byFolder = new Map();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    process.stdout.write(`\r[${i + 1}/${files.length}] ${path.basename(file).slice(0, 50).padEnd(50)}`);
    try {
      const result = await optimizeFile(file);
      before += result.originalSize;
      after += result.newSize;
      if (result.status === "optimized") optimized++;
      else if (result.status === "skip") skipped++;
      else kept++;

      const coll = file.includes(`${path.sep}collections${path.sep}`)
        ? file.split(`${path.sep}collections${path.sep}`)[1].split(path.sep)[0]
        : "About";
      const stats = byFolder.get(coll) || { before: 0, after: 0, n: 0 };
      stats.before += result.originalSize;
      stats.after += result.newSize;
      stats.n++;
      byFolder.set(coll, stats);
    } catch (err) {
      console.error(`\nFailed: ${file}\n`, err.message);
    }
  }

  console.log("\n\nDone.");
  console.log(`Optimized: ${optimized}  Skipped(already light): ${skipped}  Kept(no smaller): ${kept}`);
  console.log(
    `Total: ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB (` +
      `${(((before - after) / before) * 100).toFixed(1)}% smaller)`
  );
  console.log("\nPer folder:");
  for (const [name, s] of [...byFolder.entries()].sort((a, b) => b.before - a.before)) {
    const pct = s.before ? (((s.before - s.after) / s.before) * 100).toFixed(0) : 0;
    console.log(
      `  ${name}: ${(s.before / 1048576).toFixed(1)}MB → ${(s.after / 1048576).toFixed(1)}MB (-${pct}%)`
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
