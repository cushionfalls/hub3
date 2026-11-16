import type { Metadata } from "next";
import WishlistClient from "./WishlistClient";

export const metadata: Metadata = {
  title: "Wishlist",
  description:
    "Your saved Cellucity Hub gear. Keep a shortlist of cameras, audio and charging products and come back when you are ready.",
};

export default function WishlistPage() {
  return <WishlistClient />;
}
