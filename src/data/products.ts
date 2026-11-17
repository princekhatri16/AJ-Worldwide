export interface ProductGalleryItem {
  src: string;
  alt: string;
  position?: string;
  fit?: "cover" | "contain";
}

export interface ProductTypeItem {
  slug: string;
  name: string;
  description: string;
  image: string;
  gallery: ProductGalleryItem[];
  hsnCode?: string;
}

export interface ProductCategoryCard {
  name: string;
  slug: "textile" | "fruit-and-vegetables" | "coconut" | "jaggery" | "spices" | "steel";
  description: string;
  icon: "Shirt" | "Apple" | "Leaf" | "Wheat" | "Flame" | "Factory" | string;
  image?: string;
  gallery?: ProductGalleryItem[];
  items?: ProductTypeItem[];
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
      image: "/products/textile/textile-1.jpeg",
      gallery: [
        {
          src: "/products/textile/textile-1.jpeg",
          alt: "Stack of folded towels in assorted colours",
        },
        {
          src: "/products/textile/textile-2.jpeg",
          alt: "Stack of rolled and folded towels with decorative flower",
        },
        {
          src: "/products/textile/textile-3.jpeg",
          alt: "Folded towels stacked on wooden surface",
        },
        {
          src: "/products/textile/textile-4.jpeg",
          alt: "Folded pastel textile cloths held in hand",
        },
      ],
      items: [],
      buttonLabel: "Send an Inquiry",
    },
    {
      name: "Fruit & Vegetables",
      slug: "fruit-and-vegetables",
      description: "Fresh Indian fruit and vegetables for export.",
      icon: "Apple",
      image: "/products/fruit-vegetables/freshvegetables2.jpg",
      gallery: [
        {
          src: "/products/fruit-vegetables/freshvegetables2.jpg",
          alt: "Selection of farm fresh Indian vegetables for global markets",
        },
        {
          src: "/products/fruit-vegetables/freshfruits1.jpg",
          alt: "Fresh assortment of Indian export quality fruits and vegetables",
        },
        {
          src: "/products/fruit-vegetables/freshfruits3.jpg",
          alt: "Fresh exotic tropical fruits harvested for international export",
        },
        {
          src: "/products/fruit-vegetables/freshvegetables3.jpg",
          alt: "Premium organic vegetables packed for export shipment",
        },
      ],
      items: [],
      buttonLabel: "Send an Inquiry",
    },
    {
      name: "Coconut",
      slug: "coconut",
      description: "Coconut products from India.",
      icon: "Leaf",
      image: "/products/coconut/coconut2.jpg",
      gallery: [
        {
          src: "/products/coconut/coconut2.jpg",
          alt: "Premium graded mature coconuts from Maharashtra",
        },
        {
          src: "/products/coconut/coconut1.jpg",
          alt: "Fresh semi-husked Indian coconuts ready for export",
        },
        {
          src: "/products/coconut/coconut3.jpg",
          alt: "High-grade coconuts packed for international shipping",
        },
      ],
      items: [],
      buttonLabel: "Send an Inquiry",
    },
    {
      name: "Jaggery",
      slug: "jaggery",
      description: "Natural sugarcane jaggery, a traditional sweetener.",
      icon: "Wheat",
      image: "/products/jaggery/jaggery2.jpg",
      gallery: [
        {
          src: "/products/jaggery/jaggery2.jpg",
          alt: "Natural organic chemical-free jaggery cubes for export",
        },
        {
          src: "/products/jaggery/jaggery1.jpg",
          alt: "Traditional pure golden Indian sugarcane jaggery blocks",
        },
        {
          src: "/products/jaggery/jaggery3.jpg",
          alt: "Artisanal jaggery chunks prepared for global distribution",
        },
      ],
      items: [],
      buttonLabel: "Send an Inquiry",
    },
    {
      name: "Spices",
      slug: "spices",
      description: "Spices from India.", // DRAFT: confirm wording with client
      icon: "Flame",
      image: "/products/spices/spices-2.jpg",
      gallery: [
        {
          src: "/products/spices/spices-2.jpg",
          alt: "Assorted spices, chillies and herbs in bowls",
          position: "center",
        },
        {
          src: "/products/spices/spices-1.jpg",
          alt: "Brass mortar and pestle with whole spices and dried red chillies",
          position: "center 45%",
        },
      ],
      items: [],
      buttonLabel: "Send an Inquiry",
    },
    {
      name: "Steel",
      slug: "steel",
      description: "Steel pipes, blocks and rods from India.", // DRAFT: confirm wording with client
      icon: "Factory",
      image: "/products/steel/steel-pipes-1.jpeg",
      gallery: [
        {
          src: "/products/steel/steel-pipes-1.jpeg",
          alt: "Polished round steel pipes in assorted diameters",
          position: "center",
        },
        {
          src: "/products/steel/steel-pipes-2.jpeg",
          alt: "Stack of hollow round steel pipes viewed from the end",
          position: "center",
        },
        {
          src: "/products/steel/steel-blocks-2.jpeg",
          alt: "Industrial stack of banded rectangular steel bars and blocks",
          position: "center",
        },
        {
          src: "/products/steel/steel-blocks-1.jpeg",
          alt: "Solid square and rectangular steel billets and blocks",
          position: "center",
          fit: "contain",
        },
        {
          src: "/products/steel/steel-rods-1.jpeg",
          alt: "Bundle of ribbed structural steel reinforcement rods",
          position: "center",
        },
        {
          src: "/products/steel/steel-rods-2.jpeg",
          alt: "Round ribbed steel rebar rods in varying diameters",
          position: "center",
        },
      ],
      items: [
        {
          slug: "steel-pipes",
          name: "Steel Pipes",
          description: "Round steel pipes in a range of sizes.", // DRAFT: confirm wording with client
          image: "/products/steel/steel-pipes-1.jpeg",
          hsnCode: "7304 / 7306",
          gallery: [
            {
              src: "/products/steel/steel-pipes-1.jpeg",
              alt: "Polished round steel pipes in assorted diameters",
              position: "center",
            },
            {
              src: "/products/steel/steel-pipes-2.jpeg",
              alt: "Stack of hollow round steel pipes viewed from the end",
              position: "center",
            },
          ],
        },
        {
          slug: "steel-blocks",
          name: "Steel Blocks",
          description: "Steel blocks and bars in square and rectangular sections.", // DRAFT: confirm wording with client
          image: "/products/steel/steel-blocks-2.jpeg",
          hsnCode: "Chapter 72",
          gallery: [
            {
              src: "/products/steel/steel-blocks-2.jpeg",
              alt: "Industrial stack of banded rectangular steel bars and blocks",
              position: "center",
            },
            {
              src: "/products/steel/steel-blocks-1.jpeg",
              alt: "Solid square and rectangular steel billets and blocks",
              position: "center",
              fit: "contain",
            },
          ],
        },
        {
          slug: "steel-rods",
          name: "Steel Rods",
          description: "Steel rods in a range of diameters.", // DRAFT: confirm wording with client
          image: "/products/steel/steel-rods-1.jpeg",
          hsnCode: "7214",
          gallery: [
            {
              src: "/products/steel/steel-rods-1.jpeg",
              alt: "Bundle of ribbed structural steel reinforcement rods",
              position: "center",
            },
            {
              src: "/products/steel/steel-rods-2.jpeg",
              alt: "Round ribbed steel rebar rods in varying diameters",
              position: "center",
            },
          ],
        },
      ],
      buttonLabel: "Send an Inquiry",
    },
  ],
};
