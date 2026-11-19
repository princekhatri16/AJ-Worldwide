"use client";

import React, { useState, useEffect, useId } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  RefreshCw,
  Phone,
  Mail,
} from "lucide-react";
import { contactData, formMessages } from "@/data/contact";
import { siteData } from "@/data/site";
import { formatTemplateParams, sendInquiry } from "@/lib/emailjs";

// Inline WhatsApp SVG glyph
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.031 2C6.516 2 2.02 6.496 2.02 12.012c0 1.944.557 3.765 1.527 5.317L2 22l4.825-1.517a9.96 9.96 0 005.206 1.529h.004c5.514 0 10.01-4.496 10.01-10.012A10.007 10.007 0 0012.031 2zm0 18.257c-1.677 0-3.32-.455-4.757-1.314l-.341-.204-2.868.902.919-2.793-.223-.355a8.232 8.232 0 01-1.261-4.481c0-4.554 3.705-8.259 8.263-8.259a8.21 8.21 0 015.85 2.426 8.218 8.218 0 012.42 5.845c0 4.555-3.705 8.233-8.263 8.233zm4.53-6.19c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.166.248-.642.807-.787.973-.145.166-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.232-.738-.658-1.236-1.472-1.381-1.72-.145-.248-.016-.382.108-.505.112-.111.248-.29.372-.435.124-.145.166-.248.248-.414.083-.166.041-.31-.021-.435-.062-.124-.56-1.348-.767-1.846-.202-.486-.407-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.31-.228.248-.87.85-.87 2.073s.891 2.404 1.015 2.57c.124.166 1.752 2.674 4.244 3.75.593.256 1.056.409 1.417.524.596.19 1.138.163 1.567.099.479-.072 1.468-.6 1.675-1.18.207-.58.207-1.077.145-1.18-.062-.103-.228-.166-.476-.29z" />
    </svg>
  );
}

