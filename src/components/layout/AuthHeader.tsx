import { useNavigate } from "react-router-dom";
import { Search, Bell, LogOut } from 'lucide-react';
import { useState, useEffect } from "react";

export function AuthHeader() {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ username: string, email: string } | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('dc_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      // ignore error
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("dc_token");
    localStorage.removeItem("dc_user");
    setUser(null);
    navigate("/");
  };

  return (
    <header className="bg-[#12141f] border-b border-gray-800 px-4 md:px-6 lg:px-8 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects, templates..."
              className="w-full bg-[#1a1c2e] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Notification */}
          <button className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 md:gap-3 hover:bg-white/5 p-1.5 rounded-lg transition-colors"
            >
              <div className="hidden md:block text-right">
                <div className="text-sm">{user?.username || 'Guest'}</div>
                <div className="text-xs text-gray-400">{user?.email || ''}</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                <span className="text-sm">{(user?.username || 'G').charAt(0).toUpperCase()}</span>
              </div>
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1a1c2e] border border-gray-700 rounded-lg shadow-xl py-1 z-50">
                <div className="md:hidden px-4 py-2 border-b border-gray-700">
                  <p className="text-sm text-white font-medium truncate">{user?.username || 'Guest'}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email || ''}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors text-left"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
