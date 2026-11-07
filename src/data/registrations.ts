export interface RegistrationItem {
  id: string;
  name: string;
  authority?: string;
  description?: string;
  number?: string;
  document?: string;
  image?: string;
}

export interface RegistrationsData {
  title: string;
  intro: string;
  items: RegistrationItem[];
}

export const registrationsData: RegistrationsData = {
  title: "Our Registrations & Compliance",
  intro: "Registrations (as listed)",
  items: [
    // DRAFT: confirm wording with client
    {
      id: "gst",
      name: "GST",
      authority: "Goods and Services Tax, Government of India",
      description:
        "Registration under India's Goods and Services Tax system. It supports properly documented invoicing and tax-compliant business transactions.",
    },
    // DRAFT: confirm wording with client
    {
      id: "aadhar-udyam",
      name: "Aadhar Udyam",
      authority: "Ministry of Micro, Small & Medium Enterprises",
      description:
        "Government of India enterprise registration issued by the Ministry of MSME. It recognises the business as a registered micro, small or medium enterprise.",
    },
    // DRAFT: confirm wording with client
    {
      id: "iec",
      name: "IEC (Import Export Code)",
      authority: "Directorate General of Foreign Trade (DGFT)",
      description:
        "A code issued by DGFT that a business needs in order to import or export goods from India. It allows the company to carry out international trade.",
    },
    // TODO: confirm FCI meaning with client
    // DRAFT: confirm wording with client
    {
      id: "fci",
      name: "FCI",
      authority: "Food Corporation of India",
      description:
        "Registration listed with the Food Corporation of India, the Government of India body for foodgrain procurement, storage and distribution.",
    },
  ],
};
