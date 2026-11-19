import http from "node:http";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || 80,
      path: parsed.pathname + parsed.search,
      method: "GET",
      headers: {
        "User-Agent": "AJWorldwide-LinkCrawler/1.0",
      },
    };

    const req = http.request(options, (res) => {
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
    req.end();
  });
}

function extractLinksAndImages(html, currentPath) {
  const links = new Set();
  const images = new Set();

  // Extract href from <a ...>
  const aRegex = /<a\s+[^>]*?href=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = aRegex.exec(html)) !== null) {
    let href = match[1].trim().replace(/&amp;/g, "&");
    if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
      continue;
    }
    // External links
    if (href.startsWith("http://") || href.startsWith("https://")) {
      try {
        const u = new URL(href);
        if (u.origin === BASE_URL) {
          links.add(u.pathname + u.search);
        }
      } catch {}
      continue;
    }
    // Remove hash
    const cleanHref = href.split("#")[0];
    if (cleanHref) {
      if (cleanHref.startsWith("/")) {
        links.add(cleanHref);
      } else {
        links.add(`/${cleanHref}`);
      }
    }
  }

  // Extract src from <img ...>
  const imgRegex = /<img\s+[^>]*?src=["']([^"']+)["'][^>]*>/gi;
  while ((match = imgRegex.exec(html)) !== null) {
    let src = match[1].trim().replace(/&amp;/g, "&");
    if (!src || src.startsWith("data:")) continue;
    if (src.startsWith("http://") || src.startsWith("https://")) {
      try {
        const u = new URL(src);
        if (u.origin === BASE_URL) {
          images.add(u.pathname + u.search);
        }
      } catch {}
      continue;
    }
    images.add(src);
  }

  // Extract from Next.js images in srcset
  const srcsetRegex = /srcset=["']([^"']+)["']/gi;
  while ((match = srcsetRegex.exec(html)) !== null) {
    const parts = match[1].split(",");
    for (const part of parts) {
      let item = part.trim().split(/\s+/)[0];
      if (item) item = item.replace(/&amp;/g, "&");
      if (item && !item.startsWith("data:")) {
        if (item.startsWith("http://") || item.startsWith("https://")) {
          try {
            const u = new URL(item);
            if (u.origin === BASE_URL) images.add(u.pathname + u.search);
          } catch {}
        } else {
          images.add(item);
        }
      }
    }
  }

  return { links: Array.from(links), images: Array.from(images) };
}

async function main() {
  console.log(`Starting crawl from ${BASE_URL} ...\n`);

  const visitedPages = new Set();
  const queue = ["/"];
  const allImages = new Set();
  const brokenLinks = [];
  const brokenImages = [];

  while (queue.length > 0) {
    const currentPath = queue.shift();
    if (visitedPages.has(currentPath)) continue;
    visitedPages.add(currentPath);

    const targetUrl = `${BASE_URL}${currentPath}`;
    try {
      const res = await fetchUrl(targetUrl);
      if (res.statusCode !== 200) {
        console.error(`[PAGE FAIL ${res.statusCode}] ${currentPath}`);
        brokenLinks.push({ path: currentPath, status: res.statusCode });
        continue;
      }

      console.log(`[PAGE 200 OK] ${currentPath}`);
      const { links, images } = extractLinksAndImages(res.body, currentPath);

      for (const img of images) {
        allImages.add(img);
      }

      for (const link of links) {
        // Strip query string for crawling unique pages if desirable, but check exact URL
        if (!visitedPages.has(link) && !queue.includes(link)) {
          queue.push(link);
        }
      }
    } catch (err) {
      console.error(`[PAGE ERROR] ${currentPath}: ${err.message}`);
      brokenLinks.push({ path: currentPath, error: err.message });
    }
  }

  console.log(`\nCrawled ${visitedPages.size} pages. Now checking ${allImages.size} unique images...\n`);

  for (const imgPath of allImages) {
    const imgUrl = `${BASE_URL}${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;
    try {
      const res = await fetchUrl(imgUrl);
      if (res.statusCode === 200 || res.statusCode === 304) {
        // ok
      } else {
        console.error(`[IMAGE FAIL ${res.statusCode}] ${imgPath}`);
        brokenImages.push({ path: imgPath, status: res.statusCode });
      }
    } catch (err) {
      console.error(`[IMAGE ERROR] ${imgPath}: ${err.message}`);
      brokenImages.push({ path: imgPath, error: err.message });
    }
  }

  console.log("\n================ SUMMARY ================");
  console.log(`Pages checked: ${visitedPages.size}`);
  console.log(`Images checked: ${allImages.size}`);
  console.log(`Broken internal links: ${brokenLinks.length}`);
  console.log(`Broken images: ${brokenImages.length}`);

  if (brokenLinks.length > 0 || brokenImages.length > 0) {
    console.error("\nCRAWL FAILED: Broken links or images detected!");
    process.exit(1);
  } else {
    console.log("\nCRAWL PASSED: Zero broken internal links or images!");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
