"use client";

import { Menu, Bell } from "lucide-react";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar({ onMenuClick, title = "Dashboard", company, role = "company" }) {
    return (
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm md:px-6">
            {/* Left */}
            <div className="flex items-center gap-4">
                {/* Mobile menu */}
                <button
                    type="button"
                    onClick={onMenuClick}
                    aria-label="Open menu"
                    className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 lg:hidden"
                >
                    <Menu size={22} />
                </button>

                <div>
                    <h1 className="text-xl font-bold text-gray-900">{title}</h1>
                    <p className="hidden text-sm text-gray-500 md:block">Career Widget</p>
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-4">
                {/* Notifications */}
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                >
                    <Bell size={20} />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
                </button>

                {/* Profile */}
                <ProfileDropdown
                    company={company}
                    redirectTo={role === "admin" ? "/admin/login" : "/auth/login"}
                />
            </div>
        </header>
    );
}