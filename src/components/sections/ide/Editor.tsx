import {
  Play,
  Square,
  FileCode,
  Terminal as TerminalIcon,
  ChevronRight,
  X,
  Maximize2,
  Minimize2,
  ArrowRight,
  ArrowDown
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { executeCode } from "../../../lib/api";
import MonacoEditor from "@monaco-editor/react";


const Editor = ({ bg, className }: { bg?: boolean; className?: string }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultSnippets: Record<string, string> = {
    "English": `# English Program
print "Hello, World!"
if 5 > 3 then
  print "5 is greater"
else
  print "3 is greater"
end`,
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
ইবা "খুরুমজरি, পৃথিবী!"
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

  const [language, setLanguage] = useState("English");
  const [code, setCode] = useState(defaultSnippets["English"]);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [outputHeight, setOutputHeight] = useState(250);
  const [outputWidth, setOutputWidth] = useState(35); // Percentage of container width when on right
  const [isDragging, setIsDragging] = useState(false);
  const [terminalPosition, setTerminalPosition] = useState<'bottom' | 'right'>('right');
  const [autoRun, setAutoRun] = useState(true); // Auto-run enabled by default
  const containerRef = useRef<HTMLDivElement>(null);
  const autoRunTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Free tier tracking for unauthenticated users
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [freeRunsRemaining, setFreeRunsRemaining] = useState(20);

  // Check authentication status and load free tier runs
  useEffect(() => {
    const token = localStorage.getItem('dc_token');
    setIsAuthenticated(!!token);

    if (!token) {
      // Load or initialize free tier usage tracking
      const freeUsageData = localStorage.getItem('dc_free_usage');
      if (freeUsageData) {
        try {
          const usage = JSON.parse(freeUsageData);
          const currentMonth = new Date().getMonth();
          const currentYear = new Date().getFullYear();

          // Reset if it's a new month
          if (usage.month !== currentMonth || usage.year !== currentYear) {
            const newUsage = {
              runs: 20,
              month: currentMonth,
              year: currentYear
            };
            localStorage.setItem('dc_free_usage', JSON.stringify(newUsage));
            setFreeRunsRemaining(20);
          } else {
            setFreeRunsRemaining(usage.runs);
          }
        } catch {
          // Invalid data, reset
          const newUsage = {
            runs: 20,
            month: new Date().getMonth(),
            year: new Date().getFullYear()
          };
          localStorage.setItem('dc_free_usage', JSON.stringify(newUsage));
          setFreeRunsRemaining(20);
        }
      } else {
        // First time user
        const newUsage = {
          runs: 20,
          month: new Date().getMonth(),
          year: new Date().getFullYear()
        };
        localStorage.setItem('dc_free_usage', JSON.stringify(newUsage));
        setFreeRunsRemaining(20);
      }
    }
  }, []);

  // Read language from URL query parameter on mount
  useEffect(() => {
    const langFromUrl = searchParams.get('lang');
    if (langFromUrl && defaultSnippets[langFromUrl]) {
      setLanguage(langFromUrl);
      setCode(defaultSnippets[langFromUrl]);
    }
  }, []); // Run only once on mount

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };

    if (showLanguageDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [showLanguageDropdown]);

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    setCode(defaultSnippets[newLang] || "");
    setOutput("");
  };

  const handleRunCode = async () => {
    // Check free tier limit for unauthenticated users
    if (!isAuthenticated && freeRunsRemaining <= 0) {
      setShowLimitModal(true);
      return;
    }

    setLoading(true);
    setOutput("Running...");
    try {
      const result = await executeCode(language, code);
      setOutput(result.output);

      // Decrement free tier runs for unauthenticated users
      if (!isAuthenticated) {
        const newRunsRemaining = freeRunsRemaining - 1;
        setFreeRunsRemaining(newRunsRemaining);

        const freeUsageData = localStorage.getItem('dc_free_usage');
        if (freeUsageData) {
          const usage = JSON.parse(freeUsageData);
          usage.runs = newRunsRemaining;
          localStorage.setItem('dc_free_usage', JSON.stringify(usage));
        }
      }
    } catch (e: any) {
      let msg = e.message || "";
      try {
        const parsed = JSON.parse(msg);
        if (parsed.detail) msg = parsed.detail;
      } catch (err) {
        // Not JSON, use string as is
      }

      if (msg.includes("limit reached")) {
        setShowLimitModal(true);
        setOutput("");
      } else {
        setOutput(`Error: ${msg}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Auto-run effect: Runs code automatically after user stops typing for 2 seconds
  useEffect(() => {
    // Clear any existing timer
    if (autoRunTimerRef.current) {
      clearTimeout(autoRunTimerRef.current);
    }

    // Only auto-run if the feature is enabled and there's code
    if (autoRun && code.trim()) {
      // Set a new timer to run code after 2 seconds of inactivity
      autoRunTimerRef.current = setTimeout(() => {
        handleRunCode();
      }, 2000);
    }

    // Cleanup function
    return () => {
      if (autoRunTimerRef.current) {
        clearTimeout(autoRunTimerRef.current);
      }
    };
  }, [code, autoRun]); // Re-run when code or autoRun setting changes

  // Terminal resize handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();

      if (terminalPosition === 'bottom') {
        // Calculate height from the mouse Y position to the bottom of the container
        const offsetFromTop = e.clientY - containerRect.top;
        const availableHeight = containerRect.height;
        const newHeight = availableHeight - offsetFromTop;

        // Allow terminal to be between 100px and 80% of container height
        const minHeight = 100;
        const maxHeight = availableHeight * 0.8;

        setOutputHeight(Math.max(minHeight, Math.min(maxHeight, newHeight)));
      } else {
        // Calculate percentage width from the mouse X position
        const offsetFromLeft = e.clientX - containerRect.left;
        const availableWidth = containerRect.width;
        const widthFromRight = availableWidth - offsetFromLeft;
        const widthPercentage = (widthFromRight / availableWidth) * 100;

        // Allow terminal to be between 20% and 60% of container width
        const minWidthPercent = 20;
        const maxWidthPercent = 60;

        setOutputWidth(Math.max(minWidthPercent, Math.min(maxWidthPercent, widthPercentage)));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, terminalPosition]);

  const languageMap: Record<string, string> = {
    "English": "English",
    "Assamese": "অসমীয়া",
    "Bengali": "বাংলা",
    "Bodo": "बड़ो",
    "Manipuri": "Meitei",
    "Khasi": "Khasi",
    "Garo": "Garo",
    "Mizo": "Mizo"
  };

  return (
    <div className={`w-full ${isFullScreen ? 'fixed inset-0 z-50' : className || 'h-screen'} ${bg && !isFullScreen && "bg-black"} flex flex-col overflow-hidden`}>
      {/* IDE Container */}
      <div className={`flex-1 flex flex-col ${isFullScreen ? '' : 'w-full'} bg-black overflow-hidden`}>

        {/* Top Menu Bar */}
        <div className="h-12 bg-[#0A0A0A] border-b border-[#1A1A1A] flex items-center px-4 gap-6">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-[#7001FE]" />
            <span className="text-white font-semibold text-sm">DesiCode IDE</span>
          </div>

          {/* Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#2A2A2A] rounded transition-colors text-white text-sm font-medium"
            >
              <FileCode className="w-4 h-4 text-[#7001FE]" />
              <span>{languageMap[language]}</span>
              <ChevronRight className={`w-4 h-4 transition-transform ${showLanguageDropdown ? 'rotate-90' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {showLanguageDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-[#0F0F0F] border border-[#1A1A1A] rounded shadow-xl z-50 overflow-hidden">
                {Object.keys(languageMap).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      handleLanguageChange(lang);
                      setShowLanguageDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center gap-2 ${language === lang
                      ? 'bg-[#1A1A1A] text-white'
                      : 'text-[#CCCCCC] hover:bg-[#1A1A1A]'
                      }`}
                  >
                    <FileCode className="w-4 h-4 text-[#7001FE]" />
                    <span>{languageMap[lang]}</span>
                    {language === lang && (
                      <span className="ml-auto text-[#7001FE]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1"></div>

          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 hover:bg-[#1A1A1A] rounded transition-colors text-[#CCCCCC]"
            title={isFullScreen ? "Exit Full Screen" : "Enter Full Screen"}
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden" ref={containerRef}>

          {/* Editor Area - Flex direction changes based on terminal position */}
          <div className={`flex-1 flex ${terminalPosition === 'bottom' ? 'flex-col' : 'flex-row'} bg-black`}>

            {/* Editor Section */}
            <div className="flex-1 flex flex-col min-w-0 min-h-0">

              {/* Toolbar */}
              <div className="h-10 bg-[#0A0A0A] border-b border-[#1A1A1A] flex items-center px-4 gap-3">
                <button
                  onClick={handleRunCode}
                  disabled={loading}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded transition-all ${loading
                    ? 'bg-[#858585] cursor-not-allowed'
                    : 'bg-[#0E639C] hover:bg-[#1177BB]'
                    } text-white text-sm font-medium`}
                >
                  {loading ? (
                    <>
                      <Square className="w-4 h-4" />
                      <span>Running...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" fill="currentColor" />
                      <span>Run Code</span>
                    </>
                  )}
                </button>

                <div className="h-5 w-px bg-[#1A1A1A]"></div>

                {/* Auto-Run Toggle */}
                <button
                  onClick={() => setAutoRun(!autoRun)}
                  className={`px-3 py-1.5 rounded flex items-center gap-2 transition-colors ${autoRun
                    ? 'bg-[#7001FE] hover:bg-[#6001E0] text-white'
                    : 'bg-[#1A1A1A] hover:bg-[#2A2A2A] text-[#CCCCCC]'
                    } text-xs font-medium`}
                  title={autoRun ? 'Auto-run is ON' : 'Auto-run is OFF'}
                >
                  <div className={`w-2 h-2 rounded-full ${autoRun ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
                    }`}></div>
                  <span>Auto-Run</span>
                </button>

                <div className="h-5 w-px bg-[#3E3E42]"></div>

                <div className="text-[#CCCCCC] text-xs">
                  {language} - {languageMap[language]}
                </div>
              </div>

              {/* Monaco Editor */}
              <div className="flex-1 overflow-hidden">
                <MonacoEditor
                  height="100%"
                  defaultLanguage="python"
                  theme="vs-dark"
                  value={code}
                  onChange={(value: string | undefined) => setCode(value || "")}
                  options={{
                    fontSize: 14,
                    fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', Consolas, monospace",
                    minimap: { enabled: true },
                    scrollBeyondLastLine: false,
                    wordWrap: "on",
                    lineNumbers: "on",
                    renderWhitespace: "selection",
                    bracketPairColorization: { enabled: true },
                    guides: {
                      indentation: true,
                      bracketPairs: true
                    },
                    padding: { top: 16, bottom: 16 },
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                  }}
                />
              </div>
            </div>

            {/* Resize Handle - Different direction based on terminal position */}
            <div
              onMouseDown={() => setIsDragging(true)}
              className={`${terminalPosition === 'bottom'
                ? 'h-1.5 w-full cursor-ns-resize'
                : 'w-1.5 h-full cursor-ew-resize'
                } bg-[#1A1A1A] hover:bg-[#7001FE] transition-colors flex items-center justify-center group select-none`}
            >
              <div className={`${terminalPosition === 'bottom'
                ? 'w-16 h-1'
                : 'w-1 h-16'
                } bg-[#858585] group-hover:bg-white rounded-full transition-colors`}></div>
            </div>

            {/* Output Panel - Size depends on position */}
            <div
              className="bg-black border-[#1A1A1A] flex flex-col min-h-0 min-w-0 flex-shrink-0"
              style={{
                [terminalPosition === 'bottom' ? 'height' : 'width']: terminalPosition === 'bottom' ? `${outputHeight}px` : `${outputWidth}%`,
                borderTopWidth: terminalPosition === 'bottom' ? '1px' : '0',
                borderLeftWidth: terminalPosition === 'right' ? '1px' : '0'
              }}
            >
              <div className={`h-9 bg-[#0A0A0A] border-b border-[#1A1A1A] flex items-center ${terminalPosition === 'right' ? 'px-2 gap-1' : 'px-4 gap-4'} flex-shrink-0`}>
                <div className={`flex items-center gap-2 text-white ${terminalPosition === 'right' ? 'text-xs' : 'text-sm'} font-medium`}>
                  <TerminalIcon className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">Output</span>
                </div>
                <div className="flex-1 min-w-0"></div>

                {/* Toggle Terminal Position Button */}
                <button
                  onClick={() => setTerminalPosition(terminalPosition === 'bottom' ? 'right' : 'bottom')}
                  className="p-1 hover:bg-[#1A1A1A] rounded transition-colors text-[#CCCCCC] flex-shrink-0"
                  title={terminalPosition === 'bottom' ? 'Move to Right' : 'Move to Bottom'}
                >
                  {terminalPosition === 'bottom' ? <ArrowRight className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                </button>

                {output && (
                  <button
                    onClick={() => setOutput("")}
                    className="p-1 hover:bg-[#1A1A1A] rounded transition-colors text-[#CCCCCC] flex-shrink-0"
                    title="Clear Output"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className={`flex-1 overflow-y-auto overflow-x-hidden ${terminalPosition === 'right' ? 'p-2' : 'p-4'} font-mono ${terminalPosition === 'right' ? 'text-xs' : 'text-sm'} min-h-0`}>
                {output ? (
                  <pre className={`whitespace-pre-wrap break-words ${output.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
                    {output}
                  </pre>
                ) : (
                  <div className="text-[#858585] italic text-xs">
                    {terminalPosition === 'right' ? 'Output...' : 'Output will appear here after running your code...'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="h-6 bg-[#007ACC] flex items-center px-4 gap-4 text-white text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Ready</span>
          </div>
          <div>Lines: {code.split('\n').length}</div>
          <div>Language: {language}</div>
          <div className="flex-1"></div>
          {!isAuthenticated && (
            <div className="flex items-center gap-2 bg-white/10 px-2 py-0.5 rounded">
              <span className="font-medium">Free Tier:</span>
              <span className={freeRunsRemaining <= 5 ? 'text-yellow-300 font-bold' : ''}>
                {freeRunsRemaining}/20 runs
              </span>
            </div>
          )}
          <div>DesiCode v1.0.0</div>
        </div>
      </div>

      {/* Limit Modal */}
      {showLimitModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="bg-[#0A0A0A] p-8 rounded-lg max-w-md text-center border border-[#1A1A1A] shadow-2xl">
            <h3 className="text-xl text-white font-bold mb-4">Run Limit Reached</h3>
            <p className="text-[#CCCCCC] mb-6">
              {!isAuthenticated ? (
                <>
                  You have used all <strong>20 free runs</strong> for this month.
                  <br /><br />
                  Sign up for a free account to get more runs, or upgrade to Pro for unlimited access!
                </>
              ) : (
                'You have reached your monthly run limit. Upgrade to Pro to continue coding without limits.'
              )}
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLimitModal(false)}
                className="px-6 py-2 text-[#CCCCCC] hover:text-white hover:bg-[#1A1A1A] rounded transition-colors"
              >
                Cancel
              </button>
              {!isAuthenticated ? (
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-[#7001FE] text-white px-6 py-2 rounded hover:bg-[#5a01cc] transition-colors shadow-lg shadow-purple-500/20"
                >
                  Sign Up Free
                </button>
              ) : (
                <button
                  onClick={() => navigate('/pricing')}
                  className="bg-[#7001FE] text-white px-6 py-2 rounded hover:bg-[#5a01cc] transition-colors shadow-lg shadow-purple-500/20"
                >
                  View Plans
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
