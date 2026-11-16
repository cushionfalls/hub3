import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import { IconCheck, IconShieldCheck, IconX } from "@/components/icons";

export const metadata: Metadata = {
  title: "Warranty",
  description:
    "Cellucity Hub warranty policy: 1-year official manufacturer warranty, what is covered, what is not, and how to make a claim in Nepal.",
};

export default function WarrantyPage() {
  return (
    <InfoPage
      title="Warranty policy"
      description="Every product we sell carries an official manufacturer warranty. Claims are handled locally by our team, not shipped overseas."
    >
      <div className="flex items-start gap-3 bg-paper-deep p-4 not-prose">
        <IconShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
        <div>
          <p className="text-[12.5px] font-semibold text-ink">
            1-year official warranty
          </p>
          <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted">
            Valid from the invoice date for manufacturing defects. Bring your
            invoice or order number when making a claim.
          </p>
        </div>
      </div>

      <h2>What is covered</h2>
      <ul>
        <li>Manufacturing defects in materials or workmanship.</li>
        <li>
          Hardware failures that occur during normal use within the warranty
          period.
        </li>
        <li>
          Battery issues that fall below the manufacturer&apos;s stated capacity
          threshold during the warranty period.
        </li>
        <li>
          Repairs or replacements carried out by an authorized service centre.
        </li>
      </ul>

      <h2>What is not covered</h2>
      <ul>
        <li>
          Accidental damage, drops, cracks or liquid damage beyond the stated
          rating.
        </li>
        <li>
          Normal wear and tear, including cosmetic scratches and worn cables.
        </li>
        <li>
          Damage caused by unauthorized repairs, modifications or incorrect
          voltage.
        </li>
        <li>Products with removed, altered or unreadable serial numbers.</li>
        <li>
          Consumables such as ear tips, cleaning cloths and batteries after their
          rated cycles.
        </li>
      </ul>

      <h2>How to make a claim</h2>
      <ol>
        <li>
          Contact us with your invoice number, product serial number and a
          description of the fault. Photos or a short video help us triage the
          issue faster.
        </li>
        <li>
          We will confirm warranty eligibility and advise whether to bring the
          item to the store or to an authorized service centre.
        </li>
        <li>
          Once inspected, the service centre will repair or replace the product
          according to the manufacturer&apos;s policy.
        </li>
      </ol>

      <div className="mt-5 grid gap-6 not-prose sm:grid-cols-2">
        <div>
          <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
            <IconCheck className="h-4 w-4 text-coral" />
            Covered
          </p>
          <ul className="mt-2 space-y-1.5">
            {[
              "Dead on arrival",
              "Charging faults",
              "Speaker or driver failure",
              "Battery capacity defects",
            ].map((item) => (
              <li key={item} className="text-[12px] text-ink-soft">
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
            <IconX className="h-4 w-4 text-muted" />
            Not covered
          </p>
          <ul className="mt-2 space-y-1.5">
            {[
              "Water damage beyond rating",
              "Cracked screens or lenses",
              "Unauthorized repairs",
              "Normal cosmetic wear",
            ].map((item) => (
              <li key={item} className="text-[12px] text-ink-soft">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2>Turnaround time</h2>
      <p>
        Most inspections are completed within 2–3 business days. Repairs that
        require parts from the manufacturer can take 1–3 weeks. We will keep you
        updated by phone or WhatsApp at every stage.
      </p>

      <h2>Keep your invoice</h2>
      <p>
        Your invoice is your warranty proof. If you lose it, contact us with the
        phone number used at checkout and we will try to retrieve a copy from
        our records.
      </p>

      <p>
        Ready to start a claim?{" "}
        <Link href="/contact">Contact our support team</Link> with your order
        details.
      </p>
    </InfoPage>
  );
}
