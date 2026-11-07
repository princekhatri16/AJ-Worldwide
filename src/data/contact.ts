export interface ContactData {
  title: string;
  phone: string;
  phoneRaw: string;
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

export const contactData: ContactData = {
  title: "Contact Us",
  phone: "+91 96653 67718",
  phoneRaw: "919665367718",
  whatsapp: "+91 96653 67718",
  whatsappRaw: "919665367718",
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
    ],
  },
};

export { faqData, type FaqItem } from "./faq";

