import { useState, useEffect } from 'react';
import { Check, CreditCard, } from 'lucide-react';
import { AuthHeader } from '../components/layout/AuthHeader';
import { Sidebar } from '../components/sections/dashboard/Sidebar';
import { getAvailablePlans, getUserSubscriptions, cancelSubscription, resumeSubscription, type Plan, type Subscription } from '../lib/api';

import { PaymentModal } from '../components/PaymentModal';

export function SubscriptionPage() {
  // const [autoRenewal, setAutoRenewal] = useState(true);
  // const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const [plans, setPlans] = useState<Plan[]>([]);
  const [currentSubscription, setCurrentSubscription] = useState<Subscription | null>(null);
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isCancelled, setIsCancelled] = useState(false);
  const [cancelPeriodEnd, setCancelPeriodEnd] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [plansData, subsData] = await Promise.all([
          getAvailablePlans(),
          getUserSubscriptions()
        ]);

        // Sort plans by price
        const sortedPlans = plansData.sort((a, b) => a.price - b.price);
        setPlans(sortedPlans);

        // Find active subscription
        const activeSub = subsData.find(sub => sub.status === 'active');
        setCurrentSubscription(activeSub || null);

        if (activeSub) {
          const plan = sortedPlans.find(p => p.id === activeSub.plan_id);
          setCurrentPlan(plan || null);
        }
      } catch (error) {
        console.error("Failed to fetch subscription data", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getPlanDescription = (name: string) => {
    switch (name.toLowerCase()) {
      case 'free': return 'For individuals just getting started.';
      case 'pro': return 'For students, developers, and growing teams.';
      default: return 'Best plan for you.';
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? You will retain access until the end of your billing period.')) {
      return;
    }

    try {
      const response = await cancelSubscription();
      setIsCancelled(true);
      setCancelPeriodEnd(response.period_end || null);

      if (currentSubscription) {
        setCurrentSubscription({
          ...currentSubscription,
          cancel_at_period_end: true
        });
      }

      alert(response.message);
    } catch (error: any) {
      alert(error.message || 'Failed to cancel subscription');
    }
  };

  const handleResumeSubscription = async () => {
    try {
      const response = await resumeSubscription();
      setIsCancelled(false);
      setCancelPeriodEnd(null);

      if (currentSubscription) {
        setCurrentSubscription({
          ...currentSubscription,
          cancel_at_period_end: false
        });
      }

      alert(response.message);
    } catch (error: any) {
      alert(error.message || 'Failed to resume subscription');
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#0a0b14] text-white items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0a0b14] text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <AuthHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 overflow-y-auto w-full">
          {/* Header */}
          <div className="mb-8 sm:mb-12">
            <h1 className="text-white text-3xl sm:text-4xl mb-3">Subscription</h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Manage your billing information, active plan, and payment preferences.
            </p>
          </div>

          {/* Current Plan Section */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <h2 className="text-white text-xl sm:text-2xl">Current Plan</h2>
              {currentSubscription && currentPlan && currentPlan.price > 0 && (
                <p className="text-gray-400 text-sm">Valid until: {formatDate(currentSubscription.current_period_end || new Date().toISOString())}</p>
              )}
            </div>

            <div className="bg-[#0F0F0F] border border-gray-800 rounded-xl p-4 sm:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#7001FE] rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" fill="white" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white">{currentPlan?.name || 'No Active Plan'}</h3>
                      {currentSubscription?.status === 'active' && (
                        <span className="bg-[#7001FE] text-white text-xs px-2 py-1 rounded">Active</span>
                      )}
                    </div>
                    {currentPlan && (
                      <p className="text-gray-400 text-sm mb-1">
                        {currentPlan.currency === 'INR' ? '₹' : '$'}{currentPlan.price === 0 ? '0' : (currentPlan.price / 100).toFixed(2)} / month • Billed monthly
                      </p>
                    )}
                    {currentPlan && currentPlan.price > 0 && (
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <CreditCard size={14} />
                        <span>Visa ending in 4242</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  {currentPlan && currentPlan.price > 0 && (
                    !isCancelled && !currentSubscription?.cancel_at_period_end ? (
                      <button
                        onClick={handleCancelSubscription}
                        className="px-6 py-2.5 border border-red-700 text-red-400 rounded-lg hover:bg-red-900/20 transition-colors cursor-pointer"
                      >
                        Cancel Plan
                      </button>
                    ) : (
                      <div className="space-y-3 w-full">
                        <div className="px-4 py-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                          <p className="text-yellow-400 text-sm">
                            ⚠️ Your subscription will end on {cancelPeriodEnd ? new Date(cancelPeriodEnd).toLocaleDateString() : 'the end of your billing period'}.
                            No payment will be deducted in the next cycle.
                          </p>
                        </div>
                        <button
                          onClick={handleResumeSubscription}
                          className="px-6 py-2.5 border border-green-700 text-green-400 rounded-lg hover:bg-green-900/20 transition-colors cursor-pointer"
                        >
                          Resume Subscription
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Available Plans Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
              <div>
                <h2 className="text-white text-xl sm:text-2xl mb-1">Available Plans</h2>
                <p className="text-gray-400 text-sm">Upgrade or downgrade your plan at any time.</p>
              </div>

              <div className="flex items-center gap-2 bg-[#0F0F0F] rounded-lg p-1">
                {/* Yearly plan removed */}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {plans.map((plan) => {
                const isCurrent = currentPlan?.id === plan.id;
                const priceDisplay = plan.price === 0 ? "0" : (plan.price / 100).toString();
                const period = plan.price === 0 ? "forever" : "per month";
                const featureList = plan.features ? Object.values(plan.features) : [];
                const isPro = plan.name.toLowerCase() === 'pro';

                return (
                  <div
                    key={plan.id}
                    className={`bg-[#0F0F0F] rounded-xl p-6 relative ${isPro ? 'border-2 border-[#7001FE]' : 'border border-gray-800'} ${isCurrent ? 'ring-2 ring-purple-500 ring-offset-2 ring-offset-[#0a0b14]' : ''}`}
                  >
                    {isPro && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="bg-[#7001FE] text-white text-xs px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-white text-xl mb-2">{plan.name}</h3>
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-white text-4xl">{plan.currency === 'INR' ? '₹' : '$'}{priceDisplay}</span>
                        <span className="text-gray-400 text-sm">{period}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{getPlanDescription(plan.name)}</p>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {featureList.map((feature: any, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <Check size={16} className="text-[#fff] mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{String(feature)}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      disabled={isCurrent}
                      onClick={() => {
                        if (!isCurrent) {
                          setSelectedPlan(plan);
                          setIsPaymentModalOpen(true);
                        }
                      }}
                      className={`w-full py-3 rounded-lg transition-colors cursor-pointer ${isCurrent
                        ? 'bg-[#374151] text-gray-400 cursor-not-allowed'
                        : 'bg-white text-[#0F0F0F] hover:bg-gray-100'
                        }`}
                    >
                      {isCurrent ? 'Current Plan' : 'Upgrade Plan'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
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
