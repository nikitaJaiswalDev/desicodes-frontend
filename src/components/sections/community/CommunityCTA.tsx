import React from "react";

const CommunityCTA: React.FC = () => {
  return (
    <section className="relative py-10 md:py-24 px-4 md:px-8 overflow-hidden">
      {/* Background with geometric pattern */}
      

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Icon */}
        <div className="flex relative justify-center mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>

          <div className="absolute top-1/2 w-full h-0.5 bg-[linear-gradient(90deg,rgba(0,0,0,0)_0.45%,#CCCCCC_24.82%,#CCCCCC_76.15%,rgba(0,0,0,0)_100%)]"></div>
        </div>

        {/* Main heading */}
        <h2 className="text-3xl font-Lufga md:text-5xl lg:text-7xl font-bold mb-6 text-white leading-[118%] tracking-[-5%]">
          Join the Community!
        </h2>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl font-Lufga font-light text-white mb-12 max-w-2xl mx-auto leading-relaxed">
          Subscribe to DesiCodes to get monthly coding tips, platform updates,
          new feature announcements, and exclusive community perks.
        </p>
      </div>
    </section>
  );
};

export default CommunityCTA;
