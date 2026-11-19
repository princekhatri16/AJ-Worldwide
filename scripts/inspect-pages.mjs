import http from "node:http";

function inspect(path) {
  return new Promise((resolve) => {
    http.get("http://localhost:3000" + path, (res) => {
      let html = "";
      res.on("data", (c) => (html += c));
      res.on("end", () => {
        console.log("====================================");
        console.log("PAGE: " + path + " (Status: " + res.statusCode + ")");
        console.log("====================================");

        // Title
        const titleMatch = html.match(/<title>([^<]*)<\/title>/);
        const title = titleMatch ? titleMatch[1] : "NONE";
        console.log(`Title: [${title}] (length: ${title.length})`);

        // Description
        const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
        const desc = descMatch ? descMatch[1] : "NONE";
        console.log(`Description: [${desc}] (length: ${desc.length})`);

        // Canonical
        const canMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
        console.log("Canonical: [" + (canMatch ? canMatch[1] : "NONE") + "]");

        // Robots
        const robotsMatch = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
        console.log("Robots: [" + (robotsMatch ? robotsMatch[1] : "NONE") + "]");

        // OG
        const ogTitle = html.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']*)["']/i);
        const ogImage = html.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']*)["']/i);
        console.log("OG Title: [" + (ogTitle ? ogTitle[1] : "NONE") + "]");
        console.log("OG Image: [" + (ogImage ? ogImage[1] : "NONE") + "]");

        // Twitter
        const twCard = html.match(/<meta\s+name=["']twitter:card["']\s+content=["']([^"']*)["']/i);
        const twImage = html.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']*)["']/i);
        console.log("Twitter Card: [" + (twCard ? twCard[1] : "NONE") + "]");
        console.log("Twitter Image: [" + (twImage ? twImage[1] : "NONE") + "]");

        // H1
        const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
          m[1].replace(/<[^>]+>/g, "").trim()
        );
        console.log("H1 count:", h1Matches.length, "| Content:", h1Matches);

        // JSON-LD
        const jsonLdMatches = [
          ...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi),
        ];
        console.log("JSON-LD script count:", jsonLdMatches.length);
        jsonLdMatches.forEach((m, idx) => {
          try {
            const parsed = JSON.parse(m[1]);
            console.log("  JSON-LD #" + (idx + 1) + " @type: " + parsed["@type"] + " | name: " + (parsed.name || "N/A"));
          } catch (e) {
            console.error("  JSON-LD #" + (idx + 1) + " PARSE ERROR:", e.message);
          }
        });
        console.log("\n");
        resolve();
      });
    });
  });
}

async function run() {
  await inspect("/");
  await inspect("/products/steel/steel-pipes");
  await inspect("/contact");
  await inspect("/contact?product=steel&type=steel-pipes");
  await inspect("/non-existent-random-route");
}

run();
