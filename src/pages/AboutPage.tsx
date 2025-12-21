import React from "react";
import AboutHero from "../components/sections/about/AboutHero";
import AboutOurSpace from "../components/sections/about/AboutOurSpace";
// import AboutPressKit from "../components/sections/about/AboutPressKit";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05010d] text-white">
      <main>
        <AboutHero />
        <AboutOurSpace />
        {/* <AboutPressKit /> */}
      </main>
    </div>
  );
};

export default AboutPage;
