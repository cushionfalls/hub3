import { EDITORIAL_DROP } from "@/data/storefront";
import ProductCard from "../ProductCard";
import SectionHeading from "../SectionHeading";

export default function FeatureDrop() {
  const { lead, sideTop, sideBottom } = EDITORIAL_DROP;

  return (
    <section className="section">
      <div className="container-wide">
        <SectionHeading
          title="New this week"
          description="A few recent arrivals our team is actually using, testing and recommending."
          action={{ label: "Shop new arrivals", href: "/collections?sort=newest" }}
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[lead, sideTop, sideBottom].map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
