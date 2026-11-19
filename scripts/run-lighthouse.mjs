import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const pages = [
  { name: "Home (/)", url: "http://localhost:3000/" },
  { name: "Products (/products)", url: "http://localhost:3000/products" },
  { name: "Steel Category (/products/steel)", url: "http://localhost:3000/products/steel" },
  { name: "Contact (/contact)", url: "http://localhost:3000/contact" },
];

const results = [];

for (const page of pages) {
  console.log(`\nAuditing ${page.name} ...`);
  const tmpJson = path.join(process.cwd(), "scripts", `lh-${Date.now()}.json`);
  try {
    const cmd = `npx lighthouse ${page.url} --output=json --output-path="${tmpJson}" --chrome-flags="--headless" --form-factor=mobile --quiet`;
    execSync(cmd, { stdio: "inherit" });

    const raw = fs.readFileSync(tmpJson, "utf8");
    fs.unlinkSync(tmpJson);

    const report = JSON.parse(raw);
    const perf = Math.round((report.categories.performance?.score || 0) * 100);
    const a11y = Math.round((report.categories.accessibility?.score || 0) * 100);
    const bp = Math.round((report.categories["best-practices"]?.score || 0) * 100);
    const seo = Math.round((report.categories.seo?.score || 0) * 100);
    const lcp = report.audits["largest-contentful-paint"]?.displayValue || "N/A";
    const cls = report.audits["cumulative-layout-shift"]?.numericValue !== undefined
      ? report.audits["cumulative-layout-shift"].numericValue.toFixed(3)
      : "N/A";

    results.push({
      page: page.name,
      perf,
      a11y,
      bp,
      seo,
      lcp,
      cls,
    });
  } catch (err) {
    console.error(`Error auditing ${page.name}:`, err.message);
  }
}

console.log("\n=================== LIGHTHOUSE AUDIT RESULTS (MOBILE) ===================");
console.table(results);
