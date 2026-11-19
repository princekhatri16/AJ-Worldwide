# AJ Worldwide — Multi-Page Export & Trading Corporate Website

A production-ready, multi-page international import/export website for **AJ Worldwide** (based in Kumbhari, Buldhana District, Maharashtra, India). Built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **lucide-react**, **react-simple-captcha**, and **framer-motion**.

---

## 1. Quickstart

### Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm

### Installation & Local Development
```bash
# Navigate to project directory
cd "aj-worldwide"

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Linting
```bash
# Type-check and build production assets
npm run build

# Start production server
npm run start

# Run ESLint validation
npm run lint
```

---

## 2. Content Architecture (`/src/data/*.ts`)

All editable business copy lives strictly in `/src/data/*.ts` files (one per page). Components render data dynamically without hard-coded marketing copy.

| Data File | Route & Purpose |
| :--- | :--- |
| `src/data/site.ts` | Global corporate details: company name, tagline, address, phone/WhatsApp number, WhatsApp formal message, 7-page navigation structure. |
| `src/data/home.ts` | Hero carousel configuration, structured `heroImages: []` array, highlights strip, 4-category preview, and closing CTA band. |
| `src/data/about.ts` | Who We Are editorial narrative, Mission & Vision statements, and company corporate facts. |
| `src/data/products.ts` | Four category cards (Textile, Fruit & Vegetables, Coconut, Jaggery) with descriptions, icon names, and inquiry links. |
| `src/data/why-choose-us.ts` | Five core value cards (Trust First, Four Product Lines, Import & Export Experience, Always Open, Direct Contact). |
| `src/data/quality-export-process.ts` | Four Quality & Packing checklist items and the numbered 6-step order workflow timeline. |
| `src/data/registrations.ts` | Dedicated page for the four listed registrations (GST, Aadhar Udyam, IEC, FCI) with optional fields (`number?`, `description?`, `document?`). |
| `src/data/contact.ts` | Contact page headings, direct communication channels, and inquiry product options. |
| `src/data/faq.ts` | Four buyer FAQ questions and verified answers. |
| `src/data/languages.ts` | 100+ global languages with native scripts, English names, and RTL direction metadata. |

---

## 3. How to Edit Existing Website Copy

To edit any text on the website:
1. Locate the corresponding TypeScript file in `src/data/` using the table above.
2. Edit the string value.
3. Save the file.
4. Fast Refresh will update the browser immediately during `npm run dev`.

### Example: Updating Phone or WhatsApp Number
Open `src/data/site.ts` and `src/data/contact.ts`:
```ts
export const siteData = {
  phone: "+91 80874 36212",
  phoneRaw: "918087436212",
  whatsapp: "+91 80874 36212",
  whatsappRaw: "918087436212",
  ...
};
```

---

## 4. How to Add Hero Carousel Images

In `src/data/home.ts`, the `hero.heroImages` array is intentionally structured for client image placement:
```ts
export const homeData = {
  hero: {
    ...
    // Drop image files into /public/images/hero/ and list them here:
    heroImages: [
      "/images/hero/slide-1.webp",
      "/images/hero/slide-2.webp",
      "/images/hero/slide-3.webp"
    ],
  },
};
```
*Note: When `heroImages` is empty (`[]`), the website renders designed neutral editorial placeholder slides showcasing the 4 commodity categories.*

---

## 5. How to Update the Logo

1. Place the official brand logo at `/public/logo.png` (or `/public/logo.svg`).
2. Place a square logo icon at `/public/logo-mark.png` (1:1 aspect ratio, e.g. 512×512 px).
3. The Header, Footer, Favicon, Open Graph card, and Initial Splash loader reference these assets automatically.

---

## 6. Theme Tokens & Palette Modification

The entire design system is controlled in **one place only** inside `src/app/globals.css`:

```css
:root {
  --primary: #0B192C;        /* Deep ink navy */
  --primary-dark: #060E18;   /* Midnight navy */
  --accent: #C28448;         /* Warm sand / terracotta earth */
  --accent-hover: #D49354;   /* Light sand hover */
  --accent-muted: #F3EAE1;   /* Pale sand tint */
  --ink: #111827;            /* Charcoal body ink */
  --muted: #525F72;          /* Grounded slate muted text */
  --surface: #FFFFFF;        /* Card surface */
  --surface-warm: #F7F5F0;   /* Warm section canvas */
  --surface-dark: #07101C;   /* Contrast dark canvas */
  --border: rgba(11, 25, 44, 0.12); /* Hairline border */
  --bg: #FAF8F5;             /* Natural paper base background */
}
```

Typography pairings in `src/app/layout.tsx`:
- **Headings:** `Fraunces` (Google Fonts via `next/font/google`)
- **Body:** `Plus Jakarta Sans` (Google Fonts via `next/font/google`)

---

## 7. EmailJS Setup & Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### Environment Variables Reference
| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical website domain (e.g., `https://ajworldwide.com` or local dev `http://localhost:3000`). |
| `NEXT_PUBLIC_GA_ID` | Optional Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`). Rendered only when set. |
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | Your EmailJS Service ID (found in EmailJS Dashboard under **Email Services**). |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | Your EmailJS Template ID (found in EmailJS Dashboard under **Email Templates → [Your Template] → Settings** tab, typically `template_xxxxxxx`). |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | Your EmailJS Public Key (found in EmailJS Dashboard under **Account → General / API Keys**). |

### EmailJS Setup Guide
1. **Locate Credentials in EmailJS Dashboard:**
   - **Service ID:** Navigate to **Email Services** and copy your configured service ID.
   - **Template ID:** Navigate to **Email Templates**, open your enquiry template, click the **Settings** tab, and copy the **Template ID** (typically `template_xxxxxxx`, not the URL route segment).
   - **Public Key:** Go to **Account** (bottom-left) → **API Keys** / **General**, and copy the **Public Key**.
2. **Configure Allowed Origins (Security):**
   - In EmailJS Dashboard, navigate to **Account → Security**.
   - Under **Allowed Domains / Origins**, add your production domain (e.g. `https://ajworldwide.co.in`), any preview domains, and `http://localhost:3000` for local development testing.
