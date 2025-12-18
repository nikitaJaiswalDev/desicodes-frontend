import React, { useEffect, useState } from "react";
import CertificationsHero from "../components/sections/certifications/CertificationsHero";
// import CertificationsStats from "../components/sections/certifications/CertificationsStats";
// import CertificationsFilters from "../components/sections/certifications/CertificationsFilters";
import CertificationsList from "../components/sections/certifications/CertificationsList";
import CertificationsSidebar from "../components/sections/certifications/CertificationsSidebar";
import { getCertificates } from "../lib/api";
import type { Certificate } from "../lib/api";
import { Link } from "react-router-dom";

const CertificationsPage: React.FC = () => {
  const [data, setData] = useState<{ eligible: boolean; message?: string; certificates: Certificate[] } | null>(null);
  const [loading, setLoading] = useState(true);

  const userStr = localStorage.getItem('dc_user');
  const user = userStr ? JSON.parse(userStr) : null;
  const userName = user?.name || user?.username || "Developer";

  useEffect(() => {
    getCertificates()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <CertificationsHero />

      <div className="max-w-8xl mx-auto">
        {/* Stats Section */}
        {/* <div className="container mx-auto relative z-10">
          <CertificationsStats />
        </div> */}

        {/* Main Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-4 space-y-6">

              {!loading && data && !data.eligible ? (
                <div className="bg-[#1A1625] border border-red-500/30 p-8 rounded-xl text-center">
                  <h2 className="text-xl font-bold text-white mb-2">Pro Feature Locked</h2>
                  <p className="text-white/60 mb-6">{data.message}</p>
                  <Link to="/pricing" className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-medium hover:opacity-90">
                    Upgrade Now
                  </Link>
                </div>
              ) : (
                <>
                  {/* <CertificationsFilters /> */}
                  {/* Passing data to list if possible, or context? 
                     For now, let's assume I'll modify List to take props or render here. 
                     I'll just render logic here if List is not flexible.
                     But to avoid breaking, I'll pass 'certificates' prop even if it ignores it for now, 
                     and then I'll fix the component.
                  */}
                  <CertificationsList
                    certificates={data?.certificates || []}
                    loading={loading}
                    userName={userName}
                  />
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2">
              <CertificationsSidebar
                certificates={data?.certificates || []}
                userName={userName}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificationsPage;
