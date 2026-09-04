"use client";

import { X, Crown, Check } from "lucide-react";

function FeatureRow({ label, value }) {
    return (
        <li className="flex items-center gap-2.5 text-sm text-gray-700">
            <Check size={15} className="shrink-0 text-indigo-600" strokeWidth={2.5} />
            <span>
                {label}: <span className="font-medium text-gray-900">{value}</span>
            </span>
        </li>
    );
}

export default function UpgradeModal({ open, onClose, plan, onConfirm }) {
    if (!open || !plan) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                            <Crown size={17} strokeWidth={2} />
                        </div>
                        <h2 className="text-base font-semibold text-gray-900">Upgrade Subscription</h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-5 p-6">
                    <div>
                        <p className="text-sm text-gray-500">Selected Plan</p>
                        <h3 className="mt-1 text-2xl font-bold text-gray-900">{plan.name}</h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="mt-1 text-3xl font-bold text-indigo-600">₹{plan.price}</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <ul className="space-y-2.5">
                            <FeatureRow
                                label="Jobs"
                                value={plan.maxJobs === -1 ? "Unlimited" : plan.maxJobs}
                            />
                            <FeatureRow
                                label="Recruiters"
                                value={plan.maxRecruiters === -1 ? "Unlimited" : plan.maxRecruiters}
                            />
                            <FeatureRow label="Analytics" value={plan.analytics ? "Yes" : "No"} />
                            <FeatureRow label="API Access" value={plan.apiAccess ? "Yes" : "No"} />
                        </ul>
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t border-gray-200 p-5">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onConfirm(plan)}
                        className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
}