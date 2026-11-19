import emailjs from "@emailjs/browser";

export interface RawInquiryParams {
  fullName: string;
  companyName?: string;
  country: string;
  email: string;
  phone: string;
  product: string;
  typeParam?: string | null;
  quantity: string;
  destination: string;
  message: string;
}

export interface InquiryTemplateParams extends Record<string, unknown> {
  user_name: string;
  company_name: string;
  country: string;
  user_email: string;
  user_phone: string;
  product: string;
  quantity: string;
  destination: string;
  message: string;
}

export class EmailJSNotConfiguredError extends Error {
  readonly code = "EMAILJS_NOT_CONFIGURED" as const;
  constructor(missingVar: string) {
    super(`EMAILJS_NOT_CONFIGURED: Missing environment variable ${missingVar}`);
    this.name = "EmailJSNotConfiguredError";
  }
}

// Strip control characters (ASCII 0-31 except tab/newline where allowed, and 127)
function cleanSingleLine(val: string | undefined | null, maxLen: number): string {
  if (!val) return "";
  // Strip all control characters (0x00-0x1F, 0x7F)
  const stripped = val.replace(/[\x00-\x1F\x7F]/g, "");
  // Collapse repeated whitespace
  const collapsed = stripped.replace(/\s+/g, " ").trim();
  return collapsed.slice(0, maxLen);
}

function cleanMultiline(val: string | undefined | null, maxLen: number): string {
  if (!val) return "";
  // Strip control characters except newline (\n) and carriage return (\r)
  const stripped = val.replace(/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/g, "");
  // Normalise CRLF to LF or keep linebreaks, trim edges
  const trimmed = stripped.trim();
  return trimmed.slice(0, maxLen);
}

/**
 * Normalise and map form inputs to the exact EmailJS template keys
 */
export function formatTemplateParams(raw: RawInquiryParams): InquiryTemplateParams {
  let englishProduct = cleanSingleLine(raw.product, 80);

  // If inquiry came with a steel type parameter, format as "Steel – <Item Name>"
  if (raw.typeParam && englishProduct.toLowerCase() === "steel") {
    const typeMap: Record<string, string> = {
      "steel-pipes": "Steel Pipes",
      "steel-blocks": "Steel Blocks",
      "steel-rods": "Steel Rods",
    };
    const subName = typeMap[raw.typeParam.toLowerCase()];
    if (subName) {
      englishProduct = `Steel – ${subName}`;
    }
  }

  return {
    user_name: cleanSingleLine(raw.fullName, 80),
    company_name: cleanSingleLine(raw.companyName, 120),
    country: cleanSingleLine(raw.country, 80),
    user_email: cleanSingleLine(raw.email, 120),
    user_phone: cleanSingleLine(raw.phone, 25),
    product: englishProduct,
    quantity: cleanSingleLine(raw.quantity, 60),
    destination: cleanSingleLine(raw.destination, 120),
    message: cleanMultiline(raw.message, 2000),
  };
}

export interface EmailJSErrorPayload extends Error {
  status?: number;
  text?: string;
  envStatus?: {
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: "set" | "MISSING";
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: "set" | "MISSING";
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: "set" | "MISSING";
  };
}

/**
 * Dispatch enquiry parameters directly through EmailJS in the browser
 */
export async function sendInquiry(params: InquiryTemplateParams) {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();

  const envStatus = {
    NEXT_PUBLIC_EMAILJS_SERVICE_ID: serviceId ? ("set" as const) : ("MISSING" as const),
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: templateId ? ("set" as const) : ("MISSING" as const),
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: publicKey ? ("set" as const) : ("MISSING" as const),
  };

  if (!serviceId) {
    if (process.env.NODE_ENV === "development") {
      console.error("[EmailJS send error]", {
        status: 500,
        text: "Missing environment variable NEXT_PUBLIC_EMAILJS_SERVICE_ID",
        ...envStatus,
      });
    }
    const err = new EmailJSNotConfiguredError("NEXT_PUBLIC_EMAILJS_SERVICE_ID") as EmailJSErrorPayload;
    err.status = 500;
    err.text = "Missing environment variable NEXT_PUBLIC_EMAILJS_SERVICE_ID";
    err.envStatus = envStatus;
    throw err;
  }

  if (!templateId) {
    if (process.env.NODE_ENV === "development") {
      console.error("[EmailJS send error]", {
        status: 500,
        text: "Missing environment variable NEXT_PUBLIC_EMAILJS_TEMPLATE_ID",
        ...envStatus,
      });
    }
    const err = new EmailJSNotConfiguredError("NEXT_PUBLIC_EMAILJS_TEMPLATE_ID") as EmailJSErrorPayload;
    err.status = 500;
    err.text = "Missing environment variable NEXT_PUBLIC_EMAILJS_TEMPLATE_ID";
    err.envStatus = envStatus;
    throw err;
  }

  if (!publicKey) {
    if (process.env.NODE_ENV === "development") {
      console.error("[EmailJS send error]", {
        status: 500,
        text: "Missing environment variable NEXT_PUBLIC_EMAILJS_PUBLIC_KEY",
        ...envStatus,
      });
    }
    const err = new EmailJSNotConfiguredError("NEXT_PUBLIC_EMAILJS_PUBLIC_KEY") as EmailJSErrorPayload;
    err.status = 500;
    err.text = "Missing environment variable NEXT_PUBLIC_EMAILJS_PUBLIC_KEY";
    err.envStatus = envStatus;
    throw err;
  }

  try {
    return await emailjs.send(serviceId, templateId, params, { publicKey });
  } catch (rawError: unknown) {
    const status = (rawError as { status?: number })?.status;
    const text = (rawError as { text?: string })?.text || (rawError as Error)?.message || "EmailJS send request failed";

    if (process.env.NODE_ENV === "development") {
      console.error("[EmailJS send error]", {
        status,
        text,
        ...envStatus,
      });
    }

    const error = new Error(text) as EmailJSErrorPayload;
    error.status = status;
    error.text = text;
    error.envStatus = envStatus;
    throw error;
  }
}
