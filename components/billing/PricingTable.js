"use client";

import { Check, Crown } from "lucide-react";

function Feature({ label }) {
    return (
        <div className="flex items-center gap-2.5 text-sm text-gray-700">
            <Check size={16} className="shrink-0 text-indigo-600" strokeWidth={2.5} />
            <span>{label}</span>
        </div>
    );
}

export default function PricingTable({ plans, currentPlan, onUpgrade }) {
    if (!plans?.length) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm">
                No subscription plans available.
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Available Plans</h2>
                <p className="mt-1 text-gray-500">Upgrade your subscription anytime.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                {plans.map((plan) => {
                    const isCurrent = currentPlan?._id
                        ? currentPlan._id === plan._id
                        : currentPlan?.name === plan.name;

                    return (
                        <div
                            key={plan._id}
                            className={`rounded-xl border bg-white shadow-sm transition hover:shadow-md ${
                                isCurrent ? "border-indigo-300 ring-1 ring-indigo-100" : "border-gray-200"
                            }`}
                        >
                            <div className="border-b border-gray-200 p-6">
                                {isCurrent && (
                                    <div className="mb-3 inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                                        <Crown size={14} className="mr-1" />
                                        Current Plan
                                    </div>
                                )}

                                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                                <p className="mt-2 text-sm text-gray-500">{plan.description}</p>

                                <div className="mt-5">
                                    <span className="text-4xl font-bold text-indigo-600">₹{plan.price}</span>
                                    <span className="text-gray-500">/{plan.billingCycle}</span>
                                </div>
                            </div>

                            <div className="space-y-3 p-6">
                                <Feature
                                    label={`${plan.maxJobs === -1 ? "Unlimited" : plan.maxJobs} Jobs`}
                                />
                                <Feature
                                    label={`${
                                        plan.maxRecruiters === -1 ? "Unlimited" : plan.maxRecruiters
                                    } Recruiters`}
                                />
                                <Feature label={plan.analytics ? "Analytics" : "No Analytics"} />
                                <Feature label={plan.apiAccess ? "API Access" : "No API Access"} />
                                <Feature
                                    label={plan.prioritySupport ? "Priority Support" : "Standard Support"}
                                />
                                <Feature label={plan.customDomain ? "Custom Domain" : "Shared Domain"} />
                            </div>

                            <div className="border-t border-gray-200 p-6">
                                {isCurrent ? (
                                    <button
                                        disabled
                                        className="w-full rounded-lg bg-gray-100 py-2.5 text-sm font-semibold text-gray-500"
                                    >
                                        Current Plan
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => onUpgrade(plan)}
                                        className="w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                                    >
                                        Upgrade
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}