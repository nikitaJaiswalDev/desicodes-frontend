import React from "react";
import LearnResourcesHero from "../components/sections/resources/LearnResourcesHero";
import LearnResourcesCards from "../components/sections/resources/LearnResourcesCards";
import Newsletter from "../components/sections/home/Newsletter";

const LearnResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05010d] text-white">
      <main>
        <LearnResourcesHero />
        <LearnResourcesCards />
        <Newsletter />
      </main>
    </div>
  );
};

export default LearnResourcesPage;
