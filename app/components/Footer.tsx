import LogoMark from "./icons/LogoMark";
import { FacebookIcon, InstagramIcon, YouTubeIcon } from "./icons/SocialIcons";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="grid grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-x-6 gap-y-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#E7EAEE]">
          {/* Brand */}
          <div className="footer-brand col-span-2 lg:col-span-1">
            <a href="#" className="logo flex items-center gap-[10px]">
              <LogoMark />
              <span className="logo-text flex flex-col leading-[1.05]">
                <b>SP SOLUTIONS</b>
                <small>Packaging Systems</small>
              </span>
            </a>
            <p className="mt-4 text-[14px] leading-relaxed text-[#5B6572] max-w-full lg:max-w-[280px]">
              Chennai-based manufacturer and service provider for packaging machinery, equipment repair, contract shrink wrapping, and machine rentals across Tamil Nadu &amp; India.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" aria-label="YouTube"><YouTubeIcon /></a>
            </div>
          </div>

          {/* Company */}
          <div className="footer-col col-span-1">
            <h5>Company</h5>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#products">Products</a></li>
              <li><a href="#services">Services &amp; Rentals</a></li>
              <li><a href="#gallery">Photo Gallery</a></li>
            </ul>
          </div>

          {/* Products & Services */}
          <div className="footer-col col-span-1">
            <h5>Offerings</h5>
            <ul>
              <li><a href="#products">Flow Wrap Machines</a></li>
              <li><a href="#products">Shrink Tunnel Machines</a></li>
              <li><a href="#products">Batch Coding &amp; Printers</a></li>
              <li><a href="#services">Packaging Machine Repair</a></li>
              <li><a href="#services">Shrink Machine Rental</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col col-span-2 lg:col-span-1">
            <h5>Get to us</h5>
            <ul>
              <li><p>30, Thiruvalluvar St, T.M.P Nagar,<br />Padi, Chennai 600050</p></li>
              <li><a href="tel:+916369667449">+91 63696 67449</a></li>
              <li><a href="tel:+916374580330">+91 63745 80330</a></li>
              <li><a href="mailto:alexnavinkumar@spsolutionsc.com" className="break-all sm:break-normal">alexnavinkumar@spsolutionsc.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom flex-col sm:flex-row items-start sm:items-center gap-2">
          <span>© 2026 SP Solutions (Proprietorship · GST Reg. 2024 · CEO: A S). All rights reserved.</span>
          <span className="mono opacity-70">Chennai, Tamil Nadu</span>
        </div>
      </div>
    </footer>
  );
}
