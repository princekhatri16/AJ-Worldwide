export type ProductSlug = "textile" | "fruit-and-vegetables" | "coconut" | "jaggery";

export interface SpecRow {
  key: string;
  label: string;
  value: string;
}

export interface ProductItem {
  name: string;
  botanicalName?: string;
  hsnCode?: string;
  image?: string;
  extraRows?: SpecRow[];
}

export interface CategorySpecData {
  slug: ProductSlug;
  name: string;
  description: string;
  icon: string;
  image?: string;
  specRows: SpecRow[];
  // Optional items array for when client names individual products (empty by default)
  items: ProductItem[];
}

export const productSpecsData: Record<ProductSlug, CategorySpecData> = {
  "fruit-and-vegetables": {
    slug: "fruit-and-vegetables",
    name: "Fruit & Vegetables",
    description: "Fresh Indian fruit and vegetables for export.",
    icon: "Apple",
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
};

export const productOrder: ProductSlug[] = [
  "textile",
  "fruit-and-vegetables",
  "coconut",
  "jaggery",
];

