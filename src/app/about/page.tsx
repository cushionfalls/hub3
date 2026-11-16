import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/InfoPage";
import { BRANDS } from "@/data/storefront";
import {
  IconArrowRight,
  IconBolt,
  IconPin,
  IconShieldCheck,
  IconStar,
} from "@/components/icons";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Cellucity Hub is Nepal's destination for official Insta360, JBL, UGREEN and Anker gear — sourced through authorized channels and backed by real warranty.",
};

const STATS = [
  { value: "52+", label: "Official products" },
  { value: "4.9★", label: "Average rating" },
  { value: "2 hrs", label: "Store pickup" },
  { value: "1 yr", label: "Official warranty" },
];

const PROMISES = [
  {
    icon: IconShieldCheck,
    title: "Official, not grey-market",
    text: "Every unit arrives through authorized brand and distributor channels. Serial numbers stay intact and invoices are valid for warranty.",
  },
  {
    icon: IconBolt,
    title: "Fast where it counts",
    text: "Order before 3pm inside Kathmandu Valley and we dispatch the same day. Pickup orders are usually ready in two hours.",
  },
  {
    icon: IconStar,
    title: "Advice from people who use the gear",
    text: "We shoot with the cameras, carry the speakers and live off the power banks. Tell us how you create and we will steer you right.",
  },
];

export default function AboutPage() {
  return (
    <InfoPage
      title="Nepal's home for official tech"
      description="We bring genuine action cameras, audio, charging and everyday-carry gear to Nepal — sourced through official channels and supported by people who actually use the products."
    >
      <h2>The short version</h2>
      <p>
        Cellucity Hub started with a simple frustration: finding authentic
        premium tech in Nepal was harder than it should be. Grey-market imports,
        unclear warranties and inconsistent pricing made buying a camera, a
        speaker or a charger feel like a gamble.
      </p>
      <p>
        We built the store we wanted to shop from. Every product we list is
        sourced through official brand channels, inspected before dispatch and
        backed by a manufacturer warranty. If something goes wrong, you talk to
        the same team that sold it to you.
      </p>

      <div className="my-7 grid grid-cols-2 gap-6 not-prose sm:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label}>
            <p className="text-[30px] font-bold leading-none text-ink">
              {stat.value}
            </p>
            <p className="mt-1.5 text-[12px] text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <h2>Why buy from Cellucity Hub</h2>
      <ul>
        <li>
          <strong>Every product is official.</strong> We work directly with
          authorized distributors for Insta360, JBL, UGREEN and Anker.
        </li>
        <li>
          <strong>Warranty that works.</strong> Your invoice is your warranty
          card. Claims are handled locally by our team, not shipped abroad.
        </li>
        <li>
          <strong>Same-day delivery.</strong> Order before 3:00pm inside
          Kathmandu Valley and we dispatch the same day, free of charge.
        </li>
        <li>
          <strong>Real advice.</strong> We use the gear we sell. Tell us how you
          create, travel or work and we will help you choose what fits.
        </li>
        <li>
          <strong>Fair, transparent pricing.</strong> Displayed prices include
          all taxes. No surprise fees at checkout.
        </li>
      </ul>

      <h2>What we stand on</h2>
      <div className="mt-4 grid gap-5 not-prose">
        {PROMISES.map((promise) => {
          const Icon = promise.icon;
          return (
            <div key={promise.title} className="flex items-start gap-3.5">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
              <div>
                <p className="text-[13px] font-semibold text-ink">
                  {promise.title}
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-muted">
                  {promise.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <h2>The brands we carry</h2>
      <p>
        We deliberately keep a focused catalog. Each brand below is chosen for a
        reason — reliability, repairability and long-term support in Nepal.
      </p>

      <div className="mt-4 grid gap-2 not-prose sm:grid-cols-2">
        {BRANDS.map((brand) => (
          <Link
            key={brand.name}
            href={brand.href}
            className="group flex items-center gap-3 bg-paper-deep p-3.5 transition-colors hover:bg-line"
          >
            <span className="grid h-11 w-16 shrink-0 place-items-center bg-paper px-2">
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-5 max-w-full object-contain"
              />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[12.5px] font-semibold text-ink">
                {brand.name}
              </span>
              <span className="mt-0.5 block text-[11px] text-muted">
                {brand.tagline}
              </span>
            </span>
            <IconArrowRight className="h-3.5 w-3.5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-coral" />
          </Link>
        ))}
      </div>

      <h2>Visit the store</h2>
      <p className="flex items-start gap-2.5">
        <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
        <span>
          New Baneshwor, Kathmandu 44600 — open Sunday to Friday, 10:00am to
          7:00pm. Look for the black-and-red Cellucity Hub sign.
        </span>
      </p>
      <p className="flex items-start gap-2.5">
        <IconShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
        <span>
          Try before you buy. Most demo units are available in-store, including
          Insta360 cameras, JBL speakers and UGREEN chargers.
        </span>
      </p>
      <p className="flex items-start gap-2.5">
        <IconStar className="mt-0.5 h-4 w-4 shrink-0 text-coral" />
        <span>
          Prefer to shop online? Store pickup is free and usually ready within
          two hours.
        </span>
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-4 not-prose">
        <Link
          href="/collections"
          className="inline-flex h-11 items-center gap-2 bg-coral px-5 text-[12px] font-semibold text-white transition-colors hover:bg-ink"
        >
          Browse the shelves
          <IconArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href="/contact"
          className="text-[12px] font-semibold text-ink underline underline-offset-4"
        >
          Talk to the team
        </Link>
      </div>
    </InfoPage>
  );
}
