import { MoreVertical } from 'lucide-react';

export function RecentProjects() {
  const projects = [
    { name: 'E-commerce Platform', framework: 'React', time: '2 hours ago', progress: 65, status: 'active' },
    { name: 'E-commerce Platform', framework: 'React', time: '2 hours ago', progress: 45, status: 'active' },
    { name: 'E-commerce Platform', framework: 'React', time: '2 hours ago', progress: 55, status: 'active' },
    { name: 'E-commerce Platform', framework: 'React', time: '2 hours ago', progress: 35, status: 'active' },
  ];

  return (
    <div className="bg-[#18181B] rounded-xl p-4 md:p-6 ">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl">Recent Projects</h2>
        <button className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
          View All
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div key={index}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base mb-1">{project.name}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{project.framework}</span>
                  <span>•</span>
                  <span>{project.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                  {project.status}
                </span>
                <button className="text-gray-400 hover:text-white p-1 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
