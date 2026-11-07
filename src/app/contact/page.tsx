import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Phone, MapPin, Clock } from "lucide-react";
import { contactData } from "@/data/contact";
import { faqData } from "@/data/faq";
import { siteData } from "@/data/site";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ContactFaq } from "@/components/contact/ContactFaq";
import { InnerPageHeader } from "@/components/ui/InnerPageHeader";
import { Card } from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "Contact Us | AJ Worldwide — Export Desk",
  description:
    "Direct contact details and trade inquiry form for AJ Worldwide in Kumbhari, Buldhana, Maharashtra. Phone & WhatsApp: +91 96653 67718. Open 7 days a week.",
};

// Inline WhatsApp SVG glyph
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.031 2C6.516 2 2.02 6.496 2.02 12.012c0 1.944.557 3.765 1.527 5.317L2 22l4.825-1.517a9.96 9.96 0 005.206 1.529h.004c5.514 0 10.01-4.496 10.01-10.012A10.007 10.007 0 0012.031 2zm0 18.257c-1.677 0-3.32-.455-4.757-1.314l-.341-.204-2.868.902.919-2.793-.223-.355a8.232 8.232 0 01-1.261-4.481c0-4.554 3.705-8.259 8.263-8.259a8.21 8.21 0 015.85 2.426 8.218 8.218 0 012.42 5.845c0 4.555-3.705 8.233-8.263 8.233zm4.53-6.19c-.248-.124-1.468-.724-1.696-.807-.228-.083-.394-.124-.56.124-.166.248-.642.807-.787.973-.145.166-.29.186-.538.062-.248-.124-1.047-.386-1.995-1.232-.738-.658-1.236-1.472-1.381-1.72-.145-.248-.016-.382.108-.505.112-.111.248-.29.372-.435.124-.145.166-.248.248-.414.083-.166.041-.31-.021-.435-.062-.124-.56-1.348-.767-1.846-.202-.486-.407-.42-.56-.428l-.477-.008c-.166 0-.435.062-.663.31-.228.248-.87.85-.87 2.073s.891 2.404 1.015 2.57c.124.166 1.752 2.674 4.244 3.75.593.256 1.056.409 1.417.524.596.19 1.138.163 1.567.099.479-.072 1.468-.6 1.675-1.18.207-.58.207-1.077.145-1.18-.062-.103-.228-.166-.476-.29z" />
    </svg>
  );
}

export default function ContactPage() {
  const encodedWaMsg = encodeURIComponent(siteData.whatsappMessage);
  const waUrl = `https://wa.me/${siteData.whatsappRaw}?text=${encodedWaMsg}`;
  const phoneUrl = `tel:+${siteData.phoneRaw}`;

  // Structured Data (FAQPage JSON-LD)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className="bg-white text-[#1E2A24] min-h-screen">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 1. Deep-Green Inner-Page Banner */}
      <InnerPageHeader
        title={contactData.title}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />

      {/* 2. Main Section: Contact Info & Form on surface-base (#FFFFFF) */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#E3DDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Direct Contact Info (Warm cards on white section) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <span className="pill-label">Trade Desk</span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
                  Direct Contact
                </h2>
                <div className="section-rule" />
                <p className="text-xs sm:text-sm text-[#5F6B64] pt-1 leading-relaxed">
                  Get in touch with our commercial export desk via phone, WhatsApp, or through the detailed inquiry form.
                </p>
              </div>

              {/* Contact Cards Stack */}
              <div className="space-y-3">
                {/* Telephone */}
                <Card surface="warm" index={0} href={phoneUrl}>
                  <div className="flex items-start gap-3.5">
                    <div className="site-card-icon w-10 h-10 rounded-xl bg-white border border-[#E3DDCF] text-[#B4763A] flex items-center justify-center shrink-0 transition-all duration-300">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[#5F6B64] font-bold">
                        Phone / Telephone
                      </div>
                      <div className="site-card-title font-mono text-sm sm:text-base font-bold text-[#1E2A24] transition-colors notranslate" translate="no">
                        {contactData.phone}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* WhatsApp */}
                <Card surface="warm" index={1} href={waUrl}>
                  <div className="flex items-start gap-3.5">
                    <div className="site-card-icon w-10 h-10 rounded-xl bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] flex items-center justify-center shrink-0 transition-all duration-300">
                      <WhatsAppIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[#5F6B64] font-bold">
                        WhatsApp Quick Chat
                      </div>
                      <div className="site-card-title font-mono text-sm sm:text-base font-bold text-[#1E2A24] transition-colors notranslate" translate="no">
                        {contactData.whatsapp}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Address */}
                <Card surface="warm" index={2} disableHover>
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E3DDCF] text-[#B4763A] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[#5F6B64] font-bold">
                        Registered Address
                      </div>
                      <p className="text-xs sm:text-sm text-[#1E2A24] leading-relaxed mt-0.5">
                        {contactData.address}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Operating Schedule */}
                <Card surface="warm" index={3} disableHover>
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#E3DDCF] text-[#B4763A] flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] uppercase tracking-wider text-[#5F6B64] font-bold">
                        Operating Schedule
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-[#B4763A] mt-0.5">
                        {contactData.openDays}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Right Column: Enquiry Form */}
            <div id="enquiry-form" className="lg:col-span-7 scroll-mt-28">
              <div className="mb-4 space-y-2">
                <span className="pill-label">Quotation Request</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
                  {contactData.form.heading}
                </h3>
              </div>

              <Suspense
                fallback={
                  <div className="bg-[#F6F3EC] border border-[#E3DDCF] rounded-2xl p-8 text-center text-xs text-[#5F6B64]">
                    Loading inquiry form...
                  </div>
                }
              >
                <EnquiryForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions Section on surface-warm (#F6F3EC) */}
      <section className="py-12 md:py-16 bg-[#F6F3EC] border-b border-[#E3DDCF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3">
            <span className="pill-label">FAQ</span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide [font-variant-caps:all-small-caps] text-[#1F4A3A]">
              Frequently Asked Questions
            </h2>
            <div className="section-rule mx-auto" />
          </div>

          <ContactFaq items={faqData.items} />
        </div>
      </section>
    </div>
  );
}
