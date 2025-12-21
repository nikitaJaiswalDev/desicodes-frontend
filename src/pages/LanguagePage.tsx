import React from "react";
import LanguagesHero from "../components/sections/languages/LanguagesHero";
import LanguageShowcase from "../components/sections/languages/LanguageShowcase";
import Newsletter from "../components/sections/home/Newsletter";

const LanguagesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05010d]">
      <main>
        <LanguagesHero />
        <LanguageShowcase />
        <Newsletter />
      </main>
    </div>
  );
};

export default LanguagesPage;
