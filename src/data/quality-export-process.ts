export interface ProcessStep {
  step: number;
  numeral: string;
  title: string;
}

export interface QualityExportProcessData {
  title: string;
  qualityPacking: {
    heading: string;
    items: string[];
  };
  howAnOrderWorks: {
    heading: string;
    steps: ProcessStep[];
  };
}

export const qualityExportProcessData: QualityExportProcessData = {
  title: "Quality & Export Process",
  qualityPacking: {
    heading: "Quality & Packing",
    items: [
      "Products are checked against the buyer's requirements before dispatch",
      "Fresh produce is sorted and packed to travel well",
      "Textile goods are packed to stay clean and dry in transit",
      "Packing and labelling can be discussed with each buyer",
    ],
  },
  howAnOrderWorks: {
    heading: "How an Order Works",
    steps: [
      {
        step: 1,
        numeral: "01",
        title: "Inquiry: tell us the product, quantity and destination",
      },
      {
        step: 2,
        numeral: "02",
        title: "Quotation: we reply with prices and terms",
      },
      {
        step: 3,
        numeral: "03",
        title: "Order confirmed in writing",
      },
      {
        step: 4,
        numeral: "04",
        title: "Packing and inspection",
      },
      {
        step: 5,
        numeral: "05",
        title: "Documents and shipping arranged",
      },
      {
        step: 6,
        numeral: "06",
        title: "Delivery and follow-up",
      },
    ],
  },
};

