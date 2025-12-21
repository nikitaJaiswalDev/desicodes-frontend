import React from "react";
import type { FeatureCard } from "../../../types";

const features: FeatureCard[] = [
  {
    id: "multilingual-ide",
    icon: "🌍",
    title: "Multilingual IDE",
    subtitle: "Code in Assamese, Bodo, Khasi & Manipuri",
    description:
      "Experience the joy of coding in your native tongue with DesiCodes' Multilingual IDE — where language is no longer a barrier but a bridge to learning.",
    gradient:
      "linear-gradient(96.06deg, #7CEFFF 12.48%, #397EE4 40.34%, #1B0536 87.81%), linear-gradient(0deg, rgba(5, 1, 13, 0.6), rgba(5, 1, 13, 0.6)",
  },
  {
    id: "smart-transpiler",
    icon: "⚙️",
    title: "Smart Transpiler",
    subtitle: "Converts your code into Python automatically",
    description:
      "Our intelligent transpiler engine, asPy, translates regional syntax into Python in real time. No plugins, no setup — just open your browser and start coding in your own language.",
    gradient:
      "linear-gradient(96.06deg, #FD9EFF 12.48%, #9E1F3E 40.34%, #270511 87.81%), linear-gradient(0deg, rgba(5, 1, 13, 0.6), rgba(5, 1, 13, 0.6)",
  },
  {
    id: "learn-by-doing",
    icon: "💡",
    title: "Learn by Doing",
    subtitle: "Explore examples, tutorials & challenges",
    description:
      "Imagine learning to code the same way you think and speak. DesiCodes lets you write logic in your native language and instantly converts it into Python — bringing inclusivity, creativity, and innovation together.",
    gradient:
      "linear-gradient(96.06deg, #FD9EFF 12.48%, #9E1F3E 40.34%, #270511 87.81%), linear-gradient(0deg, rgba(5, 1, 13, 0.6), rgba(5, 1, 13, 0.6)",
  },
  {
    id: "community",
    icon: "🧠",
    title: "Join the Community",
    subtitle: "Converts your code into Python automatically",
    description:
      "Join a movement that makes programming accessible to everyone. From classrooms to creators, DesiCodes empowers every learner to think, code, and build in their mother tongue.",
    gradient:
      "linear-gradient(96.06deg, #7CEFFF 12.48%, #397EE4 40.34%, #1B0536 87.81%),linear-gradient(0deg, rgba(5, 1, 13, 0.6), rgba(5, 1, 13, 0.6)",
  },
];

const FeatureCardComponent: React.FC<{ feature: FeatureCard; index: number }> = ({
  feature,
  index,
}) => {
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
        threshold: 0.1,
        rootMargin: '50px',
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

  return (
    <div
      ref={cardRef}
      style={{ transitionDelay: `${index * 150}ms` }}
      className={`relative rounded-xl overflow-hidden group cursor-pointer
        transform transition-all duration-700 ease-out
        hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
    >
      {/* Background Gradient with Blur Effect */}
      <div
        className="absolute -inset-20 blur-xl filter transition-all duration-500 group-hover:blur-2xl"
        style={{
          background: `linear-gradient(90deg, rgba(5, 1, 13, 0.6) 0%, rgba(5, 1, 13, 0.6) 100%), ${feature.gradient}`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col p-4 md:py-7 md:px-14">
        {/* Icon */}
        <div className="text-lg md:text-xl lg:text-[28px] leading-[39.2px] mb-2 md:mb-4 opacity-90 
          transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
          {feature.icon}
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-1">
            <h3 className="text-[18px] font-semibold text-white leading-[1.3] 
              transition-colors duration-300 group-hover:text-purple-200">
              {feature.title}
            </h3>
            <p className="text-sm md:text-base font-medium text-white/60 leading-[22.5px] tracking-[0.4px]
              transition-colors duration-300 group-hover:text-white/80">
              {feature.subtitle}
            </p>
          </div>

          <p className="text-xs md:text-[14px] text-white/60 leading-[22.5px] tracking-[0.4px] flex-1
            transition-colors duration-300 group-hover:text-white/70">
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section className="py-12 lg:py-36 px-4 md:px-0">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-[72px]">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-[57.2px] md:mb-6">
            Why desicodes
          </h2>
          <p className="text-sm md:text-xl text-white/60 leading-7 tracking-[0.3px] mx-auto px-2 lg:px-8">
            Empowering every voice through code.
            <br />
            Programming shouldn't be limited by language barriers. DesiCodes
            bridges the gap between regional languages and modern computing —
            enabling everyone to think, create, and innovate in their mother
            tongue.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, idx) => {
            return <FeatureCardComponent key={idx} feature={feature} index={idx} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
