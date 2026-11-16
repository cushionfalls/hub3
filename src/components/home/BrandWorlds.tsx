import Link from "next/link";
import { BRANDS, productsForBrand } from "@/data/storefront";
import { formatNpr } from "@/lib/currency";
import SectionHeading from "../SectionHeading";
import { IconArrowRight } from "../icons";

const TONE: Record<string, string> = {
  Insta360: "bg-ink text-white",
  JBL: "bg-coral text-white",
  UGREEN: "bg-cobalt text-white",
  Anker: "bg-paper-deep text-ink",
};

export default function BrandWorlds() {
  return (
    <section className="section-sm">
      <div className="container-wide">
        <SectionHeading
          title="Shop by brand"
          description="Four brands we stand behind, each with official stock and local warranty support."
          action={{ label: "All gear", href: "/collections" }}
        />

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {BRANDS.map((brand) => {
            const products = productsForBrand(brand.name);
            const cheapest = Math.min(...products.map((product) => product.price));
            const isLight = brand.name === "Anker";

            return (
              <Link
                key={brand.name}
                href={brand.href}
                className={`group flex min-h-[340px] flex-col justify-between p-5 transition-colors sm:min-h-[380px] ${TONE[brand.name]}`}
              >
                <span className="inline-flex h-9 w-16 items-center justify-center bg-white px-2">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="max-h-4 w-auto max-w-full object-contain"
                  />
                </span>

                <div className="flex flex-1 items-center justify-center py-5">
                  <img
                    src={brand.image}
                    alt={brand.display}
                    className="max-h-[180px] w-[80%] object-contain transition-transform duration-300 group-hover:scale-[1.04] sm:max-h-[200px]"
                  />
                </div>

                <div>
                  <h3 className="text-[20px] font-bold">{brand.display}</h3>
                  <p
                    className={`mt-1 text-[12px] ${
                      isLight ? "text-muted" : "text-white"
                    }`}
                  >
                    {brand.tagline}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-[12px]">
                      From {formatNpr(cheapest)}
                    </span>
                    <IconArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
