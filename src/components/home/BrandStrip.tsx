import Link from "next/link";
import { BRANDS } from "@/data/storefront";

export default function BrandStrip() {
  return (
    <section className="bg-paper-deep">
      <div className="container-wide flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12px] font-semibold text-muted">
          Authorized retailer for
        </p>

        <div className="flex flex-wrap items-center gap-x-10 gap-y-4">
          {BRANDS.map((brand) => (
            <Link
              key={brand.name}
              href={brand.href}
              aria-label={brand.name}
              className="flex items-center"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="h-4 w-auto max-w-[96px] object-contain sm:h-5"
              />
            </Link>
          ))}
        </div>

        <p className="hidden text-[12px] text-muted lg:block">
          100% genuine, warranty backed
        </p>
      </div>
    </section>
  );
}
