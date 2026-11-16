import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import { IconCheck, IconRefresh, IconTruck } from "@/components/icons";

export const metadata: Metadata = {
  title: "Returns",
  description:
    "How returns and exchanges work at Cellucity Hub, including the 7-day window, product condition requirements and refund timelines.",
};

const STEPS = [
  {
    icon: IconRefresh,
    title: "Start within 7 days",
    text: "Message us with your order number and the reason for the return.",
  },
  {
    icon: IconCheck,
    title: "We inspect the item",
    text: "Bring it to the store or send it back in its original packaging.",
  },
  {
    icon: IconTruck,
    title: "Refund or exchange",
    text: "Choose a replacement, store credit or a refund to the original method.",
  },
];

export default function ReturnsPage() {
  return (
    <InfoPage
      title="Returns and exchanges"
      description="Changed your mind or picked the wrong model? You have 7 days from delivery to return eligible products in original condition."
    >
      <h2>The 7-day return window</h2>
      <p>
        You may return most products within 7 days of delivery. The item must be
        unused, in its original packaging and include every accessory, manual
        and promotional item. We inspect every return before approving it.
      </p>

      <div className="mt-5 grid gap-6 not-prose sm:grid-cols-3">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title}>
              <Icon className="h-5 w-5 text-coral" />
              <p className="mt-2.5 text-[12.5px] font-semibold text-ink">
                {step.title}
              </p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-muted">
                {step.text}
              </p>
            </div>
          );
        })}
      </div>

      <h2>What is eligible</h2>
      <ul>
        <li>Products returned within 7 days of delivery.</li>
        <li>
          Items in original, resalable condition with all packaging and
          accessories.
        </li>
        <li>
          Faulty products covered by warranty, regardless of the 7-day window.
        </li>
      </ul>

      <h2>What is not eligible</h2>
      <ul>
        <li>Products showing signs of use, wear or accidental damage.</li>
        <li>
          Items with missing serial numbers, manuals or bundled accessories.
        </li>
        <li>
          Hygiene-sensitive items such as in-ear earbuds that have been opened
          and used, unless they are faulty.
        </li>
        <li>
          Gift cards, clearance items marked &quot;final sale&quot; and custom
          orders.
        </li>
      </ul>

      <h2>How to start a return</h2>
      <ol>
        <li>
          Send a message to{" "}
          <a href="mailto:hello@cellucityhub.com">hello@cellucityhub.com</a> or
          WhatsApp us with your order number and reason.
        </li>
        <li>
          We will confirm whether the item is eligible and arrange a drop-off or
          pickup.
        </li>
        <li>
          Once inspected, we will issue a replacement, store credit or refund.
        </li>
      </ol>

      <h2>Refund timelines</h2>
      <ul>
        <li>
          <strong>Cash on delivery:</strong> refunded by bank transfer or store
          credit within 3–5 business days of approval.
        </li>
        <li>
          <strong>eSewa / Khalti:</strong> returned to the same wallet within 3–5
          business days.
        </li>
        <li>
          <strong>Bank transfer:</strong> returned to the originating account
          within 5–7 business days.
        </li>
      </ul>

      <h2>Faulty products</h2>
      <p>
        If a product is dead on arrival or develops a fault covered by warranty,
        contact us immediately. We will arrange a replacement or an authorized
        service centre repair under our{" "}
        <Link href="/warranty">Warranty Policy</Link>. Do not attempt to repair
        the product yourself, as this may void the warranty.
      </p>

      <p>
        Need help with a specific order?{" "}
        <Link href="/contact">Contact our team</Link> with your order number and
        we will take it from there.
      </p>
    </InfoPage>
  );
}
