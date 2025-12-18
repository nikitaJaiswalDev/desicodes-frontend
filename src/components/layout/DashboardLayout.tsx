import { Outlet } from 'react-router-dom';
import { Sidebar } from '../sections/dashboard/Sidebar';
import { AuthHeader } from './AuthHeader';

export const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-[#0a0b14] text-white overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <AuthHeader />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
