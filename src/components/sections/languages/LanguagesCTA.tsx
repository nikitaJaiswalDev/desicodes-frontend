import React from 'react';
import { useNavigate } from 'react-router-dom';

const LanguagesCTA: React.FC = () => {
  const navigate = useNavigate();

  const handleStartLearning = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/ide");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Main CTA Container */}
        <div className="text-center space-y-8 lg:space-y-12">
          {/* Heading */}
          <div className="space-y-4 lg:space-y-2">
            <h2 className="max-w-5xl mx-auto text-white space-y-1 leading-10">
              <span className="font-semibold text-2xl md:text-4xl ">
                DesiCodes is more than code{" "}
              </span>
              <br />
              <span className="text-2xl md:text-4xl font-normal">
                it's a movement to make technology inclusive.
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-white/60 max-w-4xl mx-auto leading-relaxed tracking-wide">
              Join thousands of developers who are breaking language barriers in
              programming.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={handleStartLearning}
              className="bg-white/90 hover:bg-white border border-white/5 text-black font-medium px-8 py-3 lg:px-28 lg:py-3 rounded-md transition-all duration-300 hover:shadow-xl text-sm tracking-wide cursor-pointer"
            >
              Start Learning
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LanguagesCTA;