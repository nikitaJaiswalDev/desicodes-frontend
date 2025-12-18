import { Play, Maximize } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { executeCode } from "../../../lib/api";

const Editor = ({ bg }: { bg?: boolean }) => {
  const navigate = useNavigate();
  const defaultSnippets: Record<string, string> = {
    "Assamese": `# অসমীয়া প্ৰোগ্ৰাম
লিখা "নমস্কাৰ, বিশ্ব!"
যদি ৫ > ৩ তেন্তে
  লিখা "৫ ডাঙৰ সকলোতকৈ"
নহ'লে
  লিখা "৩ ডাঙৰ"
সমাপ্ত`,
    "Bengali": `# বাংলা প্রোগ্রাম
লিখুন "হ্যালো বিশ্ব!"
যদি ৫ > ৩ হয় তবে
  লিখুন "৫ বড়"
নতুবা
  লিখুন "৩ বড়"
শেষ`,
    "Bodo": `# बड़ो प्रोग्राम
लेख "खुलुमखा, बुहुम!"
जुदि ५ > ३ जाय
  लेख "५ देरसिन"
नाङाबा
  लेख "३ देरसिन"
जोबनाय`,
    "Manipuri": `# মৈতৈ প্রোগ্রাম
ইবা "খুরুমজরি, পৃথিবী!"
করিগুম্বা ৫ > ৩ ওইরবদি
  ইবা "৫ চাউই"
নত্রবদি
  ইবা "৩ চাউই"
লোইশিনবা`,
    "Khasi": `# Khasi Program
thoh "Kublei, Pyrthei!"
lada 5 > 3 te
  thoh "5 u kham heh"
lymda
  thoh "3 u kham heh"
kut`,
    "Garo": `# Garo Program
serbo "Salska, A'gilsak!"
mikkode 5 > 3
  serbo "5 dal'bata"
gipin
  serbo "3 dal'bata"
bon'chot`,
    "Mizo": `# Mizo Program
ziak "Chibai, Khawvel!"
5 > 3 anih chuan
  ziak "5 a lian zawk"
anih loh chuan
  ziak "3 a lian zawk"
tawp`
  };

  const [language, setLanguage] = useState("Assamese");
  const [code, setCode] = useState(defaultSnippets["Assamese"]);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    setCode(defaultSnippets[selectedLang] || "");
    setOutput("");
  };

  const handleRunCode = async () => {
    setLoading(true);
    try {
      const result = await executeCode(language, code);
      setOutput(result.output);
    } catch (e: any) {
      // Backend returns 403 with detailed message for limits
      // The API wrapper might throw the message directly or a JSON object string
      let msg = e.message || "";
      try {
        // Try to parse if it's a JSON string error
        const parsed = JSON.parse(msg);
        if (parsed.detail) msg = parsed.detail;
      } catch (err) {
        // Not JSON, use string as is
      }

      if (msg.includes("limit reached")) {
        setShowLimitModal(true);
      } else {
        setOutput(`Error executing code: ${msg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full min-h-screen ${bg && "bg-[#1E1E1E]"
        } flex items-center justify-center py-6 md:py-10 px-4`}
    >
      {/* Background Gradient */}
      <div
        className="relative w-full min-h-[650px] max-w-7xl rounded-xl"
        style={{
          background:
            "linear-gradient(99.98deg, #DCF9FF 0%, #621DBA 48.44%, #04001C 95.31%)",
        }}
      >
        {/* Top Header Bar */}
        <div className="flex justify-between pt-4 px-4 lg:pt-8 lg:px-12">
          {/* Language Dropdown */}
          <div className="">
            <span className="text-[#374151] text-xs mr-2">Language: </span>
            <select
              value={language}
              onChange={handleLanguageChange}
              className="text-black bg-white text-sm p-2 rounded-lg border border-[#D1D5DB]"
            >
              <option value="Assamese">Assamese (অসমীয়া)</option>
              <option value="Bengali">Bengali (বাংলা)</option>
              <option value="Bodo">Bodo (बड़ो)</option>
              <option value="Manipuri">Manipuri (Meitei)</option>
              <option value="Khasi">Khasi</option>
              <option value="Garo">Garo</option>
              <option value="Mizo">Mizo</option>
            </select>
          </div>
          <div className="flex flex-row gap-4 items-center">
            <button
              onClick={handleRunCode}
              disabled={loading}
              className={`flex items-center gap-2 bg-[#4F46E5] text-white text-xs px-1 md:px-4 py-2 rounded-lg border border-white/20 hover:bg-[#4338ca] transition-colors ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              <Play className="w-4 h-4" />
              {loading ? 'Running...' : 'Run Code'}
            </button>
            <button className="flex items-center gap-2 bg-[#00000000] text-white/40 text-xs">
              <Maximize className="w-4 h-4" />
              <span className="hidden md:block">Full IDE</span>
            </button>
          </div>
        </div>
        {/* Main Layout */}
        <div className="relative flex flex-col items-center lg:flex-row w-full px-4 lg:px-8 mt-6 md:mt-24 pb-10 min-h-[350px] overflow-visible">
          {/* Left Input Panel */}
          <div className="w-full lg:w-[35%] bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl text-white/80 h-80 md:h-[400px]">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full bg-transparent p-6 text-sm leading-7 resize-none focus:outline-none font-mono"
              spellCheck="false"
            />
          </div>

          {/* Right Output Panel */}
          <div className="relative self-center w-full lg:w-[65%] flex justify-center mt-4 lg:mt-0">
            <div
              className="
      bg-black/60 rounded-2xl
      p-6 text-white/50 min-h-88 md:min-h-[430px] max-h-[430px] w-full border border-[#8F8D9133] overflow-y-auto
      lg:absolute lg:-right-6 lg:-translate-y-1/2   /* overflow without adding gap */
      
    "
              style={{
                backdropFilter: "blur(72px)",
                boxShadow: `
        0px 0.5px 0px 1px #FFFFFF4D inset,
        0px 4px 40px 8px #00000066,
        0px 0px 0px 0.5px #000000CC
      `,
              }}
            >
              {output ? (
                <pre className="font-mono text-sm whitespace-pre-wrap text-green-400">
                  {output}
                </pre>
              ) : (
                <p># Output will appear here...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {showLimitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-[#1F2937] p-8 rounded-2xl max-w-md text-center border border-gray-700 shadow-2xl">
            <h3 className="text-xl text-white font-bold mb-4">Run Limit Reached</h3>
            <p className="text-gray-300 mb-6">
              You have used your 2 free code runs. Upgrade to Pro or Enterprise to continue coding without limits.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLimitModal(false)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => navigate('/pricing')}
                className="bg-[#7001FE] text-white px-6 py-2 rounded-lg hover:bg-[#5a01cc] transition-colors shadow-lg shadow-purple-500/20"
              >
                View Plans
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