3. **Deploying to Vercel / Hosting:**
   - Go to **Vercel Project Dashboard → Settings → Environment Variables**.
   - Add `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`, and `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`.
   - Trigger a redeploy for the environment variables to take effect in the production build.
4. **Plan Limit & Testing:**
   - The EmailJS Free Tier includes **200 free emails per month**.
   - Use the **Test It** button inside the EmailJS Template Editor to verify template variable bindings before running end-to-end tests.

---

## 8. Anti-Spam Security & Submission Protections

- **react-simple-captcha:** Generates a real-time canvas security challenge that must be solved before submission. Automatically regenerates after every attempt (pass or fail).
- **Hidden Honeypot Field:** Automated spambots filling hidden fields are intercepted and ignored silently without sending an email.
- **Client-Side Cooldown Protection:** Limits successful form submissions to at most 1 per 60 seconds and 5 per hour (persisted via `localStorage`) to protect the monthly free tier email quota.
- **Direct Lead Fallback:** If EmailJS is unconfigured, network is offline, or quota is reached, user-entered data is preserved and direct call, WhatsApp, and email links are surfaced immediately.

---

## 9. Multilingual Translation (100+ Languages) & RTL

- The language switcher panel translates all website pages into 100+ languages via the Google Translate engine.
- Supports **RTL** (Arabic, Hebrew, Urdu, Persian, etc.) by automatically flipping `dir="rtl"`, alignments, and directional icons.
- Proper nouns ("AJ Worldwide", telephone numbers, addresses) carry `translate="no"` / `notranslate`.
- Seamless DOM patch installed in `src/context/LanguageContext.tsx` to prevent React 19 reconciliation errors from third-party DOM modifications.

---

## 10. Registrations & Compliance Separation

As strictly mandated by the project brief:
- **Registrations appears ONLY on `/registrations`**.
- It does **NOT** appear on Home, About Us, or the Footer.
- Shows no unverified certificate numbers, issue dates, or badges.

---

## 11. SEO and Search Console Setup

