import React from "react";

const TeamProfile: React.FC = () => {
  return (
    <div className="py-20 px-4 bg-[#05010d] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-sm font-medium text-blue-300 tracking-wider uppercase">Leadership</span>
          </div>
          <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-6 tracking-tight">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Team</span>
          </h2>
          <p className="text-xl text-white/40 leading-relaxed max-w-2xl mx-auto">
            Passionate individuals dedicated to breaking language barriers in programming
          </p>
        </div>

        {/* Team Member Profile - Huma */}
        <div className="relative">
          {/* Card Container */}
          <div className="relative bg-[#0D0A14]/80 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
            {/* Decorative Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="p-6 md:p-12 lg:p-16">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">

                {/* Left Side - Photo (Sticky) */}
                <div className="lg:col-span-5 lg:sticky lg:top-12">
                  <div className="relative group">
                    {/* Image Container */}
                    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 p-1.5 shadow-2xl shadow-black/50">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative rounded-xl overflow-hidden aspect-[4/5]">
                        <img
                          src="/assets/about/team/huma.jpeg"
                          alt="Huma Abia Kanta"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />

                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#05010d]/80 via-transparent to-transparent opacity-60" />

                        {/* Floating Badge inside image */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 flex items-center justify-between">
                            <div>
                              <p className="text-xs text-white/60 uppercase tracking-wider font-medium mb-0.5">Role</p>
                              <p className="text-white font-semibold">Founder & Lead</p>
                            </div>
                            <div className="h-8 w-[1px] bg-white/20 mx-4" />
                            <div>
                              <p className="text-xs text-white/60 uppercase tracking-wider font-medium mb-0.5">Age</p>
                              <p className="text-white font-semibold">16 Years</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Elements behind image */}
                    <div className="absolute -z-10 top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full" />
                    <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 blur-[60px] rounded-full" />
                  </div>

                  {/* Achievements & Awards (Filling Empty Space) */}
                  <div className="mt-8 space-y-4">
                    {/* Notable Achievement */}
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-blue-500/30 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm mb-1">Global Recognition</p>
                          <p className="text-xs text-white/60 leading-relaxed">
                            Presented research on ML-Based Prediction of Phycocyanin Purity at an international AI conference in Azerbaijan (2025)
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Awards List */}
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:border-purple-500/30 transition-colors">
                      <p className="text-sm font-semibold text-white/80 mb-3 flex items-center gap-2">
                        <span className="text-yellow-400">🏆</span> Recent Awards
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 text-xs text-white/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                          <span>Chairman's Medal for academic excellence (2025)</span>
                        </div>
                        <div className="flex items-start gap-3 text-xs text-white/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
                          <span>Gems of Northeast Award (2025) - Times Now</span>
                        </div>
                        <div className="flex items-start gap-3 text-xs text-white/60">
                          <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 flex-shrink-0" />
                          <span>Voice of the Youths Award (2025) - Radio Gup-Shup</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Content */}
                <div className="lg:col-span-7 space-y-10">
                  {/* Name Header */}
                  <div className="space-y-3 border-b border-white/10 pb-8">
                    <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                      Huma Abia Kanta
                    </h3>
                    <p className="text-xl text-blue-400 font-medium flex items-center gap-3">
                      Computer Science Scholar & Student Researcher
                    </p>
                  </div>

                  {/* Message Body */}
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-2xl font-semibold text-white mb-2 flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-blue-500"></span>
                        Message from the Founder
                      </h4>
                      <h5 className="text-lg text-white/50 font-medium pl-11">Why DesiCodes Exists</h5>
                    </div>

                    <div className="prose prose-lg prose-invert max-w-none text-white/80 leading-relaxed pl-4 border-l-2 border-white/5">
                      <p className="mb-6">
                        I grew up watching brilliant people hesitate—not because they lacked ideas, but because they had to translate themselves before they could even begin.
                      </p>
                      <p className="mb-6">
                        In classrooms, conversations, and eventually in programming, language quietly decided who could build and who had to wait.
                      </p>

                      <blockquote className="bg-white/5 border-l-4 border-blue-500 p-6 rounded-r-xl my-8 not-italic">
                        <p className="text-xl font-medium text-white mb-2">
                          "Why should learning to code require abandoning the language you think in?"
                        </p>
                        <p className="text-sm text-white/50">
                          — The question that started DesiCodes
                        </p>
                      </blockquote>

                      <p className="mb-6">
                        Programming promises empowerment, yet for millions of students, it comes with an invisible barrier—English. That extra step of translation doesn’t just slow learning; it often stops it altogether.
                      </p>
                      <p className="mb-6">
                        DesiCodes is my attempt to remove that pause.
                      </p>
                      <p className="mb-6">
                        We are building tools that allow learners to write code in their own languages—Assamese, Meitei, Khasi, Bodo, Garo, Mizo, Bangla, and more—while remaining fully compatible with modern programming ecosystems.
                      </p>
                      <p className="mb-6 font-medium text-white">
                        This is not about replacing English. It is about restoring choice.
                      </p>
                      <p className="mb-6">
                        When students can build in the language they own, confidence follows. Creativity follows. Innovation follows.
                      </p>
                      <p className="mb-8">
                        DesiCodes is still evolving, just like the communities it serves. But our belief is firm: <span className="text-blue-300">Technology should expand access, not filter it.</span>
                      </p>
                      <p className="text-white/90 italic">
                        If you believe code belongs to everyone—not just those fluent in a single language—you already belong here.
                      </p>
                    </div>
                  </div>

                  {/* Signature */}
                  <div className="pt-8 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <p className="font-handwriting text-3xl text-blue-300 mb-2 transform -rotate-2 origin-left inline-block">Huma Abia Kanta</p>
                      <p className="text-sm text-white/50 uppercase tracking-widest font-medium">Founder, DesiCodes</p>
                    </div>
                    {/* Optional: Add a small logo or icon here if needed */}
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
