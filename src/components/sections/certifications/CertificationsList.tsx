import React from "react";
import {
  Download,
  CircleCheck,
} from "lucide-react";
import type { Certificate } from "../../../lib/api";

import { downloadCertificate } from "../../../lib/certificateGenerator";

interface Props {
  certificates: Certificate[];
  loading: boolean;
  userName: string;
}

const CertificationsList: React.FC<Props> = ({ certificates, loading, userName }) => {
  if (loading) {
    return <div className="text-white text-center py-10">Loading certificates...</div>;
  }

  if (certificates.length === 0) {
    return (
      <div className="bg-[#1C2130] border border-white/10 rounded-xl p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">No Certificates Yet</h3>
        <p className="text-white/60 mb-4">Start coding in the IDE with different languages to earn certificates!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {certificates.map((cert) => (
        <div
          key={cert.id}
          className="bg-[#1C2130] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors space-y-4"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-semibold text-white mb-1 leading-7">
                {cert.language} Developer Certificate
              </h3>
              <p className="text-xs text-[#94A3B8] mt-3">DesiCodes Certification</p>
            </div>
            <span
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium border text-[#34D399] bg-[#10B9811A] border-emerald-500/30`}
            >
              <CircleCheck className="w-4 h-4" />
              Active
            </span>
          </div>

          {/* Details Grid */}
          <div className="bg-[#FFFFFF05] border border-[#FFFFFF0D] rounded-lg p-4 mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-[#64748B] mb-1">Certificate ID</p>
                <p className="text-sm text-[#CBD5E1] font-mono">
                  {cert.id}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748B] mb-1">Issue date</p>
                <p className="text-sm text-[#CBD5E1]">{new Date(cert.issued_at).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748B] mb-1">Expiry date</p>
                <p className="text-sm text-[#CBD5E1]">Lifetime</p>
              </div>
              <div>
                <p className="text-[10px] text-[#64748B] mb-1">Scope</p>
                <div className="flex flex-wrap gap-1">
                  <span className="px-2 py-1 bg-[#3B82F61A] border border-[#3B82F64D]/30 text-[#93C5FD] text-[10px] rounded">
                    Global
                  </span>
                  <span className="px-2 py-1 bg-[#3B82F61A] border border-[#3B82F64D]/30 text-[#93C5FD] text-[10px] rounded">
                    {cert.language}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-[#CBD5E1] leading-5 mb-5">
            Verification of code execution and competency in {cert.language} using the DesiCodes IDE environment.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => downloadCertificate(cert, userName)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-xs font-medium rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download certificate
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationsList;
