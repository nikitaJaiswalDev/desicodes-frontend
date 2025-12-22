import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAvailablePlans, getUserSubscriptions, type Plan, type Subscription } from '../lib/api';
import { PaymentModal } from '../components/PaymentModal';

export function PricingPage() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        // Fetch plans always
        const plansData = await getAvailablePlans();
        const sorted = plansData.sort((a, b) => a.price - b.price);
        setPlans(sorted);

        // Fetch subscription if logged in
        if (token) {
          try {
            const subsData = await getUserSubscriptions();
            const activeSub = subsData.find(s => s.status === 'active');
            setSubscription(activeSub || null);
          } catch (e) {
            console.error("Failed to fetch subscriptions", e);
            // Don't block page load if subs fail, just assume no active sub or let user try logging in again if needed
          }
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load plans');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const getPlanDescription = (name: string) => {
    switch (name.toLowerCase()) {
      case 'free': return 'Try DesiCode IDE - Experience coding in native languages';
      case 'pro': return 'For students, bloggers, and solo developers';
      default: return 'Best plan for you.';
    }
  };

  const isMostPopular = (name: string) => name.toLowerCase() === 'pro';

  const handlePlanClick = (plan: Plan) => {
    const token = localStorage.getItem("dc_token");
    // Robust check for falsy or invalid token strings
    if (!token || token === 'null' || token === 'undefined') {
      navigate('/login');
      return;
    }
    // If logged in, open modal
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#0a0b14] text-white overflow-hidden items-center justify-center">
        Loading plans...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen bg-[#0a0b14] text-white overflow-hidden items-center justify-center">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 overflow-y-auto w-full">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-white text-4xl sm:text-5xl mb-4">Choose Your Plan</h1>
          <p className="text-gray-400 text-sm sm:text-base">
            Start coding in your own language with AI-powered templates and tools
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isPopular = isMostPopular(plan.name);
            const priceDisplay = plan.price === 0 ? "0" : (plan.price / 100).toString();
            const period = plan.price === 0 ? "forever" : "per month";
            const featureList = plan.features ? Object.values(plan.features) : [];

            // Check if this is the user's current plan
            const isCurrentPlan = subscription && subscription.plan_id === plan.id;

            return (
              <div
                key={plan.id}
                className={`bg-[#0F0F0F] rounded-xl p-6 relative ${isPopular ? 'border-2 border-[#7001FE]' : 'border border-gray-800'
                  }`}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#7001FE] text-white text-xs px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-white text-xl mb-4">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-white text-4xl">
                      {plan.currency === 'INR' ? '₹' : '$'}{priceDisplay}
                    </span>
                    <span className="text-gray-400 text-sm">{period}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{getPlanDescription(plan.name)}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {featureList.map((feature: any, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check size={16} className="text-[#fff] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{String(feature)}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    if (!isCurrentPlan) {
                      handlePlanClick(plan);
                    }
                  }}
                  disabled={isCurrentPlan || (subscription ? plan.price < (plans.find(p => p.id === subscription.plan_id)?.price || 0) : false)}
                  className={`w-full py-3 rounded-lg transition-colors cursor-pointer ${isCurrentPlan
                    ? 'bg-green-600/20 text-green-500 cursor-default border border-green-500/30 w-full'
                    : isPopular
                      ? 'bg-[#374151] text-white border border-gray-700 hover:bg-[#4B5563]'
                      : 'bg-white text-[#0F0F0F] hover:bg-gray-100'
                    } ${subscription && plan.price < (plans.find(p => p.id === subscription.plan_id)?.price || 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {(() => {
                    const token = localStorage.getItem("token");
                    if (!token || token === 'null' || token === 'undefined') return "Get Started";
                    if (isCurrentPlan) return "Current Plan";
                    const currentPrice = plans.find(p => p.id === subscription?.plan_id)?.price || 0;
                    if (plan.price > currentPrice) return "Upgrade";
                    if (plan.price < currentPrice) return "Downgrade";
                    return "Get Started";
                  })()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        plan={selectedPlan}
      />
    </div>
  );
}
