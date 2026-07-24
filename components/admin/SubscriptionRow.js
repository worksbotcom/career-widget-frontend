"use client";

import Link from "next/link";
import { Pencil, Trash2, Check } from "lucide-react";

import { deleteSubscription } from "@/services/subscription.service";

function ActionButton({ icon: Icon, label, onClick, href, tone = "default" }) {
    const toneClass =
        tone === "danger"
            ? "border-red-300 text-red-600 hover:bg-red-50"
            : tone === "primary"
            ? "border-indigo-300 text-indigo-600 hover:bg-indigo-50"
            : "border-gray-300 text-gray-700 hover:bg-gray-50";

    const className = `flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${toneClass}`;

    if (href) {
        return (
            <Link href={href} className={className}>
                <Icon size={14} />
                {label}
            </Link>
        );
    }

    return (
        <button type="button" onClick={onClick} className={className}>
            <Icon size={14} />
            {label}
        </button>
    );
}

export default function SubscriptionRow({ plan, reload }) {
    async function remove() {
        if (!confirm("Delete this plan?")) return;

        try {
            await deleteSubscription(plan._id);
            reload();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete plan.");
        }
    }

    return (
        <tr className="transition hover:bg-gray-50">
            <td className="px-5 py-4">
                <h3 className="font-medium text-gray-900">{plan.name}</h3>
            </td>

            <td className="px-5 py-4 text-gray-700">₹{plan.price}</td>

            <td className="px-5 py-4 text-gray-700">{plan.billingCycle}</td>

            <td className="px-5 py-4 text-gray-700">
                {plan.maxJobs === -1 ? "Unlimited" : plan.maxJobs}
            </td>

            <td className="px-5 py-4 text-gray-700">
                {plan.maxRecruiters === -1 ? "Unlimited" : plan.maxRecruiters}
            </td>

            <td className="px-5 py-4">
                <div className="flex flex-wrap gap-2">
                    {plan.analytics && (
                        <span className="flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700">
                            <Check size={12} />
                            Analytics
                        </span>
                    )}
                    {plan.prioritySupport && (
                        <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700">
                            <Check size={12} />
                            Support
                        </span>
                    )}
                    {plan.customDomain && (
                        <span className="flex items-center gap-1 rounded-full bg-purple-100 px-2.5 py-1 text-xs font-medium text-purple-700">
                            <Check size={12} />
                            Domain
                        </span>
                    )}
                </div>
            </td>

            <td className="px-5 py-4">
                <div className="flex flex-wrap justify-center gap-2">
                    <ActionButton
                        icon={Pencil}
                        label="Edit"
                        tone="primary"
                        href={`/admin/subscriptions/edit/${plan._id}`}
                    />
                    <ActionButton icon={Trash2} label="Delete" tone="danger" onClick={remove} />
                </div>
            </td>
        </tr>
    );
}