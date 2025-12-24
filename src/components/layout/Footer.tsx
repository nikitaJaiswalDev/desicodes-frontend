import React from "react";
import type { SocialLink } from "../../types";
import { Link } from "react-router-dom";

const socialLinks: SocialLink[] = [
  {
    id: "twitter",
    name: "Twitter",
    href: "https://twitter.com/desicodes",
  },
  {
    id: "github",
    name: "GitHub",
    href: "https://github.com/desicodes",
  },
];

const platformLinks = [
  { label: "Languages", href: "/languages" },
  { label: "Learn & Resources", href: "/resources" },
  { label: "Community", href: "/community" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const Footer: React.FC = () => {
  return (
    <footer className="py-[72px] px-[130px] max-md:px-6 max-sm:px-8">
      <div className="max-w-[1440px] mx-auto">
        {/* Main Footer Content */}
        <div
          className="flex gap-[235px] items-start justify-center mb-[52px]
         max-lg:gap-20 max-md:flex-col max-md:gap-12 max-md:items-start max-md:justify-start"
        >
          {/* Brand Section */}
          <div className="flex flex-col gap-8 w-[415.93px] max-md:w-full">
            <div className="flex flex-col gap-2">
              <h3
                className="text-[23px] font-bold italic bg-[linear-gradient(80.32deg,#F83A3A_10%,#F13DD4_50%,#7000FF_90%)] bg-clip-text text-transparent leading-[1.3]"
                style={{ WebkitBackgroundClip: "text" }}
              >
                <img src="/logo.png" alt="DesiCodes Logo" className="h-12 sm:h-16 w-auto" />
              </h3>
              <p className="text-[14px] text-gray-400 leading-5">
                Break language barriers in programming.
                <br className="max-md:hidden" />
                Write code in your native language and transpile it to Python seamlessly.
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 items-center">
              {socialLinks.map((social) => (
                <Link
                  key={social.id}
                  to={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {social.id === "twitter" ? (
                    // Twitter Icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#FFFFFF99"
                      className="w-5 h-5 hover:opacity-80 transition-opacity"
                    >
                      <path d="M18.244 2H21.5l-7.62 8.71L23.5 22h-7.69l-6.01-7.42L3.91 22H.66l8.2-9.37L.5 2h7.82l5.44 6.73L18.24 2zm-2.69 17h2.24L8.57 4h-2.3l9.28 15z" />
                    </svg>
                  ) : (
                    // GitHub icon
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="#FFFFFF99"
                      viewBox="0 0 24 24"
                    >
                      {" "}
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.86 10.97.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.39-3.87-1.39-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.44-2.7 5.41-5.28 5.7.42.36.8 1.1.8 2.22v3.29c0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />{" "}
                    </svg>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="flex gap-[52px] flex-1 max-md:flex-col max-md:gap-10 max-md:w-full">
            {/* Platform Links */}
            <div className="flex flex-col gap-[18px] flex-1">
              <h4 className="text-[14px] font-semibold text-white uppercase tracking-[0.7px]">
                Platform
              </h4>
              <div className="flex flex-col gap-4">
                {platformLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-[16px] text-gray-400 hover:text-white leading-6"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Company Links */}
            <div className="flex flex-col gap-[18px] flex-1">
              <h4 className="text-[14px] font-semibold text-white uppercase tracking-[0.7px]">
                Company
              </h4>
              <div className="flex flex-col gap-4">
                {companyLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-[16px] text-gray-400 hover:text-white leading-7"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-[#333333] pt-[34px] text-center">
          <p className="text-[14px] text-gray-400">
            © 2025 DesiCodes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
