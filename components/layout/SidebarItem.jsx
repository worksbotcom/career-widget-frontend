"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";

function itemClassName({ collapsed, active }) {
    return `flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors duration-150 ${
        collapsed ? "justify-center" : ""
    } ${
        active
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
    }`;
}

export default function SidebarItem({ item, onClick, collapsed = false }) {
    const pathname = usePathname();
    const router = useRouter();
    const { logout } = useAuth();

    const Icon = item.icon;
    const active = pathname === item.href;

    const content = (
        <>
            <Icon size={19} strokeWidth={2} className="shrink-0" />
            {!collapsed && <span className="truncate">{item.title}</span>}
        </>
    );

    if (item.action === "logout") {
        const handleLogout = async (event) => {
            event.preventDefault();
            onClick?.();
            await logout();
            router.replace("/auth/login");
        };

        return (
            <button
                type="button"
                onClick={handleLogout}
                title={collapsed ? item.title : undefined}
                className={`w-full text-left ${itemClassName({ collapsed, active: false })}`}
            >
                {content}
            </button>
        );
    }

    return (
        <Link
            href={item.href}
            onClick={onClick}
            title={collapsed ? item.title : undefined}
            aria-current={active ? "page" : undefined}
            className={itemClassName({ collapsed, active })}
        >
            {content}
        </Link>
    );
}