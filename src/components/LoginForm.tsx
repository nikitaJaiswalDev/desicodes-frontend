import React, { useState } from "react";
import { loginUser } from "../lib/api";

type Props = {
  onSuccess?: (result: { access_token: string; user: { id: number; username: string; email: string; user_type?: string } }) => void;
};

const LoginForm: React.FC<Props> = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const isValidEmail = (val: string) => /.+@.+\..+/.test(val);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!isValidEmail(email.trim())) errs.email = "Enter a valid email";
    if (!password) errs.password = "Password is required";

    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    try {
      const res = await loginUser({ email: email.trim(), password });
      console.log({ res });

      onSuccess?.(res as any);
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="mb-3">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (fieldErrors.email) setFieldErrors((fe) => ({ ...fe, email: undefined }));
            if (error) setError(null);
          }}
          aria-invalid={!!fieldErrors.email}
          className={`w-full rounded-lg py-3 bg-[#120E19] border px-4 text-white placeholder:text-sm placeholder-[#FFFFFF33] focus:outline-none ${fieldErrors.email ? "border-red-500" : "border-[#FFFFFF0D]"
            }`}
        />
        {fieldErrors.email && (
          <div className="text-red-400 text-xs mt-1">{fieldErrors.email}</div>
        )}
      </div>
      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (fieldErrors.password) setFieldErrors((fe) => ({ ...fe, password: undefined }));
            if (error) setError(null);
          }}
          aria-invalid={!!fieldErrors.password}
          className={`w-full rounded-lg py-3 bg-[#120E19] border px-4 text-white placeholder:text-sm placeholder-[#FFFFFF33] focus:outline-none ${fieldErrors.password ? "border-red-500" : "border-[#FFFFFF0D]"
            }`}
        />
        {fieldErrors.password && (
          <div className="text-red-400 text-xs mt-1">{fieldErrors.password}</div>
        )}
      </div>

      {error && <div className="w-full text-red-400 text-sm mb-3">{error}</div>}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-[#FFFFFFE5] border border-[#FFFFFF0D] text-black text-sm font-medium mb-4 disabled:opacity-70"
      >
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
