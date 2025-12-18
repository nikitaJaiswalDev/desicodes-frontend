import React from "react";
import { Clipboard } from "lucide-react";

const AboutOurSpace: React.FC = () => {
  return (
    <div className="py-10 md:py-20 px-4 md:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-32 max-w-2xl mx-auto px-2">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 tracking-[1.2px]">
            Your Space to Learn, Share & Grow
          </h2>
          <p className="text-xl text-white/40 leading-7 tracking-[0.3px]">
            Connect with learners, teachers, and creators shaping the future of
            coding in Assamese, Bodo, Khasi, and Manipuri.
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
                    To make programming education accessible in every Indian
                    language — starting with the Northeast. We aim to break
                    language barriers so anyone, anywhere, can learn to code
                    with confidence.
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
                  A passionate group of engineers, educators, and linguists
                  working together to build tools that empower regional coders.
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
                  Press Kit
                </h3>
                <p className="text-xs md:text-base text-white/60 leading-[22px] tracking-[0.4px]">
                  Download official brand assets including logos, screenshots,
                  product previews, and media mentions. Perfect for journalists,
                  partners, and collaborators.
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
