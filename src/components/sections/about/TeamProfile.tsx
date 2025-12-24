import React from "react";

const TeamProfile: React.FC = () => {
  return (
    <div className="py-10 px-4 bg-[#05010d]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
          <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-6 tracking-[1.2px]">
            Meet Our Team
          </h2>
          <p className="text-xl text-white/40 leading-7 tracking-[0.3px]">
            Passionate individuals dedicated to breaking language barriers in programming
          </p>
        </div>

        {/* Team Member Profile - Huma */}
        <div className="relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-1 overflow-hidden group hover:from-white/15 hover:to-white/10 transition-all duration-300">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

          <div className="relative bg-[#0D0A14] rounded-2xl p-6 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Side - Photo */}
              <div className="relative">
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-1">
                  <div className="bg-[#05010d] rounded-lg overflow-hidden">
                    <img
                      src="/assets/about/team/huma-photo.jpg"
                      alt="Huma Abia Kanta"
                      className="w-full h-auto object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
                  <p className="text-sm font-semibold">Age 16</p>
                </div>
              </div>

              {/* Right Side - Bio Information */}
              <div className="space-y-6">
                {/* Name & Title */}
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Huma Abia Kanta
                  </h3>
                  <p className="text-lg md:text-xl text-blue-400 font-medium">
                    Computer Science Scholar & Student Researcher
                  </p>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Born */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-blue-500/30 transition-colors">
                    <p className="text-sm text-white/60 mb-1">Born</p>
                    <p className="text-base text-white font-medium">May 24, 2009 • Guwahati, Assam, India</p>
                  </div>

                  {/* Education */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-purple-500/30 transition-colors">
                    <p className="text-sm text-white/60 mb-1">Education</p>
                    <p className="text-base text-white font-medium">Royal Global School, Guwahati</p>
                  </div>

                  {/* Research Focus */}
                  <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-pink-500/30 transition-colors">
                    <p className="text-sm text-white/60 mb-2">Research Focus</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">Machine Learning</span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">Artificial Intelligence</span>
                      <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm">Computer Literacy</span>
                    </div>
                  </div>
                </div>

                {/* Achievements Highlight */}
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-5 border border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Notable Achievement</p>
                      <p className="text-sm text-white/70 leading-relaxed">
                        Presented research paper on ML-Based Prediction of Phycocyanin Purity at an international AI conference in Azerbaijan (2025)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Awards */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-white/80">Recent Awards & Recognition</p>
                  <div className="space-y-2 text-sm text-white/60">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">🏆</span>
                      <span>Chairman's Medal for academic excellence (2025)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-purple-400 mt-1">🏆</span>
                      <span>Gems of Northeast Award (2025) - Times Now</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-pink-400 mt-1">🏆</span>
                      <span>Voice of the Youths Award (2025) - Radio Gup-Shup</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamProfile;
