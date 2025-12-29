import React from "react";

const CommunityCTA: React.FC = () => {
  const handleDiscordClick = () => {
    window.open("https://discord.com/channels/1454121449240657997/1454121450565931085", "_blank");
  };

  return (
    <section className="relative py-10 md:py-24 px-4 md:px-8 overflow-hidden">
      {/* Background with geometric pattern */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

      <div className="relative z-10 text-center max-w-5xl mx-auto">
        {/* Icon */}
        <div className="flex relative justify-center mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm">
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
          Connect with fellow developers, share your code, and get support from our vibrant community on Discord.
        </p>

        {/* Discord CTA Button */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={handleDiscordClick}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50"
          >
            {/* Discord Logo */}
            <svg 
              className="w-7 h-7 transition-transform group-hover:rotate-12" 
              viewBox="0 0 71 55" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="71" height="55" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            <span className="font-Lufga">Join Our Discord</span>
            <svg 
              className="w-5 h-5 transition-transform group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>

          {/* Community stats or additional info */}
          <div className="flex items-center gap-2 text-white/60 text-sm font-Lufga">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span>Active community</span>
            </div>
            <span>•</span>
            <span>Get instant support</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.8;
          }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default CommunityCTA;
