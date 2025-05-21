import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';

export const SidebarLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);        // for desktop
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // for mobile
    return (
        <div className="flex relative min-h-screen bg-gray-50">
            <Sidebar
                open={sidebarOpen}
                mobileSidebarOpen={mobileSidebarOpen}
                setMobileSidebarOpen={setMobileSidebarOpen}
            />
            <Topbar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
                mobileOpen={mobileSidebarOpen}
                setMobileOpen={setMobileSidebarOpen}
            />
            <main className="flex-1 p-4 pt-20 md:pt-6 transition-all mt-5">
                <Outlet />
            </main>
        </div>
    );
};

