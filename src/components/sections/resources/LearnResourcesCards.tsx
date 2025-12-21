import React from "react";

interface ResourceCard {
  icon: string;
  title: string;
  description: string;
}

const LearnResourcesCards: React.FC = () => {
  const resourceCards: ResourceCard[] = [
    {
      icon: "🌐",
      title: "Multilingual IDE",
      description:
        "Write code in any language - Hindi, Bengali, Assamese, Spanish, or your native language. Our intelligent IDE provides syntax highlighting, auto-completion, and instant error detection, making coding in your language feel natural and intuitive.",
    },
    {
      icon: "⚡",
      title: "Instant Transpilation",
      description:
        "See your native language code convert to Python in real-time as you type. Our advanced transpiler preserves your logic and intent while generating clean, efficient Python code that follows best practices and conventions.",
    },
    {
      icon: "�",
      title: "Code Examples & Templates",
      description:
        "Explore 50+ ready-to-run code examples covering fundamentals to advanced concepts. Each example is available in multiple languages, so you can learn programming concepts in the language you're most comfortable with.",
    },
    {
      icon: "🏆",
      title: "Certificates & Achievements",
      description:
        "Complete coding challenges and earn certificates that showcase your multilingual programming skills. Track your progress, unlock achievements, and share your accomplishments with the global developer community.",
    },
  ];

  return (
    <section className="bg-[#05010d] py-16 md:py-24 px-4 md:px-8 lg:px-[130px]">
      <div className="max-w-7xl mx-auto">
        {/* Grid of resource cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resourceCards.map((card, index) => (
            <div
              key={index}
              className={`group relative rounded-xl p-4 md:p-8 md:py-8 md:px-20 bg-[rgba(255,255,255,0.1)] ${index % 2 === 1 ? "md:translate-y-16" : ""
                }`}
            >
              <div className="relative z-10">
                {/* Icon */}
                <div className="text-lg md:text-xl mb-3 md:mb-6">{card.icon}</div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 md:mb-4">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-white opacity-60 leading-relaxed text-sm md:text-base">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearnResourcesCards;
