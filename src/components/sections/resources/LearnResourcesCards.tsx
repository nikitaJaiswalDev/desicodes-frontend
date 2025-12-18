import React from "react";

interface ResourceCard {
  icon: string;
  title: string;
  description: string;
}

const LearnResourcesCards: React.FC = () => {
  const resourceCards: ResourceCard[] = [
    {
      icon: "📓",
      title: "Interactive Notebooks",
      description:
        "You can run lessons directly in your browser with no installations or setup required, making it easy to start learning instantly from any device. Everything is preconfigured, so you can focus entirely on understanding the concepts and writing code.",
    },
    {
      icon: "🎓",
      title: "Teacher Guides",
      description:
        "Our curriculum packs and lesson plans make it easy for teachers to introduce coding in Assamese, Bodo, Khasi, and Manipuri, with simple resources that fit smoothly into any classroom.",
    },
    {
      icon: "💻",
      title: "Sample Programs",
      description:
        "Explore 50+ ready-to-run examples in each language, covering everything from basics to real-world logic. Each example opens instantly in the browser, so you can learn by observing, modifying, and experimenting.",
    },
    {
      icon: "📦",
      title: "Curriculum Packs",
      description:
        "Download structured learning materials, including worksheets and guided modules, to support deeper learning at your own pace. Access is available after registration to ensure secure and personalized resources for every learner.",
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
              className={`group relative rounded-xl p-4 md:p-8 md:py-8 md:px-20 bg-[rgba(255,255,255,0.1)] ${
                index % 2 === 1 ? "md:translate-y-16" : ""
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
