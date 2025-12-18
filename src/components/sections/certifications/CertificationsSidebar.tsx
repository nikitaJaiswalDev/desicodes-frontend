import React, { useState, useEffect } from "react";
import { Award, Download, Send, ShieldCheck, Loader2 } from "lucide-react";
import type { Certificate } from "../../../lib/api";
import { downloadAllCertificatesZip } from "../../../lib/certificateGenerator";
import { sendContactMessage } from "../../../lib/api";

interface Props {
  certificates: Certificate[];
  userName: string;
}

const CertificationsSidebar: React.FC<Props> = ({ certificates = [], userName = "Developer" }) => {
  const [formData, setFormData] = useState({
    name: userName,
    email: "",
    queryType: "Partnership",
    message: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    setFormData(prev => ({ ...prev, name: userName }));
  }, [userName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await sendContactMessage({
        name: formData.name,
        email: formData.email,
        query_type: formData.queryType,
        message: formData.message
      });
      setStatus("success");
      setFormData(prev => ({ ...prev, message: "" })); // Clear message but keep name/email
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-6">
      {/* Featured Certificate */}
      <div className="bg-[#222634] border border-white/10 rounded-xl p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-semibold text-base text-white">
            Featured Certifications
          </h3>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-lg">
            <div className="p-2 bg-[#FFFFFF0D] rounded-lg flex items-center justify-center">
              <ShieldCheck color="#60A5FA" />
            </div>
            <div>
              <h3 className="text-white text-xs font-medium">ISO 9001:2015</h3>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-lg">
            <div className="p-2 bg-[#FFFFFF0D] rounded-lg flex items-center justify-center">
              <Award color="#34D399" />
            </div>
            <div>
              <h3 className="text-white text-xs font-medium">ISO 14001:2015</h3>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-lg">
            <div className="p-2 bg-[#FFFFFF0D] rounded-lg flex items-center justify-center">
              <ShieldCheck color="#22D3EE" />
            </div>
            <div>
              <h3 className="text-white text-xs font-medium">CE Marking</h3>
            </div>
          </div>
        </div>
      </div>

      {/*/Download certificates */}
      <div className="flex flex-col gap-3 bg-[#1B2A3F] rounded-xl p-4 md:p-6 border border-[#3B82F64D]">
        <h3 className="text-white font-semibold leading-7">
          Download All Certificates
        </h3>
        <p className="text-xs leading-5 text-[#CBD5E1]">
          Get a complete package of all active licenses <br /> and
          certifications.
        </p>
        <button
          onClick={() => downloadAllCertificatesZip(certificates, userName)}
          disabled={certificates.length === 0}
          className={`flex items-center justify-center gap-4 py-3 rounded-lg shadow-xl text-white text-sm ${certificates.length === 0 ? 'bg-gray-600 cursor-not-allowed opacity-50' : 'bg-[#3A3DD6]'}`}
        >
          <Download className="w-4 h-4" />
          <span className="leading-6 font-medium">Download ZIP</span>
        </button>
      </div>

      {/* Contact Support */}
      <div className="bg-[#131823] border border-white/10 rounded-xl p-4 md:p-6 flex flex-col gap-3">
        <h4 className="font-semibold text-white">
          Need help or want verification?
        </h4>
        <p className="text-xs text-[#94A3B8]">Contact our legal team.</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* <!-- Name --> */}
          <div>
            <label className="block text-xs text-[#CBD5E1] mb-1">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full text-sm px-4 py-3 rounded-lg bg-[#FFFFFF0D] text-white border border-white/10 focus:border-white/20 outline-none transition"
            />
          </div>

          {/* <!-- Email --> */}
          <div>
            <label className="block text-xs text-[#CBD5E1] mb-1">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 text-sm rounded-lg bg-[#FFFFFF0D] text-white border border-white/10 focus:border-white/20 outline-none transition"
            />
          </div>

          {/* <!-- Query Type --> */}
          <div>
            <label className="block text-xs text-[#CBD5E1] mb-1">
              Query type
            </label>
            <select
              value={formData.queryType}
              onChange={(e) => setFormData({ ...formData, queryType: e.target.value })}
              className="w-full px-2 py-3 text-sm rounded-lg bg-[#FFFFFF0D] text-white border border-white/10 focus:border-white/20 outline-none transition"
            >
              <option value="Partnership">Partnership</option>
              <option value="Verification">Verification</option>
              <option value="Support">Support</option>
            </select>
          </div>

          {/* <!-- Message --> */}
          <div>
            <label className="block text-xs text-[#CBD5E1] mb-1">Message</label>
            <textarea
              rows={5}
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 text-sm rounded-xl bg-[#FFFFFF0D] text-white border border-white/10 focus:border-white/20 outline-none transition resize-none"
            ></textarea>
          </div>

          {/* <!-- Button --> */}
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full flex items-center justify-center gap-4 py-3 rounded-lg text-sm text-white
      bg-[#3A3DD6] hover:bg-[#3A3DD6]/90 transition
      shadow-[0_0_30px_4px_rgba(60,71,244,0.45)] disabled:opacity-50"
          >
            {status === "loading" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : status === "success" ? (
              <span className="text-green-400">Message Sent!</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span className="leading-6 font-medium">Send message</span>
              </>
            )}
          </button>
          {status === "error" && <p className="text-red-400 text-xs text-center mt-2">Failed to send. Please try again.</p>}
        </form>
      </div>
    </div>
  );
};

export default CertificationsSidebar;
