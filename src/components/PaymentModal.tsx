import { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { type Plan, createRazorpayOrder, verifyRazorpayPayment } from '../lib/api';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan: Plan | null;
}

// Extend Window interface to include Razorpay
declare global {
    interface Window {
        Razorpay: any;
    }
}

export function PaymentModal({ isOpen, onClose, plan }: PaymentModalProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [scriptLoaded, setScriptLoaded] = useState(false);

    // Load Razorpay checkout script
    useEffect(() => {
        if (isOpen && !scriptLoaded) {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => setScriptLoaded(true);
            script.onerror = () => {
                setError('Failed to load Razorpay. Please refresh and try again.');
            };
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }
    }, [isOpen, scriptLoaded]);

    if (!isOpen || !plan) return null;

    const displayPrice = plan.price / 100; // Convert paise to main currency unit
    const currency = plan.currency || 'INR';

    const handlePayment = async () => {
        setError(null);
        setLoading(true);

        try {
            // 1. Create Razorpay order
            const order = await createRazorpayOrder(plan.id, currency);

            if (!window.Razorpay) {
                throw new Error('Razorpay SDK not loaded. Please refresh the page.');
            }

            // 2. Get user details
            const userStr = localStorage.getItem('dc_user');
            const user = userStr ? JSON.parse(userStr) : null;

            // 3. Configure Razorpay checkout options
            const options = {
                key: order.key_id,
                subscription_id: order.order_id,  // This is subscription_id from backend
                name: 'DesiCodes',
                description: `${plan.name} Plan - Monthly Subscription`,
                prefill: {
                    name: user?.username || '',
                    email: user?.email || '',
                },
                theme: {
                    color: '#7001FE',
                },
                handler: async function (response: any) {
                    // Payment successful, verify it
                    try {
                        await verifyRazorpayPayment({
                            razorpay_order_id: response.razorpay_subscription_id,  // subscription_id
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });

                        // Payment verified successfully
                        setSuccess(true);
                        setLoading(false);

                        // Reload page after 2 seconds to reflect new subscription
                        setTimeout(() => {
                            window.location.reload();
                        }, 2000);
                    } catch (err: any) {
                        console.error('Payment verification failed:', err);
                        setError(err.message || 'Payment verification failed. Please contact support.');
                        setLoading(false);
                    }
                },
                modal: {
                    ondismiss: function () {
                        setLoading(false);
                        setError('Payment cancelled. Please try again if you want to upgrade.');
                    },
                },
            };

            // 4. Open Razorpay checkout
            const razorpay = new window.Razorpay(options);
            razorpay.open();

        } catch (err: any) {
            console.error('Payment initiation failed:', err);
            setError(err.message || 'Failed to initiate payment. Please try again.');
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (!loading) {
            setError(null);
            setSuccess(false);
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-[#0F0F0F] rounded-2xl p-8 shadow-2xl border border-gray-800">
                {!loading && !success && (
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                )}

                {/* Success State */}
                {success && (
                    <div className="text-center py-8">
                        <div className="mb-4 flex justify-center">
                            <CheckCircle size={64} className="text-green-500" />
                        </div>
                        <h2 className="text-white text-2xl mb-2">Payment Successful!</h2>
                        <p className="text-gray-400 mb-4">
                            Your subscription to {plan.name} plan has been activated.
                        </p>
                        <p className="text-gray-500 text-sm">
                            Redirecting...
                        </p>
                    </div>
                )}

                {/* Loading State */}
                {loading && !success && (
                    <div className="text-center py-8">
                        <div className="mb-4 flex justify-center">
                            <Loader2 size={48} className="text-[#7001FE] animate-spin" />
                        </div>
                        <h2 className="text-white text-xl mb-2">Processing Payment...</h2>
                        <p className="text-gray-400 text-sm">
                            Please complete the payment in the Razorpay window
                        </p>
                    </div>
                )}

                {/* Payment Confirmation */}
                {!loading && !success && (
                    <>
                        <div className="text-center mb-8">
                            <h1 className="text-[35px] font-bold italic leading-[1.3] bg-[linear-gradient(80.32deg,#F83A3A_10%,#F13DD4_50%,#7000FF_90%)] bg-clip-text text-transparent mb-4">
                                desicodes
                            </h1>
                            <h2 className="text-white text-2xl mb-2">Upgrade to {plan.name}</h2>
                            <p className="text-gray-400 text-sm">
                                Complete your subscription payment
                            </p>
                        </div>

                        {/* Plan Details */}
                        <div className="bg-[#1A1A1A] rounded-xl p-6 mb-6 border border-gray-800">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-400">Plan</span>
                                <span className="text-white font-medium">{plan.name}</span>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-gray-400">Billing Period</span>
                                <span className="text-white">Monthly</span>
                            </div>
                            <div className="h-px bg-gray-800 my-4"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-white font-semibold">Total Amount</span>
                                <div className="text-right">
                                    <div className="text-[#7001FE] text-2xl font-bold">
                                        {currency === 'INR' ? '₹' : '$'}{displayPrice.toFixed(2)}
                                    </div>
                                    <div className="text-gray-500 text-xs">per month</div>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                                <div className="text-red-400 text-sm">{error}</div>
                            </div>
                        )}

                        {/* Payment Info */}
                        <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <p className="text-blue-400 text-sm">
                                <strong>Secure Payment:</strong> All transactions are encrypted and secure.
                                We support Cards, UPI, Net Banking, and Wallets.
                            </p>
                        </div>

                        {/* Pay Button */}
                        <button
                            onClick={handlePayment}
                            disabled={loading || !scriptLoaded}
                            className="w-full bg-[#7001FE] text-white py-4 rounded-lg hover:bg-[#5a01cc] transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {!scriptLoaded ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    Pay {currency === 'INR' ? '₹' : '$'}{displayPrice.toFixed(2)}
                                </>
                            )}
                        </button>

                        {/* Terms */}
                        <p className="text-gray-500 text-xs text-center mt-4">
                            By proceeding, you agree to our Terms of Service and Privacy Policy.
                            Your subscription will auto-renew monthly.
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
