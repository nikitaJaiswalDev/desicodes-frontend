import { useEffect, useState } from 'react';
import { StatCard } from '../components/sections/dashboard/StatCard';
// import { RecentProjects } from '../components/sections/dashboard/RecentProjects';
// import { RecentActivity } from '../components/sections/dashboard/RecentActivity';
// import { QuickActions } from '../components/sections/dashboard/QuickActions';
import { Code2, Zap } from 'lucide-react';
import { getUserStats } from '../lib/api';

export default function DashboardPage() {
  const [stats, setStats] = useState<{ total_executions: number; ai_requests: number } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserStats()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl mb-2">Welcome back, Developer</h1>
        <p className="text-gray-400 text-sm md:text-base">Here is what is happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
        <StatCard
          icon={<Code2 className="w-5 h-5 md:w-6 md:h-6" />}
          iconBg="bg-gradient-to-r from-[#EC4899] to-[#A855F7]"
          iconColor="text-white"
          value={loading ? "..." : stats?.total_executions.toString() || "0"}
          label="Total Code Executions"
        />

        <StatCard
          icon={<Zap className="w-5 h-5 md:w-6 md:h-6" />}
          iconBg="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
          iconColor="text-white"
          value={loading ? "..." : stats?.ai_requests.toString() || "0"}
          label="AI Requests Made"
        />
      </div>

      {/* Recent Projects and Activity */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="lg:col-span-2">
          <RecentProjects />
        </div>
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div> */}

      {/* Quick Actions */}
      {/* <QuickActions /> */}
    </>
  );
}
