"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import SidebarItem from "./SidebarItem";
import { companyMenu, adminMenu } from "../../constants/sidebarMenu";

export default function Sidebar({ role = "company" }) {
    const [collapsed, setCollapsed] = useState(false);

    const menu = role === "admin" ? adminMenu : companyMenu;

    return (
        <aside
           className={`hidden lg:flex lg:flex-col sticky top-0 h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-200 ${
                    collapsed ? "lg:w-20" : "lg:w-64"
                }`}
        >
            {/* Logo */}
            <div
                className={`flex h-20 items-center border-b border-gray-200 px-4 ${
                    collapsed ? "flex-col justify-center gap-2" : "justify-between"
                }`}
            >
                {!collapsed && (
                    <div className="flex min-w-0 items-center">
                        <Image src="/logo.png" alt="Career Widget" width={42} height={42} />

                        <div className="ml-3 min-w-0">
                            <h1 className="truncate text-lg font-bold text-gray-900">Career Widget</h1>
                        </div>
                    </div>
                )}

                {collapsed && <Image src="/logo.png" alt="Career Widget" width={32} height={32} />}

                <button
                    type="button"
                    onClick={() => setCollapsed((value) => !value)}
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                    aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                    {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 overflow-y-auto p-3">
                {menu.map((section) => (
                    <div key={section.section} className="mb-6">
                        {/* Section title */}
                        {!collapsed && (
                            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                {section.section}
                            </p>
                        )}

                        {/* Items */}
                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <SidebarItem key={item.href} item={item} collapsed={collapsed} />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Footer */}
            <div className="border-t border-gray-200 p-5">
                {!collapsed && <p className="text-xs text-gray-400">Version 1.0.0</p>}
            </div>
        </aside>
    );
}