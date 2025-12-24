import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";

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

        <Button onClick={handleNavigate}>Start Learning</Button>

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
    </section>
  );
};

export default LearnResourcesHero;
