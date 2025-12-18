import React from "react";
import LanguagesHero from "../components/sections/languages/LanguagesHero";
import LanguageShowcase from "../components/sections/languages/LanguageShowcase";
import LanguagesCTA from "../components/sections/languages/LanguagesCTA";

const LanguagesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05010d]">
      <main>
        <LanguagesHero />
        <LanguageShowcase />
        <LanguagesCTA />
      </main>
    </div>
  );
};

export default LanguagesPage;
