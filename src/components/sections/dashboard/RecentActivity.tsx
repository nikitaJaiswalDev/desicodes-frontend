import { Code2, GitBranch, CheckCircle2, UserPlus } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      icon: <Code2 className="w-4 h-4" />,
      iconBg: 'bg-purple-500/20',
      iconColor: 'text-purple-400',
      title: 'New code generated',
      description: 'E-commerce Platform',
      time: '2 hours ago',
    },
    {
      icon: <GitBranch className="w-4 h-4" />,
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-400',
      title: 'Branch created',
      description: 'feature/payment-integration',
      time: '5 hours ago',
    },
    {
      icon: <CheckCircle2 className="w-4 h-4" />,
      iconBg: 'bg-green-500/20',
      iconColor: 'text-green-400',
      title: 'Project completed',
      description: 'Data Analytics Dashboard',
      time: '1 day ago',
    },
    {
      icon: <UserPlus className="w-4 h-4" />,
      iconBg: 'bg-pink-500/20',
      iconColor: 'text-pink-400',
      title: 'Team member added',
      description: 'Sarah joined your team',
      time: '2 days ago',
    },
  ];

  return (
    <div className="bg-[#18181B] rounded-xl p-4 md:p-6 ">
      {/* Header */}
      <h2 className="text-lg md:text-xl mb-6">Recent Activity</h2>

      {/* Activity List */}
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className={`${activity.iconBg} ${activity.iconColor} p-2 rounded-lg h-fit`}>
              {activity.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm mb-0.5">{activity.title}</h3>
              <p className="text-xs text-gray-400 mb-1 truncate">{activity.description}</p>
              <span className="text-xs text-gray-500">{activity.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
