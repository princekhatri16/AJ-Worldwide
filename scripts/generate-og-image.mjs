import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const publicDir = path.join(rootDir, "public");

async function genOg() {
  const markBuffer = await sharp(path.join(publicDir, "brand", "logo-mark.png"))
    .resize(100, 100)
    .png()
    .toBuffer();
  const markBase64 = markBuffer.toString("base64");

  const svg = `
  <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
    <!-- Background -->
    <rect width="1200" height="630" fill="#163829" />

    <!-- Outer border & subtle inner frame -->
    <rect x="24" y="24" width="1152" height="582" rx="16" fill="none" stroke="#E3DDCF" stroke-opacity="0.25" stroke-width="2" />
    <rect x="24" y="24" width="1152" height="8" fill="#B4763A" rx="4" />

    <!-- Decorative background rings -->
    <circle cx="1060" cy="315" r="340" fill="none" stroke="#B4763A" stroke-opacity="0.08" stroke-width="1.5" />
    <circle cx="1060" cy="315" r="240" fill="none" stroke="#B4763A" stroke-opacity="0.1" stroke-width="1.5" />
    <circle cx="1060" cy="315" r="140" fill="none" stroke="#B4763A" stroke-opacity="0.12" stroke-width="1.5" />

    <!-- Brand mark and header -->
    <g transform="translate(80, 80)">
      <image href="data:image/png;base64,${markBase64}" x="0" y="0" width="90" height="90" />
      
      <g transform="translate(110, 22)">
        <text x="0" y="28" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="32" letter-spacing="4" fill="#FFFFFF">AJ WORLDWIDE</text>
        <text x="0" y="54" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="14" letter-spacing="5" fill="#B4763A">TRUSTED WORLDWIDE</text>
      </g>
    </g>

    <!-- Main headline -->
    <text x="80" y="260" font-family="Georgia, serif" font-weight="700" font-size="52" fill="#FFFFFF" letter-spacing="1">From Maharashtra to the World</text>

    <!-- Description -->
    <text x="80" y="318" font-family="system-ui, -apple-system, sans-serif" font-weight="400" font-size="22" fill="#F6F3EC" fill-opacity="0.9">Indian Agricultural Produce, Textiles, Spices &amp; Industrial Steel</text>

    <!-- Category badges -->
    <g transform="translate(80, 380)">
      <rect x="0" y="0" width="880" height="64" rx="12" fill="#1F4A3A" stroke="#E3DDCF" stroke-opacity="0.25" />
      <text x="28" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="17" fill="#FFFFFF">Textile</text>
      <circle cx="100" cy="33" r="3" fill="#B4763A" />
      <text x="120" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="17" fill="#FFFFFF">Fruit &amp; Vegetables</text>
      <circle cx="305" cy="33" r="3" fill="#B4763A" />
      <text x="325" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="17" fill="#FFFFFF">Coconut</text>
      <circle cx="420" cy="33" r="3" fill="#B4763A" />
      <text x="440" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="17" fill="#FFFFFF">Jaggery</text>
      <circle cx="530" cy="33" r="3" fill="#B4763A" />
      <text x="550" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="17" fill="#FFFFFF">Spices</text>
      <circle cx="630" cy="33" r="3" fill="#B4763A" />
      <text x="650" y="39" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="17" fill="#FFFFFF">Steel</text>
    </g>

    <!-- Footer meta -->
    <g transform="translate(80, 510)">
      <rect x="0" y="0" width="180" height="34" rx="6" fill="#B4763A" />
      <text x="90" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="12" letter-spacing="2" fill="#FFFFFF" text-anchor="middle">IMPORT &amp; EXPORT</text>
      <text x="205" y="22" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="15" fill="#F6F3EC" fill-opacity="0.85">Kumbhari, Buldhana, Maharashtra, India • Established 2025</text>
    </g>
  </svg>
  `;

  const ogPath = path.join(publicDir, "og-image.png");
  await sharp(Buffer.from(svg)).png().toFile(ogPath);
  const m = await sharp(ogPath).metadata();
  console.log("OG image generated successfully:", m.width, "x", m.height, m.format, `(${fs.statSync(ogPath).size} bytes)`);
}

genOg().catch(console.error);
