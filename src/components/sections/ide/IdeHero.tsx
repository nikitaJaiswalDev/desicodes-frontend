import React from "react";

const IdeHero: React.FC = () => {
  return (
    <section className="relative min-h-scree flex flex-col items-center justify-center bg-[#05010d] overflow-hidden px-4 md:px-8 py-10 lg:py-36">
      {/* Background gradient effects */}\
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/about/background.jpg"
          alt="Blur Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-8 relative z-10 text-center max-w-4xl mx-auto">
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight bg-[linear-gradient(91deg,#FFFFFF_0%,#9BD0F5_100%)] bg-clip-text text-transparent">
          Try It Right Now
        </h1>

        {/* Subtitle */}
        {/* <p className="text-base md:text-lg text-white max-w-4xl mx-auto font-Lufga">
          Write code in your native language and see it transpile to Python
          instantly.Write in your preferred programming language and watch it
          seamlessly convert into clean, executable Python instantly. No more
          manual rewriting or tedious translation between languages — just
          write, transpile, and run.
        </p> */}

        {/* CTA Button */}
        {/* <div className="flex justify-center">
          <button
            className="px-8 py-3
             bg-[#FFFFFFE5]
            border-[#0000000D]
             shadow-[0_0_0_3px_#FFFFFF33]
             text-black font-medium rounded-md
             text-sm"
          >
            Get started today
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default IdeHero;
