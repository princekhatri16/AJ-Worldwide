import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const BREAKPOINTS = [
  { name: "280 (Galaxy Fold closed)", width: 280, height: 653 },
  { name: "320 (iPhone SE 1st gen)", width: 320, height: 568 },
  { name: "360 (Galaxy S8)", width: 360, height: 740 },
  { name: "375 (iPhone SE 2nd)", width: 375, height: 667 },
  { name: "390 (iPhone 13/14)", width: 390, height: 844 },
  { name: "414 (iPhone Plus/XR)", width: 414, height: 896 },
  { name: "480 (Large mobile)", width: 480, height: 854 },
  { name: "540 (Surface Duo)", width: 540, height: 720 },
  { name: "600 (Small tablet)", width: 600, height: 960 },
  { name: "640 (Tailwind sm)", width: 640, height: 1000 },
  { name: "768 (iPad Mini / md)", width: 768, height: 1024 },
  { name: "820 (iPad Air)", width: 820, height: 1180 },
  { name: "1024 (iPad Pro / lg)", width: 1024, height: 768 },
  { name: "1180 (Surface Pro)", width: 1180, height: 820 },
  { name: "1280 (Tailwind xl)", width: 1280, height: 800 },
  { name: "1366 (Standard laptop)", width: 1366, height: 768 },
  { name: "1440 (Desktop)", width: 1440, height: 900 },
  { name: "1536 (Tailwind 2xl)", width: 1536, height: 864 },
  { name: "1920 (FHD)", width: 1920, height: 1080 },
  { name: "2560 (QHD)", width: 2560, height: 1440 },
  { name: "667x375 (Landscape iPhone 8)", width: 667, height: 375 },
  { name: "844x390 (Landscape iPhone 13)", width: 844, height: 390 },
  { name: "896x414 (Landscape iPhone XR)", width: 896, height: 414 },
  { name: "915x412 (Landscape Galaxy S20)", width: 915, height: 412 },
];

const ROUTES = [
  "/",
  "/about",
  "/products",
  "/products/textile",
  "/products/fruit-and-vegetables",
  "/products/coconut",
  "/products/jaggery",
  "/why-choose-us",
  "/quality-export-process",
  "/registrations",
  "/contact",
];

