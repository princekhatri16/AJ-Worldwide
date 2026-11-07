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
  phone: "+91 96653 67718",
  phoneRaw: "919665367718",
  whatsapp: "+91 96653 67718",
  whatsappRaw: "919665367718",
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

## 7. Email Inquiry Setup & Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

### Environment Variables Reference
| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical website domain (e.g., `https://ajworldwide.com`). |
| `NEXT_PUBLIC_GA_ID` | Optional Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`). Rendered only when set. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional contact email. Rendered only when set (no email was provided by the client). |
| `INQUIRY_TO_EMAIL` | Recipient email for trade inquiries submitted on `/contact`. |
| `INQUIRY_FROM_EMAIL` | Sender email address for Nodemailer. |
| `SMTP_HOST` | SMTP server host (e.g., `smtp.gmail.com`). |
| `SMTP_PORT` | SMTP port (e.g., `587` or `465`). |
| `SMTP_USER` | SMTP username. |
| `SMTP_PASS` | SMTP application password. |

*In development mode without SMTP credentials, submissions are logged cleanly to the terminal console without throwing errors.*

---

## 8. Anti-Spam Security

- **react-simple-captcha:** Generates a real-time canvas captcha challenge that must be successfully solved before submission. Automatically regenerates on submit attempt.
- **Hidden Honeypot Field:** Automated spambots filling hidden fields are rejected immediately.
- **Server-Side Rate Limiting:** Enforces a maximum of 5 requests per 10-minute window per IP.

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
