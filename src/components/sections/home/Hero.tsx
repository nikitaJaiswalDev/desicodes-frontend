import React from "react";
import { useNavigate } from "react-router-dom";

const languages = [
  { native: "অসমীয়া", english: "Assamese" },
  { native: "बड़ो", english: "Bodo" },
  { native: "Khasi", english: "Khasi" },
  { native: "মৈতৈলোন্", english: "Manipuri" },
];

const Hero: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("dc_token");
    if (token) {
      navigate("/ide");
    } else {
      navigate("/login");
    }
  };


  return (
    <section className="relative bg-[#121212] overflow-hidden lg:pt-40 lg:pb-20 px-4 md:px-0">
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/home/homeBg.jpg"
          alt="Blur Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="absolute inset-0 z-0 opacity-10 top-40">
        <img
          src="/assets/home/splashBg.png"
          alt="Blur Background"
          className="mx-auto"
        />
      </div>

      <div className="absolute inset-0 z-0 mx-auto max-w-4xl top-14">
        <img
          src="/assets/home/heroBg.png"
          alt="Blur Background"
          className="mx-auto"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center justify-center md:pt-40">
        {/* Main Heading */}
        <div className="max-w-[700px] text-center mb-4">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-14 md:leading-18 lg:leading-22 tracking-[1.2px] mb-4">
            <span className="text-white font-bold not-italic">Code the </span>
            <span
              style={{
                background:
                  "linear-gradient(80.32deg, #F13DD4 10%, #7000FF 50%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="italic"
            >
              world
            </span>
            <br />
            <span className="text-white font-bold not-italic">
              {" "}
              in your own{" "}
            </span>
            <span
              style={{
                background:
                  "linear-gradient(80.32deg, #F83A3A 10%, #F13DD4 50%, #7000FF 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              className="italic"
            >
              language
            </span>
            <span className="text-white font-bold not-italic">.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-xl leading-[1.3] text-white/40 mx-auto">
            DesiCodes lets you learn programming in Assamese, Bodo, Khasi, and
            Manipuri — directly from your browser. No installations, no setup.
            Just code, run, and explore.
          </p>
        </div>

        {/* CTA Button */}
        <div className="my-6">
          {/* Main Button */}
          <button onClick={handleGetStarted} className="relative bg-white/90 border-3 border-white/30 rounded-md px-16 py-2 text-base font-medium text-[#0D0D0D] tracking-[0.2px] hover:bg-white hover:border-white/50 transition-all duration-300">
            Try it in your language
          </button>
        </div>

        {/* Language Scrolling Banner */}
        <div className="w-full overflow-hidden py-6 md:pt-11 md:pb-0">
          <div className="marquee-track flex items-center justify-center gap-22 whitespace-nowrap">
            {languages.concat(languages).map((lang, index) => (
              <div key={index} className="flex items-center gap-2 min-w-fit">
                <span className="text-[20.4px] text-[rgba(255,255,255,0.4)] font-bengali">
                  {lang.native}
                </span>
                <span className="text-[11.9px] text-[rgba(255,255,255,0.4)]">
                  {lang.english}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
