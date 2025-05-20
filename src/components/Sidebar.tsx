import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import clsx from "clsx";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Avatar from "@radix-ui/react-avatar";
import {
    ChevronDown,
    ChevronUp,
    FileText,
    Dock,
    ScanSearch,
    Menu,
    X,
} from "lucide-react";

import logo from "../assets/icon.png";
import user from "../assets/abrar-rahman.jpg";

const MENU = [
    {
        label: "Setup Profile",
        icon: <FileText className="h-4 w-4" />,
        defaultPath: "/account/about",
        submenus: [
        //    { name: "John Doe", path: "/authorized-account/john" },
         //   { name: "Jane Doe", path: "/authorized-account/jane" },
         //   { name: "Jack Doe", path: "/authorized-account/jack" },
        ],
    },
    {
        label: "Authorized Account",
        icon: <FileText className="h-4 w-4" />,
        defaultPath: "/authorized-account",
        submenus: [
            { name: "John Doe", path: "/authorized-account/john" },
            { name: "Jane Doe", path: "/authorized-account/jane" },
            { name: "Jack Doe", path: "/authorized-account/jack" },
        ],
    },
    {
        label: "Add Bill",
        icon: <Dock className="h-4 w-4" />,
        defaultPath: "/account/add-bill",
        submenus: [
            { name: "Upload Document", path: "/account/add-bill/upload-document" },
            { name: "Enter Manual Data", path: "/account/add-bill/manual-entry" },
        ],
    },
    {
        label: "Run Audit",
        icon: <ScanSearch className="h-4 w-4" />,
        defaultPath: "/audit",
        submenus: [
            { name: "Quick Audit", path: "/audit/quick" },
            { name: "Detailed Report", path: "/audit/detailed" },
        ],
    },
];