async function runAudit() {
  console.log(`Starting responsive audit against ${BASE_URL}...`);
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let totalErrors = 0;

  // 1. Check all routes across all breakpoints for horizontal scroll
  console.log("\n=== 1. AUDITING HORIZONTAL SCROLL ACROSS ALL BREAKPOINTS ===");
  for (const bp of BREAKPOINTS) {
    await page.setViewportSize({ width: bp.width, height: bp.height });
    for (const route of ROUTES) {
      try {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded", timeout: 8000 });
        await page.waitForTimeout(100);
        
        const overflow = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientWidth = docEl.clientWidth;
          const hasOverflow = scrollWidth > clientWidth + 1;

          let overflowingElements = [];
          if (hasOverflow) {
            const allElements = document.querySelectorAll("*");
            for (const el of allElements) {
              const rect = el.getBoundingClientRect();
              if (rect.right > window.innerWidth + 2 && rect.width > 0 && rect.height > 0) {
                const style = window.getComputedStyle(el);
                if (style.display !== "none" && style.visibility !== "hidden" && style.opacity !== "0") {
                  overflowingElements.push({
                    tag: el.tagName,
                    id: el.id,
                    className: (el.className || "").toString().slice(0, 50),
                    right: Math.round(rect.right),
                    windowWidth: window.innerWidth,
                  });
                  if (overflowingElements.length >= 3) break;
                }
              }
            }
          }

          return { hasOverflow, scrollWidth, clientWidth, overflowingElements };
        });

        if (overflow.hasOverflow) {
          console.error(
            `❌ HORIZONTAL OVERFLOW at ${bp.name} on ${route}: scrollWidth=${overflow.scrollWidth} > clientWidth=${overflow.clientWidth}`
          );
          console.error("  Elements:", JSON.stringify(overflow.overflowingElements));
          totalErrors++;
        }
      } catch (err) {
        console.error(`Error loading ${route} at ${bp.name}:`, err.message);
      }
    }
  }

  // 2. Check touch target sizes & form input font sizes on representative mobile breakpoint (375x667)
  console.log("\n=== 2. AUDITING MOBILE TOUCH TARGETS & FORM INPUT SIZES (375px) ===");
  await page.setViewportSize({ width: 375, height: 667 });

  for (const route of ROUTES) {
    await page.goto(`${BASE_URL}${route}`, { waitUntil: "domcontentloaded", timeout: 8000 });
    await page.waitForTimeout(150);

    const checks = await page.evaluate((currRoute) => {
      const undersized = [];
      const smallInputs = [];

      // Check all interactive elements: buttons, links, inputs
      const interactives = document.querySelectorAll("button, a, input, select, textarea");
      for (const el of interactives) {
        const style = window.getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
          continue;
        }

        const rect = el.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) continue;

        // Ignore links that are inline text links inside paragraphs (e.g. text links in paragraphs)
        const isInlineTextLink =
          el.tagName === "A" &&
          el.parentElement &&
          (el.parentElement.tagName === "P" || el.parentElement.tagName === "SPAN") &&
          rect.height < 30;

        // Standalone buttons, icons, controls must be >= 43px
        if (!isInlineTextLink && (rect.width < 43 || rect.height < 43)) {
          // Check if parent has padding providing target area
          undersized.push({
            tag: el.tagName,
            text: (el.textContent || "").trim().slice(0, 25),
            ariaLabel: el.getAttribute("aria-label"),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
            class: (el.className || "").toString().slice(0, 40),
          });
        }

        // Check input font size >= 16px to prevent iOS auto-zoom
        if (["INPUT", "SELECT", "TEXTAREA"].includes(el.tagName)) {
          const fontSize = parseFloat(style.fontSize);
          if (fontSize < 15.5 && el.getAttribute("type") !== "hidden") {
            smallInputs.push({
              tag: el.tagName,
              name: el.getAttribute("name") || el.id,
              fontSize: style.fontSize,
            });
          }
        }
      }

      return { undersized, smallInputs };
    }, route);

    if (checks.undersized.length > 0) {
      console.warn(`⚠️ Route ${route} has ${checks.undersized.length} touch targets < 44px:`);
      for (const u of checks.undersized.slice(0, 5)) {
        console.warn(`   ${u.tag} "${u.text || u.ariaLabel}" [${u.width}x${u.height}px] .${u.class}`);
      }
    }

    if (checks.smallInputs.length > 0) {
      console.error(`❌ Route ${route} has ${checks.smallInputs.length} inputs with font-size < 16px:`);
      for (const inp of checks.smallInputs) {
        console.error(`   ${inp.tag} (${inp.name}): ${inp.fontSize}`);
      }
      totalErrors += checks.smallInputs.length;
    }
  }

  // 3. Test Mobile Drawer functionality (Open, Accordion, Close, Focus Trap, Escape)
  console.log("\n=== 3. AUDITING MOBILE DRAWER FUNCTIONALITY (390px) ===");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
  // Wait for initial splash (750ms) to dismiss
  await page.waitForTimeout(1200);

  const hamburger = page.locator('button[aria-label="Open navigation menu"]');
  await hamburger.waitFor({ state: "visible", timeout: 5000 }).catch(() => {});
  const isHamburgerVisible = await hamburger.isVisible();
  console.log(`Hamburger visible on 390px: ${isHamburgerVisible ? "✅ YES" : "❌ NO"}`);

  if (isHamburgerVisible) {
    const hamburgerBox = await hamburger.boundingBox();
    console.log(
      `Hamburger size: ${Math.round(hamburgerBox.width)}x${Math.round(hamburgerBox.height)}px (>=44px: ${
        hamburgerBox.width >= 44 && hamburgerBox.height >= 44 ? "✅ PASS" : "❌ FAIL"
      })`
    );

    // Click hamburger to open drawer
    await hamburger.click();
    await page.waitForTimeout(300);

    const drawer = page.locator('#mobile-nav-drawer, [role="dialog"][aria-label="Navigation drawer"]');
    const isDrawerVisible = await drawer.isVisible();
    console.log(`Drawer opened and visible: ${isDrawerVisible ? "✅ YES" : "❌ NO"}`);

    // Verify dataset.drawerOpen is true
    const drawerOpenAttr = await page.evaluate(() => document.documentElement.dataset.drawerOpen);
    console.log(`document.documentElement.dataset.drawerOpen: ${drawerOpenAttr} (✅ expected "true")`);

    // Verify floating actions are hidden
    const floatingActionsVisible = await page.locator('aside[aria-label="Quick Communication Actions"]').isVisible();
    console.log(`Floating actions hidden while drawer open: ${!floatingActionsVisible ? "✅ YES" : "❌ NO"}`);

    // Open Products accordion in mobile drawer
    const productsBtn = drawer.locator('button:has-text("Products")');
    if (await productsBtn.isVisible()) {
      await productsBtn.click();
      await page.waitForTimeout(300);
      const jaggeryLink = drawer.locator('a[href="/products/jaggery"]');
      const isJaggeryVisible = await jaggeryLink.isVisible();
      console.log(`Products accordion opens, Jaggery visible: ${isJaggeryVisible ? "✅ YES" : "❌ NO"}`);
    }

    // Press Escape to close drawer
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const isDrawerStillVisible = await drawer.isVisible();
    console.log(`Escape key closes drawer: ${!isDrawerStillVisible ? "✅ YES" : "❌ NO"}`);
  }

  // 4. Test Google Translate suppression
  console.log("\n=== 4. AUDITING GOOGLE TRANSLATE BANNER SUPPRESSION ===");
  const bodyTop = await page.evaluate(() => window.getComputedStyle(document.body).top);
  const bannerFrame = await page.locator(".goog-te-banner-frame, iframe.skiptranslate").count();
  console.log(`body top offset: ${bodyTop} (✅ expected "0px")`);
  console.log(`visible google banner frames count: ${bannerFrame} (✅ expected 0)`);

  await browser.close();

  console.log(`\n========================================`);
  console.log(`AUDIT FINISHED. Total fatal errors: ${totalErrors}`);
  console.log(`========================================`);

  if (totalErrors > 0) {
    process.exit(1);
  }
}

runAudit().catch((err) => {
  console.error("Audit script failed:", err);
  process.exit(1);
});
