// Components
import { Sidebar } from "@/components/Sidebar";

export default function Account() {
    return (
        <div className="bg-[#F4F5F9] min-h-screen flex">
            <Sidebar />
            <div className="flex-1 p-8 space-y-6">
                {/* Header */}
                <h1 className="text-lg font-medium text-[#8770BC]">Abrar Rahman</h1>
            </div>
        </div>
    );
}