export const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({});
    const [sidebarExpanded, setSidebarExpanded] = React.useState(true);
    const [mobileSidebarOpen, setMobileSidebarOpen] = React.useState(false);

    const toggleSection = (label: string) => {
        setOpenSections((prev) => ({
            ...prev,
            [label]: !prev[label],
        }));
    };
    

    const handleNavigate = (path: string) => {
        navigate(path);
        setMobileSidebarOpen(false); // Close mobile sidebar on navigation
    };

    const isCollapsed = !sidebarExpanded;

    return (
        <>
            <aside
                className={clsx(
                    "bg-white shadow-md z-40 fixed top-0 left-0 h-screen flex flex-col justify-between py-4 transition-all duration-300 ease-in-out",
                    "md:relative md:h-auto md:top-auto md:left-auto md:flex md:flex-col",
                    {
                        "w-64": sidebarExpanded,
                        "w-16": isCollapsed,
                        "translate-x-0": mobileSidebarOpen,
                        "-translate-x-full": !mobileSidebarOpen,
                        "md:translate-x-0": true,
                    }
                )}
                style={{ transitionProperty: "width, transform" }}
            >
                <div>
                    {/* Header with Logo */}
                    <div
                        className={clsx(
                            "flex flex-col items-center space-y-2 py-4",
                            isCollapsed ? "justify-center" : "justify-between"
                        )}
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            className={clsx(
                                "transition-all duration-300 ease-in-out",
                                isCollapsed ? "w-5 h-5" : "w-16 h-16"
                            )}
                        />
                        {!isCollapsed && (
                            <h1 className="text-[#8770BC] text-lg font-semibold">dorsal.fyi</h1>
                        )}
                    </div>


                    {/* Menu */}
                    <div className="px-1">
                        {MENU.map((item, index) => (
                            <Collapsible.Root
                                key={index}
                                open={openSections[item.label]}
                                onOpenChange={() => toggleSection(item.label)}
                            >
                                <Collapsible.Trigger
                                    onClick={() => handleNavigate(item.defaultPath)}
                                    className={clsx(
                                        "flex items-center w-full rounded-md cursor-pointer mt-2",
                                        openSections[item.label]
                                            ? "bg-[#EFEAFB] border-l-4 border-[#8770BC]"
                                            : "hover:bg-gray-100",
                                        "transition-colors duration-300",
                                        isCollapsed ? "justify-center px-2 py-3" : "justify-between px-4 py-2"
                                    )}
                                >
                                    <div
                                        className={clsx(
                                            "flex items-center gap-2",
                                            isCollapsed ? "justify-center w-full" : "text-gray-800",
                                            openSections[item.label] && !isCollapsed ? "text-[#8770BC]" : ""
                                        )}
                                    >
                                        {item.icon}
                                        {!isCollapsed && item.label}
                                    </div>

                                    {!isCollapsed &&
                                        (openSections[item.label] ? (
                                            <ChevronUp className="h-4 w-4 text-[#8770BC]" />
                                        ) : (
                                            <ChevronDown className="h-4 w-4 text-gray-800" />
                                        ))}
                                </Collapsible.Trigger>

                                {/* Submenus - hidden if collapsed */}
                                {!isCollapsed && (
                                    <Collapsible.Content className="pl-10 mt-2">
                                        <ul>
                                            {item.submenus.map((submenu, subIndex) => {
                                                const isActive = location.pathname === submenu.path;

                                                return (
                                                    <li key={subIndex}>
                                                        <Link
                                                            to={submenu.path}
                                                            onClick={() => setMobileSidebarOpen(false)}
                                                            className={clsx(
                                                                "block text-sm cursor-pointer hover:text-[#8770BC] py-2",
                                                                isActive
                                                                    ? "text-[#8770BC]"
                                                                    : "text-gray-800 hover:text-[#8770BC]"
                                                            )}
                                                        >
                                                            {submenu.name}
                                                        </Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </Collapsible.Content>
                                )}
                            </Collapsible.Root>
                        ))}
                    </div>
                </div>

                {/* User Profile */}
                <div
                    className={clsx(
                        "bg-[#8770BC] text-white flex items-center gap-3 rounded-xl mx-2",
                        isCollapsed ? "justify-center py-1" : "px-4 py-3"
                    )}
                >
                    <Avatar.Root className="w-8 h-8 rounded-full overflow-hidden bg-white">
                        <Avatar.Image
                            src={user}
                            alt="Abrar Rahman"
                            className="w-full h-full object-cover"
                        />
                        <Avatar.Fallback delayMs={600}>Abrar Rahman</Avatar.Fallback>
                    </Avatar.Root>

                    {!isCollapsed && (
                        <div className="flex flex-col text-sm">
                            <span>Abrar Rahman</span>
                            <span className="text-xs opacity-80">abrar@gmail.com</span>
                        </div>
                    )}

                    {!isCollapsed && (
                        <button className="ml-auto text-white opacity-70 hover:opacity-100">
                            <svg width="16" height="16" fill="currentColor">
                                <circle cx="8" cy="3" r="1" />
                                <circle cx="8" cy="8" r="1" />
                                <circle cx="8" cy="13" r="1" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Sidebar toggle button — positioned overlapping sidebar right edge */}
                <button
                    onClick={() =>
                        window.innerWidth < 768
                            ? setMobileSidebarOpen((v) => !v)
                            : setSidebarExpanded((v) => !v)
                    }
                    aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
                    className={clsx(
                        "absolute top-4 z-50 flex items-center justify-center bg-white shadow-md transition-all duration-300 rounded-tr-lg rounded-br-lg hover:bg-purple-100",
                        sidebarExpanded ? "left-[252px]" : "left-12",
                        sidebarExpanded ? "h-12 w-10" : "h-8 w-8" // bigger when expanded, smaller when collapsed
                    )}
                    style={{
                        minWidth: sidebarExpanded ? "40px" : "32px",
                        minHeight: sidebarExpanded ? "48px" : "32px",
                    }}
                >
                    <svg
                        className={clsx(
                            "text-purple-700 transition-transform duration-300",
                            !sidebarExpanded && "rotate-180"
                        )}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width={sidebarExpanded ? 20 : 16}
                        height={sidebarExpanded ? 20 : 16}
                    >
                        <path d="M15 19l-7-7 7-7" />
                    </svg>
                </button>


            </aside>

            {/* Overlay on mobile */}
            {mobileSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
                    onClick={() => setMobileSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}
        </>
    );
};
