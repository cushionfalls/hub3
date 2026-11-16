import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import {
  IconArrowRight,
  IconCheck,
  IconPin,
  IconShieldCheck,
  IconTruck,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Store Pickup",
  description:
    "Reserve online and collect from Cellucity Hub in New Baneshwor, Kathmandu. Free pickup, usually ready within two hours.",
};

const STEPS = [
  {
    title: "Reserve online",
    text: "Add your items to the cart and choose store pickup at checkout, or message us on WhatsApp.",
  },
  {
    title: "We prepare your order",
    text: "We inspect and pack the product, then send you a pickup confirmation by phone or email.",
  },
  {
    title: "Collect in-store",
    text: "Bring your order number and a valid ID. Most orders are ready within two hours during store hours.",
  },
];

export default function StorePickupPage() {
  return (
    <InfoPage
      title="Order online, collect in-store"
      description="Skip the delivery wait. Reserve your gear and pick it up from our New Baneshwor store — usually ready within two hours."
    >
      <div className="grid gap-6 not-prose sm:grid-cols-3">
        {STEPS.map((step) => (
          <div key={step.title}>
            <p className="text-[12.5px] font-semibold text-ink">
              {step.title}
            </p>
            <p className="mt-1.5 text-[11.5px] leading-relaxed text-muted">
              {step.text}
            </p>
          </div>
        ))}
      </div>

      <h2>Store details</h2>
      <div className="mt-4 bg-paper-deep p-5 not-prose sm:p-6">
        <div className="flex items-start gap-3">
          <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
          <div>
            <p className="text-[13px] font-semibold text-ink">
              New Baneshwor, Kathmandu 44600
            </p>
            <p className="mt-1 text-[12px] leading-relaxed text-muted">
              Opposite the main chowk, look for the black-and-red Cellucity Hub
              sign. Paid parking is available nearby.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] font-medium text-ink-soft">
          <span className="inline-flex items-center gap-1.5">
            <IconTruck className="h-3.5 w-3.5 text-coral" />
            Free pickup
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconShieldCheck className="h-3.5 w-3.5 text-coral" />
            Official warranty
          </span>
          <span className="inline-flex items-center gap-1.5">
            <IconCheck className="h-3.5 w-3.5 text-coral" />
            Demo units available
          </span>
        </div>

        <a
          href="https://maps.google.com/?q=New+Baneshwor+Kathmandu"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex h-10 items-center justify-center gap-1.5 bg-ink px-4 text-[12px] font-semibold text-paper transition-colors hover:bg-coral"
        >
          Get directions
          <IconArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>

      <h2>Store hours</h2>
      <ul>
        <li>
          <strong>Sunday – Friday:</strong> 10:00am – 7:00pm
        </li>
        <li>
          <strong>Saturday:</strong> Closed
        </li>
        <li>
          <strong>Public holidays:</strong> Hours may vary — call ahead before
          travelling.
        </li>
      </ul>

      <h2>Before you come</h2>
      <ul>
        <li>
          Wait for your pickup confirmation message; not every order is ready
          instantly.
        </li>
        <li>Bring the order number and a photo ID matching the order name.</li>
        <li>
          If someone else is collecting for you, message us their name and phone
          number in advance.
        </li>
        <li>
          Uncollected orders are held for 24 hours, then returned to stock.
        </li>
      </ul>

      <h2>Need to change your pickup time?</h2>
      <p>
        No problem. Message us on WhatsApp or{" "}
        <Link href="/contact">contact the store</Link> with your order number
        and we will adjust the pickup window.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-4 not-prose">
        <Link
          href="/collections"
          className="inline-flex h-10 items-center gap-2 bg-coral px-5 text-[12px] font-semibold text-white transition-colors hover:bg-ink"
        >
          Start shopping
          <IconArrowRight className="h-3.5 w-3.5" />
        </Link>
        <a
          href="https://wa.me/9779800000000"
          target="_blank"
          rel="noreferrer"
          className="text-[12px] font-semibold text-ink underline underline-offset-4"
        >
          Ask about pickup
        </a>
      </div>
    </InfoPage>
  );
}
