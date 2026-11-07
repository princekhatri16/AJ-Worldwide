"use client";

import React, { useState, useEffect, useId } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { Send, CheckCircle2, AlertCircle, Loader2, RefreshCw } from "lucide-react";
import { contactData } from "@/data/contact";

const FormSchema = z.object({
  fullName: z.string().trim().min(2, "Full Name must be at least 2 characters"),
  companyName: z.string().trim().optional(),
  country: z.string().trim().min(2, "Country is required"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z.string().trim().min(4, "Please enter a valid WhatsApp / Phone number"),
  product: z.enum(["Textile", "Fruit & Vegetables", "Coconut", "Jaggery"], {
    message: "Please select a product",
  }),
  quantity: z.string().trim().min(1, "Quantity Required is required"),
  destination: z.string().trim().min(2, "Destination Country/Port is required"),
  message: z.string().trim().min(5, "Message must be at least 5 characters"),
  honeypot: z.string().optional(),
});

type FormInput = z.infer<typeof FormSchema>;

// Map product slug to official product name
const SLUG_TO_NAME_MAP: Record<string, "Textile" | "Fruit & Vegetables" | "Coconut" | "Jaggery"> = {
  textile: "Textile",
  "fruit-and-vegetables": "Fruit & Vegetables",
  coconut: "Coconut",
  jaggery: "Jaggery",
};

export function EnquiryForm() {
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");
  const captchaInstanceId = useId();

  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const defaultProduct = productParam && SLUG_TO_NAME_MAP[productParam.toLowerCase()]
    ? SLUG_TO_NAME_MAP[productParam.toLowerCase()]
    : "Textile";

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
      message: "",
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

  // Update product selection when query param changes
  useEffect(() => {
    if (productParam && SLUG_TO_NAME_MAP[productParam.toLowerCase()]) {
      setValue("product", SLUG_TO_NAME_MAP[productParam.toLowerCase()]);
    }
  }, [productParam, setValue]);

  const reloadCaptcha = () => {
    try {
      loadCaptchaEnginge(6, "#1F4A3A", "#F7F3EC", "letters");
      setCaptchaInput("");
      setCaptchaError(null);
    } catch {
      // Ignore
    }
  };

  const onSubmit = async (data: FormInput) => {
    setCaptchaError(null);
    setServerError(null);

    // Validate react-simple-captcha
    if (!captchaInput || captchaInput.trim() === "") {
      setCaptchaError("Please enter the captcha characters shown above");
      return;
    }

    const isCaptchaValid = validateCaptcha(captchaInput.trim(), false);
    if (!isCaptchaValid) {
      setCaptchaError("Incorrect captcha. Please try again.");
      reloadCaptcha();
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to submit inquiry");
      }

      setSubmitSuccess(true);
      reset();
      reloadCaptcha();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      setServerError(msg);
      reloadCaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#E3DDCF] rounded-2xl p-5 sm:p-7 shadow-xs relative">
      {/* Success Notification */}
      {submitSuccess && (
        <div className="mb-6 p-4 sm:p-5 bg-[#1F4A3A] text-[#F6F3EC] rounded-xl border-l-4 border-[#B4763A] flex items-start gap-3.5">
          <CheckCircle2 className="w-5 h-5 text-[#B4763A] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-serif text-base font-bold text-[#F6F3EC]">
              Inquiry Sent Successfully
            </h4>
            <p className="text-xs sm:text-sm text-[#F6F3EC]/80 leading-relaxed">
              Thank you for contacting AJ Worldwide. We have received your specifications and our trade desk will respond promptly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitSuccess(false)}
              className="text-xs uppercase font-bold text-[#B4763A] hover:underline mt-1.5 inline-block cursor-pointer"
            >
              Send another inquiry
            </button>
          </div>
        </div>
      )}

      {/* Server Error Alert */}
      {serverError && (
        <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
          <span>{serverError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5" noValidate>
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
        <div>
          <label
            htmlFor="fullName"
            className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="fullName"
            type="text"
            aria-invalid={errors.fullName ? "true" : "false"}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            placeholder="Your Name"
            {...register("fullName")}
            className={`w-full px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-sm text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors ${
              errors.fullName
                ? "border-red-500 focus:ring-red-500"
                : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
            }`}
          />
          {errors.fullName && (
            <p id="fullName-error" className="text-xs text-red-500 mt-1">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* 2. Company Name */}
        <div>
          <label
            htmlFor="companyName"
            className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
          >
            Company Name
          </label>
          <input
            id="companyName"
            type="text"
            placeholder="Your Company / Firm"
            {...register("companyName")}
            className="w-full px-3.5 py-2.5 bg-[#F6F3EC] border border-[#E3DDCF] rounded-xl text-sm text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:border-[#B4763A] focus:ring-2 focus:ring-[#B4763A]/20 focus:outline-none transition-colors"
          />
        </div>

        {/* 3. Country & 4. Email Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="country"
              className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
            >
              Country <span className="text-red-500">*</span>
            </label>
            <input
              id="country"
              type="text"
              aria-invalid={errors.country ? "true" : "false"}
              aria-describedby={errors.country ? "country-error" : undefined}
              placeholder="e.g. United Arab Emirates"
              {...register("country")}
              className={`w-full px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-sm text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors ${
                errors.country
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
              }`}
            />
            {errors.country && (
              <p id="country-error" className="text-xs text-red-500 mt-1">
                {errors.country.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
            >
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="buyer@example.com"
              {...register("email")}
              className={`w-full px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-sm text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
              }`}
            />
            {errors.email && (
              <p id="email-error" className="text-xs text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* 5. WhatsApp / Phone & 6. Product Interested In */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="phone"
              className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
            >
              WhatsApp / Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              aria-invalid={errors.phone ? "true" : "false"}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              placeholder="+1 555 123 4567"
              {...register("phone")}
              className={`w-full px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-sm text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors ${
                errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
              }`}
            />
            {errors.phone && (
              <p id="phone-error" className="text-xs text-red-500 mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="product"
              className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
            >
              Product Interested In <span className="text-red-500">*</span>
            </label>
            <select
              id="product"
              aria-invalid={errors.product ? "true" : "false"}
              aria-describedby={errors.product ? "product-error" : undefined}
              {...register("product")}
              className={`w-full px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-sm text-[#1E2A24] focus:outline-none focus:ring-2 transition-colors cursor-pointer ${
                errors.product
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
              }`}
            >
              <option value="Textile">Textile</option>
              <option value="Fruit & Vegetables">Fruit &amp; Vegetables</option>
              <option value="Coconut">Coconut</option>
              <option value="Jaggery">Jaggery</option>
            </select>
            {errors.product && (
              <p id="product-error" className="text-xs text-red-500 mt-1">
                {errors.product.message}
              </p>
            )}
          </div>
        </div>

        {/* 7. Quantity Required & 8. Destination Country/Port */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="quantity"
              className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
            >
              Quantity Required <span className="text-red-500">*</span>
            </label>
            <input
              id="quantity"
              type="text"
              aria-invalid={errors.quantity ? "true" : "false"}
              aria-describedby={errors.quantity ? "quantity-error" : undefined}
              placeholder="e.g. 1 x 40ft Container or 20 Metric Tons"
              {...register("quantity")}
              className={`w-full px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-sm text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors ${
                errors.quantity
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
              }`}
            />
            {errors.quantity && (
              <p id="quantity-error" className="text-xs text-red-500 mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="destination"
              className="block text-xs font-bold uppercase tracking-wider text-[#1E2A24] mb-1.5"
            >
              Destination Country/Port <span className="text-red-500">*</span>
            </label>
            <input
              id="destination"
              type="text"
              aria-invalid={errors.destination ? "true" : "false"}
              aria-describedby={errors.destination ? "destination-error" : undefined}
              placeholder="e.g. Jebel Ali, Dubai or Rotterdam"
              {...register("destination")}
              className={`w-full px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-sm text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors ${
                errors.destination
                  ? "border-red-500 focus:ring-red-500"
                  : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
              }`}
            />
            {errors.destination && (
              <p id="destination-error" className="text-xs text-red-500 mt-1">
                {errors.destination.message}
              </p>
            )}
          </div>
        </div>

        {/* 9. Message / Requirements */}
        <div>
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
            placeholder="Please detail your grade requirements, packaging preferences, and delivery timeline..."
            {...register("message")}
            className={`w-full px-3.5 py-2.5 bg-[#F6F3EC] border rounded-xl text-sm text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:outline-none focus:ring-2 transition-colors resize-y ${
              errors.message
                ? "border-red-500 focus:ring-red-500"
                : "border-[#E3DDCF] focus:border-[#B4763A] focus:ring-[#B4763A]/20"
            }`}
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-red-500 mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* react-simple-captcha Canvas & Input */}
        <div className="p-3.5 bg-[#F6F3EC] border border-[#E3DDCF] rounded-xl space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E2A24]">
              Security Verification <span className="text-red-500">*</span>
            </span>
            <button
              type="button"
              onClick={reloadCaptcha}
              aria-label="Reload captcha challenge"
              className="text-xs text-[#B4763A] hover:underline inline-flex items-center gap-1 cursor-pointer font-medium"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Refresh Captcha</span>
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
              placeholder="Enter the 6 characters from image above"
              aria-label="Enter captcha text"
              className="w-full px-3.5 py-2 bg-white border border-[#E3DDCF] rounded-xl text-sm text-[#1E2A24] placeholder:text-[#5F6B64]/60 focus:border-[#B4763A] focus:ring-2 focus:ring-[#B4763A]/20 focus:outline-none"
            />
            {captchaError && (
              <p className="text-xs text-red-500 mt-1">{captchaError}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 px-6 rounded-full bg-[#1F4A3A] hover:bg-[#163829] text-white text-xs font-bold uppercase tracking-widest transition-all duration-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed [@media(hover:hover)]:hover:-translate-y-0.5 active:scale-95"
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
