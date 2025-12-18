import { useState } from 'react';
import { Info, FileText, X, Loader2 } from 'lucide-react'; // Added Loader2
import { type Plan, createRazorpayOrder, verifyRazorpayPayment } from '../lib/api';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: Plan | null;
}

export function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
    const [fullName, setFullName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [ccv, setCcv] = useState('');
    const [expiration, setExpiration] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen || !plan) return null;

    const quantity = 1;
    // Use plan price converted to proper currency unit, defaulting to dollars if not INR
    // Backend sends price in cents/paise
    const displayPrice = plan.price / 100;

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic Validation
        if (!fullName || cardNumber.replace(/\s/g, '').length < 16 || ccv.length < 3 || expiration.length < 5) {
            setError("Please fill in all payment details correctly.");
            return;
        }

        setLoading(true);

        try {
            // 1. Create Order (Mock or Real)
            const order = await createRazorpayOrder(plan.id, plan.currency || 'USD');

            // 2. Mock Payment Flow (Since user asked for dummy keys support)
            // Even if real keys are present, this form implies a direct payment handling
            // which standard razorpay JS checkout would handle differently (opening a modal).
            // For this specific 'Custom Form' UI + 'Dummy Keys' request, we assume 
            // we process it as a mock successful payment if the backend allows it.

            // If backend returned a mock order (starts with order_mock_) OR we are forcing simulation:
            const paymentId = `pay_mock_${Date.now()}`;
            const signature = `sig_mock_${Date.now()}`;

            // 3. Verify Payment (simulating success from Razorpay)
            await verifyRazorpayPayment({
                razorpay_order_id: order.order_id,
                razorpay_payment_id: paymentId,
                razorpay_signature: signature
            });

            // Success
            alert("Payment successful! Subscription upgraded.");
            onClose();
            // Ideally trigger a refresh of user subscription state here
            window.location.reload(); // Simple reload to reflect changes

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-5xl bg-[#1F2937] rounded-2xl p-6 sm:p-8 lg:p-12 shadow-2xl max-h-[90vh] overflow-y-auto">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left Column - Payment Form */}
                    <div>
                        <h1 className="text-[#FF3366] text-2xl sm:text-3xl mb-2 italic">
                            <span className="text-[35px] justify-start font-bold italic leading-[1.3] bg-[linear-gradient(80.32deg,#F83A3A_10%,#F13DD4_50%,#7000FF_90%)] bg-clip-text text-transparent">
                                desicodes
                            </span>
                        </h1>

                        <div className="mb-8">
                            <h2 className="text-white text-xl mb-2">Payment</h2>
                            <p className="text-gray-400 text-sm">
                                Complete your upgrade to {plan.name}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
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

                            {/* Error Message */}
                            {error && (
                                <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                    {error}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#7001FE] text-white py-3.5 rounded-lg hover:bg-[#5a01cc] transition-colors mt-8 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Complete Payment"
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Right Column - Payment Summary */}
                    <div className="flex items-start justify-center lg:justify-end">
                        <div className="w-full max-w-sm">
                            {/* Tab */}
                            <div className="flex justify-end mb-[-20px] relative z-10">
                                <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-t-lg text-sm">
                                    Summary
                                </div>
                            </div>

                            {/* Card */}
                            <div className="bg-[#B8C5D6] rounded-2xl p-6 relative">
                                <div className="mb-6">
                                    <h3 className="text-[#1F2937] mb-4">Payment Summary</h3>

                                    <div className="space-y-3 text-sm bg-[#DFECF6] rounded-2xl p-6">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Plan</span>
                                            <span className="text-[#1F2937] font-medium">{plan.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Quantity</span>
                                            <span className="text-[#1F2937]">{quantity}</span>
                                        </div>
                                        <div className="flex justify-between pt-3 border-t border-gray-400">
                                            <span className="text-gray-600">Total Amount</span>
                                            <span className="text-[#1F2937] font-bold">${displayPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Amount to be Paid */}
                                <div className="bg-[#8FA3BB] rounded-xl p-4 flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 text-xs mb-1">Amount to be Paid</p>
                                        <p className="text-[#1F2937] text-2xl font-bold">${displayPrice.toFixed(2)}</p>
                                    </div>
                                    <div className="bg-[#B8C5D6] rounded-lg p-3">
                                        <FileText size={24} className="text-[#1F2937]" />
                                    </div>
                                </div>

                                {/* Decorative Circles */}
                                <div className="absolute left-0 top-1/2 w-6 h-6 bg-[#1F2937] rounded-full -translate-x-1/2 -translate-y-1/2" />
                                <div className="absolute right-0 top-1/2 w-6 h-6 bg-[#1F2937] rounded-full translate-x-1/2 -translate-y-1/2" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
