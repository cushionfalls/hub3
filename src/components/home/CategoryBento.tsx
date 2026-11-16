import Link from "next/link";
import {
  CATEGORY_CARDS,
  CATEGORY_COUNTS,
  type CategoryCard,
} from "@/data/storefront";
import SectionHeading from "../SectionHeading";
import { IconArrowRight } from "../icons";

const TONE: Record<string, string> = {
  cobalt: "bg-cobalt text-white",
  coral: "bg-coral text-white",
  acid: "bg-coral text-white",
  ink: "bg-ink text-white",
  sky: "bg-paper-deep text-ink",
  paper: "bg-paper-deep text-ink",
};

export default function CategoryBento() {
  return (
    <section className="section-sm">
      <div className="container-wide">
        <SectionHeading
          title="Shop by category"
          description="Six focused shelves: cameras, audio, charging and the accessories that keep them running."
          action={{ label: "View all gear", href: "/collections" }}
        />

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_CARDS.map((category) => (
            <CategoryTile key={category.label} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryTile({ category }: { category: CategoryCard }) {
  const count = CATEGORY_COUNTS[category.label] ?? 0;
  const isLight = category.tone === "sky" || category.tone === "paper";

  return (
    <Link
      href={category.href}
      className={`group relative flex h-[300px] flex-col justify-between overflow-hidden p-6 transition-colors ${TONE[category.tone]}`}
    >
      <div>
        <p className={`text-[12px] ${isLight ? "text-muted" : "text-white"}`}>
          {count} products
        </p>
        <h3 className="mt-1 text-[28px] font-bold leading-tight">
          {category.label}
        </h3>
      </div>

      <img
        src={category.image}
        alt=""
        className="absolute -bottom-2 right-2 h-[180px] w-[180px] object-contain transition-transform duration-300 group-hover:scale-[1.04] sm:h-[190px] sm:w-[190px]"
      />

      <span
        className={`relative z-10 inline-flex items-center gap-1.5 text-[12px] font-semibold ${
          isLight ? "text-ink" : "text-white"
        }`}
      >
        Shop now
        <IconArrowRight className="h-3.5 w-3.5" />
      </span>
    </Link>
  );
}
