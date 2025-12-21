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
    <section className="py-16 md:py-20 lg:py-24 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Main Container with Glassmorphism Effect */}
        <div className="relative overflow-hidden rounded-3xl">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-500/20 to-blue-500/20 blur-3xl" />

          {/* Border Gradient Glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20 blur-sm" />

          {/* Content Container */}
          <div className="relative bg-[#0D0A14]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 lg:p-16">
            <div className="flex flex-col items-center gap-8 md:gap-10">
              {/* Header */}
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white leading-tight">
                  <span className="block mb-2">Desicodes is more than code</span>
                  <span
                    className="block font-normal bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent"
                    style={{
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    it's a movement to make technology inclusive.
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
                  Join thousands of developers who are breaking language barriers in
                  programming.
                </p>
              </div>

              {/* CTA Button */}
              <div className="relative group">
                {/* Button Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-xl blur opacity-50 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse" />

                {/* Actual Button */}
                <button
                  onClick={handleGetStarted}
                  className="relative px-12 md:px-16 lg:px-20 py-4 md:py-5 bg-white text-black font-semibold text-base md:text-lg rounded-xl
                    transform transition-all duration-300 
                    hover:scale-105 hover:shadow-2xl
                    active:scale-95
                    flex items-center gap-3 cursor-pointer"
                >
                  <span>Start Learning</span>
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center gap-3 mt-4">
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/60">
                  🌍 8 Languages
                </span>
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/60">
                  ⚡ Instant Transpilation
                </span>
                <span className="px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/60">
                  🎓 Free Forever
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
