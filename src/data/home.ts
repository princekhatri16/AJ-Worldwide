export interface HeroImage {
  src: string;
  alt: string;
  position?: string;
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
    // CLIENT-ADDED: Steel, confirm wording
    text: "From Maharashtra to the world: AJ Worldwide brings textiles, fresh fruit and vegetables, coconut, jaggery, spices and steel to buyers you can trust.",
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
    // Real cargo & logistics photography for hero presentation
    heroImages: [
      {
        src: "/hero/herosectionexport2.webp",
        alt: "Container cargo ship docked at port terminal with cranes loading freight at sunset",
        position: "center 50%",
      },
      {
        src: "/hero/herosectionexport3.jpg",
        alt: "Commercial cargo airplane flying over maritime container ships at sea during golden sunset",
        position: "center 55%",
      },
    ],
  },
  highlights: [
    "Textile",
    "Fruit & Vegetables",
    "Coconut",
    "Jaggery",
    "Spices",
    "Steel", // CLIENT-ADDED: Steel, confirm wording
    "Open 7 Days a Week",
  ],
  // Array of image paths for the About section slider.
  aboutImages: [
    {
      src: "/about/export1.webp",
      alt: "Container ship sailing through shipping channel with gantry cranes and cargo plane overhead",
    },
    {
      src: "/about/export3.webp",
      alt: "Global trade network map over active cargo seaport terminal at sunset",
    },
  ],
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
      {
        name: "Spices",
        slug: "spices",
        href: "/products/spices",
        description: "Spices from India.", // DRAFT: confirm wording with client
      },
      {
        name: "Steel",
        slug: "steel",
        href: "/products/steel",
        description: "Steel products from India.", // DRAFT: confirm wording and exact product types with client
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
