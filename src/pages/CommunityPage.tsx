import React from "react";
import CommunityHero from "../components/sections/community/CommunityHero";
import CommunityFeatures from "../components/sections/community/CommunityFeatures";
import CommunityCards from "../components/sections/community/CommunityCards";
import CommunityCTA from "../components/sections/community/CommunityCTA";

const CommunityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#05010d] text-white">
      <main>
        <CommunityHero />
        <CommunityFeatures />
        <CommunityCards />
        <CommunityCTA />
      </main>
    </div>
  );
};

export default CommunityPage;
