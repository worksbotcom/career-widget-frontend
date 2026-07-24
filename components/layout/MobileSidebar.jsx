"use client";

import { X } from "lucide-react";
import Image from "next/image";

import SidebarItem from "./SidebarItem";

import {
    companyMenu,
    adminMenu
} from "../../constants/sidebarMenu";

export default function MobileSidebar({

    open,
    onClose,
    role = "company"
}) {
    const menu =
        role === "admin"
            ? adminMenu
            : companyMenu;

    // Keep the last section (Account) at the bottom
    const topSections = menu.slice(0, -1);
    const accountSection = menu[menu.length - 1];

    return (

        <>

            {/* Overlay */}

            <div

                onClick={onClose}

                className={`
                    fixed
                    inset-0
                    bg-black/40
                    z-40
                    transition-opacity

                    ${
                        open
                            ? "opacity-100 visible"
                            : "opacity-0 invisible"
                    }
                `}
            />

            {/* Drawer */}

            <aside

                className={`
                    fixed
                    top-0
                    left-0
                    h-screen
                    w-72
                    bg-white
                    shadow-xl
                    z-50
                    transition-transform
                    duration-300
                    flex
                    flex-col

                    ${
                        open
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >

                {/* Header */}

                <div className="flex items-center justify-between border-b p-5">

                    <div className="flex items-center gap-3">

                        <Image
                            src="/logo.png"
                            width={40}
                            height={40}
                            alt="logo"
                        />

                        <div>

                            <h2 className="font-bold">

                                Career Widget

                            </h2>

                            <p className="text-xs text-gray-500">

                                SaaS Platform

                            </p>

                        </div>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-2 hover:bg-gray-100"
                    >

                        <X size={20} />

                    </button>

                </div>

                {/* Menu */}

                <nav className="flex-1 overflow-y-auto p-5">

                    {topSections.map((section) => (

                        <div
                            key={section.section}
                            className="mb-6"
                        >

                            {/* Section Title */}

                            <div className="flex items-center gap-3 mb-3">

                                <div className="h-px flex-1 bg-gray-200" />

                                <span className="text-[10px] font-semibold uppercase tracking-widest text-gray-400">

                                    {section.section}

                                </span>

                                <div className="h-px flex-1 bg-gray-200" />

                            </div>

                            {/* Section Items */}

                            <div className="space-y-1">

                                {section.items.map((item) => (

                                    <SidebarItem

                                        key={item.href}

                                        item={item}

                                        onClick={onClose}

                                    />

                                ))}

                            </div>

                        </div>

                    ))}

                </nav>

                {/* Bottom Account Section */}

                <div className="border-t p-5">

                    <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-gray-400">

                        {accountSection.section}

                    </div>

                    <div className="space-y-1">

                        {accountSection.items.map((item) => (

                            <SidebarItem

                                key={item.href}

                                item={item}

                                onClick={onClose}

                            />

                        ))}

                    </div>

                </div>

            </aside>

        </>

    );

}