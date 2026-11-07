const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const publicDir = path.join(__dirname, "..", "public");

// 1. Logo SVG (Horizontal with AJ monogram + WORLDWIDE)
// Using deep forest green #1F4A3A, copper #B4763A, warm ivory #FAF7F2, charcoal #2A2622
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 120" width="500" height="120">
  <rect width="500" height="120" fill="transparent"/>
  <!-- Monogram Mark -->
  <g transform="translate(10, 10)">
    <rect x="0" y="0" width="100" height="100" rx="12" fill="#1F4A3A" />
    <path d="M22 80 L50 20 L78 80 L62 80 L50 50 L38 80 Z" fill="#B4763A" />
    <path d="M42 62 L58 62" stroke="#FAF7F2" stroke-width="4" stroke-linecap="round"/>
    <circle cx="50" cy="20" r="3" fill="#FAF7F2" />
    <path d="M68 40 L85 40 L85 70 C85 82 72 84 66 82" fill="none" stroke="#FAF7F2" stroke-width="5" stroke-linecap="round"/>
  </g>
  <!-- Brand Text -->
  <text x="130" y="60" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="38" letter-spacing="3" fill="#2A2622">
    AJ WORLDWIDE
  </text>
  <text x="132" y="86" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="13" letter-spacing="6" fill="#B4763A">
    TRUSTED WORLDWIDE
  </text>
  <line x1="130" y1="96" x2="360" y2="96" stroke="#E3DCCF" stroke-width="1.5" />
</svg>`;

// 2. Icon Mark SVG
const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <rect width="120" height="120" rx="16" fill="#1F4A3A"/>
  <path d="M30 95 L60 25 L90 95 L74 95 L60 60 L46 95 Z" fill="#B4763A" />
  <path d="M50 72 L70 72" stroke="#FAF7F2" stroke-width="5" stroke-linecap="round"/>
  <path d="M78 48 L96 48 L96 82 C96 95 82 98 75 95" fill="none" stroke="#FAF7F2" stroke-width="6" stroke-linecap="round"/>
</svg>`;

// 3. Open Graph Banner SVG (1200x630)
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <rect width="1200" height="630" fill="#1F4A3A"/>
  <!-- Decorative subtle circles -->
  <g stroke="#B4763A" stroke-opacity="0.15" stroke-width="1.5" fill="none">
    <circle cx="950" cy="315" r="380" />
    <circle cx="950" cy="315" r="280" />
    <circle cx="950" cy="315" r="180" />
    <line x1="950" y1="0" x2="950" y2="630" />
    <line x1="570" y1="315" x2="1200" y2="315" />
  </g>
  <!-- Content -->
  <g transform="translate(100, 140)">
    <rect x="0" y="0" width="84" height="84" rx="12" fill="#B4763A"/>
    <text x="42" y="58" font-family="system-ui, sans-serif" font-weight="900" font-size="44" fill="#1F4A3A" text-anchor="middle">AJ</text>
    
    <text x="110" y="45" font-family="system-ui, sans-serif" font-weight="800" font-size="34" letter-spacing="4" fill="#FAF7F2">AJ WORLDWIDE</text>
    <text x="112" y="74" font-family="system-ui, sans-serif" font-weight="600" font-size="16" letter-spacing="6" fill="#B4763A">TRUSTED WORLDWIDE</text>
    
    <text x="0" y="190" font-family="Georgia, serif" font-weight="700" font-size="52" fill="#FAF7F2">From Maharashtra to the World</text>
    
    <text x="0" y="260" font-family="system-ui, sans-serif" font-weight="400" font-size="22" fill="#FAF7F2" opacity="0.85">
      Textiles · Fresh Fruit &amp; Vegetables · Coconut · Jaggery
    </text>
    
    <g transform="translate(0, 320)">
      <rect x="0" y="0" width="220" height="48" rx="4" fill="#B4763A"/>
      <text x="110" y="30" font-family="system-ui, sans-serif" font-weight="700" font-size="14" letter-spacing="2" fill="#FAF7F2" text-anchor="middle">IMPORT &amp; EXPORT</text>
      
      <text x="250" y="30" font-family="system-ui, sans-serif" font-weight="600" font-size="15" fill="#FAF7F2" opacity="0.9">Kumbhari, Buldhana, India</text>
    </g>
  </g>
</svg>`;

async function build() {
  fs.writeFileSync(path.join(publicDir, "logo.svg"), logoSvg);
  fs.writeFileSync(path.join(publicDir, "logo-mark.svg"), markSvg);

  // Convert to PNGs
  await sharp(Buffer.from(logoSvg)).png().toFile(path.join(publicDir, "logo.png"));
  await sharp(Buffer.from(markSvg)).resize(512, 512).png().toFile(path.join(publicDir, "logo-mark.png"));
  await sharp(Buffer.from(markSvg)).resize(32, 32).toFormat("png").toFile(path.join(publicDir, "favicon.ico"));
  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(publicDir, "og-image.png"));

  console.log("Brand assets regenerated in public/ with new palette");
}

build().catch(console.error);
