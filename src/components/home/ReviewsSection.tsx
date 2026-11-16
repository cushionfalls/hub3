import Link from "next/link";
import { REVIEWS } from "@/data/storefront";
import { IconStar } from "../icons";

export default function ReviewsSection() {
  return (
    <section className="bg-paper-deep py-14 sm:py-20">
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <div>
            <h2 className="display text-[46px] leading-[0.95] sm:text-[58px]">
              What customers say
            </h2>
            <p className="mt-4 max-w-[340px] text-[13px] leading-relaxed text-muted">
              Feedback from people who bought from us, used the gear and came
              back.
            </p>

            <div className="mt-7 flex items-end gap-4">
              <p className="text-[56px] font-bold leading-none text-ink">4.9</p>
              <div className="pb-1">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <IconStar key={star} className="h-3.5 w-3.5 text-coral" />
                  ))}
                </div>
                <p className="mt-1 text-[12px] text-muted">2,400+ reviews</p>
              </div>
            </div>

            <Link
              href="/collections"
              className="mt-6 inline-flex h-10 items-center bg-ink px-4 text-[12px] font-semibold text-paper transition-colors hover:bg-coral"
            >
              Shop the favourites
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {REVIEWS.map((review, index) => (
              <article
                key={review.name}
                className={`flex flex-col p-5 ${
                  index === 0 ? "bg-ink text-paper" : "bg-paper text-ink"
                }`}
              >
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <IconStar key={star} className="h-3 w-3 text-coral" />
                  ))}
                </div>

                <blockquote className="mt-4 flex-1 text-[13px] leading-[1.7]">
                  “{review.quote}”
                </blockquote>

                <div className="mt-5">
                  <p className="text-[12px] font-semibold">{review.name}</p>
                  <p
                    className={`mt-1 text-[11px] ${
                      index === 0 ? "text-[#b8b8b8]" : "text-muted"
                    }`}
                  >
                    {review.role}
                  </p>
                  <p
                    className={`mt-2 text-[11px] ${
                      index === 0 ? "text-[#b8b8b8]" : "text-muted"
                    }`}
                  >
                    Bought {review.product}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
