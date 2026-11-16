import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import FaqAccordion, { type FaqItem } from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about ordering, delivery, payments, warranty, returns and store pickup at Cellucity Hub.",
};

const FAQ_GROUPS: { title: string; items: FaqItem[] }[] = [
  {
    title: "Ordering",
    items: [
      {
        question: "Are the products genuine and covered by warranty?",
        answer:
          "Yes. Every product is sourced through official brand channels and comes with a 1-year manufacturer warranty. Your invoice is your warranty proof, and claims are handled locally by our team.",
      },
      {
        question: "Do I need an account to order?",
        answer:
          "No. You can check out as a guest with your name, phone number and delivery address. Creating an account simply makes it easier to track orders and reorder.",
      },
      {
        question: "Can I reserve an item for store pickup?",
        answer:
          "Yes. Choose store pickup at checkout or message us on WhatsApp. We will hold the item for 24 hours and let you know when it is ready.",
      },
      {
        question: "Do you offer bulk or corporate pricing?",
        answer:
          "We do. For orders of five units or more, contact us with the models and quantities you need and we will send a quote.",
      },
    ],
  },
  {
    title: "Delivery",
    items: [
      {
        question: "How fast is delivery inside Kathmandu Valley?",
        answer:
          "Orders placed before 3:00pm are usually dispatched the same day and delivered within 24 hours. Delivery is free on all orders.",
      },
      {
        question: "How long does delivery take outside the valley?",
        answer:
          "Deliveries elsewhere in Nepal typically arrive within 1–3 business days, depending on the courier route. You will receive a tracking number once dispatched.",
      },
      {
        question: "Can I pay cash on delivery?",
        answer:
          "Yes. Cash on delivery is available across Nepal. You can also pay in advance with eSewa, Khalti or bank transfer.",
      },
    ],
  },
  {
    title: "Returns & warranty",
    items: [
      {
        question: "What is the return window?",
        answer:
          "You have 7 days from delivery to return most products in unused, original condition. Faulty items are covered by the manufacturer warranty regardless of the 7-day window.",
      },
      {
        question: "How long does a refund take?",
        answer:
          "Once the return is inspected, refunds are processed within 3–5 business days for wallet and COD payments, or 5–7 business days for bank transfers.",
      },
      {
        question: "What if my product arrives damaged?",
        answer:
          "Contact us the same day with photos of the packaging and product. We will arrange a replacement or a full refund at no cost to you.",
      },
    ],
  },
  {
    title: "Payments",
    items: [
      {
        question: "Which payment methods do you accept?",
        answer:
          "Cash on delivery, eSewa, Khalti and bank transfer. In-store card payments may be available depending on the terminal.",
      },
      {
        question: "Do prices include tax?",
        answer:
          "Yes. All displayed prices include applicable taxes. The price you see is the price you pay, plus delivery (which is free).",
      },
      {
        question: "Can I get a VAT invoice?",
        answer:
          "Yes. Ask for a VAT invoice when ordering and provide your company name and PAN number. We will include it with the shipment.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <InfoPage
      title="Frequently asked questions"
      description="Quick answers about ordering, delivery, warranty and payments. If your question is not here, our team is one message away."
    >
      <p>
        We have grouped the questions we hear most often. Tap a question to
        expand the answer.
      </p>

      {FAQ_GROUPS.map((group) => (
        <React.Fragment key={group.title}>
          <h2>{group.title}</h2>
          <FaqAccordion items={group.items} />
        </React.Fragment>
      ))}

      <h2>Still stuck?</h2>
      <p>
        Message us on WhatsApp for the fastest reply, or{" "}
        <Link href="/contact">send us a note</Link>. We are available Sunday to
        Friday, 10:00am – 7:00pm.
      </p>
    </InfoPage>
  );
}
