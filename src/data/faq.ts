export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqData {
  heading: string;
  items: FaqItem[];
}

export const faqData: FaqData = {
  heading: "Frequently Asked Questions",
  items: [
    {
      id: "faq-1",
      question: "What do you trade in?",
      answer: "Textiles, fresh fruit and vegetables, coconut and jaggery.",
    },
    {
      id: "faq-2",
      question: "Do you import as well as export?",
      answer: "Please ask us through the inquiry form.",
    },
    {
      id: "faq-3",
      question: "How can I get a quotation?",
      answer: "Send an inquiry with the product, quantity and destination.",
    },
    {
      id: "faq-4",
      question: "When are you available?",
      answer: "Every day of the week, all year round.",
    },
  ],
};

