import React from 'react';

const CommunityFeatures: React.FC = () => {
  return (
    <section className="bg-[#05010d] py-10 md:py-24 px-4 md:px-8 lg:px-[130px]">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight tracking-[1.2px]">
          Where Northeast India <br />
          Codes Together
        </h2>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white opacity-40 leading-relaxed max-w-2xl mx-auto">
          Share your journey, explore ideas, and collaborate with a growing community of regional-language programmers.
        </p>
      </div>
    </section>
  );
};

export default CommunityFeatures;