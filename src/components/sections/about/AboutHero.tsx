import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";

const AboutHero: React.FC = () => {
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
    <div className="relative bg-[#05010d] overflow-hidden px-4 py-10 lg:py-28">
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
            className="text-4xl md:text-5xl lg:text-7xl font-bold mb-12 bg-[linear-gradient(91deg,#FFFFFF_0%,#9BD0F5_100%)] bg-clip-text text-transparent"
          >
            The story behind <br /> DesiCodes
          </h1>

          {/* Subtitle */}
          <div className="max-w-[647px] mx-auto mb-12">
            <p className="text-lg font-medium text-white leading-7 tracking-[0%]">
              Born from the vision of making technology accessible to every
              corner of India, DesiCodes started as a small experiment — asPy,
              an Assamese-to-Python converter — and has grown into a
              mission-driven platform for inclusive coding education.
            </p>
          </div>

          {/* CTA Button */}
          <Button onClick={handleGetStarted}>Get Started</Button>
        </div>

        {/* Our Impact Section */}
        <div className="mt-18 md:mt-24 max-w-3xl mx-auto">
          <div className="relative bg-[#05020D] border border-[#262626] p-2 md:p-5 rounded-xl">
            <div className="relative z-10 bg-[#0D0A14] border border-[#262626] p-4 md:p-10">
              <h3 className="text-xl font-semibold text-white mb-4 leading-[150%] tracking-[-3%]">
                Our Impact
              </h3>
              <p className="text-lg text-[#98989A] leading-[150%] tracking-[-3%]">
                Stories, stats, and testimonials showing how DesiCodes is
                helping students, teachers, and self-taught coders learn in
                their native languages — from classroom pilots to community
                workshops across the Northeast.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutHero;
