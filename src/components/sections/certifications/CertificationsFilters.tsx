import React, { useState } from 'react';

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  color: 'blue' | 'purple' | 'cyan';
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isActive, onClick, color }) => {
  const colorClasses = {
    blue: isActive
      ? "bg-[#3B82F6] text-white shadow-lg"
      : "bg-white/5 border border-white/10 text-[#CBD5E1] hover:bg-white/10",
    purple: isActive
      ? "bg-[#A855F7] text-white shadow-lg"
      : "bg-white/5 border border-white/10 text-[#CBD5E1] hover:bg-white/10",
    cyan: isActive
      ? "bg-[#06B6D4] text-white shadow-lg"
      : "bg-white/5 border border-white/10 text-[#CBD5E1] hover:bg-white/10",
  };

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${colorClasses[color]}`}
    >
      {label}
    </button>
  );
};

const CertificationsFilters: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [activeType, setActiveType] = useState('All');

  const regionOptions = ['All', 'India', 'EU', 'USA', 'Global'];
  const statusOptions = ['All', 'Active', 'Expired', 'Pending'];
  const typeOptions = ['All', 'Business', 'Safety', 'Environmental', 'Trade', 'ISO'];

  return (
    <section className="bg-[#0A0E1A99]/60">
      <div className="container mx-auto">
        <div className="border border-white/10 rounded-xl p-6 backdrop-blur-sm">
          <div className="space-y-6">
            {/* Region Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="min-w-0 shrink-0">
                <span className="text-sm text-gray-400">Region:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {regionOptions.map((option) => (
                  <FilterButton
                    key={option}
                    label={option}
                    isActive={activeRegion === option}
                    onClick={() => setActiveRegion(option)}
                    color="blue"
                  />
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="min-w-0 shrink-0">
                <span className="text-sm text-gray-400">Status:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {statusOptions.map((option) => (
                  <FilterButton
                    key={option}
                    label={option}
                    isActive={activeStatus === option}
                    onClick={() => setActiveStatus(option)}
                    color="purple"
                  />
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="min-w-0 flex-shrink-0">
                <span className="text-sm text-gray-400">Type:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {typeOptions.map((option) => (
                  <FilterButton
                    key={option}
                    label={option}
                    isActive={activeType === option}
                    onClick={() => setActiveType(option)}
                    color="cyan"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsFilters;