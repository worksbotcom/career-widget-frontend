"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

import DashboardLayout from "@/components/layout/DashboardLayout";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [checkingAuth, setCheckingAuth] = useState(true);

    useEffect(() => {
        const cookieToken = Cookies.get("adminToken");
        const storedToken = typeof window !== "undefined"
            ? localStorage.getItem("adminToken")
            : null;
        const token = cookieToken || storedToken;

        if (!token && pathname !== "/admin/login") {
            router.replace("/admin/login");
            return;
        }

        if (token && pathname === "/admin/login") {
            router.replace("/admin/dashboard");
            return;
        }

        setCheckingAuth(false);
    }, [pathname, router]);

    if (checkingAuth) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Checking authentication...
            </div>
        );
    }

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    return (
        <DashboardLayout
            role="admin"
            title="Super Admin Dashboard"
            company={{
                companyName: "Super Admin",
                email: "admin@careerwidget.com",
                logo: "https://api.dicebear.com/9.x/initials/svg?seed=Super%20Admin"
            }}
        >
            {children}
        </DashboardLayout>
    );
}
