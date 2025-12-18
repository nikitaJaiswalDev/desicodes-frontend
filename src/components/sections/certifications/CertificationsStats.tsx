import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value }) => {
  return (
    <div className="bg-[#1C2130] flex items-center border border-white/10 rounded-xl px-5 py-4  backdrop-blur-sm">
      <div className="flex items-start space-x-4">
        <div className="bg-white/5 rounded-lg p-3">{icon}</div>
        <div className="flex-1">
          <h3 className="text-xs text-[#94A3B8] mb-2">{label}</h3>
          <p className="text-xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

const CertificationsStats: React.FC = () => {
  const stats = [
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-blue-400"
        >
          <path
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "Total Licenses",
      value: "8",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-green-400"
        >
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "ISO Certified",
      value: "Yes",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-purple-400"
        >
          <path
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "Regulatory Approvals",
      value: "6",
    },
    {
      icon: (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-yellow-400"
        >
          <path
            d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4h4a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V8a1 1 0 011-1h4z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      label: "Last updated",
      value: "12 November 2025",
    },
  ];

  return (
    <section className="container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
          />
        ))}
      </div>
    </section>
  );
};

export default CertificationsStats;
