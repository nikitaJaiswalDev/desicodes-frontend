import { TrendingUp } from 'lucide-react';

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  value: string;
  label: string;
  growth?: string;
}

export function StatCard({ icon, iconBg, iconColor, value, label, growth }: StatCardProps) {
  return (
    <div className="bg-[#1a1c2e] rounded-xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-3 rounded-lg`}>
          {icon}
        </div>
        {growth && (
          <div className="flex items-center gap-1 text-green-400 text-xs">
            <TrendingUp className="w-3 h-3" />
            <span>{growth}</span>
          </div>
        )}
      </div>
      <div className="text-2xl md:text-3xl mb-1">{value}</div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
}
