import React from "react";
import { useNavigate } from "react-router-dom";

const LearnResourcesCTA: React.FC = () => {
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
    <section className="bg-[#05010d] py-10 md:py-24 px-4 md:px-8 lg:px-[130px]">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-4x mx-auto text-center">
        {/* Main heading */}
        <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white leading-[130%] tracking-[-0.9px]">
          Ready to start coding? <br />
          Sign up for free today.
        </h2>

        {/* CTA buttons */}
        <div className="flex flex-row w-full md:w-auto gap-3.5 justify-center items-center px-2 md:px-0">
          <button
            onClick={handleNavigate}
            className="w-full text-sm md:text-base sm:w-auto px-3 py-2 md:px-8 md:py-3
             bg-white
             shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.1)]
             text-[#6366F1] font-medium rounded-lg
             transition-all duration-300 transform hover:scale-105
             hover:shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.15),0px_2px_4px_-2px_rgba(0,0,0,0.1)] cursor-pointer"
          >
            Start learning by doing
          </button>

          <button
            onClick={handleNavigate}
            className="w-full text-sm md:text-base sm:w-auto px-3 py-2 md:px-8 md:py-3 bg-[#3A3DD6] text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
          >
            Explore tutorials
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearnResourcesCTA;
