import React from "react";
import type { Language } from "../../../types";
import { useNavigate } from "react-router-dom";

const languages: Language[] = [
  {
    id: "English",
    name: "English",
    nativeName: "English",
    description:
      "Learn programming concepts in English and see them translated to Python.",
    isActive: true,
  },
  {
    id: "Assamese",
    name: "Assamese",
    nativeName: "অসমীয়া",
    description:
      "Learn programming concepts in Assamese and see them translated to Python.",
    isActive: true,
  },
  {
    id: "Bengali",
    name: "Bengali",
    nativeName: "বাংলা",
    description:
      "Learn programming concepts in Bengali and see them translated to Python.",
    isActive: true,
  },
  {
    id: "Bodo",
    name: "Bodo",
    nativeName: "बड़ो",
    description:
      "Learn programming concepts in Bodo and see them translated to Python.",
    isActive: true,
  },
  {
    id: "Manipuri",
    name: "Manipuri",
    nativeName: "মৈতৈলোন্",
    description:
      "Learn programming concepts in Manipuri and see them translated to Python.",
    isActive: true,
  },
  {
    id: "Khasi",
    name: "Khasi",
    nativeName: "Khasi",
    description:
      "Learn programming concepts in Khasi and see them translated to Python.",
    isActive: true,
  },
  {
    id: "Garo",
    name: "Garo",
    nativeName: "Garo",
    description:
      "Learn programming concepts in Garo and see them translated to Python.",
    isActive: true,
  },
  {
    id: "Mizo",
    name: "Mizo",
    nativeName: "Mizo",
    description:
      "Learn programming concepts in Mizo and see them translated to Python.",
    isActive: true,
  },
];

const LanguageCard: React.FC<{ language: Language }> = ({ language }) => {
  const navigate = useNavigate();

  const handleTryLanguage = () => {
    // Navigate to IDE with language query parameter
    navigate(`/ide?lang=${language.name}`);
  };

  return (
    <div
      className={`
        bg-white/5 shadow-md rounded-xl p-3 md:p-[35px_35px_24px] max-w-lg h-full flex flex-col gap-3 
        transition-all duration-300 hover:bg-white/10 hover:scale-105 cursor-pointer
        transform hover:shadow-2xl hover:shadow-purple-500/20
      `}
      onClick={handleTryLanguage}
    >
      <h3 className="text-sm md:text-base font-semibold text-white leading-6">
        {language.name}
      </h3>

      <p className="text-[15px] text-white/60 leading-[22px] tracking-[0.4px] flex-1">
        {language.description}
      </p>

      <div className="flex items-center gap-2 text-[#7001FE] group">
        <span className="leading-6 group-hover:text-[#8B3DFF] transition-colors">
          Try {language.name}
        </span>
        <span className="leading-6 transform group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );
};

interface LanguageShowcaseProps {
  title?: string;
  subtitle?: string;
  isAboutPage?: boolean;
}

const LanguageShowcase: React.FC<LanguageShowcaseProps> = ({
  title = "Code in your language",
  subtitle = "Our platform supports 8 languages including English and regional languages from Northeast India, enabling users to code, learn, and build projects in their native tongues.",
  isAboutPage = false,
}) => {
  return (
    <section className="space-y-8 sm:space-y-10 md:space-y-20 px-4 md:px-0">
      <div className="max-w-3xl mx-auto">
        <div className="relative bg-[#05020D] border border-[#262626] p-2 md:p-5 rounded-xl">
          <div className="relative z-10 bg-[#0D0A14] border border-[#262626] p-4 md:p-10">
            <h3 className="text-xl font-semibold text-white mb-4 leading-[150%] tracking-[-3%]">
              desicodes IDE
            </h3>
            <p className="text-sm md:text-lg text-[#98989A] leading-[150%] tracking-[-3%]">
              Write, run, and share code in English, Assamese, Bengali, Bodo, Manipuri, Khasi, Garo & Mizo —
              all in your browser. Experience coding that speaks your language.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-[52px] mx-auto">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-[#e6e6e6] leading-14 md:mb-6">
            {isAboutPage ? (
              <span className="text-[#e6e6e6]">{title}</span>
            ) : (
              <>
                Code in your <span className="text-white/40">language</span>
              </>
            )}
          </h2>
          <p className="max-w-3xl mx-auto text-sm lg:text-xl text-white/60 leading-7 tracking-[0.3px]">
            {subtitle}
          </p>
        </div>

        {/* Language Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto gap-4">
          {languages.map((language) => (
            <LanguageCard key={language.id} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageShowcase;
