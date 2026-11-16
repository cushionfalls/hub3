import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import AccountForm from "@/components/AccountForm";
import {
  IconBolt,
  IconRefresh,
  IconShieldCheck,
  IconTruck,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "My Account",
  description:
    "Sign in to your Cellucity Hub account to track orders, save addresses and access warranty information.",
};

const BENEFITS = [
  {
    icon: IconTruck,
    title: "Delivery updates",
    text: "Track dispatch and courier handover.",
  },
  {
    icon: IconShieldCheck,
    title: "Warranty support",
    text: "Invoices and serial numbers on file.",
  },
  {
    icon: IconRefresh,
    title: "Easy returns",
    text: "Start a return from your order history.",
  },
  {
    icon: IconBolt,
    title: "Deal alerts",
    text: "Be first to know about price drops.",
  },
];

export default function AccountPage() {
  return (
    <InfoPage
      title="Your Cellucity account"
      description="Track orders, keep your delivery details handy and get warranty support faster. Guest checkout is always available."
      aside={
        <div className="bg-paper-deep p-5 sm:p-6">
          <h2 className="text-[17px] font-semibold">Save the good stuff</h2>
          <p className="mt-2 text-[12px] leading-relaxed text-muted">
            Accounts are optional. Use one to keep addresses, invoices and
            warranty details together.
          </p>
          <AccountForm />
        </div>
      }
    >
      <h2>Why create an account?</h2>
      <p>
        An account keeps your shopping experience tidy. It is optional — you can
        always check out as a guest — but it saves time on repeat orders and
        keeps your warranty documents together.
      </p>

      <ul>
        <li>
          <strong>Order history:</strong> see what you bought, when it shipped
          and the invoice for each order.
        </li>
        <li>
          <strong>Faster checkout:</strong> saved delivery addresses and contact
          details.
        </li>
        <li>
          <strong>Warranty wallet:</strong> product serial numbers and invoice
          copies in one place.
        </li>
        <li>
          <strong>Early access:</strong> first look at new arrivals and price
          drops.
        </li>
      </ul>

      <h2>This is a demo storefront</h2>
      <p>
        Cellucity Hub is currently a demonstration build, so account sign-in is
        not connected to a live customer database. You can still browse the full
        catalog, add items to your cart and use the contact channels as normal.
      </p>

      <div className="mt-5 grid gap-5 not-prose sm:grid-cols-2">
        {BENEFITS.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.title} className="flex items-start gap-2.5">
              <Icon className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
              <div>
                <p className="text-[12px] font-semibold text-ink">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-muted">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <h2>Order help without signing in</h2>
      <p>
        For order updates, warranty claims or returns, message us with the phone
        number used at checkout. We can look up the order from our side.
      </p>
      <p>
        No account needed for a quick question —{" "}
        <Link href="/contact">contact the team</Link> and we will help.
      </p>
    </InfoPage>
  );
}
