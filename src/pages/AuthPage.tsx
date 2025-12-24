import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SocialButtons from "../components/SocialButtons";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const urlMode = params.get("mode");
  const pathLower = location.pathname.toLowerCase();
  const pathMode = pathLower.endsWith("/signup") ? "signup" : pathLower.endsWith("/login") ? "login" : null;
  const [mode, setMode] = useState<"login" | "signup">(
    urlMode === "signup" ? "signup" : urlMode === "login" ? "login" : (pathMode ?? "login")
  );

  useEffect(() => {
    // keep query param in sync
    if (urlMode !== mode) {
      const next = new URLSearchParams(params);
      next.set("mode", mode);
      setParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  useEffect(() => {
    // respond to /login and /signup paths
    if (pathMode && pathMode !== mode) {
      setMode(pathMode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathMode]);

  const title = useMemo(
    () => (mode === "login" ? "Log in to Desicodes" : "Sign up to Desicodes"),
    [mode]
  );

  return (
    <div className="lg:min-h-screen flex items-center justify-center bg-[#0f0c15] px-4">
      <div className="w-full max-w-xs flex flex-col items-center p-4">
        <h1 className="text-2xl font-bold bg-[linear-gradient(80.32deg,#F83A3A_10%,#F13DD4_50%,#7000FF_90%)] bg-clip-text text-transparent mb-6">
          <img src="/logo.png" alt="DesiCodes Logo" className="h-12 sm:h-16 w-auto" />
        </h1>

        {/* Tabs */}
        <div className="w-full grid grid-cols-2 mb-4 rounded-lg overflow-hidden border border-white/10">
          <button
            className={`py-2 text-sm ${mode === "login" ? "bg-white/10 text-white" : "text-white/70"
              }`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`py-2 text-sm ${mode === "signup" ? "bg-white/10 text-white" : "text-white/70"
              }`}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-white mb-4 text-center leading-7">{title}</h2>

        {/* Social */}
        <SocialButtons />

        <p className="text-[#8a8693] text-sm mb-4">or</p>

        {mode === "login" ? (
          <LoginForm onSuccess={() => navigate("/dashboard")} />
        ) : (
          <RegisterForm onSuccess={(res) => {
            if (res && res.access_token) {
              navigate("/dashboard");
            } else {
              setMode("login");
            }
          }} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
