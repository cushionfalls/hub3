import Link from "next/link";
import { IconArrowRight, IconSearch } from "@/components/icons";

export default function NotFound() {
  return (
    <div className="container-wide flex min-h-[64vh] items-center justify-center py-14">
      <div className="w-full max-w-[560px] text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center bg-paper-deep text-ink">
          <IconSearch className="h-6 w-6" />
        </span>
        <p className="mt-5 text-[12px] font-semibold text-cobalt">404</p>
        <h1 className="display mt-2 text-[clamp(42px,8vw,68px)] leading-[0.95]">
          This shelf is empty
        </h1>
        <p className="mx-auto mt-4 max-w-[420px] text-[13px] leading-relaxed text-muted">
          The page you are looking for may have moved, or the product is no
          longer in our catalog. Let&apos;s get you back to the good stuff.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-10 items-center gap-2 bg-coral px-5 text-[12px] font-semibold text-white transition-colors hover:bg-ink"
          >
            Back to home
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
          <Link
            href="/collections"
            className="inline-flex h-10 items-center bg-ink px-5 text-[12px] font-semibold text-paper transition-colors hover:bg-cobalt"
          >
            Browse all products
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11.5px] font-medium text-muted">
          <Link href="/collections?deals=true" className="hover:text-coral">
            Today&apos;s deals
          </Link>
          <Link href="/store-pickup" className="hover:text-coral">
            Store pickup
          </Link>
          <Link href="/contact" className="hover:text-coral">
            Contact support
          </Link>
          <Link href="/faq" className="hover:text-coral">
            FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
