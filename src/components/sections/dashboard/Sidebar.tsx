import { LayoutGrid, Code, Receipt, Terminal, Award } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getUserSubscriptions, getAvailablePlans, type Plan } from '../../../lib/api'; // Check relative path
import { PaymentModal } from '../../PaymentModal';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isFreePlan, setIsFreePlan] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [proPlan, setProPlan] = useState<Plan | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function checkPlan() {
      try {
        const [subs, plans] = await Promise.all([
          getUserSubscriptions(),
          getAvailablePlans()
        ]);

        // Populate pro plan for the modal upgrade button
        const pro = plans.find(p => p.name.toLowerCase() === 'pro');
        if (pro) setProPlan(pro);

        const activeSub = subs.find(s => s.status === 'active');
        if (activeSub) {
          const plan = plans.find(p => p.id === activeSub.plan_id);
          // Assuming price 0 or name 'Starter' means free
          if (plan && plan.price === 0) {
            setIsFreePlan(true);
          }
        } else {
          // If no active subscription, we might want to default to free logic so upgrade shows
          // but strictly speaking, logic says 'upgrade' implies moving up from something.
          // Let's assume new users are free.
          setIsFreePlan(true);
        }
      } catch (e) {
        console.error("Failed to check plan for sidebar", e);
      }
    }
    checkPlan();
  }, []);


  const menuItems = [
    { icon: <LayoutGrid className="w-5 h-5" />, label: 'Dashboard', path: '/dashboard', active: true },
    { icon: <Code className="w-5 h-5" />, label: 'Subscription', path: '/subscription', active: false },
    { icon: <Receipt className="w-5 h-5" />, label: 'Billing & Invoices', path: '/billing', active: false },
    { icon: <Terminal className="w-5 h-5" />, label: 'IDE', path: '/ide', active: false },
    { icon: <Award className="w-5 h-5" />, label: 'Certifications', path: '/certifications', active: false },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1a1c2e] rounded-lg"
      >
        <LayoutGrid className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40 
          w-64 bg-[#12141f] border-r border-gray-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col overflow-y-auto 
        `}
      // style={{overflowY: 'scroll'}}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-800 sidelogos">
          <Link
            to="/"
            className="block text-[23px] sidebarlogo font-bold italic leading-[1.3] bg-[linear-gradient(80.32deg,#F83A3A_10%,#F13DD4_50%,#7000FF_90%)] bg-clip-text text-transparent transition-all duration-300"
          >
            <img src="/logo.png" alt="DesiCodes Logo" className="h-12 sm:h-16 w-auto" />
          </Link>
        </div>


        {/* Navigation */}
        <nav className="flex-1 p-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 cursor-pointer
                transition-colors duration-200
                ${location.pathname === item.path
                  ? 'bg-purple-500/10 text-purple-400'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                }
              `}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Upgrade Section */}
        {isFreePlan && (
          <div className="p-4">
            <div className="bg-gradient-to-r from-[#581C87] to-[#831843] rounded-lg p-4">
              <div className="text-white mb-2">Upgrade to Pro</div>
              <p className="text-white/80 text-xs mb-3">Unlock unlimited projects</p>
              <button
                onClick={() => {
                  if (proPlan) setIsPaymentModalOpen(true);
                  else navigate('/pricing');
                }}
                className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-lg text-sm transition-colors cursor-pointer">
                Upgrade Now
              </button>
            </div>
          </div>
        )}
      </aside>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        plan={proPlan}
      />
    </>
  );
}
