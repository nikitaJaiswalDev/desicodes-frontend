import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { socialLogin } from "../lib/api";

const SocialCallbackPage: React.FC = () => {
    const [params] = useSearchParams();
    const { provider } = useParams(); // /auth/callback/:provider
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    // const [status, setStatus] = useState("Processing login...");

    const processed = React.useRef(false);

    useEffect(() => {
        const code = params.get("code");

        if (!code || !provider) {
            setError("Invalid callback parameters.");
            return;
        }

        if (processed.current) return;
        processed.current = true;

        const processLogin = async () => {
            try {
                await socialLogin({
                    provider: provider,
                    code: code,
                    // Email/Name will be fetched by backend
                });
                navigate("/dashboard");
            } catch (err: any) {
                console.error(err);
                setError(err.message || "Login failed");
                processed.current = false; // Allow retry if failed?
            }
        };

        processLogin();
    }, [params, provider, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0f0c15] text-white">
            <div className="bg-[#1A1625] p-8 rounded-xl border border-white/10 max-w-md w-full text-center">
                {error ? (
                    <>
                        <h2 className="text-xl text-red-500 mb-4">Login Failed</h2>
                        <p className="text-white/60 mb-6">{error}</p>
                        <button
                            onClick={() => navigate("/login")}
                            className="px-6 py-2 bg-white/10 rounded-lg hover:bg-white/20"
                        >
                            Back to Login
                        </button>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-4">{provider ? provider.toUpperCase() : 'Social'} Login</h2>
                        {/* <p className="text-white/60">{status}</p> */}
                        <div className="mt-6 flex justify-center">
                            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SocialCallbackPage;
