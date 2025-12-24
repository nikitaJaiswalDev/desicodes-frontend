import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  React.useEffect(() => {
    const token = localStorage.getItem("dc_token");
    const userData = localStorage.getItem("dc_user");
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("dc_token");
    localStorage.removeItem("dc_user");
    setUser(null);
    navigate("/");
  };

  const navigationItems = [
    // {
    //   id: "dashboard",
    //   label: "Dashboard",
    //   href: "/dashboard",
    //   isActive: currentPath === "/dashboard",
    // },
    // { id: "home", label: "Home", href: "/", isActive: currentPath === "/" },
    {
      id: "about",
      label: "About",
      href: "/about",
      isActive: currentPath === "/about",
    },
    {
      id: "languages",
      label: "Languages",
      href: "/languages",
      isActive: currentPath === "/languages",
    },
    {
      id: "pricing",
      label: "Pricing",
      href: "/pricing",
      isActive: currentPath === "/pricing",
    },
    {
      id: "ide",
      label: "IDE",
      href: "/ide",
      isActive: currentPath === "/ide",
    },
    {
      id: "resources",
      label: "Resources",
      href: "/resources",
      isActive: currentPath === "/resources",
    },
    {
      id: "community",
      label: "Community",
      href: "/community",
      isActive: currentPath === "/community",
    },
    {
      id: "contact",
      label: "Contact",
      href: "/contact",
      isActive: currentPath === "/contact",
    },
  ];

  return (
    <header className="bg-[#05010D] z-50">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center transition-all duration-300 hover:opacity-80"
          >
            <img src="/logo.png" alt="DesiCodes Logo" className="h-12 sm:h-16 w-auto" />
          </Link>

          {/* Hamburger menu (mobile only) */}
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8 ml-auto">
            <nav className="flex items-center gap-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={`text-[15px] sm:text-[16px] font-medium tracking-[0.2px] transition-colors duration-200 hover:text-white ${item.isActive ? "text-white" : "text-[rgba(255,255,255,0.6)]"
                    }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#120E19] border border-white/10 rounded-lg shadow-xl py-1 z-50">
                      <div className="px-4 py-2 border-b border-white/10">
                        <p className="text-sm text-white font-medium truncate">{user.username}</p>
                        <p className="text-xs text-white/60 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <LayoutDashboard size={16} />
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors text-left"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="inline-flex items-center justify-center rounded-md px-5 py-2 text-[15px] sm:text-[16px] font-medium bg-white text-black hover:bg-white/90 transition-colors duration-200"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/login"
                    className={`inline-flex items-center justify-center rounded-md px-5 py-2 text-[15px] sm:text-[16px] font-medium bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] transition-colors duration-200 ${currentPath === "/auth" ? "text-white" : "text-[rgba(255,255,255,0.85)]"
                      }`}
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-[#05010D]">
            <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8 py-4">
              <nav className="flex flex-col gap-3">
                {navigationItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`py-2 text-[16px] font-medium tracking-[0.2px] transition-colors duration-200 hover:text-white ${item.isActive ? "text-white" : "text-[rgba(255,255,255,0.7)]"
                      }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col gap-3 mt-4">
                {user ? (
                  <>
                    <div className="px-2 py-2 mb-2 border-b border-white/10">
                      <p className="text-sm text-white font-medium">{user.username}</p>
                      <p className="text-xs text-white/60">{user.email}</p>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-[16px] font-medium text-white hover:bg-white/5 transition-colors"
                    >
                      <LayoutDashboard size={20} />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-[16px] font-medium text-white hover:bg-white/5 transition-colors text-left"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center justify-center rounded-md px-5 py-2 text-[16px] font-medium bg-white text-black hover:bg-white/90 transition-colors duration-200"
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center justify-center bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.12)] transition-colors duration-200 rounded-md px-5 py-2 text-[16px] font-medium text-[rgba(255,255,255,0.9)]"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
