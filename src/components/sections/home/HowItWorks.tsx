import { ChevronRight } from "lucide-react";
import TemplateImg from "/assets/home/workflows/template.png";
import FormImg from "/assets/home/workflows/form.png";
import FinalImg from "/assets/home/workflows/final.png";
import Customize from "/assets/home/workflows/customize.png";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const WorkFlows = [
    {
      id: 1,
      title: "Template",
      subtitle: "Select an AI-Powered Template",
      image: TemplateImg,
    },
    {
      id: 2,
      title: "Form",
      subtitle: "Fill out the template",
      description: "As easy as filling out a Google Form",
      image: FormImg,
    },
    {
      id: 3,
      title: "Final",
      subtitle: "Start using",
      image: FinalImg,
    },
    {
      id: 4,
      title: "Customize",
      subtitle: "Further edit using no code",
      image: Customize,
    },
  ];

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
    <section className="max-w-5xl mx-auto px-4 lg:px-5">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-[57.2px] md:mb-6">
          How it works
        </h2>
        <p className="text-base md:text-xl text-white/60 leading-7 tracking-[0.3px] mx-auto px-2 lg:px-8">
          Next generation no-code. Beyond natural language. Why type when you
          can click?
        </p>
      </div>

      {/**Workflows */}
      <div className="flex flex-col gap-10 lg:gap-28 my-10 md:my-28 lg:my-32">
        {WorkFlows.map((item, index) => (
          <div
            key={item.id}
            className={`flex flex-col items-center gap-6 lg:gap-16 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
          >
            {/* Image */}
            <div className="hidden lg:block w-full lg:w-[60%] justify-center">
              <img src={item.image} alt={item.subtitle} />
            </div>

            {/* Content */}
            <div className="w-full lg:w-[40%] lg:text-left space-y-3 md:space-y-4 lg:space-y-5">
              <div className="flex items-center gap-2">
                <div className="flex text-sm md:text-base items-center justify-center rounded-full w-6 h-6 md:w-7 p-0.5 md:h-7 md:p-1 bg-[linear-gradient(135deg,#A64FE0_0%,#624FE0_100%)] text-white">
                  {item.id}
                </div>
                <h3 className="bg-clip-text text-transparent bg-[linear-gradient(90deg,#9A50E1_0%,#7050E0_100%)] font-semibold text-lg md:text-xl leading-8">
                  {item.title}
                </h3>
              </div>

              <h2 className="text-lg md:text-xl lg:text-3xl font-bold text-white">
                {item.subtitle}
              </h2>
              <p className="text-base text-white/60 leading-7 max-w-md mx-auto lg:mx-0">
                {item.description}
              </p>

              <button onClick={handleGetStarted} className="my-2 inline-flex font-semibold md:text-lg items-center bg-[#26262B] hover:bg-white/10 text-[#8D8D99] px-4 py-2 md:px-6 md:py-3 rounded-3xl backdrop-blur-md transition">
                Get started free <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
