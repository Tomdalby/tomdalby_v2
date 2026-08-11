import Image from "next/image";
import Link from "next/link";

export default function SiteLogo() {
  return (
    <Link aria-label="Thomas Dalby — Home" className="site-logo" href="/">
      <span className="site-logo-mark">
        <Image
          alt=""
          aria-hidden
          fill
          priority
          sizes="340px"
          src="/brand/logo.svg"
        />
      </span>
    </Link>
  );
}
