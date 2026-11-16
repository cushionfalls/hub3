import type { Metadata } from "next";
import Link from "next/link";
import InfoPage from "@/components/InfoPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Cellucity Hub collects, uses and protects your personal information when you shop with us.",
};

export default function PrivacyPolicyPage() {
  return (
    <InfoPage
      title="Privacy policy"
      description="We collect only what we need to process orders, deliver products and support you after the sale. Here is exactly what that means."
    >
      <p>
        <strong>Last updated:</strong> November 2026
      </p>
      <p>
        This policy explains how Cellucity Hub (&quot;we&quot;, &quot;us&quot;)
        handles personal information when you visit our website, contact us or
        place an order. By using the site you agree to this policy.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Order details:</strong> name, phone number, email address,
          delivery address and the products you buy.
        </li>
        <li>
          <strong>Account details:</strong> if you create an account, your name,
          email and order history.
        </li>
        <li>
          <strong>Support conversations:</strong> messages you send through our
          contact form, email or WhatsApp.
        </li>
        <li>
          <strong>Technical data:</strong> browser type, device type and pages
          viewed, collected in aggregate to keep the site fast and secure.
        </li>
        <li>
          <strong>Payment references:</strong> the provider and transaction
          reference for eSewa, Khalti or card payments. We never store full card
          numbers.
        </li>
      </ul>

      <h2>How we use your information</h2>
      <ul>
        <li>To confirm, pack, dispatch and deliver your order.</li>
        <li>To provide warranty support, returns and after-sales service.</li>
        <li>To answer questions and improve our product selection.</li>
        <li>
          To send order updates. Marketing emails are sent only if you opt in,
          and every message includes an unsubscribe link.
        </li>
        <li>To prevent fraud and meet our legal and accounting obligations.</li>
      </ul>

      <h2>Sharing your information</h2>
      <p>
        We share only what is necessary with delivery partners, payment
        processors and authorized service centres. We do not sell your personal
        information to third parties. Where required by law, we may disclose
        information to government authorities.
      </p>

      <h2>Cookies</h2>
      <p>
        We use essential cookies to keep your cart working and to remember basic
        preferences. Analytics, where enabled, is aggregated and never used to
        identify you personally. You can clear cookies in your browser at any
        time.
      </p>

      <h2>Data retention</h2>
      <p>
        Order and warranty records are kept for as long as required for warranty
        service and tax compliance. Support conversations are kept for up to two
        years. You may ask us to delete information that we are not legally
        required to retain.
      </p>

      <h2>Your rights</h2>
      <p>
        You can request a copy of the personal information we hold about you,
        ask us to correct it, or ask us to delete it where no legal obligation
        requires retention. Contact{" "}
        <a href="mailto:hello@cellucityhub.com">hello@cellucityhub.com</a> with
        the subject &quot;Privacy request&quot;.
      </p>

      <h2>Security</h2>
      <p>
        We use HTTPS across the site, restrict access to order data to staff who
        need it and review our practices regularly. No system is perfectly
        secure, so please avoid sending sensitive information such as full card
        numbers over email or WhatsApp.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy as our services evolve. The &quot;last
        updated&quot; date above will always reflect the current version.
      </p>

      <p>
        Questions? <Link href="/contact">Contact our team</Link> and we will
        explain anything that is unclear.
      </p>
    </InfoPage>
  );
}
