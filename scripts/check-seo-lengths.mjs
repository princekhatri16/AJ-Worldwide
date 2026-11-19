const list = [
  ['Home', 'AJ Worldwide — Trusted Worldwide | Import & Export', 'From Maharashtra to the world: AJ Worldwide exports textiles, fresh produce, coconut, jaggery, spices and steel to trusted global trade partners.'],
  ['About', 'About Us | AJ Worldwide — Export Trading from India', 'Established in 2025 in Kumbhari, Maharashtra, AJ Worldwide connects global buyers with Indian textiles, produce, coconut, jaggery, spices and steel.'],
  ['Products', 'Export Products & Commodities | AJ Worldwide India', 'Explore AJ Worldwide\'s export categories: textiles, fresh fruits and vegetables, semi-husked coconuts, natural jaggery, whole spices, and manufactured steel.'],
  ['Why Choose Us', 'Why Choose AJ Worldwide | Commercial Export Strengths', 'Commercial strengths of AJ Worldwide: six product categories, verified credentials, direct sourcing from India, transparent dealings, and global delivery.'],
  ['Quality', 'Quality & Export Process | AJ Worldwide Trade Desk', 'Learn our six-step export workflow from inquiry to port dispatch: transparent quotations, rigorous quality inspection, export packaging, and freight shipping.'],
  ['Registrations', 'Official Registrations & Compliance | AJ Worldwide', 'Verified commercial credentials for AJ Worldwide in Kumbhari, Maharashtra, including GST, Udyam MSME, and DGFT Import Export Code (IEC) registrations.'],
  ['Contact', 'Contact Export Desk | AJ Worldwide — Kumbhari India', 'Get in touch with AJ Worldwide in Kumbhari, Buldhana, Maharashtra for export pricing and product details. Reach our trade desk by phone, WhatsApp, or email.'],
  ['Textile', 'Textiles Export Category | AJ Worldwide Trade Desk', 'Textile products for international buyers from AJ Worldwide. Quality fabrics, towels, and linen packed for export from Kumbhari, Maharashtra, India.'],
  ['Fruit & Veg', 'Fresh Fruit & Vegetables Export | AJ Worldwide India', 'Fresh Indian fruit and vegetables for global export from AJ Worldwide. Graded produce packed in ventilated corrugated cartons for international shipment.'],
  ['Coconut', 'Fresh Coconuts for Export | AJ Worldwide Trade Desk', 'Export-grade Indian coconuts from AJ Worldwide. Carefully selected mature, semi-husked coconuts packed in mesh bags for international market delivery.'],
  ['Jaggery', 'Natural Jaggery for Export | AJ Worldwide Trade Desk', 'Pure traditional Indian jaggery from AJ Worldwide. Export-grade natural sweetener available in blocks and cubes, packaged securely for overseas markets.'],
  ['Spices', 'Indian Spices for Export | AJ Worldwide Trade Desk', 'Whole and ground export-grade Indian spices from AJ Worldwide. Sourced from India\'s agricultural centers and packed securely for international transit.'],
  ['Steel', 'Manufactured Steel Export | AJ Worldwide Trade Desk', 'Industrial and manufactured steel products from AJ Worldwide, including pipes, blocks, and rods for international construction and industrial buyers.'],
  ['Steel Pipes', 'Export Grade Steel Pipes | AJ Worldwide Trade Desk', 'Export specifications for steel pipes from AJ Worldwide. Hollow structural sections, seamless and ERW steel tubes supplied for international trade.'],
  ['Steel Blocks', 'Export Grade Steel Blocks | AJ Worldwide Trade Desk', 'Export specifications for steel blocks from AJ Worldwide. Solid carbon and alloy steel billets and forged blocks supplied for industrial processing.'],
  ['Steel Rods', 'Export Steel Rods & Rebar | AJ Worldwide Trade Desk', 'Export specifications for steel rods and round bars from AJ Worldwide. High-tensile reinforcement and carbon steel bars for construction and industry.'],
];

let failed = false;
for (const [name, title, desc] of list) {
  const tLen = title.length;
  const dLen = desc.length;
  const tOk = tLen >= 50 && tLen <= 60;
  const dOk = dLen >= 120 && dLen <= 160;
  console.log(`${name.padEnd(16)}: Title (${tLen}) ${tOk ? 'OK' : 'FAIL'} | Desc (${dLen}) ${dOk ? 'OK' : 'FAIL'}`);
  if (!tOk || !dOk) failed = true;
}
if (failed) {
  console.error('Some lengths failed requirements!');
  process.exit(1);
}
console.log('\nALL 16 TITLES AND DESCRIPTIONS SATISFY 50-60 & 120-160 CHARACTER REQUIREMENTS PERFECTLY!');
