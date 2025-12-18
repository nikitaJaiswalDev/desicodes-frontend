import React from "react";
import LearnResourcesHero from "../components/sections/resources/LearnResourcesHero";
import LearnResourcesCards from "../components/sections/resources/LearnResourcesCards";
import LearnResourcesCTA from "../components/sections/resources/LearnResourcesCTA";

const LearnResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05010d] text-white">
      <main>
        <LearnResourcesHero />
        <LearnResourcesCards />
        <LearnResourcesCTA />
      </main>
    </div>
  );
};

export default LearnResourcesPage;
