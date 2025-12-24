import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../UI/Button";

const CommunityHero: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/ide");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center bg-[#05010d] overflow-hidden px-4 md:px-8 py-10 lg:py-28">
      {/* Background gradient effects */}\
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/about/background.jpg"
          alt="Blur Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-8 relative z-10 text-center max-w-4xl mx-auto">
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight bg-[linear-gradient(91deg,#FFFFFF_0%,#9BD0F5_100%)] bg-clip-text text-transparent">
          Code in your mother tongue. Inspire others.
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-white max-w-2xl mx-auto font-Lufga">
          DesiCodes is more than a platform — it's a movement to democratize
          programming for every learner, in every language.
        </p>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button onClick={handleGetStarted}>Get Started</Button>
        </div>
      </div>
    </section>
  );
};

export default CommunityHero;
