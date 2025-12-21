import React from "react";
import { useNavigate } from "react-router-dom";
import AssameseImage from "/assets/languages/assamese.png";
import BodoImg from "/assets/languages/bodo.png";
import KhasiImg from "/assets/languages/khasi.png";
import ManipuriImg from "/assets/languages/manipuri.png";

interface LanguageCardProps {
  title: string;
  description: string;
  ctaText: string;
  image: string;
  reverse?: boolean;
  languageSlug: string; // Add language slug for navigation
  index?: number; // For staggered animations
}

const LanguageCard: React.FC<LanguageCardProps> = ({
  title,
  description,
  ctaText,
  image,
  reverse = false,
  languageSlug,
  index = 0,
}) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animations
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the card is visible
        rootMargin: '50px', // Start animation slightly before element is in view
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleOpenIDE = () => {
    // Navigate to IDE with language query parameter
    navigate(`/ide?lang=${languageSlug}`);
  };

  return (
    <div
      ref={cardRef}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`flex flex-col px-2 ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        } gap-8 lg:gap-16 xl:gap-20 items-center py-6 lg:py-16 
        transform transition-all duration-1000 ease-out
        ${isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-12'
        }`}
    >
      {/* Content */}
      <div className="lg:w-1/2 space-y-6 lg:space-y-8">
        <div className="space-y-4 lg:space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-white leading-9">
            {title}
          </h2>
          <p className="text-sm md:text-base text-white/60 leading-6 pr-8">
            {description}
          </p>
        </div>

        {/* CTA Link */}
        <div
          onClick={handleOpenIDE}
          className="flex items-center space-x-3 lg:space-x-4 group cursor-pointer 
            px-4 py-2 -mx-4 rounded-lg hover:bg-white/5 transition-all duration-300"
        >
          <span className="text-sm font-medium text-white tracking-wide 
            group-hover:text-[#7001FE] transition-colors duration-300">
            {ctaText}
          </span>
          <svg
            className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-white 
              group-hover:text-[#7001FE] group-hover:translate-x-2 
              transition-all duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Image */}
      <div className="lg:w-1/2 overflow-hidden rounded-lg group">
        <img
          src={image}
          className="h-auto w-full transform transition-all duration-700 
            group-hover:scale-105 group-hover:rotate-1"
        />
      </div>
    </div>
  );
};

const LanguageShowcase: React.FC = () => {
  const languages = [
    {
      title: "English",
      languageSlug: "English",
      description:
        "Start your coding journey with English, the universal language of programming. DesiCodes supports English syntax to make learning accessible for everyone. Perfect for beginners and those familiar with traditional programming environments.",
      imageAlt: "English IDE interface showing code editor",
      ctaText: "Open English IDE",
      image: AssameseImage, // Using a generic IDE image
      reverse: false,
    },
    {
      title: "Assamese (asPy)",
      languageSlug: "Assamese",
      description:
        "Meet asPy, our Assamese-to-Python transpiler engine. It's the foundation of DesiCodes — turning Assamese syntax and keywords into real, executable Python code. Try examples, create projects, or explore how Assamese logic flows through the global programming language.",
      imageAlt: "Assamese IDE interface showing code editor",
      ctaText: "Open Assamese IDE",
      image: AssameseImage,
      reverse: true,
    },
    {
      title: "Bengali",
      languageSlug: "Bengali",
      description:
        "Code in Bengali with our native syntax support. We empower Bengali speakers to express computational logic naturally, bridging definitions and keywords to Python's powerful ecosystem.",
      imageAlt: "Bengali IDE interface",
      ctaText: "Open Bengali IDE",
      image: AssameseImage, // Placeholder: Reusing Assamese due to script similarity
      reverse: false,
    },
    {
      title: "Bodo",
      languageSlug: "Bodo",
      description:
        "DesiCodes brings Bodo into the digital age. The Bodo-to-Python module makes coding accessible and expressive — for classrooms, hobbyists, and aspiring developers alike.",
      imageAlt: "Bodo IDE interface showing code editor",
      ctaText: "Open Bodo IDE",
      image: BodoImg,
      reverse: true,
    },
    {
      title: "Manipuri (Meitei)",
      languageSlug: "Manipuri",
      description:
        "With Manipuri support, DesiCodes opens a new path for local learners to enter the coding world. Simple syntax, clear feedback, and native-language documentation make the experience effortless.",
      imageAlt: "Manipuri IDE interface showing code editor",
      ctaText: "Open Manipuri IDE",
      image: ManipuriImg,
      reverse: false,
    },
    {
      title: "Khasi",
      languageSlug: "Khasi",
      description:
        "Khasi creators can now express logic and creativity in their own words. Build, test, and share programs that speak your language — literally.",
      imageAlt: "Khasi IDE interface showing code editor",
      ctaText: "Open Khasi IDE",
      image: KhasiImg,
      reverse: true,
    },
    {
      title: "Garo",
      languageSlug: "Garo",
      description:
        "Bring the power of programming to the Garo community. Write, test, and deploy code using familiar Roman script principles adapted for Garo vocabulary.",
      imageAlt: "Garo IDE interface",
      ctaText: "Open Garo IDE",
      image: KhasiImg, // Placeholder: Reusing Khasi due to Roman script
      reverse: false,
    },
    {
      title: "Mizo",
      languageSlug: "Mizo",
      description:
        "Mizo programming made easy. Express logic naturally in Mizo and bridge the gap to global tech, creating a seamless learning curve for new developers.",
      imageAlt: "Mizo IDE interface",
      ctaText: "Open Mizo IDE",
      image: KhasiImg, // Placeholder: Reusing Khasi due to Roman script
      reverse: true,
    },
  ];

  return (
    <section className="py-16 lg:py-16 px-4 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Language Cards */}
        <div className="space-y-0">
          {languages.map((language, index) => (
            <LanguageCard
              key={language.title}
              title={language.title}
              description={language.description}
              ctaText={language.ctaText}
              image={language.image}
              reverse={language.reverse}
              languageSlug={language.languageSlug}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageShowcase;
