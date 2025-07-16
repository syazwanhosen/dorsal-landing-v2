import { Link } from "react-router-dom";
import logo from "@/assets/Footer-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#864196] to-[#F33594] text-white lg:pt-14 lg:pb-8 pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand Section */}
        <div>
          <div className="flex items-center mb-2">
            <img
              src={logo}
              alt="Dorsal Logo"
              className="lucide lucide-panels-top-left mr-2 w-50 h-10"
              loading="lazy"
            />
          </div>
          <p className="text-sm text-white lg:pr-24">
            Crowdsourcing medical bill transparency for everyone.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-base text-white font-bold mb-3">Product</h3>
          <ul className="space-y-1 text-sm text-white">
            <li><Link to="/hospitals">Search Bills</Link></li>
            <li><a href="/#UploadBill">Upload Bills</a></li>
            <li>
              <Link
                to="#"
                onClick={(e) => e.preventDefault()}
                className="pointer-events-none opacity-50 cursor-not-allowed"
              >
                Negotiate
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-base text-white font-bold mb-3">Company</h3>
          <ul className="space-y-1 text-sm text-white">
            <li>
              <a
                href="https://www.linkedin.com/company/dorsal-fyi/"
                target="_blank"
                rel="noopener noreferrer"
              >
                About
              </a>
            </li>
            <li><Link to="/privacy-policy">Privacy</Link></li>
            <li><Link to="/terms-and-conditions">Terms</Link></li>
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/security">Security</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-base text-white font-bold mb-3">Support</h3>
          <ul className="space-y-1 text-sm text-white">
            <li>
              <a
                href="https://substack.com/@dorsalfyi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Help Center
              </a>
            </li>
            <li>
              <a href="mailto:abrar@dorsal.fyi">Contact</a>
            </li>
            <li>
              <span className="opacity-50 cursor-not-allowed">Community (Coming Soon)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider Line */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        <div className="border-t border-white/70" />
      </div>

      {/* Copyright */}
      <div className="lg:mt-7 lg:mb-2 mt-4 text-center text-sm text-white">
        © 2025 Dorsal. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
