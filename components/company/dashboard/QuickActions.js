"use client";

import { useRouter } from "next/navigation";
import { User, KeyRound, Code2, CreditCard } from "lucide-react";

const actions = [
    {
        title: "Profile",
        icon: User,
        path: "/company/profile",
    },
    {
        title: "API Key",
        icon: KeyRound,
        path: "/company/api-key",
    },
    {
        title: "Widget",
        icon: Code2,
        path: "/company/widget",
    },
    {
        title: "Subscription",
        icon: CreditCard,
        path: "/company/subscription",
    },
];

export default function QuickActions() {
    const router = useRouter();

    return (
        <div className="rounded-[1.75rem] bg-white p-6 shadow-xl">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">Quick Actions</h2>
                    <p className="text-sm text-slate-500">Access the tools you use most often.</p>
                </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {actions.map((action) => (
                    <button
                        key={action.title}
                        type="button"
                        onClick={() => router.push(action.path)}
                        className="group rounded-3xl border border-slate-200 bg-slate-50 p-5 text-left transition duration-200 hover:border-slate-300 hover:bg-white"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white transition group-hover:bg-slate-800">
                            <action.icon size={20} />
                        </div>
                        <p className="mt-4 text-sm font-medium text-slate-900">{action.title}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
