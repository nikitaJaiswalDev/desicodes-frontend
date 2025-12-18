import { useState, useEffect } from 'react';
import { Zap, CreditCard, Activity, Download, Shield, X, Loader2, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { AuthHeader } from '../components/layout/AuthHeader';
import { Sidebar } from '../components/sections/dashboard/Sidebar';
import { getInvoices, getUserSubscriptions, getAvailablePlans, type Invoice, type Subscription, type Plan, getPaymentHistory, type PaymentHistory } from '../lib/api';

export function BillingPage() {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [lastPayment, setLastPayment] = useState<PaymentHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdateCardOpen, setIsUpdateCardOpen] = useState(false);
  const [updatingCard, setUpdatingCard] = useState(false);

  const [fullName, setFullName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [ccv, setCcv] = useState('');
  const [expiration, setExpiration] = useState('');

  // Helper functions
  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    const groups = numbers.match(/.{1,4}/g);
    return groups ? groups.join(' ') : numbers;
  };

  const formatExpiration = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)} / ${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, '').length <= 16) {
      setCardNumber(formatted);
    }
  };

  const handleExpirationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiration(e.target.value);
    if (formatted.replace(/\D/g, '').length <= 4) {
      setExpiration(formatted);
    }
  };

  const handleCcvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCcv(value);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [invoicesData, subsData, plansData, paymentsData] = await Promise.all([
          getInvoices(),
          getUserSubscriptions(),
          getAvailablePlans(),
          getPaymentHistory()
        ]);

        setInvoices(invoicesData);

        const activeSub = subsData.find(s => s.status === 'active');
        setSubscription(activeSub || null);

        if (activeSub) {
          const currentPlan = plansData.find(p => p.id === activeSub.plan_id);
          setPlan(currentPlan || null);
        }

        if (paymentsData.length > 0) {
          setLastPayment(paymentsData[0]); // Most recent is first
        }

      } catch (error) {
        console.error("Failed to fetch billing data", error);
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

  const handleDownloadInvoice = (invoice: Invoice) => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Invoice ID: #${invoice.id}`, 20, 40);
    doc.text(`Date: ${formatDate(invoice.created_at)}`, 20, 50);
    doc.text(`Amount: ${invoice.currency === 'INR' ? 'Rs.' : '$'} ${Number(invoice.amount || 0).toFixed(2)}`, 20, 60);
    doc.text(`Status: ${invoice.status}`, 20, 70);

    doc.save(`invoice_${invoice.id}.pdf`);
  };

  const handleUpdatePaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!fullName || cardNumber.replace(/\s/g, '').length < 16 || ccv.length < 3 || expiration.length < 5) {
      alert("Please fill in all payment details correctly.");
      return;
    }

    setUpdatingCard(true);
    // Simulate API call
    setTimeout(() => {
      setUpdatingCard(false);
      setIsUpdateCardOpen(false);
      alert("Payment method updated successfully!");
      // Reset fields
      setFullName('');
      setCardNumber('');
      setCcv('');
      setExpiration('');
    }, 1500);
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
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-white text-3xl sm:text-4xl mb-2">Billing & Invoices</h1>
              <p className="text-gray-500 text-sm sm:text-base">
                Manage your billing history, payment methods, and invoices.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              {/* Current Plan Card */}
              <div className="bg-[#0F0F0F] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#7001FE] rounded-lg flex items-center justify-center">
                      <Zap size={18} className="text-white" />
                    </div>
                    <h2 className="text-white text-lg">Current Plan</h2>
                  </div>
                  {subscription && (
                    <span className="bg-[#7001FE] text-white text-xs px-3 py-1 rounded-full capitalize">
                      {subscription.status}
                    </span>
                  )}
                </div>

                <p className="text-gray-500 text-sm mb-4">{plan?.name || "No Active Plan"}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-white text-4xl">${plan?.price ? (plan.price / 100).toFixed(0) : "0"}</span>
                    <span className="text-gray-500 text-sm">/month</span>
                  </div>
                  {subscription && plan && plan.price > 0 && (
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <span>Next billing date:</span>
                      <span className="text-white">{formatDate(subscription.current_period_end)}</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {/* Fetch features dynamically? For now just showing key ones or parsed */}
                  {plan && plan.features && Object.keys(plan.features).slice(0, 3).map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                      <div className="w-4 h-4 rounded-full border-2 border-[#60A5FA] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#60A5FA]" />
                      </div>
                      {f.replace(/_/g, ' ')}
                    </li>
                  ))}
                  {!plan && <li>No active features</li>}
                </ul>

                <button
                  onClick={() => navigate('/subscription')}
                  className="w-full bg-[#7001FE] cursor-pointer text-white py-3 rounded-lg hover:bg-[#5a01cc] transition-colors"
                >
                  Manage Subscription
                </button>
              </div>

              {/* Payment Method Card */}
              <div className="bg-[#0F0F0F] border border-gray-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#7001FE] rounded-lg flex items-center justify-center">
                      <CreditCard size={18} className="text-white" />
                    </div>
                    <h2 className="text-white text-lg cursor-pointer">Payment Method</h2>
                  </div>
                  <Shield size={20} className="text-gray-600" />
                </div>

                <p className="text-gray-500 text-sm mb-6 ">Manage your payment details</p>

                {/* Credit Card Display - Only show if we have last payment info or paid plan */}
                {lastPayment && subscription && plan && plan.price > 0 ? (
                  <div className="bg-gradient-to-br from-[#2a3441] to-[#1f2937] rounded-xl p-6 mb-6">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-8 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded"></div>
                      <span className="text-white text-xs tracking-wider uppercase">{lastPayment.provider}</span>
                    </div>

                    <div className="mb-6">
                      <p className="text-white text-lg tracking-widest">{lastPayment.payment_method || '•••• •••• •••• ••••'}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-xs mb-1">Last Paid</p>
                        <p className="text-white text-sm">{formatDate(lastPayment.created_at)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#1a1c2e] rounded-xl p-6 mb-6 text-center text-gray-400">
                    No saved payment method
                  </div>
                )}

                <button
                  onClick={() => setIsUpdateCardOpen(true)}
                  className="w-full cursor-pointer bg-[#2a3441] text-white py-3 rounded-lg hover:bg-[#374151] transition-colors border border-gray-700"
                >
                  Update Payment Method
                </button>
              </div>
            </div>

            {/* Invoice History */}
            <div className="bg-[#0F0F0F] border border-gray-800 rounded-xl overflow-hidden">
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <Activity size={20} className="text-white" />
                  <h2 className="text-white text-lg">Invoice History</h2>
                </div>
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[#0F0F0F]">
                    <tr>
                      <th className="text-left text-gray-500 text-xs px-6 py-4">Invoice ID</th>
                      <th className="text-left text-gray-500 text-xs px-6 py-4">Date</th>
                      <th className="text-left text-gray-500 text-xs px-6 py-4">Plan</th>
                      <th className="text-left text-gray-500 text-xs px-6 py-4">Amount</th>
                      <th className="text-left text-gray-500 text-xs px-6 py-4">Status</th>
                      <th className="text-left text-gray-500 text-xs px-6 py-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {invoices.length > 0 ? (
                      invoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-[#1f1f1f] transition-colors">
                          <td className="px-6 py-4">
                            <span className="text-[#60A5FA] text-sm">#{invoice.id}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-400 text-sm">{formatDate(invoice.created_at)}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-300 text-sm">{plan?.name || "Subscription"}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-white text-sm">
                              {invoice.currency === 'INR' ? '₹' : '$'}{Number(invoice.amount || 0).toFixed(2)}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {invoice.status === 'paid' && (
                              <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-500 text-xs px-3 py-1 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                Paid
                              </span>
                            )}
                            {invoice.status === 'failed' && (
                              <span className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-500 text-xs px-3 py-1 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                Failed
                              </span>
                            )}
                            {invoice.status === 'pending' && (
                              <span className="inline-flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 text-xs px-3 py-1 rounded-full">
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDownloadInvoice(invoice)}
                              className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                            >
                              <Download size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                          No invoices found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y divide-gray-800">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-[#7001FE] text-sm mb-1">#{invoice.id}</p>
                        <p className="text-gray-400 text-xs">{formatDate(invoice.created_at)}</p>
                      </div>
                      <button
                        onClick={() => handleDownloadInvoice(invoice)}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <Download size={18} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-500 text-sm">Plan:</span>
                      <span className="text-gray-300 text-sm">{plan?.name || "Subscription"}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-500 text-sm">Amount:</span>
                      <span className="text-white text-sm">{invoice.currency === 'INR' ? '₹' : '$'}{Number(invoice.amount || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">Status:</span>
                      {invoice.status === 'paid' && (
                        <span className="inline-flex items-center gap-1.5 bg-green-500/10 text-green-500 text-xs px-3 py-1 rounded-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          Paid
                        </span>
                      )}
                      {invoice.status === 'failed' && (
                        <span className="inline-flex items-center gap-1.5 bg-red-500/10 text-red-500 text-xs px-3 py-1 rounded-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          Failed
                        </span>
                      )}
                      {invoice.status === 'pending' && (
                        <span className="inline-flex items-center gap-1.5 bg-yellow-500/10 text-yellow-500 text-xs px-3 py-1 rounded-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-gray-600 text-xs">
              <p>Billing Support: support@desiscode.com</p>
              <p>All transactions are secure and encrypted</p>
            </div>
          </div>
        </div>
      </div>

      {/* Update Card Modal */}
      {isUpdateCardOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#1F2937] rounded-2xl p-6 sm:p-8 shadow-2xl">
            <button
              onClick={() => setIsUpdateCardOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>

            <div className="mb-6">
              <h3 className="text-white text-xl mb-2">Update Payment Method</h3>
              <p className="text-gray-400 text-sm">Enter your new card details.</p>
            </div>

            <form onSubmit={handleUpdatePaymentMethod} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="flex items-center gap-2 text-white text-sm mb-2">
                  Full Name
                  <Info size={14} className="text-gray-400" />
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-white rounded-lg px-4 py-3 text-[#0F0F0F] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7001FE]"
                  placeholder="John Doe"
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="flex items-center gap-2 text-white text-sm mb-2">
                  Card Number
                  <Info size={14} className="text-gray-400" />
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className="w-full bg-white rounded-lg px-4 py-3 text-[#0F0F0F] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7001FE]"
                  placeholder="1234 - - - -    - - - -    - - - -"
                />
              </div>

              {/* CCV and Expiration Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-white text-sm mb-2">
                    CCV
                    <Info size={14} className="text-gray-400" />
                  </label>
                  <input
                    type="text"
                    value={ccv}
                    onChange={handleCcvChange}
                    className="w-full bg-white rounded-lg px-4 py-3 text-[#0F0F0F] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7001FE]"
                    placeholder="- - -"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-white text-sm mb-2">
                    Expiration Date
                    <Info size={14} className="text-gray-400" />
                  </label>
                  <input
                    type="text"
                    value={expiration}
                    onChange={handleExpirationChange}
                    className="w-full bg-white rounded-lg px-4 py-3 text-[#0F0F0F] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7001FE]"
                    placeholder="MM / YY"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={updatingCard}
                className="w-full bg-[#7001FE] text-white py-3.5 rounded-lg hover:bg-[#5a01cc] transition-colors mt-8 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {updatingCard ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : "Save Method"}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
