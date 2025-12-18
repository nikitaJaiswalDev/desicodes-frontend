import React from 'react';
import { useNavigate } from 'react-router-dom';

const LanguagesHero: React.FC = () => {
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
    <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-10 lg:py-40">
      {/* Background Animation Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/about/background.jpg"
          alt="Blur Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-[linear-gradient(91deg,#FFFFFF_0%,#9BD0F5_100%)] leading-tight max-w-4xl mx-auto">
          Write real programs in your language.
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-white font-medium max-w-2xl mx-auto leading-relaxed px-4">
          Our browser-based IDE lets you code, run, and debug instantly. Every
          line you write in your mother tongue is converted into Python — the
          world's most versatile language.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={handleGetStarted}
            className="bg-white/90 text-sm hover:bg-white text-black font-medium px-8 py-3 md:px-20 rounded-md transition-all duration-300 hover:shadow-lg border border-black/5 shadow-[0_0_0_3px_rgba(255,255,255,0.2)] cursor-pointer"
          >
            Get started today
          </button>
        </div>
      </div>
    </section>
  );
};

export default LanguagesHero;