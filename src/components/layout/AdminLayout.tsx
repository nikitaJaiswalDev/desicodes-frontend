import React, { useState, useEffect } from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { LayoutGrid, Users, CreditCard, Languages, Search, LogOut } from 'lucide-react';
import "./AdminLayout.css";

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState<{ username: string, email: string } | null>(null);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
        navigate("/auth");
    };

    const menuItems = [
        { icon: <LayoutGrid className="w-5 h-5" />, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: <Users className="w-5 h-5" />, label: 'Users', path: '/admin/users' },
        { icon: <CreditCard className="w-5 h-5" />, label: 'Subscriptions', path: '/admin/subscriptions' },
        { icon: <Languages className="w-5 h-5" />, label: 'Languages', path: '/admin/languages' },
    ];

    return (
        <div className="flex h-screen bg-[#0a0b14] text-white overflow-hidden">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#1a1c2e] rounded-lg"
            >
                <LayoutGrid className="w-6 h-6" />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:static inset-y-0 left-0 z-40 
                    w-64 bg-[#12141f] border-r border-gray-800
                    transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                    flex flex-col overflow-y-auto 
                `}
            >
                {/* Logo */}
                <div className="p-6 border-b border-gray-800">
                    <Link
                        to="/admin/dashboard"
                        className="block text-[23px] font-bold italic leading-[1.3] bg-[linear-gradient(80.32deg,#F83A3A_10%,#F13DD4_50%,#7000FF_90%)] bg-clip-text text-transparent transition-all duration-300"
                    >
                        <img src="/logo.png" alt="DesiCodes Admin" className="h-12 sm:h-16 w-auto" />
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4">
                    {menuItems.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                navigate(item.path);
                                setIsOpen(false);
                            }}
                            className={`
                                w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-2 cursor-pointer
                                transition-colors duration-200
                                ${location.pathname === item.path
                                    ? 'bg-purple-500/10 text-purple-400'
                                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                                }
                            `}
                        >
                            {item.icon}
                            <span className="text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Admin Badge */}
                <div className="p-4">
                    <div className="bg-gradient-to-r from-[#581C87] to-[#831843] rounded-lg p-4">
                        <div className="text-white mb-2 font-semibold">Admin Panel</div>
                        <p className="text-white/80 text-xs">Manage your platform</p>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="bg-[#12141f] border-b border-gray-800 px-4 md:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 max-w-xl">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search users, subscriptions..."
                                    className="w-full bg-[#1a1c2e] border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-3 md:gap-4">
                            {/* User Profile */}
                            <div className="relative">
                                <button
                                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                                    className="flex items-center gap-2 md:gap-3 hover:bg-white/5 p-1.5 rounded-lg transition-colors"
                                >
                                    <div className="hidden md:block text-right">
                                        <div className="text-sm">{user?.username || 'Admin'}</div>
                                        <div className="text-xs text-gray-400">{user?.email || ''}</div>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
                                        <span className="text-sm">{(user?.username || 'A').charAt(0).toUpperCase()}</span>
                                    </div>
                                </button>

                                {userMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-[#1a1c2e] border border-gray-700 rounded-lg shadow-xl py-1 z-50">
                                        <div className="md:hidden px-4 py-2 border-b border-gray-700">
                                            <p className="text-sm text-white font-medium truncate">{user?.username || 'Admin'}</p>
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

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
