import { Outlet } from "react-router-dom";

// Components
import { Sidebar } from "@/components/Sidebar";

export const SidebarLayout = () => {
    return (
        <div className="bg-[#F4F5F9] min-h-screen flex">
            <Sidebar />
            <div className="flex-1 p-8 space-y-6">
                <Outlet />
            </div>
        </div>
    );
}
