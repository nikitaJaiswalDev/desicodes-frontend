import React from "react";
import { useNavigate } from "react-router-dom";

const ContactHero: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/ide");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="relative overflow-hidden py-10 lg:py-40">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/about/background.jpg"
          alt="Blur Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto">
        <div className="text-center mx-auto">
          {/* Main Heading */}
          <h1
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 bg-[linear-gradient(91deg,#FFFFFF_0%,#9BD0F5_100%)] bg-clip-text text-transparent"
          >
            Get in touch with us
          </h1>

          {/* Subtitle */}
          <div className="max-w-[647px] mx-auto mb-12">
            <p className="text-lg font-medium text-white leading-7 tracking-[0%] px-4">
              Have questions, ideas, or want to bring DesiCodes to your
              institution? We'd love to hear from you.
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleGetStarted}
            className="bg-white/90 border border-[#0000000D] shadow-sm text-black px-6 py-3 rounded-md text-sm font-medium tracking-wide hover:bg-white transition-colors cursor-pointer"
          >
            Get started today
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactHero;
