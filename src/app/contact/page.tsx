import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import ContactForm from "@/components/ContactForm";
import {
  IconArrowRight,
  IconHeadset,
  IconMail,
  IconPin,
  IconWhatsApp,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to Cellucity Hub about products, orders, warranty claims or store pickup. Call, email or message us on WhatsApp.",
};

const CHANNELS = [
  {
    href: "tel:+9779800000000",
    label: "Call the store",
    value: "+977 980 000 0000",
    note: "Sun–Fri, 10am–7pm",
    icon: IconHeadset,
    tone: "bg-cobalt text-white",
  },
  {
    href: "mailto:hello@cellucityhub.com",
    label: "Email us",
    value: "hello@cellucityhub.com",
    note: "Replies within 1 day",
    icon: IconMail,
    tone: "bg-coral text-white",
  },
  {
    href: "https://wa.me/9779800000000",
    label: "WhatsApp",
    value: "Quick questions, quick answers",
    note: "Fastest during store hours",
    icon: IconWhatsApp,
    tone: "bg-ink text-white",
  },
];

export default function ContactPage() {
  return (
    <InfoPage
      title="Tell us what you need"
      description="Product advice, order updates, warranty help or a bulk quote — a real person will get back to you. No bots, no call trees."
    >
      <h2>Talk to a real person</h2>
      <p>
        The fastest way to reach us is WhatsApp during store hours. For warranty
        claims or order-specific questions, include your invoice number or the
        phone number used at checkout so we can look things up before replying.
      </p>

      <div className="mt-5 grid gap-3 not-prose sm:grid-cols-3">
        {CHANNELS.map((channel) => {
          const Icon = channel.icon;
          return (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
              className="group flex flex-col bg-paper-deep p-4 transition-colors hover:bg-line"
            >
              <span
                className={`grid h-9 w-9 place-items-center ${channel.tone}`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <p className="mt-3 text-[12.5px] font-semibold text-ink">
                {channel.label}
              </p>
              <p className="mt-0.5 break-words text-[11.5px] text-muted">
                {channel.value}
              </p>
              <span className="mt-auto inline-flex items-center gap-1 pt-2 text-[11px] font-semibold text-cobalt">
                {channel.note}
                <IconArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          );
        })}
      </div>

      <h2 className="mt-8">Send us a message</h2>
      <p>
        Not in a hurry? Fill in the form and we will reply by email within one
        business day. Fields marked required need a value.
      </p>
      <ContactForm />

      <h2>Visit the store</h2>
      <p className="flex items-start gap-2.5">
        <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
        <span>
          Cellucity Hub, New Baneshwor, Kathmandu 44600, Nepal. Look for the
          black-and-red sign opposite the main chowk.
        </span>
      </p>
      <p>
        Store hours: Sunday to Friday, 10:00am – 7:00pm. Closed on Saturdays and
        public holidays.
      </p>
      <p>
        Planning a store pickup?{" "}
        <Link href="/store-pickup">See how pickup works</Link> and reserve your
        item before you travel.
      </p>
    </InfoPage>
  );
}
