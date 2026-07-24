"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
    User,
    Settings,
    LogOut,
    ChevronDown
} from "lucide-react";

import Avatar from "../ui/Avatar";
import useAuth from "../../hooks/useAuth";

export default function ProfileDropdown({

    company,
    redirectTo = "/auth/login"

}) {

    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);

    const router = useRouter();

    const { logout } = useAuth();

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {

                setOpen(false);

            }

        }

        document.addEventListener("mousedown", handleClickOutside);

        return () =>
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

    }, []);

    const handleLogout = async () => {

        await logout();

        router.replace(redirectTo);

    };

    return (

        <div
            ref={dropdownRef}
            className="relative"
        >
            {/* Profile Button */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-100"
            >
                <Avatar
                    src={company?.logo}
                    alt={company?.companyName}
                />
                <div className="hidden text-left lg:block">
                    <h4 className="text-sm font-semibold">
                       {company?.companyName || "Company"}
                   </h4>
                    <p className="text-xs text-gray-500">
                        {company?.email}
                    </p>
                </div>
                <ChevronDown
                    size={18}
                />

            </button>
            {/* Dropdown */}
            {
            open && (
                   <div className="absolute right-0 mt-3 w-64 rounded-xl border bg-white shadow-xl">
                        {/* Header */}
                   <div className="border-b p-4">
                            <h4 className="font-semibold">
                                {company?.companyName}
                            </h4>
                          <p className="text-sm text-gray-500">
                                {company?.email}
                            </p>
                        </div>
                        {/* Menu */}
                        <button
                            onClick={() => router.push("/company/profile")}
                            className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-100"
                        >
                            <User size={18}/>
                            My Profile
                        </button>
                        <button
                         onClick={() => router.push("/company/settings")}
                         className="flex w-full items-center gap-3 px-4 py-3 hover:bg-gray-100"
                        >
                         <Settings size={18}/>
                         Settings
                       </button>
                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                        >
                            <LogOut size={18}/>
                          Logout
                        </button>
                    </div>
                )
            }
      </div>
    );

}