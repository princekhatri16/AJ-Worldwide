import { chromium } from "playwright";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const TEST_BREAKPOINTS = [
  { name: "280 (Galaxy Fold closed)", width: 280, height: 653 },
  { name: "320 (iPhone SE 1st)", width: 320, height: 568 },
  { name: "360 (Galaxy A55 / S8)", width: 360, height: 740 },
  { name: "375 (iPhone SE 2nd)", width: 375, height: 667 },
  { name: "390 (iPhone 13/14)", width: 390, height: 844 },
  { name: "414 (iPhone Plus/XR)", width: 414, height: 896 },
  { name: "480 (Large mobile)", width: 480, height: 854 },
  { name: "600 (Small tablet)", width: 600, height: 960 },
  { name: "768 (iPad Mini / md)", width: 768, height: 1024 },
  { name: "1024 (iPad Pro / lg)", width: 1024, height: 768 },
  { name: "1280 (Desktop / xl)", width: 1280, height: 800 },
  { name: "844x390 (Landscape iPhone)", width: 844, height: 390 },
];

async function verify() {
  console.log(`Starting Home About Slider fix verification on ${BASE_URL}...`);
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let failed = false;

  for (const bp of TEST_BREAKPOINTS) {
    await page.setViewportSize({ width: bp.width, height: bp.height });
    await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1000); // Wait for splash screen

    const result = await page.evaluate((vpWidth) => {
      const docEl = document.documentElement;
      const scrollWidth = Math.max(docEl.scrollWidth, document.body.scrollWidth);
      const clientWidth = docEl.clientWidth;
      const hasHorizontalScroll = scrollWidth > clientWidth + 1;

      // Find any truly overflowing (unclipped) elements
      function isTrulyOverflowing(el) {
        const r = el.getBoundingClientRect();
        if (r.right <= vpWidth + 1.5) return false;
        if (r.width === 0 || r.height === 0) return false;
        const s = window.getComputedStyle(el);
        if (s.display === "none" || s.visibility === "hidden" || s.opacity === "0") return false;

        // Walk up ancestors: if an ancestor with overflow hidden/clip is within viewport, it is clipped
        let p = el.parentElement;
        while (p && p !== document.documentElement) {
          const ps = window.getComputedStyle(p);
          if (["hidden", "clip"].includes(ps.overflow) || ["hidden", "clip"].includes(ps.overflowX)) {
            const pr = p.getBoundingClientRect();
            if (pr.right <= vpWidth + 1.5) {
              return false; // clipped by container
            }
          }
          p = p.parentElement;
        }
        return true;
      }

      const allEls = document.querySelectorAll("*");
      const overflowing = [];
      for (const el of allEls) {
        if (isTrulyOverflowing(el)) {
          overflowing.push({
            tag: el.tagName,
            className: (el.className || "").toString().slice(0, 40),
            right: Math.round(el.getBoundingClientRect().right),
          });
          if (overflowing.length >= 3) break;
        }
      }

      // Find About slider element
      const slider = document.querySelector('section[aria-labelledby="home-about-heading"] .rounded-3xl');
      let sliderInfo = null;
      if (slider) {
        const sRect = slider.getBoundingClientRect();
        const leftMargin = Math.round(sRect.left);
        const rightMargin = Math.round(vpWidth - sRect.right);

        // Find caption card
        const caption = slider.querySelector('.rounded-2xl.bg-\\[\\#1F4A3A\\]\\/95, .rounded-2xl.bg-\\[\\#1F4A3A\\]');
        let captionInfo = null;
        if (caption) {
          const cRect = caption.getBoundingClientRect();
          captionInfo = {
            width: Math.round(cRect.width),
            left: Math.round(cRect.left),
            right: Math.round(cRect.right),
            insideSlider: cRect.left >= sRect.left - 2 && cRect.right <= sRect.right + 2,
          };
        }

        // Find dots
        const dots = slider.querySelector('[role="tablist"]');
        let dotsInfo = null;
        if (dots) {
          const dRect = dots.getBoundingClientRect();
          dotsInfo = {
            right: Math.round(dRect.right),
            top: Math.round(dRect.top),
            insideSlider: dRect.right <= sRect.right + 2 && dRect.top >= sRect.top - 2,
          };
        }

        sliderInfo = {
          width: Math.round(sRect.width),
          height: Math.round(sRect.height),
          leftMargin,
          rightMargin,
          marginsEqual: vpWidth < 1024 ? Math.abs(leftMargin - rightMargin) <= 2 : true,
          fitsViewport: sRect.right <= vpWidth + 1,
          captionInfo,
          dotsInfo,
        };
      }

      return { hasHorizontalScroll, scrollWidth, clientWidth, overflowing, sliderInfo };
    }, bp.width);

    console.log(`\n--- Breakpoint: ${bp.name} (${bp.width}px) ---`);
    console.log(`Horizontal scroll: ${result.hasHorizontalScroll ? "❌ YES" : "✅ NO"}`);
    if (result.overflowing.length > 0) {
      console.error(`Overflowing elements:`, result.overflowing);
      failed = true;
    }

    if (result.sliderInfo) {
      const s = result.sliderInfo;
      console.log(`Slider size: ${s.width}x${s.height}px (fits in viewport: ${s.fitsViewport ? "✅ YES" : "❌ NO"})`);
      console.log(`Side margins: Left=${s.leftMargin}px, Right=${s.rightMargin}px (equal: ${s.marginsEqual ? "✅ YES" : "❌ NO"})`);
      if (s.captionInfo) {
        console.log(`Caption card: width=${s.captionInfo.width}px (inside slider: ${s.captionInfo.insideSlider ? "✅ YES" : "❌ NO"})`);
      }
      if (s.dotsInfo) {
        console.log(`Dots indicator: inside slider: ${s.dotsInfo.insideSlider ? "✅ YES" : "❌ NO"}`);
      }

      if (!s.fitsViewport || !s.marginsEqual) {
        console.error(`❌ Slider sizing defect at ${bp.name}`);
        failed = true;
      }
    } else {
      console.error(`❌ Slider element not found at ${bp.name}`);
      failed = true;
    }
  }

  // Test RTL mode (Arabic)
  console.log(`\n=== Testing RTL Mode (Arabic) at 360px ===`);
  await page.setViewportSize({ width: 360, height: 740 });
  await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1000);

  // Set html dir="rtl" to simulate RTL language
  await page.evaluate(() => {
    document.documentElement.dir = "rtl";
    document.documentElement.lang = "ar";
  });
  await page.waitForTimeout(300);

  const rtlResult = await page.evaluate(() => {
    const docEl = document.documentElement;
    const hasHorizontalScroll = docEl.scrollWidth > docEl.clientWidth + 1;
    const slider = document.querySelector('section[aria-labelledby="home-about-heading"] .rounded-3xl');
    let sliderRtl = null;
    if (slider) {
      const sRect = slider.getBoundingClientRect();
      const dots = slider.querySelector('[role="tablist"]');
      let dotsRtl = null;
      if (dots) {
        const dRect = dots.getBoundingClientRect();
        dotsRtl = {
          left: Math.round(dRect.left),
          atTopStart: dRect.left >= sRect.left - 2,
        };
      }
      sliderRtl = {
        width: Math.round(sRect.width),
        fits: sRect.right <= 361,
        dotsRtl,
      };
    }
    return { hasHorizontalScroll, sliderRtl };
  });

  console.log(`RTL Horizontal scroll: ${rtlResult.hasHorizontalScroll ? "❌ YES" : "✅ NO"}`);
  console.log(`RTL Slider fits: ${rtlResult.sliderRtl?.fits ? "✅ YES" : "❌ NO"}`);
  console.log(`RTL Dots at top start: ${rtlResult.sliderRtl?.dotsRtl?.atTopStart ? "✅ YES" : "❌ NO"}`);

  if (rtlResult.hasHorizontalScroll || !rtlResult.sliderRtl?.fits) {
    failed = true;
  }

  await browser.close();

  if (failed) {
    console.error("\n❌ Verification failed!");
    process.exit(1);
  } else {
    console.log("\n🎉 ALL CHECKS PASSED PERFECTLY!");
  }
}

verify().catch((err) => {
  console.error(err);
  process.exit(1);
});
