export interface AboutData {
  title: string;
  whoWeAre: {
    heading: string;
    paragraphs: string[];
  };
  mission: {
    label: string;
    text: string;
  };
  vision: {
    label: string;
    text: string;
  };
  facts: {
    established: string;
    businessType: string;
    location: string;
  };
}

export const aboutData: AboutData = {
  title: "About Us",
  whoWeAre: {
    heading: "Who We Are",
    paragraphs: [
      "AJ Worldwide is an import and export company based in Kumbhari, in Buldhana district of Maharashtra, established in 2025. We trade in textiles, fresh fruit and vegetables, coconut and jaggery, and we work to connect buyers abroad with products from India's farms and markets.",
      "Our name carries our promise: to be trusted wherever we trade. We aim to do that through clear communication, honest dealing and dependable delivery.",
    ],
  },
  mission: {
    label: "Our Mission",
    text: "To build trusted trading relationships between Indian producers and buyers across the world.",
  },
  vision: {
    label: "Our Vision",
    text: "To grow from a young company into a name that importers and exporters rely on in every market we serve.",
  },
  facts: {
    established: "2025",
    businessType: "Import & Export",
    location: "Kumbhari, Buldhana, Maharashtra, India",
  },
};

