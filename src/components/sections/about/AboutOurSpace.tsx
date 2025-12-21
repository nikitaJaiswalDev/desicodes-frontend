import React from "react";
import { Clipboard } from "lucide-react";

const AboutOurSpace: React.FC = () => {
  return (
    <div className="py-10 md:py-20 px-4 md:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-32 max-w-2xl mx-auto px-2">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 tracking-[1.2px]">
            Code Without Language Barriers
          </h2>
          <p className="text-xl text-white/40 leading-7 tracking-[0.3px]">
            Join developers worldwide who are breaking language barriers in programming.
            Write code in your native language and transpile it seamlessly to Python.
          </p>
        </div>

        {/* Three Panel Layout */}
        <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 md:px-6">
          {/* Left Column */}
          <div className="md:col-span-2 space-y-4">
            {/* Our Mission - Large Panel */}
            <div className="bg-white/5 rounded-xl p-2 md:p-8 overflow-hidden relative">
              <div className="md:flex justify-between h-full">
                <div className="md:w-1/2 pr-8">
                  <h3 className="md:text-xl font-semibold text-white mb-4 leading-7">
                    Our Mission
                  </h3>
                  <p className="text-xs md:text-base text-white/60 leading-[22px] tracking-[0.4px]">
                    To democratize programming by breaking language barriers.
                    We empower developers to write code in their native language—whether
                    it's Hindi, Bengali, Spanish, or any other language—and seamlessly
                    transpile it to Python. Programming should be accessible to everyone,
                    regardless of their language background.
                  </p>
                </div>
                <div className="hidden lg:block w-1/2">
                  {/* Placeholder for mission image */}
                  <img src="/assets/about/mission.png" />
                </div>
              </div>
            </div>

            {/* Bottom Row - Two Cards */}
            <div className="grid md:grid-cols-2 gap-2 md:gap-4">
              {/* The Team */}
              <div className="col-span-1 bg-white/5 rounded-xl p-2 md:p-8">
                <div className="md:mb-6">
                  <div className="w-8 h-8 bg-linear-to-b from-[#FF6363] to-[#D72A2A] rounded-lg mb-3 md:mb-6 flex items-center justify-center">
                    <Clipboard />
                  </div>
                </div>
                <h3 className="md:text-xl font-semibold text-white mb-2 md:mb-4 leading-7">
                  The Team
                </h3>
                <p className="text-xs md:text-base text-white/60 leading-[22px] tracking-[0.4px]">
                  A passionate group of engineers, language experts, and compiler
                  enthusiasts building the future of multilingual programming.
                  We're dedicated to making code accessible to developers worldwide.
                </p>
              </div>

              {/* Press Kit */}
              <div className="col-span-1 bg-white/5 rounded-xl p-2 md:p-8">
                <div className="md:mb-6">
                  <div className="w-8 h-8 bg-linear-to-b from-[#FF6363] to-[#D72A2A] rounded-lg mb-3 md:mb-6 flex items-center justify-center">
                    <Clipboard />
                  </div>
                </div>
                <h3 className="md:text-xl font-semibold text-white mb-2 md:mb-4 leading-7">
                  Open Source
                </h3>
                <p className="text-xs md:text-base text-white/60 leading-[22px] tracking-[0.4px]">
                  DesiCodes is built on open-source principles. Contribute to our
                  transpiler, add support for new languages, or help improve the IDE.
                  Together, we're building the future of inclusive programming.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Media Inquiries */}
          <div className="h-full">
            <div className="bg-white/5 rounded-xl p-8 h-full relative">
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-white mb-4 leading-7">
                  Media Inquiries
                </h3>
                <p className="text-[15px] text-white/60 leading-[22px] tracking-[0.4px] mb-6">
                  For interviews, press coverage, or feature requests, contact:
                </p>
                <p className="text-[15px] text-white/60 leading-[22px] tracking-[0.4px] font-medium">
                  📧 press@desicodes.in
                </p>
              </div>

              <div className="hidden lg:block lg:absolute bottom-0 right-0 w-[80%] h-[60%] overflow-hidden z-0 pointer-events-none">
                <img
                  src="/assets/about/media.png"
                  alt="media"
                  className="w-[150%] h-[120%] object-cover object-top-left"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutOurSpace;
