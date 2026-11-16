import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply when you shop with Cellucity Hub, including pricing, orders, delivery, returns and warranty.",
};

export default function TermsPage() {
  return (
    <InfoPage
      title="Terms & conditions"
      description="These terms apply to every purchase made through Cellucity Hub. We have kept them short and readable on purpose."
    >
      <p>
        <strong>Last updated:</strong> November 2026
      </p>
      <p>
        By placing an order on this website, by phone or through WhatsApp, you
        agree to these terms. If you do not agree, please do not place an order.
      </p>

      <h2>Products and availability</h2>
      <p>
        All products we sell are intended for use in Nepal. Product images are
        for illustration; minor differences in packaging or accessories may
        occur between production batches. Stock is updated regularly, but if an
        item becomes unavailable after you order we will contact you to offer an
        alternative, a store credit or a full refund.
      </p>

      <h2>Pricing and payment</h2>
      <ul>
        <li>All prices are displayed in Nepalese Rupees (NPR) and include applicable taxes.</li>
        <li>Delivery inside Kathmandu Valley is free unless stated otherwise.</li>
        <li>
          We accept cash on delivery, eSewa, Khalti and bank transfer. Card
          payments may be available in-store.
        </li>
        <li>
          We may correct pricing errors before dispatch. If the corrected price
          is higher, you may cancel the order for a full refund.
        </li>
      </ul>

      <h2>Orders and confirmation</h2>
      <p>
        An order is confirmed when we send you an order confirmation by phone,
        email or SMS. We may cancel an order if the item is unavailable, if we
        cannot verify the delivery details, or if we suspect fraud. Any payment
        already made will be refunded in full.
      </p>

      <h2>Delivery</h2>
      <p>
        Orders placed before 3:00pm inside Kathmandu Valley are usually
        dispatched the same day. Deliveries elsewhere in Nepal typically arrive
        within 1–3 business days. Delivery times are estimates and may be
        affected by weather, strikes or courier delays.
      </p>

      <h2>Returns and warranty</h2>
      <p>
        Returns are accepted within 7 days of delivery in line with our{" "}
        <Link href="/returns">Returns Policy</Link>. Every product carries the
        manufacturer warranty described in our{" "}
        <Link href="/warranty">Warranty Policy</Link>.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All brand names, logos and product images belong to their respective
        owners and are used with permission or under applicable distribution
        agreements. The Cellucity Hub name, layout and original content may not
        be copied without written permission.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, our liability for any claim relating to
        a product is limited to the purchase price of that product. We are not
        liable for indirect losses such as lost profits or lost data. Nothing in
        these terms limits rights you have under Nepalese consumer law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of Nepal. Disputes will first be
        handled in good faith by our support team and, if unresolved, by the
        competent courts of Kathmandu.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href="mailto:hello@cellucityhub.com">hello@cellucityhub.com</a> or{" "}
        <Link href="/contact">use our contact form</Link>.
      </p>
    </InfoPage>
  );
}
