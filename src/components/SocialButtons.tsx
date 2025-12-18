import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { appleAuthHelpers } from 'react-apple-signin-auth';
import { socialLogin } from "../lib/api";

const SocialButtons: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        await socialLogin({
          provider: 'google',
          token: tokenResponse.access_token
        });
        navigate("/dashboard");
      } catch (error) {
        console.error("Google login failed", error);
        alert("Google login failed.");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      console.error("Google Login Failed");
      alert("Google Login Failed");
    }
  });

  const mockUserForProvider = (provider: string) => ({
    email: `user_${provider.toLowerCase()}@example.com`,
    name: `${provider} User`,
    provider: provider
  });

  const handleUiClick = async (provider: string) => {
    if (provider === 'Google') {
      googleLogin();
      return;
    }

    if (provider === 'GitHub') {
      const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
      if (clientId) {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${window.location.origin}/auth/callback/github&scope=user:email`;
        return;
      }
    }

    if (provider === 'Apple') {
      const clientId = import.meta.env.VITE_APPLE_CLIENT_ID;
      const redirectURI = import.meta.env.VITE_APPLE_REDIRECT_URI || window.location.origin;

      if (clientId) {
        try {
          const response = await appleAuthHelpers.signIn({
            authOptions: {
              clientId: clientId,
              redirectURI: redirectURI,
              usePopup: true,
              scope: 'email name',
              nonce: 'nonce'
            },
            onSuccess: (response: any) => console.log(response),
            onError: (error: any) => console.error(error)
          });

          if (response) {
            setLoading(true);
            await socialLogin({
              provider: 'apple',
              token: response.authorization?.id_token,
              code: response.authorization?.code,
              email: response.user?.email,
              name: response.user?.name ? `${response.user.name.firstName} ${response.user.name.lastName}` : undefined
            });
            navigate("/dashboard");
          }
          return;
        } catch (err) {
          console.error("Apple login failed/cancelled", err);
          return;
        }
      }
    }

    setSelectedProvider(provider);
  };

  const performLogin = async () => {
    if (!selectedProvider || loading) return;
    setLoading(true);

    const mockUser = mockUserForProvider(selectedProvider);

    try {
      await socialLogin(mockUser);
      navigate("/dashboard");
    } catch (error) {
      console.error("Social login failed", error);
      alert("Social login failed. Please try again.");
      setLoading(false);
      setSelectedProvider(null);
    }
  };

  return (
    <>
      <div className="flex w-full gap-3 mb-6">
        <button
          onClick={() => handleUiClick('Apple')}
          disabled={loading}
          type="button"
          className="flex-1 h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Sign in with Apple"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="#FFFFFF99" viewBox="0 0 24 24">
            <path d="M16.365 1.43c0 1.14-.417 2.055-1.252 2.748-.835.694-1.833 1.08-2.995 1.157-.02-.14-.03-.346-.03-.62 0-1.073.437-1.98 1.312-2.72C14.275.255 15.29-.11 16.43.01c-.021.14-.032.313-.032.52zm4.07 15.96c-.29.91-.71 1.75-1.27 2.52-.67.94-1.22 1.6-1.66 1.97-.66.61-1.37.92-2.12.93-.54 0-1.19-.155-1.96-.47-.77-.31-1.48-.47-2.13-.47-.69 0-1.41.16-2.16.47-.76.315-1.37.477-1.83.49-.72.03-1.45-.29-2.18-.96-.47-.4-1.05-1.08-1.73-2.03-.74-1.02-1.36-2.2-1.86-3.54-.52-1.41-.78-2.77-.78-4.08 0-1.51.33-2.82.97-3.94.49-.86 1.15-1.54 1.98-2.04.83-.51 1.73-.78 2.7-.8.53 0 1.23.18 2.1.54.87.36 1.43.54 1.67.54.18 0 .81-.2 1.88-.6 1.01-.36 1.88-.51 2.62-.45 1.94.16 3.4.95 4.38 2.39-1.74 1.05-2.61 2.52-2.61 4.41 0 1.47.55 2.72 1.65 3.76.49.46 1.03.82 1.63 1.1-.13.39-.27.78-.41 1.17z" />
          </svg>
        </button>
        <button
          onClick={() => handleUiClick('GitHub')}
          disabled={loading}
          type="button"
          className="flex-1 h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Sign in with GitHub"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="#FFFFFF99" viewBox="0 0 24 24">
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.43 7.86 10.97.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.39-3.87-1.39-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a10.9 10.9 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.44-2.7 5.41-5.28 5.7.42.36.8 1.1.8 2.22v3.29c0 .31.21.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
          </svg>
        </button>
        <button
          onClick={() => handleUiClick('Google')}
          disabled={loading}
          type="button"
          className="flex-1 h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Sign in with Google"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.5 12.27c0-.82-.07-1.64-.23-2.44H12v4.62h6.48c-.28 1.56-1.16 2.97-2.48 3.88v3.2h4c2.34-2.14 3.5-5.29 3.5-9.26z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.94-2.87l-4-3.2c-1.1.74-2.53 1.17-3.94 1.17-3.02 0-5.59-2.04-6.5-4.78H1.36v3c1.97 3.98 6.07 6.68 10.64 6.68z" />
            <path fill="#FBBC05" d="M5.5 14.32A7.69 7.69 0 0 1 5.08 12c0-.8.14-1.58.42-2.32V6.68H1.36A11.9 11.9 0 0 0 .5 12c0 1.88.45 3.66 1.36 5.32l3.64-2.99z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.36.6 4.62 1.77l3.44-3.43C17.96 1.13 15.24 0 12 0 7.43 0 3.33 2.7 1.36 6.68l3.64 3c.92-2.74 3.48-4.93 6.5-4.93z" />
          </svg>
        </button>
      </div>

      {selectedProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-[#1A1625] border border-white/10 rounded-2xl p-6 shadow-2xl transform transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-3xl mb-4">
                {selectedProvider[0]}
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">
                Sign in with {selectedProvider}
              </h3>

              <p className="text-white/60 text-sm mb-6">
                Choose an account to continue to Desicodes
              </p>

              <div className="w-full bg-white/5 rounded-xl p-3 flex items-center gap-3 mb-6 cursor-pointer border border-white/10 hover:border-white/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {selectedProvider[0]}
                </div>
                <div className="text-left">
                  <div className="text-white text-sm font-medium">{mockUserForProvider(selectedProvider).name}</div>
                  <div className="text-white/50 text-xs">{mockUserForProvider(selectedProvider).email}</div>
                </div>
              </div>

              <div className="w-full flex gap-3">
                <button
                  onClick={() => setSelectedProvider(null)}
                  className="flex-1 py-2.5 rounded-lg border border-white/10 text-white hover:bg-white/5 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={performLogin}
                  disabled={loading}
                  className="flex-1 py-2.5 rounded-lg bg-white text-black hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  {loading ? "Signing in..." : "Continue"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialButtons;
