export interface NavigationItem {
  label: string;
  href: string;
}

export interface SiteData {
  name: string;
  tagline: string;
  logo: string;
  established: string;
  businessType: string;
  address: string;
  location: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  whatsappMessage: string;
  openDays: string;
  navigation: NavigationItem[];
}

export const siteData: SiteData = {
  name: "AJ Worldwide",
  tagline: "Trusted Worldwide",
  logo: "/logo-mark.png",
  established: "2025",
  businessType: "Import & Export",
  location: "Kumbhari, Buldhana, Maharashtra, India",
  address: "Plot No. 1 & 2, Gat No. 179, Kumbhari Road, Village Kumbhari, Tehsil Deulgaon Raja, District Buldhana, Maharashtra, India",
  phone: "+91 96653 67718",
  phoneRaw: "919665367718",
  whatsapp: "+91 96653 67718",
  whatsappRaw: "919665367718",
  whatsappMessage: "Hello AJ Worldwide, I would like to enquire about your products. Please share the details and a quotation. Thank you.",
  openDays: "7 days a week, all year round",
  navigation: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "Why Choose Us", href: "/why-choose-us" },
    { label: "Quality & Export", href: "/quality-export-process" },
    { label: "Registrations", href: "/registrations" },
    { label: "Contact Us", href: "/contact" },
  ],
};
