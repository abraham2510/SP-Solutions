import Link from "next/link";
import LogoMark from "./icons/LogoMark";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "./icons/SocialIcons";
import { SITE_CONTACTS } from "@/lib/constants";

export default function Footer() {
  const { phone, email, address, maps, socials, legal } = SITE_CONTACTS;

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-x-6 gap-y-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#E7EAEE]">
          {/* Brand */}
          <div className="footer-brand col-span-2 lg:col-span-1">
            <Link href="/" className="logo flex items-center gap-[10px]">
              <LogoMark />
              <span className="logo-text flex flex-col leading-[1.05]">
                <b>SP SOLUTIONS</b>
                <small>Packaging Systems</small>
              </span>
            </Link>
            <p className="mt-4 text-[14px] leading-relaxed text-[#5B6572] max-w-full lg:max-w-[280px]">
              Chennai-based manufacturer and service provider for packaging
              machinery, equipment repair, contract shrink wrapping, and machine
              rentals across Tamil Nadu &amp; India.
            </p>
            <div className="footer-social">
              <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href={socials.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <YouTubeIcon />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="footer-col col-span-1">
            <h5>Company</h5>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/machines">Products</Link>
              </li>
              <li>
                <Link href="/services">Services &amp; Rentals</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Products & Services */}
          <div className="footer-col col-span-1">
            <h5>Offerings</h5>
            <ul>
              <li>
                <Link href="/machines">Flow Wrap Machines</Link>
              </li>
              <li>
                <Link href="/machines">Shrink Tunnel Machines</Link>
              </li>
              <li>
                <Link href="/machines">Batch Coding &amp; Printers</Link>
              </li>
              <li>
                <Link href="/services">Packaging Machine Repair</Link>
              </li>
              <li>
                <Link href="/services">Shrink Machine Rental</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col col-span-2 lg:col-span-1">
            <h5>Get to us</h5>
            <ul>
              <li>
                <a
                  href={maps.shareUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  <p>
                    {address.street},
                    <br />
                    {address.area}, {address.city} {address.pincode}
                  </p>
                </a>
              </li>
              {phone.secondary && (
                <li>
                  <a href={phone.secondary.tel}>{phone.secondary.display}</a>
                </li>
              )}
              <li>
                <a href={phone.primary.tel}>{phone.primary.display}</a>
              </li>
              <li>
                <a
                  href={email.mailto}
                  className="break-all sm:break-normal"
                >
                  {email.primary}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom flex-col sm:flex-row items-start sm:items-center gap-2">
          <span>
            {legal.copyright.replace(". All", ` (${legal.legalStatus} · GST Reg. ${legal.gstRegistrationYear} · CEO: ${legal.ceo}). All`)}
          </span>
          <span className="mono opacity-70">Chennai, Tamil Nadu</span>
        </div>
      </div>
    </footer>
  );
}
