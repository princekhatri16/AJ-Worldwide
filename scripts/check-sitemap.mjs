import http from "node:http";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    });
    req.on("error", reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${url}`));
    });
  });
}

async function main() {
  console.log(`Checking sitemap at ${BASE_URL}/sitemap.xml ...\n`);
  const sitemapRes = await fetchUrl(`${BASE_URL}/sitemap.xml`);

  if (sitemapRes.statusCode !== 200) {
    console.error(`FAILED: /sitemap.xml returned status ${sitemapRes.statusCode}`);
    process.exit(1);
  }

  const xml = sitemapRes.body;
  if (!xml.includes("<urlset") || !xml.includes("</urlset>")) {
    console.error("FAILED: /sitemap.xml is not valid XML or missing <urlset>");
    process.exit(1);
  }

  const locRegex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;
  while ((match = locRegex.exec(xml)) !== null) {
    urls.push(match[1].trim());
  }

  console.log(`Found ${urls.length} URLs in sitemap:\n`);

  let hasError = false;

  for (const url of urls) {
    // Check exclusions
    if (url.includes("?")) {
      console.error(`[FAIL] Query string found in sitemap URL: ${url}`);
      hasError = true;
    }
    if (url.includes("google") || url.includes(".html")) {
      console.error(`[FAIL] Verification file found in sitemap URL: ${url}`);
      hasError = true;
    }
    if (url.includes("/api/")) {
      console.error(`[FAIL] API route found in sitemap URL: ${url}`);
      hasError = true;
    }
    if (url.includes("not-found")) {
      console.error(`[FAIL] not-found found in sitemap URL: ${url}`);
      hasError = true;
    }

    try {
      // Test URL (replace base with BASE_URL if URL has custom domain)
      const parsed = new URL(url);
      const testUrl = `${BASE_URL}${parsed.pathname}`;
      const res = await fetchUrl(testUrl);
      if (res.statusCode === 200) {
        console.log(`[200 OK] ${parsed.pathname}`);
      } else {
        console.error(`[FAIL ${res.statusCode}] ${parsed.pathname}`);
        hasError = true;
      }
    } catch (err) {
      console.error(`[ERROR] ${url}: ${err.message}`);
      hasError = true;
    }
  }

  console.log("\n-------------------------------------------");
  if (hasError) {
    console.error("Sitemap validation FAILED with errors.");
    process.exit(1);
  } else {
    console.log(`Sitemap validation PASSED: All ${urls.length} URLs returned 200 OK.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
