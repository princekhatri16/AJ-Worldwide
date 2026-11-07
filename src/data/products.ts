export interface ProductCategoryCard {
  name: string;
  slug: "textile" | "fruit-and-vegetables" | "coconut" | "jaggery";
  description: string;
  icon: "Shirt" | "Apple" | "Leaf" | "Wheat" | string;
  image?: string;
  items?: string[];
  buttonLabel: string;
}

export interface ProductsData {
  title: string;
  categories: ProductCategoryCard[];
}

export const productsData: ProductsData = {
  title: "Products",
  categories: [
    {
      name: "Textile",
      slug: "textile",
      description: "Textile products for international buyers.",
      icon: "Shirt",
      image: undefined,
      items: [],
      buttonLabel: "Send an Inquiry",
    },
    {
      name: "Fruit & Vegetables",
      slug: "fruit-and-vegetables",
      description: "Fresh Indian fruit and vegetables for export.",
      icon: "Apple",
      image: undefined,
      items: [],
      buttonLabel: "Send an Inquiry",
    },
    {
      name: "Coconut",
      slug: "coconut",
      description: "Coconut products from India.",
      icon: "Leaf",
      image: undefined,
      items: [],
      buttonLabel: "Send an Inquiry",
    },
    {
      name: "Jaggery",
      slug: "jaggery",
      description: "Natural sugarcane jaggery, a traditional sweetener.",
      icon: "Wheat",
      image: undefined,
      items: [],
      buttonLabel: "Send an Inquiry",
    },
  ],
};

