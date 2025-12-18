import React from 'react';

const AboutPressKit: React.FC = () => {
  return (
    <div className="md:py-24 mx-auto">
      <div className="max-w- mx-auto text-center px-4">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-2xl lg:text-[36px] font-semibold leading-[1.3] text-white mb-6 max-w-[528px] mx-auto">
            Ready-to-Use Press Kit for Media & Collaborators
          </h2>
          <p className="text-xl text-white/60 leading-[22px] tracking-[0.4px] max-w-6xl mx-auto">
            Equip your story with authentic brand elements, visual assets, and background details 
            designed to support interviews, features, and editorial content.
          </p>
        </div>

        {/* Download Button */}
        <div className="flex justify-center">
          <button className="bg-white/90 opacity-90 border border-white/5 text-black px-8 lg:px-14 py-3 rounded-md text-sm font-medium hover:bg-white transition-all duration-300 hover:scale-105">
            Download Press Kit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AboutPressKit;