import React from "react";
import { Globe } from "lucide-react";

const CertificationsHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-10 lg:py-40">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/about/background.jpg"
          alt="Blur Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/**Language Badge */}
      <div className="hidden lg:absolute lg:flex items-center gap-3 rounded-md top-20 right-40 bg-white/5 border border-white/10 px-4 py-2">
        <Globe className="text-[#60A5FA]" />
        <div>
          <p className="text-[10px] text-[#94A3B8] leading-4">
            Displayed in your browser language:
          </p>
          <h3 className="font-medium text-xs leading-5 text-white">English</h3>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 bg-[linear-gradient(91deg,#FFFFFF_0%,#9BD0F5_100%)] bg-clip-text text-transparent leading-[130%]">
            Licenses & Certifications
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-white font-medium max-w-2xl leading-7">
            A clear overview of permits, approvals and compliance related to our
            products and services
          </p>
        </div>
      </div>
    </section>
  );
};

export default CertificationsHero;
