export interface WhyChooseUsImage {
  src: string;
  alt: string;
  position?: string;
}

export interface ReasonItem {
  id: string;
  numeral: string;
  title: string;
  description: string;
  icon: "ShieldCheck" | "Layers" | "Globe2" | "Clock" | "Phone" | string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  mosaicImages?: WhyChooseUsImage[];
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
  homeCollage: {
    main: WhyChooseUsImage;
    bottomLeft: WhyChooseUsImage;
    bottomRight: WhyChooseUsImage;
  };
  photoBand: WhyChooseUsImage;
}

export const whyChooseUsData: WhyChooseUsData = {
  title: "Why Choose Us",
  homeCollage: {
    main: {
      src: "/about/export3.webp",
      alt: "Global trade network map over active cargo seaport terminal at sunset",
    },
    bottomLeft: {
      src: "/products/fruit-vegetables/freshfruits1.jpg",
      alt: "Fresh assortment of Indian export quality fruits and vegetables",
    },
    bottomRight: {
      src: "/products/coconut/coconut1.jpg",
      alt: "Fresh semi-husked Indian coconuts ready for export",
    },
  },
  photoBand: {
    src: "/hero/herosectionexport3.jpg",
    alt: "Commercial cargo airplane flying over maritime container ships at sea during golden sunset",
  },
  reasons: [
    {
      id: "trust-first",
      numeral: "01",
      title: "Trust First",
      description: "Our name is our commitment: we aim to deal openly and keep our word.",
      icon: "ShieldCheck",
      image: "/about/export1.webp",
      imageAlt: "Container ship sailing through shipping channel with cranes and cargo plane overhead",
    },
    {
      id: "four-product-lines",
      numeral: "02",
      title: "Four Product Lines",
      description: "Textile, fruit and vegetables, coconut and jaggery from one company.",
      icon: "Layers",
      mosaicImages: [
        {
          src: "/products/fruit-vegetables/freshvegetables2.jpg",
          alt: "Selection of farm fresh Indian vegetables for export",
        },
        {
          src: "/products/coconut/coconut2.jpg",
          alt: "Premium graded mature coconuts from Maharashtra",
        },
        {
          src: "/products/jaggery/jaggery2.jpg",
          alt: "Natural organic chemical-free jaggery cubes",
        },
      ],
    },
    {
      id: "import-export-experience",
      numeral: "03",
      title: "Import & Export Experience",
      description: "Registered for import and export (IEC and GST, as listed by the client).",
      icon: "Globe2",
      image: "/hero/herosectionexport2.webp",
      imageAlt: "Container cargo ship docked at port terminal with cranes loading freight at sunset",
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
