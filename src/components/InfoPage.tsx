import React from "react";
import Link from "next/link";
import {
  IconArrowRight,
  IconHeadset,
  IconShieldCheck,
  IconTruck,
  IconWhatsApp,
} from "./icons";

interface InfoPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}

export default function InfoPage({
  title,
  description,
  children,
  aside,
}: InfoPageProps) {
  return (
    <div>
      <section className="container-wide pb-8 pt-9 sm:pb-10 sm:pt-12">
        <div className="grid items-end gap-7 lg:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <h1 className="display max-w-[900px] text-[clamp(44px,7vw,88px)] leading-[0.95]">
              {title}
            </h1>
            <p className="mt-5 max-w-[620px] text-[13.5px] leading-[1.8] text-ink-soft sm:text-[14.5px]">
              {description}
            </p>
          </div>

          <div className="hidden shrink-0 gap-8 pb-1 lg:flex">
            <div>
              <p className="text-[11.5px] text-muted">Established</p>
              <p className="mt-1 text-[15px] font-semibold text-ink">
                Kathmandu, 2026
              </p>
            </div>
            <div>
              <p className="text-[11.5px] text-muted">Last updated</p>
              <p className="mt-1 text-[15px] font-semibold text-ink">
                November 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide pb-14 sm:pb-20">
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
          <article className="info-copy bg-paper">{children}</article>

          <aside className="space-y-3 lg:sticky lg:top-[108px]">
            {aside ?? (
              <>
                <div className="bg-ink p-5 text-paper sm:p-6">
                  <span className="grid h-9 w-9 place-items-center bg-coral text-white">
                    <IconHeadset className="h-4 w-4" />
                  </span>
                  <h2 className="mt-4 text-[17px] font-semibold">
                    Need a hand?
                  </h2>
                  <p className="mt-2 text-[12px] leading-relaxed text-[#b8b8b8]">
                    Real people, Sunday to Friday, 10am – 7pm. We answer order
                    questions, warranty claims and gear advice.
                  </p>

                  <Link
                    href="/contact"
                    className="mt-4 flex h-10 items-center justify-between bg-coral px-4 text-[12px] font-semibold text-white transition-colors hover:bg-white hover:text-ink"
                  >
                    Contact support
                    <IconArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href="https://wa.me/9779800000000"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 flex h-10 items-center justify-between bg-[#222222] px-4 text-[12px] font-semibold text-paper transition-colors hover:bg-cobalt"
                  >
                    <span className="inline-flex items-center gap-2">
                      <IconWhatsApp className="h-3.5 w-3.5" />
                      WhatsApp us
                    </span>
                    <span className="text-[10.5px] text-[#b8b8b8]">
                      ~5 min
                    </span>
                  </a>
                </div>

                <div className="bg-paper-deep p-5 sm:p-6">
                  <p className="text-[12px] font-semibold text-ink">
                    The Cellucity promise
                  </p>
                  <div className="mt-3.5 space-y-3">
                    {[
                      { icon: IconShieldCheck, label: "100% official stock" },
                      { icon: IconTruck, label: "Free valley delivery" },
                      { icon: IconHeadset, label: "Human after-sales support" },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <p
                          key={item.label}
                          className="flex items-center gap-2.5 text-[12px] font-medium text-ink-soft"
                        >
                          <Icon className="h-4 w-4 shrink-0 text-coral" />
                          {item.label}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-paper-deep px-5 py-4">
                  <p className="text-[11.5px] text-muted">Store hours</p>
                  <p className="mt-1 text-[12.5px] font-medium text-ink">
                    Sun – Fri · 10:00–19:00
                  </p>
                </div>
              </>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