### Environment Variables & Domain Configuration
Before deploying to production (e.g. Vercel, Netlify, or custom VPS), set the following environment variables in your hosting provider's project dashboard:
- `NEXT_PUBLIC_SITE_URL`: The live canonical domain without a trailing slash (e.g., `https://www.yourdomain.com` or `https://yourdomain.com`). All canonical tags, sitemaps, Open Graph cards, Twitter cards, and JSON-LD structured data use this value automatically.
- `NEXT_PUBLIC_GA_ID` (optional): Your Google Analytics 4 Measurement ID (e.g., `G-XXXXXXXXXX`). Loaded asynchronously via `next/script` only when defined.
- `NEXT_PUBLIC_GSC_VERIFICATION` (optional): Fallback Google Search Console verification meta tag value.

### Canonical URL & Trailing Slash Policy
- **Trailing Slash:** Configured to `false` in `next.config.ts`. URLs do not have trailing slashes (e.g., `/products/steel`, not `/products/steel/`).
- **Domain Canonicalization:** Choose either `www` or non-`www` at your DNS/hosting provider level and configure an automatic 301 redirect to your chosen canonical host.
- **Protocol:** Always enforce HTTPS with automatic HTTP to HTTPS redirect in your hosting settings.

### Google Site-Verification File
> [!IMPORTANT]
> **Do not delete `/public/google*.html`.** Google re-checks it periodically. Removing it un-verifies the site in Search Console.
- The verification file is located at `public/googlebaaf52ae2060b2ba.html` (53 bytes).
- It is served unchanged at the root: `https://<your-domain>/googlebaaf52ae2060b2ba.html` with a `200 OK` status and `text/html` header.
- `robots.txt` explicitly allows it, and no middleware or redirect shadows or alters it.

### Sitemaps & Robots Configuration
- **Sitemap URL:** `https://<your-domain>/sitemap.xml`
  Dynamically maps all 7 main static pages, all 6 product categories, and all 3 steel item pages. Automatically excludes query strings, verification files, and 404 pages.
- **Robots URL:** `https://<your-domain>/robots.txt`
  - In production (`VERCEL_ENV=production` or `NODE_ENV=production`), allows all crawlers (`Allow: /`) and declares the sitemap location.
  - In preview and development builds (`VERCEL_ENV=preview`), automatically sets `Disallow: /` and `noindex` to prevent staging indexing.

### How to Edit SEO Titles & Descriptions
SEO titles and meta descriptions are managed directly in each data file under the `seo` property:
- `src/data/home.ts` (`homeData.seo`): Home page title (50–60 characters) and description (120–160 characters).
- `src/data/about.ts` (`aboutData.seo`): About page title and description.
- `src/data/products.ts` (`productsData.seo`): Products catalog page title and description.
- `src/data/productSpecs.ts` (`productSpecsData[slug].seo`): Titles and descriptions for each category (`textile`, `fruit-and-vegetables`, `coconut`, `jaggery`, `spices`, `steel`) and individual steel items (`steel-pipes`, `steel-blocks`, `steel-rods`).
- `src/data/whyChooseUs.ts` (`whyChooseUsData.seo`): Why Choose Us page title and description.
- `src/data/quality-export-process.ts` (`qualityExportProcessData.seo`): Quality & Export Process page title and description.
- `src/data/registrations.ts` (`registrationsData.seo`): Registrations page title and description.
- `src/data/contact.ts` (`contactData.seo`): Contact Us page title and description.

### Steps for the Client in Google Search Console
1. **Open Google Search Console:**
   Navigate to [https://search.google.com/search-console](https://search.google.com/search-console) and sign in with the Google Account that manages the business.
2. **Add Property:**
   Click **Add Property** in the property selector. Choose **URL prefix** and enter the full production URL (e.g., `https://www.yourdomain.com`). Click **Continue**.
3. **Verify Ownership (HTML File):**
   Under verification methods, select **HTML file**. Because `googlebaaf52ae2060b2ba.html` is already deployed to the root of the site, click **Verify**. Search Console will confirm verification immediately.
4. **Submit Sitemap:**
   In the left sidebar, click **Sitemaps** under Indexing. In the "Add a new sitemap" input, enter `sitemap.xml` and click **Submit**. Google will fetch and process all 16 canonical URLs.
5. **Inspect & Request Indexing:**
   Use the **URL Inspection** bar at the top to test `https://<your-domain>/` and click **Request Indexing**. Repeat for key category pages if desired.

