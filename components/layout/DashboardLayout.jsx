"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import MobileSidebar from "./MobileSidebar";
import Navbar from "./Navbar";

export default function DashboardLayout({
    children,
    role = "company",
    title = "Dashboard",
    company
}) {

    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar
                onMenuClick={() => setMobileOpen(true)}
                title={title}
                company={company}
                role={role}
            />

            <div className="flex">
                <Sidebar role={role} />
                <MobileSidebar
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    role={role}
                />

                <main className="flex-1 p-4 sm:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}