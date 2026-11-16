import Link from "next/link";
import Logo from "./Logo";
import {
  IconArrowUpRight,
  IconFacebook,
  IconInstagram,
  IconMail,
  IconPin,
  IconWhatsApp,
} from "./icons";

const SHOP_LINKS = [
  { label: "All gear", href: "/collections" },
  { label: "Action cameras", href: "/collections?category=Action%20Cameras" },
  { label: "Speakers", href: "/collections?category=Speakers" },
  { label: "Headphones", href: "/collections?category=Headphones" },
  { label: "Power banks", href: "/collections?category=Power%20Banks" },
  { label: "Chargers", href: "/collections?category=Chargers" },
  { label: "Deals", href: "/collections?deals=true" },
];

const COMPANY_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Store pickup", href: "/store-pickup" },
];

const HELP_LINKS = [
  { label: "Returns", href: "/returns" },
  { label: "Warranty", href: "/warranty" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms & conditions", href: "/terms-conditions" },
];

const PAYMENTS: { label: string; src?: string; text?: string; color?: string }[] =
  [
    { label: "eSewa", text: "eSewa", color: "#3FA535" },
    { label: "Khalti", text: "Khalti", color: "#5C2D91" },
    { label: "Visa", src: "/images/payments/visa.svg" },
    { label: "Mastercard", src: "/images/payments/mastercard.svg" },
    { label: "Amex", src: "/images/payments/amex.svg" },
  ];

export default function Footer() {
  return (
    <footer className="mt-6 bg-ink text-paper">
      <div className="h-1 w-full bg-coral" />

      <div className="container-wide grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_0.7fr_0.7fr_1fr] lg:gap-8 lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-5 max-w-[300px] text-[12.5px] leading-[1.8] text-[#b8b8b8]">
            Official cameras, audio and power gear for Nepal. Authorized stock,
            real warranty and same-day delivery in Kathmandu Valley.
          </p>

          <div className="mt-5 flex items-center gap-4">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="text-paper transition-colors hover:text-coral"
            >
              <IconInstagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="text-paper transition-colors hover:text-coral"
            >
              <IconFacebook className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://wa.me/9779800000000"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="text-paper transition-colors hover:text-coral"
            >
              <IconWhatsApp className="h-4 w-4" />
            </a>
          </div>
        </div>

        <FooterColumn title="Shop" links={SHOP_LINKS} />
        <FooterColumn title="Company" links={COMPANY_LINKS} />
        <FooterColumn title="Help" links={HELP_LINKS} />

        <div>
          <h3 className="text-[13px] font-semibold text-paper">Visit the store</h3>
          <div className="mt-4 space-y-3 text-[12px] leading-relaxed text-[#b8b8b8]">
            <p className="flex items-start gap-2.5">
              <IconPin className="mt-0.5 h-4 w-4 shrink-0 text-paper" />
              New Baneshwor, Kathmandu
              <br />
              44600, Nepal
            </p>
            <p className="flex items-start gap-2.5">
              <IconMail className="mt-0.5 h-4 w-4 shrink-0 text-paper" />
              <a
                href="mailto:hello@cellucityhub.com"
                className="transition-colors hover:text-paper"
              >
                hello@cellucityhub.com
              </a>
            </p>
          </div>
          <div className="mt-4">
            <p className="text-[12px] font-semibold text-paper">Store hours</p>
            <p className="mt-1 text-[12px] text-[#b8b8b8]">
              Sunday – Friday
              <br />
              10:00 — 19:00
            </p>
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {PAYMENTS.map((payment) => (
              <span
                key={payment.label}
                title={payment.label}
                className="grid h-7 w-11 place-items-center bg-paper px-1.5"
              >
                {payment.src ? (
                  <img
                    src={payment.src}
                    alt={payment.label}
                    className="max-h-3.5 max-w-full object-contain"
                  />
                ) : (
                  <span
                    className="text-[10px] font-bold leading-none"
                    style={{ color: payment.color }}
                  >
                    {payment.text}
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-wide flex flex-col gap-3 border-t border-[#333333] py-5 text-[11.5px] text-[#b8b8b8] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Cellucity Hub. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <span>Cash on delivery · eSewa · Khalti</span>
          <span>Kathmandu, Nepal</span>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-[13px] font-semibold text-paper">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="group inline-flex items-center gap-1 text-[12px] text-[#b8b8b8] transition-colors hover:text-paper"
            >
              {link.label}
              <IconArrowUpRight className="h-2.5 w-2.5 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
