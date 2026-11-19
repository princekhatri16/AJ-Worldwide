export type ProductSlug = "textile" | "fruit-and-vegetables" | "coconut" | "jaggery" | "spices" | "steel";

export interface SpecRow {
  key: string;
  label: string;
  value: string;
}

export interface ProductItem {
  slug: string;
  name: string;
  description: string;
  image?: string;
  hsnCode?: string;
  specRows: SpecRow[];
  seo: {
    title: string;
    description: string;
  };
}

export interface CategorySpecData {
  slug: ProductSlug;
  name: string;
  description: string;
  icon: string;
  image?: string;
  specRows: SpecRow[];
  seo: {
    title: string;
    description: string;
  };
  // Optional items array for when client names individual products (empty by default)
  items: ProductItem[];
}

export const productSpecsData: Record<ProductSlug, CategorySpecData> = {
  "fruit-and-vegetables": {
    slug: "fruit-and-vegetables",
    name: "Fruit & Vegetables",
    description: "Fresh Indian fruit and vegetables for export.",
    icon: "Apple",
    seo: {
      title: "Fresh Fruit & Vegetables Export | AJ Worldwide India",
      description:
        "Fresh Indian fruit and vegetables for global export from AJ Worldwide. Graded produce packed in ventilated corrugated cartons for international shipment.",
    },
    specRows: [
      {
        key: "botanical-name",
        label: "Botanical Name",
        value: "Varies according to the respective product",
      },
      {
        key: "hsn-code",
        label: "HSN Code (Indicative)",
        value: "Varies according to the respective product",
      },
      {
        key: "packaging",
        label: "Packaging",
        value:
          "Export-grade ventilated corrugated cartons, mesh bags or suitable food-grade packaging. Common pack sizes: 5 kg, 10 kg and 20 kg, subject to buyer requirements.",
      },
      {
        key: "origin",
        label: "Origin",
        value: "India.",
      },
      {
        key: "grade",
        label: "Grade",
        value:
          "Fresh, clean, mature produce, graded by size, colour, shape and appearance. Free from visible decay and significant physical damage.",
      },
      {
        key: "storage",
        label: "Storage",
        value:
          "Temperature and humidity controlled according to the individual commodity and destination requirements.",
      },
    ],
    items: [],
  },
  coconut: {
    slug: "coconut",
    name: "Coconut",
    description: "Coconut products from India.",
    icon: "CircleDot",
    seo: {
      title: "Fresh Coconuts for Export | AJ Worldwide Trade Desk",
      description:
        "Export-grade Indian coconuts from AJ Worldwide. Carefully selected mature, semi-husked coconuts packed in mesh bags for international market delivery.",
    },
    specRows: [
      {
        key: "product-name",
        label: "Product Name",
        value: "Coconut",
      },
      {
        key: "origin",
        label: "Origin",
        value: "India.",
      },
      {
        key: "packaging",
        label: "Packaging",
        // DRAFT: confirm with client
        value: "Gunny bags, corrugated cartons or semi-husked loose bulk packing in ventilated containers.",
      },
      {
        key: "storage",
        label: "Storage",
        // DRAFT: confirm with client
        value: "Well-ventilated, dry storage maintained at ambient temperature with moderate humidity.",
      },
      {
        key: "hsn-code",
        label: "HSN Code (Indicative)",
        value: "Varies according to the product",
      },
    ],
    items: [],
  },
  jaggery: {
    slug: "jaggery",
    name: "Jaggery",
    description: "Natural sugarcane jaggery, a traditional sweetener.",
    icon: "Boxes",
    seo: {
      title: "Natural Jaggery for Export | AJ Worldwide Trade Desk",
      description:
        "Pure traditional Indian jaggery from AJ Worldwide. Export-grade natural sweetener available in blocks and cubes, packaged securely for overseas markets.",
    },
    specRows: [
      {
        key: "product-name",
        label: "Product Name",
        value: "Jaggery",
      },
      {
        key: "origin",
        label: "Origin",
        value: "India.",
      },
      {
        key: "packaging",
        label: "Packaging",
        // DRAFT: confirm with client
        value: "Food-grade airtight master cartons with inner poly liners, blocks, buckets or granular pouch packaging.",
      },
      {
        key: "storage",
        label: "Storage",
        // DRAFT: confirm with client
        value: "Cool, dry and moisture-free hygienic warehousing protected from humidity and direct sunlight.",
      },
      {
        key: "hsn-code",
        label: "HSN Code (Indicative)",
        value: "Varies according to the product",
      },
    ],
    items: [],
  },
  textile: {
    slug: "textile",
    name: "Textile",
    description: "Textile products for international buyers.",
    icon: "Layers",
    seo: {
      title: "Textiles Export Category | AJ Worldwide Trade Desk",
      description:
        "Textile products for international buyers from AJ Worldwide. Quality fabrics, towels, and linen packed for export from Kumbhari, Maharashtra, India.",
    },
    specRows: [
      {
        key: "product-name",
        label: "Product Name",
        value: "Textile",
      },
      {
        key: "origin",
        label: "Origin",
        value: "India.",
      },
      {
        key: "packaging",
        label: "Packaging",
        value: "Textile goods are packed to stay clean and dry in transit",
      },
      {
        key: "custom-packaging",
        label: "Customised Packaging and Labelling",
        value: "Packing and labelling can be discussed with each buyer",
      },
      {
        key: "hsn-code",
        label: "HSN Code (Indicative)",
        value: "Varies according to the product",
      },
    ],
    items: [],
  },
  spices: {
    slug: "spices",
    name: "Spices",
    description: "Spices from India.", // DRAFT: confirm wording with client
    icon: "Flame",
    seo: {
      title: "Indian Spices for Export | AJ Worldwide Trade Desk",
      description:
        "Whole and ground export-grade Indian spices from AJ Worldwide. Sourced from India's agricultural centers and packed securely for international transit.",
    },
    specRows: [
      {
        key: "product-name",
        label: "Product Name",
        value: "Spices",
      },
      {
        key: "origin",
        label: "Origin",
        value: "India.",
      },
      {
        key: "packaging",
        label: "Packaging",
        // DRAFT: confirm with client
        value: "Food-grade airtight master cartons with inner poly liners, bags or pouch packaging.",
      },
      {
        key: "storage",
        label: "Storage",
        // DRAFT: confirm with client
        value: "Cool, dry and moisture-free hygienic warehousing protected from humidity and direct sunlight.",
      },
      {
        key: "hsn-code",
        label: "HSN Code (Indicative)",
        value: "Varies according to the product",
      },
    ],
    items: [],
  },
  // DRAFT: confirm with client
  steel: {
    slug: "steel",
    name: "Steel",
    description: "Steel pipes, blocks and rods from India.", // DRAFT: confirm wording with client
    icon: "Factory",
    image: "/products/steel/steel-pipes-1.jpeg",
    seo: {
      title: "Manufactured Steel Export | AJ Worldwide Trade Desk",
      description:
        "Industrial and manufactured steel products from AJ Worldwide, including pipes, blocks, and rods for international construction and industrial buyers.",
    },
    specRows: [
      {
        key: "product-name",
        label: "Product Name",
        value: "Steel",
      },
      {
        key: "origin",
        label: "Origin",
        value: "India.",
      },
      {
        key: "material",
        label: "Material",
        value: "Steel", // DRAFT: confirm with client
      },
      {
        key: "grade",
        label: "Grade / Specification",
        value: "As per buyer requirements and applicable standards.", // DRAFT: confirm with client
      },
      {
        key: "packaging",
        label: "Packaging",
        value:
          "Packed to protect against moisture and handling damage during transit: bundles, bands, wooden or steel packing or suitable export packing, as agreed with the buyer.", // DRAFT: confirm with client
      },
      {
        key: "storage",
        label: "Storage",
        value:
          "Kept dry and covered to prevent rust and surface damage before dispatch.", // DRAFT: confirm with client
      },
      {
        key: "hsn-code",
        label: "HSN Code (Indicative)",
        value:
          "Varies according to the product (Chapter 72: iron and steel; Chapter 73: articles of iron or steel).", // DRAFT: confirm with client
      },
    ],
    items: [
      {
        slug: "steel-pipes",
        name: "Steel Pipes",
        description: "Round steel pipes in a range of sizes.", // DRAFT: confirm wording with client
        image: "/products/steel/steel-pipes-1.jpeg",
        hsnCode: "7304 / 7306",
        seo: {
          title: "Export Grade Steel Pipes | AJ Worldwide Trade Desk",
          description:
            "Export specifications for steel pipes from AJ Worldwide. Hollow structural sections, seamless and ERW steel tubes supplied for international trade.",
        },
        specRows: [
          {
            key: "product-name",
            label: "Product Name",
            value: "Steel Pipes",
          },
          {
            key: "origin",
            label: "Origin",
            value: "India.",
          },
          {
            key: "material",
            label: "Material",
            value: "Steel", // DRAFT: confirm with client
          },
          {
            key: "form",
            label: "Form",
            value: "Round pipes.", // DRAFT: confirm with client
          },
          {
            key: "sizes",
            label: "Sizes",
            value:
              "Available in various diameters, wall thicknesses and lengths as per buyer requirements.", // DRAFT: confirm with client
          },
          {
            key: "grade",
            label: "Grade / Specification",
            value: "As per buyer requirements and applicable standards.", // DRAFT: confirm with client
          },
          {
            key: "packaging",
            label: "Packaging",
            value:
              "Bundled and strapped, with end protection, or packed as agreed with the buyer.", // DRAFT: confirm with client
          },
          {
            key: "storage",
            label: "Storage",
            value:
              "Kept dry and covered to prevent rust and surface damage before dispatch.", // DRAFT: confirm with client
          },
          {
            key: "hsn-code",
            label: "HSN Code (Indicative)",
            value: "7304 / 7306 (varies according to the type of pipe).", // DRAFT: confirm with client
          },
        ],
      },
      {
        slug: "steel-blocks",
        name: "Steel Blocks",
        description: "Steel blocks and bars in square and rectangular sections.", // DRAFT: confirm wording with client
        image: "/products/steel/steel-blocks-2.jpeg",
        hsnCode: "Chapter 72",
        seo: {
          title: "Export Grade Steel Blocks | AJ Worldwide Trade Desk",
          description:
            "Export specifications for steel blocks from AJ Worldwide. Solid carbon and alloy steel billets and forged blocks supplied for industrial processing.",
        },
        specRows: [
          {
            key: "product-name",
            label: "Product Name",
            value: "Steel Blocks",
          },
          {
            key: "origin",
            label: "Origin",
            value: "India.",
          },
          {
            key: "material",
            label: "Material",
            value: "Steel", // DRAFT: confirm with client
          },
          {
            key: "form",
            label: "Form",
            value: "Square and rectangular blocks and bars.", // DRAFT: confirm with client
          },
          {
            key: "sizes",
            label: "Sizes",
            value:
              "Available in various sections and lengths as per buyer requirements.", // DRAFT: confirm with client
          },
          {
            key: "grade",
            label: "Grade / Specification",
            value: "As per buyer requirements and applicable standards.", // DRAFT: confirm with client
          },
          {
            key: "packaging",
            label: "Packaging",
            value:
              "Stacked, strapped and protected for transit, or packed as agreed with the buyer.", // DRAFT: confirm with client
          },
          {
            key: "storage",
            label: "Storage",
            value:
              "Kept dry and covered to prevent rust and surface damage before dispatch.", // DRAFT: confirm with client
          },
          {
            key: "hsn-code",
            label: "HSN Code (Indicative)",
            value: "Chapter 72 (varies according to the product).", // DRAFT: confirm with client
          },
        ],
      },
      {
        slug: "steel-rods",
        name: "Steel Rods",
        description: "Steel rods in a range of diameters.", // DRAFT: confirm wording with client
        image: "/products/steel/steel-rods-1.jpeg",
        hsnCode: "7214",
        seo: {
          title: "Export Steel Rods & Rebar | AJ Worldwide Trade Desk",
          description:
            "Export specifications for steel rods and round bars from AJ Worldwide. High-tensile reinforcement and carbon steel bars for construction and industry.",
        },
        specRows: [
          {
            key: "product-name",
            label: "Product Name",
            value: "Steel Rods",
          },
          {
            key: "origin",
            label: "Origin",
            value: "India.",
          },
          {
            key: "material",
            label: "Material",
            value: "Steel", // DRAFT: confirm with client
          },
          {
            key: "form",
            label: "Form",
            value: "Round and ribbed rods.", // DRAFT: confirm with client
          },
          {
            key: "sizes",
            label: "Sizes",
            value:
              "Available in various diameters and lengths as per buyer requirements.", // DRAFT: confirm with client
          },
          {
            key: "grade",
            label: "Grade / Specification",
            value: "As per buyer requirements and applicable standards.", // DRAFT: confirm with client
          },
          {
            key: "packaging",
            label: "Packaging",
            value:
              "Bundled and tied for transit, or packed as agreed with the buyer.", // DRAFT: confirm with client
          },
          {
            key: "storage",
            label: "Storage",
            value:
              "Kept dry and covered to prevent rust and surface damage before dispatch.", // DRAFT: confirm with client
          },
          {
            key: "hsn-code",
            label: "HSN Code (Indicative)",
            value: "7214 (varies according to the type of rod).", // DRAFT: confirm with client
          },
        ],
      },
    ],
  },
};

export const productOrder: ProductSlug[] = [
  "textile",
  "fruit-and-vegetables",
  "coconut",
  "jaggery",
  "spices",
  "steel",
];

export const steelItemsOrder = [
  "steel-pipes",
  "steel-blocks",
  "steel-rods",
] as const;
export type SteelItemSlug = (typeof steelItemsOrder)[number];

