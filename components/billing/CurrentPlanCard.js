"use client";

import { Calendar, CreditCard, BadgeCheck, Crown } from "lucide-react";

function InfoRow({ icon: Icon, iconClassName, label, value }) {
    return (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3.5">
            <Icon size={20} className={`shrink-0 ${iconClassName}`} />
            <div className="min-w-0">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="truncate font-medium text-gray-900">{value}</p>
            </div>
        </div>
    );
}

export default function CurrentPlanCard({ subscription }) {
    if (!subscription) {
        return (
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <p className="text-gray-500">No active subscription found.</p>
            </div>
        );
    }

    const plan = subscription.subscription ?? subscription;
    const billingCycle = subscription.billingCycle || plan.billingCycle || "Monthly";
    const status = subscription.status || "Active";
    const endDate = subscription.endDate ? new Date(subscription.endDate).toLocaleDateString() : "-";
    const paymentStatus = subscription.paymentStatus || (plan.price === 0 ? "Free" : "Paid");

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-200 p-6">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                    <Crown size={17} strokeWidth={2} />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Current Subscription</h2>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-2">
                <div className="space-y-5">
                    <div>
                        <p className="text-sm text-gray-500">Current Plan</p>
                        <h3 className="mt-1 text-3xl font-bold text-gray-900">{plan?.name || "Free"}</h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="text-2xl font-semibold text-indigo-600">
                            ₹{plan?.price ?? 0}
                            <span className="ml-1 text-base font-normal text-gray-500">/ {billingCycle}</span>
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <InfoRow icon={BadgeCheck} iconClassName="text-green-600" label="Status" value={status} />
                    <InfoRow icon={Calendar} iconClassName="text-indigo-600" label="Renewal Date" value={endDate} />
                    <InfoRow
                        icon={CreditCard}
                        iconClassName="text-purple-600"
                        label="Payment Status"
                        value={paymentStatus}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-3 border-t border-gray-200 p-6">
                <button className="rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-700">
                    Upgrade Plan
                </button>

                <button className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                    Renew
                </button>

                <button className="rounded-lg border border-red-300 px-5 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
                    Cancel Subscription
                </button>
            </div>
        </div>
    );
}