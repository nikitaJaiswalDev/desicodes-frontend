import React from "react";
import { useNavigate } from "react-router-dom";

const Newsletter: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("dc_token");
    if (token) {
      navigate("/ide");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="py-10 md:py-14 lg:py-18 px-4 md:px-0">
      <div className="mx-auto">
        {/* Content Container */}
        <div className="flex flex-col items-center gap-8 md:gap-10 lg:gap-12">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white leading-[1.3] mb-4">
              <span>desicodes is more than code </span>
              <br />
              <span className="font-normal">
                it's a movement to make technology inclusive.
              </span>
            </h2>
            <p className="text-[20px] text-[rgba(255,255,255,0.6)] leading-[22px] tracking-[0.4px]">
              Join thousands of developers who are breaking language barriers in
              programming.
            </p>
          </div>

          {/* CTA Form */}
          <div className="">
            <button onClick={handleGetStarted} className="flex-1 rounded-md px-24 bg-white/90 border border-white/5 rounded-2 py-3 text-xs md:text-sm font-medium text-black tracking-[0.2px] hover:bg-white transition-colors duration-200 opacity-90 hover:opacity-100">
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
