import type { Metadata } from "next";
import { Suspense } from "react";
import CollectionsClient from "./CollectionsClient";

export const metadata: Metadata = {
  title: "All Gear",
  description:
    "Shop official Insta360, JBL, UGREEN and Anker gear at Cellucity Hub. Filter by brand, category, price and deals.",
};

export default function CollectionsPage() {
  return (
    <Suspense
      fallback={
        <div className="container-wide py-16">
          <div className="h-6 w-32 animate-pulse bg-paper-deep" />
          <div className="mt-5 h-20 w-3/4 animate-pulse bg-paper-deep" />
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index}>
                <div className="aspect-square animate-pulse bg-paper-deep" />
                <div className="mt-3 h-4 w-2/3 animate-pulse bg-paper-deep" />
                <div className="mt-2 h-4 w-1/3 animate-pulse bg-paper-deep" />
              </div>
            ))}
          </div>
        </div>
      }
    >
      <CollectionsClient />
    </Suspense>
  );
}
