"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { LayoutDashboard, Building2, CreditCard, LogOut } from "lucide-react";

const menus = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Companies", href: "/admin/companies", icon: Building2 },
    { name: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        Cookies.remove("adminToken");
        router.push("/admin/login");
    };

    return (
        <aside className="sticky top-0 hidden h-screen w-72 flex-col border-r border-gray-200 bg-white md:flex">
            <div className="border-b border-gray-200 p-6">
                <h1 className="text-xl font-bold text-indigo-600">Career Widget</h1>
                <p className="mt-0.5 text-sm text-gray-500">Super Admin</p>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
                {menus.map((menu) => {
                    const Icon = menu.icon;
                    const isActive = pathname === menu.href;

                    return (
                        <Link
                            key={menu.href}
                            href={menu.href}
                            className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                                isActive
                                    ? "bg-indigo-600 text-white"
                                    : "text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                            <Icon size={18} />
                            {menu.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-gray-200 p-4">
                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </aside>
    );
}