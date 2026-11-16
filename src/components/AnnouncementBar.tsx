import Link from "next/link";
import { IconArrowRight } from "./icons";

export default function AnnouncementBar() {
  return (
    <div className="bg-ink text-paper">
      <div className="container-wide flex h-10 items-center justify-between gap-6 text-[12px]">
        <p className="truncate font-medium">
          Official stock. Real warranty. Free delivery in Kathmandu Valley.
        </p>
        <div className="hidden items-center gap-6 sm:flex">
          <span className="text-paper">Sunday – Friday, 10:00–19:00</span>
          <Link
            href="/collections?deals=true"
            className="inline-flex items-center gap-1.5 font-semibold text-coral transition-colors hover:text-white"
          >
            Shop deals
            <IconArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
