import React from "react";
import { useNavigate } from "react-router-dom";

const LearnResourcesHero: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/certifications");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center bg-[#05010d] px-4 overflow-hidden py-6 lg:py-28">
      {/* Background gradient effects */}\
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/about/background.jpg"
          alt="Blur Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 text-center max-w-4xl mx-auto space-y-6">
        {/* Main heading */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6
             bg-[linear-gradient(91deg,#FFFFFF_0%,#9BD0F5_100%)]
             bg-clip-text text-transparent"
        >
          Learn programming — <br />
          the Desi way.
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium">
          Interactive notebooks, tutorials, and ready-to-run examples designed
          for first-time learners, teachers, and developers.
        </p>

        <button
          onClick={handleNavigate}
          className="w-full sm:w-auto px-16 py-2
             bg-[rgba(255,255,255,0.9)]
             border-[3px] border-[rgba(255,255,255,0.3)]
             text-[#0D0D0D] font-medium rounded-md
             transition-all duration-300 transform shadow-lg hover:shadow-xl"
        >
          Start Learning
        </button>

        <div className="flex flex-col justify-center items-center z-50 w-fit mx-auto gap-4 text-gray-400 hover:text-gray-300 transition-colors cursor-pointer">
          <span className="text-sm font-medium opacity-40">Learn more</span>
          <svg
            className="w-4 h-4 opacity-40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
      {/* Bottom section with "You're in good company" */}
      <div className="text-center mt-14 z-50 font-Lufga">
        <h2 className="text-2xl md:text-3xl lg:text-6xl font-bold mb-8 text-white bg-clip-text">
          You're in the Right <br />
          Place to Begin
        </h2>
        <p className="text-white opacity-40 text-lg md:text-xl max-w-xl mx-auto">
          Join a Growing Movement of Native-Language Coders <br />
          Your journey inspires the next generation.
        </p>
      </div>
    </section>
  );
};

export default LearnResourcesHero;
