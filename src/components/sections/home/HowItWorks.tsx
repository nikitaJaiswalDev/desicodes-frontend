import { ChevronRight } from "lucide-react";
import TemplateImg from "/assets/home/workflows/template.png";
import FormImg from "/assets/home/workflows/form.png";
import FinalImg from "/assets/home/workflows/final.png";
import Customize from "/assets/home/workflows/customize.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const HowItWorks = () => {
  const WorkFlows = [
    {
      id: 1,
      title: "Write",
      subtitle: "Write Code in Your Native Language",
      description: "Code in Assamese, Bengali, or any language you're comfortable with using our intuitive IDE",
      image: TemplateImg,
    },
    {
      id: 2,
      title: "Transpile",
      subtitle: "Instant Python Conversion",
      description: "Watch your native language code automatically transpile to clean, executable Python in real-time",
      image: FormImg,
    },
    {
      id: 3,
      title: "Execute",
      subtitle: "Run Your Code Instantly",
      description: "Test and execute your transpiled Python code directly in the browser with instant results",
      image: FinalImg,
    },
    {
      id: 4,
      title: "Get Certificate",
      subtitle: "Get a Certificate of Completion",
      description: "Get a certificate of completion for your code and share it with the world",
      image: Customize,
    },
  ];

  const navigate = useNavigate();
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = itemRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1 && !visibleItems.includes(index)) {
              setVisibleItems((prev) => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [visibleItems]);

  const handleGetStarted = () => {
    const token = localStorage.getItem("dc_token");
    if (token) {
      navigate("/ide");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 lg:px-5 overflow-hidden">
      <div className="text-center animate-fade-in">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-[57.2px] md:mb-6 animate-slide-down">
          How it works
        </h2>
        <p className="text-base md:text-xl text-white/60 leading-7 tracking-[0.3px] mx-auto px-2 lg:px-8 animate-slide-up animation-delay-200">
          Break language barriers in programming. Write code in your preferred language
          and transpile it to Python seamlessly.
        </p>
      </div>

      {/**Workflows */}
      <div className="flex flex-col gap-10 lg:gap-28 my-10 md:my-28 lg:my-32">
        {WorkFlows.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => { itemRefs.current[index] = el; }}
            className={`flex flex-col items-center gap-6 lg:gap-16 transition-all duration-1000 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } ${visibleItems.includes(index)
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
              }`}
            style={{
              transitionDelay: `${index * 150}ms`,
            }}
          >
            {/* Image */}
            <div className="hidden lg:block w-full lg:w-[60%] justify-center group">
              <div className="relative overflow-hidden rounded-2xl transition-all duration-500 hover:scale-105 hover:rotate-1">
                <img
                  src={item.image}
                  alt={item.subtitle}
                  className="w-full transition-all duration-700 group-hover:scale-110"
                />
                {/* Animated gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </div>

            {/* Content */}
            <div className="w-full lg:w-[40%] lg:text-left space-y-3 md:space-y-4 lg:space-y-5 group">
              <div className="flex items-center gap-2">
                <div className="flex text-sm md:text-base items-center justify-center rounded-full w-6 h-6 md:w-7 p-0.5 md:h-7 md:p-1 bg-[linear-gradient(135deg,#A64FE0_0%,#624FE0_100%)] text-white transition-all duration-300 hover:scale-125 hover:rotate-12 hover:shadow-lg hover:shadow-purple-500/50 animate-pulse-slow">
                  {item.id}
                </div>
                <h3 className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#9A50E1_0%,#7050E0_100%)] font-semibold text-lg md:text-xl leading-8 transition-all duration-300 group-hover:tracking-wider">
                  {item.title}
                </h3>
              </div>

              <h2 className="text-lg md:text-xl lg:text-3xl font-bold text-white transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400">
                {item.subtitle}
              </h2>
              <p className="text-base text-white/60 leading-7 max-w-md mx-auto lg:mx-0 transition-all duration-300 group-hover:text-white/80">
                {item.description}
              </p>

              <button
                onClick={handleGetStarted}
                className="my-2 inline-flex font-semibold md:text-lg items-center bg-[#26262B] hover:bg-white/10 text-[#8D8D99] px-4 py-2 md:px-6 md:py-3 rounded-3xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group/button"
              >
                Get started free
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover/button:translate-x-1" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
