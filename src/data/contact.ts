export interface ContactData {
  title: string;
  phone: string;
  phoneRaw: string;
  email: {
    display: string;
    href: string;
  };
  whatsapp: string;
  whatsappRaw: string;
  whatsappMessage: string;
  address: string;
  openDays: string;
  form: {
    heading: string;
    submitButton: string;
    productOptions: {
      label: string;
      value: string;
    }[];
  };
}

export interface FormMessages {
  successHeading: string;
  successBody: string;
  sendAnotherButton: string;
  errorMessage: string;
  cooldownMessage: string;
}

export const formMessages: FormMessages = {
  successHeading: "Inquiry Sent",
  successBody: "Thank you. We will get back to you shortly.",
  sendAnotherButton: "Send another inquiry",
  errorMessage: "We could not send your inquiry. Please try again, or contact us directly.",
  cooldownMessage: "Please wait before sending another inquiry.",
};

export const contactData: ContactData = {
  title: "Contact Us",
  phone: "+91 80874 36212",
  phoneRaw: "918087436212",
  email: {
    display: "sales@ajworldwide.co.in",
    href: "mailto:sales@ajworldwide.co.in",
  },
  whatsapp: "+91 80874 36212",
  whatsappRaw: "918087436212",
  whatsappMessage: "Hello AJ Worldwide, I would like to enquire about your products. Please share the details and a quotation. Thank you.",
  address: "Plot No. 1 & 2, Gat No. 179, Kumbhari Road, Village Kumbhari, Tehsil Deulgaon Raja, District Buldhana, Maharashtra, India",
  openDays: "7 days a week, all year round",
  form: {
    heading: "Send an Inquiry",
    submitButton: "Send Inquiry",
    productOptions: [
      { label: "Textile", value: "textile" },
      { label: "Fruit & Vegetables", value: "fruit-and-vegetables" },
      { label: "Coconut", value: "coconut" },
      { label: "Jaggery", value: "jaggery" },
      { label: "Spices", value: "spices" },
      { label: "Steel", value: "steel" },
    ],
  },
};

export { faqData, type FaqItem } from "./faq";