const FormSchema = z.object({
  fullName: z.string().trim().min(2, "Full Name must be at least 2 characters"),
  companyName: z.string().trim().optional(),
  country: z.string().trim().min(2, "Country is required"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(4, "Please enter a valid WhatsApp / Phone number"),
  product: z.enum(["Textile", "Fruit & Vegetables", "Coconut", "Jaggery", "Spices", "Steel"], {
    message: "Please select a product",
  }),
  quantity: z.string().trim().min(1, "Quantity Required is required"),
  destination: z.string().trim().min(2, "Destination Country/Port is required"),
  message: z.string().trim().min(5, "Message must be at least 5 characters"),
  honeypot: z.string().optional(),
});

type FormInput = z.infer<typeof FormSchema>;

// Map product slug to official product name
const SLUG_TO_NAME_MAP: Record<string, "Textile" | "Fruit & Vegetables" | "Coconut" | "Jaggery" | "Spices" | "Steel"> = {
  textile: "Textile",
  "fruit-and-vegetables": "Fruit & Vegetables",
  coconut: "Coconut",
  jaggery: "Jaggery",
  spices: "Spices",
  steel: "Steel",
};

// Map sub-type slug to clean item name for pre-filling message
const TYPE_SLUG_TO_NAME_MAP: Record<string, string> = {
  "steel-pipes": "Steel Pipes",
  "steel-blocks": "Steel Blocks",
  "steel-rods": "Steel Rods",
};

// Cooldown storage key
const COOLDOWN_STORAGE_KEY = "aj_inquiry_sends";

function getStoredSendTimestamps(): number[] {
  try {
    const raw = localStorage.getItem(COOLDOWN_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed.filter((t): t is number => typeof t === "number" && !isNaN(t));
    }
  } catch {
    // Ignore storage errors
  }
  return [];
}

function recordSuccessfulSend(): void {
  try {
    const existing = getStoredSendTimestamps();
    const now = Date.now();
    const updated = [...existing.filter((t) => now - t < 24 * 60 * 60 * 1000), now];
    localStorage.setItem(COOLDOWN_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // Ignore storage errors
  }
}

function checkCooldown(): { allowed: boolean; reason?: string } {
  try {
    const sends = getStoredSendTimestamps();
    const now = Date.now();

    // 1. One successful send per 60 seconds
    const lastSend = sends[sends.length - 1];
    if (lastSend && now - lastSend < 60 * 1000) {
      return {
        allowed: false,
        reason: formMessages.cooldownMessage,
      };
    }

    // 2. At most 5 per hour
    const lastHourSends = sends.filter((t) => now - t < 60 * 60 * 1000);
    if (lastHourSends.length >= 5) {
      return {
        allowed: false,
        reason: "Hourly inquiry limit reached. Please contact us directly by phone or email.",
      };
    }
  } catch {
    // Allow if localStorage unavailable
  }
  return { allowed: true };
}

export function EnquiryForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");
  const typeParam = searchParams.get("type");
  const captchaInstanceId = useId();

  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [devErrorDetails, setDevErrorDetails] = useState<{
    status?: number | string;
    text?: string;
    envVars?: {
      NEXT_PUBLIC_EMAILJS_SERVICE_ID: string;
      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: string;
      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: string;
    };
  } | null>(null);

  const defaultProduct = productParam && SLUG_TO_NAME_MAP[productParam.toLowerCase()]
    ? SLUG_TO_NAME_MAP[productParam.toLowerCase()]
    : "Textile";

  const defaultMessage = typeParam
    ? TYPE_SLUG_TO_NAME_MAP[typeParam.toLowerCase()] ||
    typeParam
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
    : "";

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      country: "",
      email: "",
      phone: "",
      product: defaultProduct,
      quantity: "",
      destination: "",
      message: defaultMessage,
      honeypot: "",
    },
  });

  // Initialize react-simple-captcha on mount with palette colors
  useEffect(() => {
    try {
      loadCaptchaEnginge(6, "#1F4A3A", "#F7F3EC", "letters");
    } catch {
      // Fallback
    }
  }, [captchaInstanceId]);

  // Update product selection and message pre-fill when query params change
  useEffect(() => {
    if (productParam && SLUG_TO_NAME_MAP[productParam.toLowerCase()]) {
      setValue("product", SLUG_TO_NAME_MAP[productParam.toLowerCase()]);
    }
    if (typeParam) {
      const typeName =
        TYPE_SLUG_TO_NAME_MAP[typeParam.toLowerCase()] ||
        typeParam
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
      setValue("message", typeName);
    }
  }, [productParam, typeParam, setValue]);

  const reloadCaptcha = (clearError = false) => {
    try {
      loadCaptchaEnginge(6, "#1F4A3A", "#F7F3EC", "letters");
      setCaptchaInput("");
      if (clearError) {
        setCaptchaError(null);
      }
    } catch {
      // Ignore
    }
  };

  // Automatically focus and scroll to feedback panel on state change
  useEffect(() => {
    if (submitSuccess || serverError) {
      const timer = setTimeout(() => {
        const el = document.getElementById("form-feedback-panel");
        if (el) {
          el.focus();
          const rect = el.getBoundingClientRect();
          const headerOffset = 96;
          const targetY = window.scrollY + rect.top - headerOffset;
          window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [submitSuccess, serverError]);

  const onFormError = (errs: FieldErrors<FormInput>) => {
    console.log("[EnquiryForm] onFormError:", errs);
    const firstKey = Object.keys(errs)[0];
    if (firstKey) {
      const el = document.getElementById(firstKey);
      if (el) {
        el.focus();
        const rect = el.getBoundingClientRect();
        const headerOffset = 96;
        const targetY = window.scrollY + rect.top - headerOffset;
        window.scrollTo({ top: Math.max(0, targetY), behavior: "smooth" });
      }
    }
  };

  const onSubmit = async (data: FormInput) => {
    console.log("[EnquiryForm] onSubmit called, isSubmitting:", isSubmitting);
    if (isSubmitting) return;

    setCaptchaError(null);
    setServerError(null);
    setDevErrorDetails(null);

    // 1. Honeypot check: if filled, pretend success but send nothing
    if (data.honeypot && data.honeypot.trim() !== "") {
      setSubmitSuccess(true);
      reset();
      reloadCaptcha();
      return;
    }

    // 2. Validate react-simple-captcha (must pass and regenerates after every attempt)
    if (!captchaInput || captchaInput.trim() === "") {
      setCaptchaError("Please enter the security characters shown above");
      reloadCaptcha();
      return;
    }

    const isCaptchaValid = validateCaptcha(captchaInput.trim(), false);
    reloadCaptcha();

    if (!isCaptchaValid) {
      setCaptchaError("Incorrect security code. A new code has been generated.");
      return;
    }

    // 3. Client-side cooldown check
    const cooldownStatus = checkCooldown();
    if (!cooldownStatus.allowed) {
      setServerError(cooldownStatus.reason || formMessages.cooldownMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      // 4. Map form fields to template parameters with English product name and lengths
      const templateParams = formatTemplateParams({
        fullName: data.fullName,
        companyName: data.companyName,
        country: data.country,
        email: data.email,
        phone: data.phone,
        product: data.product,
        typeParam,
        quantity: data.quantity,
        destination: data.destination,
        message: data.message,
      });

      await sendInquiry(templateParams);

      // Record successful send timestamp for cooldown
      recordSuccessfulSend();

      // Fire Google Analytics event if configured
      if (
        typeof window !== "undefined" &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof (window as any).gtag === "function"
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag("event", "generate_lead", {
          event_category: "inquiry",
          event_label: "contact_form",
        });
      }

      setSubmitSuccess(true);
      reset();
      reloadCaptcha();
    } catch (err: unknown) {
      const anyErr = err as {
        status?: number | string;
        text?: string;
        message?: string;
        envStatus?: {
          NEXT_PUBLIC_EMAILJS_SERVICE_ID: "set" | "MISSING";
          NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: "set" | "MISSING";
          NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: "set" | "MISSING";
        };
      };

      const status = anyErr?.status;
      const text = anyErr?.text ?? anyErr?.message ?? "Failed to send inquiry";
      const envVars = anyErr?.envStatus ?? {
        NEXT_PUBLIC_EMAILJS_SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ? "set" : "MISSING",
        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ? "set" : "MISSING",
        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ? "set" : "MISSING",
      };

      if (process.env.NODE_ENV === "development") {
        console.error("[EnquiryForm Submission Error]", {
          status,
          text,
          envVars,
        });
        setDevErrorDetails({
          status: status ?? "unknown",
          text,
          envVars,
        });
      }
      setServerError(formMessages.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const waUrl = `https://wa.me/${siteData.whatsappRaw}?text=${encodeURIComponent(
    siteData.whatsappMessage
  )}`;

  return (
    <div className="bg-white border border-[#E3DDCF] rounded-2xl p-5 sm:p-7 shadow-xs relative">
      {/* Success Notification Panel */}
      {submitSuccess && (
        <div
          id="form-feedback-panel"
          role="status"
          aria-live="polite"
          tabIndex={-1}
          className="mb-6 p-5 sm:p-6 bg-[#1F4A3A] text-[#F6F3EC] rounded-2xl border-l-4 border-[#B4763A] shadow-sm flex items-start gap-4 outline-none"
        >
          <CheckCircle2 className="w-6 h-6 text-[#B4763A] shrink-0 mt-0.5" />
          <div className="space-y-1.5 flex-1">
            <h4 className="font-serif text-lg font-bold text-white tracking-wide [font-variant-caps:all-small-caps]">
              {formMessages.successHeading}
            </h4>
            <p className="text-xs sm:text-sm text-[#F6F3EC]/90 leading-relaxed">
              {formMessages.successBody}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmitSuccess(false);
                  setServerError(null);
                  reloadCaptcha();
                }}
                className="py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A]"
              >
                <span>{formMessages.sendAnotherButton}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Alert Banner with Direct Fallback Links */}
      {serverError && (
        <div
          id="form-feedback-panel"
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
          className="mb-6 p-4 sm:p-5 bg-red-50 border border-red-200 text-[#1E2A24] rounded-2xl space-y-3 outline-none"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-serif text-base font-bold text-red-800">
                Notice
              </h4>
              <p className="text-xs sm:text-sm text-red-700 leading-relaxed">
                {serverError}
              </p>
            </div>
          </div>

          {/* Developer details accordion (development ONLY - omitted in production builds) */}
          {process.env.NODE_ENV === "development" && devErrorDetails && (
            <details className="text-[11px] text-[#5F6B64] font-mono bg-white/80 rounded-lg p-2.5 border border-red-200/80 mt-1">
              <summary className="cursor-pointer font-bold text-red-800 hover:text-red-900 select-none">
                Developer details
              </summary>
              <div className="mt-2 space-y-1 pt-1.5 border-t border-red-100">
                <div>
                  <span className="font-semibold text-[#1E2A24]">Status:</span> {String(devErrorDetails.status)}
                </div>
                <div>
                  <span className="font-semibold text-[#1E2A24]">Text:</span> {devErrorDetails.text || "None"}
                </div>
                <div className="pt-1">
                  <span className="font-semibold text-[#1E2A24]">Environment Variables:</span>
                  <ul className="list-disc list-inside pl-1 text-[10px] text-[#5F6B64] mt-0.5">
                    <li>
                      NEXT_PUBLIC_EMAILJS_SERVICE_ID:{" "}
                      <span
                        className={
                          devErrorDetails.envVars?.NEXT_PUBLIC_EMAILJS_SERVICE_ID === "set"
                            ? "text-emerald-700 font-bold"
                            : "text-red-600 font-bold"
                        }
                      >
                        {devErrorDetails.envVars?.NEXT_PUBLIC_EMAILJS_SERVICE_ID}
                      </span>
                    </li>
                    <li>
                      NEXT_PUBLIC_EMAILJS_TEMPLATE_ID:{" "}
                      <span
                        className={
                          devErrorDetails.envVars?.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID === "set"
                            ? "text-emerald-700 font-bold"
                            : "text-red-600 font-bold"
                        }
                      >
                        {devErrorDetails.envVars?.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}
                      </span>
                    </li>
                    <li>
                      NEXT_PUBLIC_EMAILJS_PUBLIC_KEY:{" "}
                      <span
                        className={
                          devErrorDetails.envVars?.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY === "set"
                            ? "text-emerald-700 font-bold"
                            : "text-red-600 font-bold"
                        }
                      >
                        {devErrorDetails.envVars?.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </details>
          )}

          <div className="pt-2 border-t border-red-200/60 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider">
            <span className="text-[#5F6B64] font-medium normal-case text-xs">Reach us directly:</span>
            <a
              href={siteData.phones[0].tel}
              dir="ltr"
              className="inline-flex items-center gap-1.5 text-[#1F4A3A] hover:text-[#B4763A] transition-colors py-1 notranslate"
              translate="no"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call {siteData.phones[0].display}</span>
            </a>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#25D366] hover:text-[#20ba5a] transition-colors py-1"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
            {siteData.emails.map((emailItem) => (
              <a
                key={emailItem.href}
                href={emailItem.href}
                dir="ltr"
                className="inline-flex items-center gap-1.5 text-[#1F4A3A] hover:text-[#B4763A] transition-colors py-1 notranslate [overflow-wrap:anywhere]"
                translate="no"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{emailItem.display}</span>
              </a>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit, onFormError)}
        className="space-y-4 sm:space-y-5"
        noValidate
        aria-busy={isSubmitting}
      >
        {/* Hidden Honeypot Field for anti-spam */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url">Leave this empty</label>
          <input
            id="website_url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register("honeypot")}
          />
        </div>

        {/* 1. Full Name */}
        <div className="scroll-mt-24">
          <label
            htmlFor="fullName"
            className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            autoComplete="name"
            enterKeyHint="next"
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            placeholder="Your Name"
            {...register("fullName")}
            className={`w-full min-h-[48px] px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-base text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors ${errors.fullName
              ? "border-red-500 focus:ring-red-500"
              : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
              }`}
          />
          {errors.fullName && (
            <p id="fullName-error" aria-live="polite" className="text-xs text-red-500 mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* 2. Company Name */}
        <div className="scroll-mt-24">
          <label
            htmlFor="companyName"
            className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
          >
            Company Name <span className="text-[#5F6B64] font-normal normal-case">(Optional)</span>
          </label>
          <input
            id="companyName"
            type="text"
            autoComplete="organization"
            enterKeyHint="next"
            placeholder="Your Company / Business"
            {...register("companyName")}
            className="w-full min-h-[48px] px-3.5 py-2.5 bg-[#F6F3EC] border border-[#E3DDCF] rounded-xl text-base text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:border-[#B4763A] focus:ring-2 focus:ring-[#B4763A]/20 focus:outline-none transition-colors"
          />
        </div>

        {/* 3. Country */}
        <div className="scroll-mt-24">
          <label
            htmlFor="country"
            className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
          >
            Country <span className="text-red-500">*</span>
          </label>
          <input
            id="country"
            type="text"
            autoComplete="country-name"
            enterKeyHint="next"
            aria-invalid={errors.country ? "true" : "false"}
            aria-describedby={errors.country ? "country-error" : undefined}
            placeholder="Buyer Country"
            {...register("country")}
            className={`w-full min-h-[48px] px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-base text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors ${errors.country
              ? "border-red-500 focus:ring-red-500"
              : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
              }`}
          />
          {errors.country && (
            <p id="country-error" aria-live="polite" className="text-xs text-red-500 mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* 4. Two-Column Row: Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Email */}
          <div className="scroll-mt-24">
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              enterKeyHint="next"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="buyer@example.com"
              {...register("email")}
              className={`w-full min-h-[48px] px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-base text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors notranslate ${errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
                }`}
              translate="no"
            />
            {errors.email && (
              <p id="email-error" aria-live="polite" className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* WhatsApp / Phone */}
          <div className="scroll-mt-24">
            <label
              htmlFor="phone"
              className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
            >
              WhatsApp / Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              dir="ltr"
              autoComplete="tel"
              enterKeyHint="next"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              placeholder="+1 234 567 8900"
              {...register("phone")}
              className={`w-full min-h-[48px] px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-base text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors notranslate ${errors.phone
                ? "border-red-500 focus:ring-red-500"
                : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
                }`}
              translate="no"
            />
            {errors.phone && (
              <p id="phone-error" aria-live="polite" className="text-xs text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* 5. Product Interested In */}
        <div className="scroll-mt-24">
          <label
            htmlFor="product"
            className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
          >
            Product Interested In <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              id="product"
              aria-invalid={errors.product ? "true" : "false"}
              aria-describedby={errors.product ? "product-error" : undefined}
              {...register("product")}
              className={`w-full min-h-[48px] px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-base text-[#1E2A24] focus:outline-none focus:ring-2 transition-colors appearance-none cursor-pointer ${errors.product
                ? "border-red-500 focus:ring-red-500"
                : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
                }`}
            >
              <option value="Textile">Textile</option>
              <option value="Fruit & Vegetables">Fruit & Vegetables</option>
              <option value="Coconut">Coconut</option>
              <option value="Jaggery" className="notranslate" translate="no">Jaggery</option>
              <option value="Spices">Spices</option>
              <option value="Steel">Steel</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3.5 pointer-events-none text-[#5F6B64]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {errors.product && (
            <p id="product-error" aria-live="polite" className="text-xs text-red-500 mt-1">
              {errors.product.message}
            </p>
          )}
        </div>

        {/* 6. Quantity Required */}
        <div className="scroll-mt-24">
          <label
            htmlFor="quantity"
            className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
          >
            Quantity Required <span className="text-red-500">*</span>
          </label>
          <input
            id="quantity"
            type="text"
            enterKeyHint="next"
            aria-invalid={errors.quantity ? "true" : "false"}
            aria-describedby={errors.quantity ? "quantity-error" : undefined}
            placeholder="e.g. 1 x 20ft container / 15 Metric Tons / 5,000 units"
            {...register("quantity")}
            className={`w-full min-h-[48px] px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-base text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors ${errors.quantity
              ? "border-red-500 focus:ring-red-500"
              : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
              }`}
          />
          {errors.quantity && (
            <p id="quantity-error" aria-live="polite" className="text-xs text-red-500 mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        {/* 7. Destination Country/Port */}
        <div className="scroll-mt-24">
          <label
            htmlFor="destination"
            className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
          >
            Destination Country/Port <span className="text-red-500">*</span>
          </label>
          <input
            id="destination"
            type="text"
            enterKeyHint="next"
            aria-invalid={errors.destination ? "true" : "false"}
            aria-describedby={errors.destination ? "destination-error" : undefined}
            placeholder="e.g. Jebel Ali Port, UAE / Rotterdam, Netherlands"
            {...register("destination")}
            className={`w-full min-h-[48px] px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-base text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors ${errors.destination
              ? "border-red-500 focus:ring-red-500"
              : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
              }`}
          />
          {errors.destination && (
            <p id="destination-error" aria-live="polite" className="text-xs text-red-500 mt-1">
              {errors.destination.message}
            </p>
          )}
        </div>

        {/* 8. Message / Requirements */}
        <div className="scroll-mt-24">
          <label
            htmlFor="message"
            className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
          >
            Message / Requirements <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            rows={4}
            aria-invalid={errors.message ? "true" : "false"}
            aria-describedby={errors.message ? "message-error" : undefined}
            placeholder="Please specify grades, packaging requirements, target delivery timelines or any questions..."
            {...register("message")}
            className={`w-full p-3.5 bg-[#F6F3EC] border rounded-xl text-base text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors resize-y ${errors.message
              ? "border-red-500 focus:ring-red-500"
              : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
              }`}
          />
          {errors.message && (
            <p id="message-error" aria-live="polite" className="text-xs text-red-500 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* react-simple-captcha Canvas & Input */}
        <div className="p-3.5 bg-[#F6F3EC] border border-[#E3DDCF] rounded-xl space-y-2.5 scroll-mt-24">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E2A24]">
              Security Verification <span className="text-red-500">*</span>
            </span>
            <button
              type="button"
              onClick={() => reloadCaptcha(true)}
              aria-label="Reload security verification code"
              className="min-h-[44px] min-w-[44px] px-3 py-2 rounded-lg bg-white border border-[#E3DDCF] hover:bg-white/80 active:scale-95 text-xs text-[#B4763A] inline-flex items-center justify-center gap-1.5 cursor-pointer font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="overflow-x-auto py-0.5">
            <LoadCanvasTemplate reloadColor="#B4763A" />
          </div>

          <div>
            <input
              type="text"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              enterKeyHint="done"
              placeholder="Enter the 6 characters from image above"
              aria-label="Enter security verification code"
              aria-invalid={captchaError ? "true" : "false"}
              aria-describedby={captchaError ? "captcha-error" : undefined}
              className="w-full min-h-[48px] px-3.5 py-2.5 bg-white border border-[#E3DDCF] rounded-xl text-base text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:border-[#B4763A] focus:ring-2 focus:ring-[#B4763A]/20 focus:outline-none"
            />
            {captchaError && (
              <p id="captcha-error" aria-live="polite" className="text-xs text-red-500 mt-1">{captchaError}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-[#1F4A3A] hover:bg-[#163829] text-white text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B4763A]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Sending Inquiry...</span>
              </>
            ) : (
              <>
                <span>{contactData.form.submitButton}</span>
                <Send className="w-4 h-4 rtl-flip" />
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-[#5F6B64] text-center pt-1">
          Specifications, quantities and packaging are confirmed in writing before dispatch.
        </p>
      </form>
    </div>
  );
}
