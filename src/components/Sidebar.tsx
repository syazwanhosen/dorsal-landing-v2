import React from "react";
import clsx from 'clsx';
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Avatar from '@radix-ui/react-avatar';
import {
    ChevronDown,
    ChevronUp,
    FileText,
    Dock,
    ScanSearch,
} from "lucide-react";

// Images
import logo from "../assets/icon.png";
import user from "../assets/abrar-rahman.jpg";

const MENU = [
    {
        label: "Authorized Account",
        icon: <FileText className="h-4 w-4" />,
        submenus: ["John Doe", "Jane Doe", "Jack Doe"],
    },
    {
        label: "Add Bill",
        icon: <Dock className="h-4 w-4" />,
        submenus: ["Upload Document", "Enter Manual Data"],
    },
    {
        label: "Run Audit",
        icon: <ScanSearch className="h-4 w-4" />,
        submenus: ["Quick Audit", "Detailed Report"],
    },
];

export const Sidebar = () => {
    const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({});

    const toggleSection = (label: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };

    return (
        <aside className="w-64 h-screen bg-white shadow-sm">
            <div className="flex flex-col h-full justify-between py-4">
                <div>
                    {/* Logo */}
                    <div className="flex flex-col items-center space-y-2 py-4">
                        <img src={logo} alt="Logo" className="w-16 h-16" />
                        <h1 className="text-[#8770BC] text-lg">dorsal.fyi</h1>
                    </div>

                    {/* Menu */}
                    <div className="space-y-2 px-4">
                        {MENU.map((item, index) => (
                            <Collapsible.Root
                                key={index}
                                open={openSections[item.label]}
                                onOpenChange={() => toggleSection(item.label)}
                            >
                                <Collapsible.Trigger className={clsx(`flex items-center justify-between w-full py-2 px-2 rounded hover:bg-gray-100 text-sm font-medium text-gray-700`, openSections[item.label]
                                    ? 'bg-[#EFEAFB] text-[#8770BC] border-l-4 border-[#8770BC]'
                                    : 'text-gray-800 hover:bg-gray-100 pl-[calc(0.75rem+4px)]')}>
                                    <div className={clsx('flex items-center gap-2', openSections[item.label] ? 'text-[#8770BC]' : 'text-gray-800')}>
                                        {item.icon}
                                        {item.label}
                                    </div>
                                    {openSections[item.label] ? (
                                        <ChevronUp className={clsx("h-4 w-4", openSections[item.label] ? 'text-[#8770BC]' : 'text-gray-800')} />
                                    ) : (
                                        <ChevronDown className={clsx("h-4 w-4", openSections[item.label] ? 'text-[#8770BC]' : 'text-gray-800')} />
                                    )}
                                </Collapsible.Trigger>
                                <Collapsible.Content>
                                    <ul className="pl-9 py-1">
                                        {item.submenus.map((submenu, subIndex) => (
                                            <li
                                                key={subIndex}
                                                className={clsx(
                                                    'text-sm cursor-pointer hover:text-[#8770BC]',
                                                    'mt-4'
                                                )}
                                            >
                                                {submenu}
                                            </li>
                                        ))}
                                    </ul>
                                </Collapsible.Content>
                            </Collapsible.Root>
                        ))}
                    </div>
                </div>
                {/* User Profile will be dynamic based on Logged In user*/}
                <div className="px-4 py-6">
                    <div className="bg-[#8770BC] text-white flex items-center gap-3 rounded-xl px-4 py-3 mt-auto">
                        <Avatar.Root className="w-8 h-8 rounded-full overflow-hidden bg-white">
                            <Avatar.Image
                                src={user}
                                alt="Abrar Rahman"
                                className="w-full h-full object-cover"
                            />
                            <Avatar.Fallback delayMs={600}>Abrar Rahman</Avatar.Fallback>
                        </Avatar.Root>
                        <div className="flex flex-col text-sm">
                            <span>Abrar Rahman</span>
                            <span className="text-xs opacity-80">abrar@gmail.com</span>
                        </div>
                        <button className="ml-auto text-white opacity-70 hover:opacity-100">
                            <svg width="16" height="16" fill="currentColor">
                                <circle cx="8" cy="3" r="1" />
                                <circle cx="8" cy="8" r="1" />
                                <circle cx="8" cy="13" r="1" />
                            </svg>

                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );
};