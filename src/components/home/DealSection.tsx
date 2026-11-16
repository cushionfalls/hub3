import Link from "next/link";
import { DEAL_PRODUCTS } from "@/data/storefront";
import Countdown from "../Countdown";
import ProductCard from "../ProductCard";
import { IconArrowRight } from "../icons";

export default function DealSection() {
  const deals = DEAL_PRODUCTS.slice(0, 4);

  return (
    <section className="bg-ink py-14 text-paper sm:py-20">
      <div className="container-wide">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="display text-[46px] leading-[0.95] sm:text-[62px] lg:text-[76px]">
              Deals worth a look
            </h2>
            <p className="mt-4 max-w-[440px] text-[13px] leading-relaxed text-[#b8b8b8] sm:text-[14px]">
              Official stock at lower prices. The countdown ends at midnight.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
            <div>
              <p className="mb-2 text-[12px] text-[#b8b8b8]">Ends at midnight</p>
              <Countdown tone="dark" />
            </div>
            <Link
              href="/collections?deals=true"
              className="inline-flex h-10 items-center gap-2 self-start bg-coral px-5 text-[12px] font-semibold text-white transition-colors hover:bg-white hover:text-ink sm:self-auto"
            >
              All deals
              <IconArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <div className="mt-9 grid grid-cols-2 gap-x-4 gap-y-7 bg-paper p-4 sm:p-6 lg:grid-cols-4">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p className="mt-5 text-[12px] text-[#b8b8b8]">
          While stock lasts. Prices include all taxes.
        </p>
      </div>
    </section>
  );
}
