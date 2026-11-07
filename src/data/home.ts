export interface HeroImage {
  src: string;
  alt: string;
}

export interface HomeData {
  hero: {
    heading: string;
    tagline: string;
    text: string;
    buttons: {
      viewProducts: { label: string; href: string };
      sendInquiry: { label: string; href: string };
    };
    heroImages: HeroImage[];
  };
  highlights: string[];
  aboutImages: HeroImage[];
  categoriesPreview: {
    eyebrow: string;
    heading: string;
    items: {
      name: string;
      slug: string;
      href: string;
      description: string;
    }[];
  };
  ctaBand: {
    heading: string;
    buttonLabel: string;
    buttonHref: string;
    phoneLabel: string;
    phoneHref: string;
  };
}

export const homeData: HomeData = {
  hero: {
    heading: "AJ Worldwide",
    tagline: "Trusted Worldwide",
    text: "From Maharashtra to the world: AJ Worldwide brings textiles, fresh fruit and vegetables, coconut and jaggery to buyers you can trust.",
    buttons: {
      viewProducts: {
        label: "View Our Products",
        href: "/products",
      },
      sendInquiry: {
        label: "Send an Inquiry",
        href: "/contact",
      },
    },
    // Array of image paths. Empty by default; 3 neutral designed placeholder slides render when empty.
    heroImages: [],
  },
  highlights: [
    "Textile",
    "Fruit & Vegetables",
    "Coconut",
    "Jaggery",
    "Open 7 Days a Week",
  ],
  // Array of image paths for the About section slider. Empty by default; designed placeholder renders when empty.
  aboutImages: [],
  categoriesPreview: {
    eyebrow: "Product Lines",
    heading: "Export Categories",
    items: [
      {
        name: "Textile",
        slug: "textile",
        href: "/products/textile",
        description: "Textile products for international buyers.",
      },
      {
        name: "Fruit & Vegetables",
        slug: "fruit-and-vegetables",
        href: "/products/fruit-and-vegetables",
        description: "Fresh Indian fruit and vegetables for export.",
      },
      {
        name: "Coconut",
        slug: "coconut",
        href: "/products/coconut",
        description: "Coconut products from India.",
      },
      {
        name: "Jaggery",
        slug: "jaggery",
        href: "/products/jaggery",
        description: "Natural sugarcane jaggery, a traditional sweetener.",
      },
    ],
  },
  ctaBand: {
    heading: "Trusted Worldwide",
    buttonLabel: "Send an Inquiry",
    buttonHref: "/contact",
    phoneLabel: "+91 96653 67718",
    phoneHref: "tel:+919665367718",
  },
};
