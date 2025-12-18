import { Code2, Sparkles, Users } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'New Project',
      description: 'Start coding in your language',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI Template',
      description: 'Generate code with AI',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Invite Team',
      description: 'Collaborate with others',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#581C87] to-[#831843] rounded-xl p-6 md:p-8">
      <h2 className="text-xl md:text-2xl mb-6">Quick Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            className="bg-[#111827] hover:bg-[#1f2937] rounded-lg p-4 md:p-6 text-left transition-all duration-200 hover:scale-105"
          >
            <div className="mb-3">{action.icon}</div>
            <h3 className="text-base md:text-lg mb-1">{action.title}</h3>
            <p className="text-sm text-white/80">{action.description}</p>
          </button>
        ))}
      </div>

    </div>
  );
}
