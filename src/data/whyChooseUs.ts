export interface ReasonItem {
  id: string;
  numeral: string;
  title: string;
  description: string;
  icon: "ShieldCheck" | "Layers" | "Globe2" | "Clock" | "Phone" | string;
}

export interface FactItem {
  numericValue: number;
  suffix?: string;
  label: string;
}

export interface WhyChooseUsData {
  title: string;
  reasons: ReasonItem[];
  facts: FactItem[];
}

export const whyChooseUsData: WhyChooseUsData = {
  title: "Why Choose Us",
  reasons: [
    {
      id: "trust-first",
      numeral: "01",
      title: "Trust First",
      description: "Our name is our commitment: we aim to deal openly and keep our word.",
      icon: "ShieldCheck",
    },
    {
      id: "four-product-lines",
      numeral: "02",
      title: "Four Product Lines",
      description: "Textile, fruit and vegetables, coconut and jaggery from one company.",
      icon: "Layers",
    },
    {
      id: "import-export-experience",
      numeral: "03",
      title: "Import & Export Experience",
      description: "Registered for import and export (IEC and GST, as listed by the client).",
      icon: "Globe2",
    },
    {
      id: "always-open",
      numeral: "04",
      title: "Always Open",
      description: "Open 7 days a week, all year round, so enquiries are never left waiting.",
      icon: "Clock",
    },
    {
      id: "direct-contact",
      numeral: "05",
      title: "Direct Contact",
      description: "A single phone and WhatsApp number for quick answers.",
      icon: "Phone",
    },
  ],
  facts: [
    {
      numericValue: 2025,
      label: "Established",
    },
    {
      numericValue: 4,
      label: "Product lines",
    },
    {
      numericValue: 7,
      suffix: " Days",
      label: "A week, all year round",
    },
    {
      numericValue: 1,
      label: "Phone & WhatsApp number",
    },
  ],
};

