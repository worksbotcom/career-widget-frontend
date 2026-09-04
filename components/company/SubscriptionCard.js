"use client";

import { useEffect, useState } from "react";
import { Crown, CheckCircle, BarChart3, Loader2 } from "lucide-react";

import api from "@/lib/axios";

function SectionHeader({ icon: Icon, title }) {
    return (
        <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                <Icon size={17} strokeWidth={2} />
            </div>
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        </div>
    );
}

export default function SubscriptionCard() {
    const [company, setCompany] = useState(null);
    const [currentPlan, setCurrentPlan] = useState(null);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const profile = await api.get("/company/profile");
            const subscriptionResponse = await api.get("/company/subscription");
            const subscriptionData = subscriptionResponse.data.data || {};

            setCompany(profile.data.data);
            setCurrentPlan(subscriptionData.currentPlan || null);
            setPlans(subscriptionData.plans || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-40 items-center justify-center gap-2 text-sm text-gray-500">
                <Loader2 size={16} className="animate-spin" />
                Loading subscription…
            </div>
        );
    }

    if (!company) return null;

    const isUnlimited = currentPlan?.jobsLimit === -1;
    const usagePercent = isUnlimited
        ? 0
        : Math.min(100, Math.round((company.jobsCount / (currentPlan?.jobsLimit || 1)) * 100));

    return (
        <div className="space-y-6">
            {/* Current plan */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                            <Crown size={17} strokeWidth={2} />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            {currentPlan?.name || "Current Plan"}
                        </h2>
                    </div>

                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        Active
                    </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border border-gray-200 p-4">
                        <p className="text-sm text-gray-500">Status</p>
                        <p className="mt-1 font-semibold text-green-600">Active</p>
                    </div>

                    <div className="rounded-lg border border-gray-200 p-4">
                        <p className="text-sm text-gray-500">Job Limit</p>
                        <p className="mt-1 font-semibold text-gray-900">
                            {isUnlimited ? "Unlimited" : currentPlan?.jobsLimit ?? "-"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Usage */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionHeader icon={BarChart3} title="Usage" />

                <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-500">Jobs Used</p>
                    <p className="font-medium text-gray-900">
                        {company.jobsCount} / {isUnlimited ? "Unlimited" : currentPlan?.jobsLimit ?? "-"}
                    </p>
                </div>

                <div className="mt-3 h-2.5 rounded-full bg-gray-100">
                    <div
                        className="h-2.5 rounded-full bg-indigo-600 transition-all"
                        style={{ width: `${usagePercent}%` }}
                    />
                </div>
            </div>

            {/* Available plans */}
            {plans.length > 0 && (
                <div className="grid gap-6 lg:grid-cols-3">
                    {plans.map((plan) => {
                        const isCurrent = currentPlan?._id === plan._id;
                        const jobsLimit = plan.jobsLimit ?? plan.maxJobs ?? 0;

                        return (
                            <div
                                key={plan._id}
                                className={`rounded-xl border bg-white p-6 shadow-sm ${
                                    isCurrent ? "border-indigo-300 ring-1 ring-indigo-100" : "border-gray-200"
                                }`}
                            >
                                <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                                <p className="mt-3 text-3xl font-bold text-indigo-600">₹{plan.price}</p>

                                <ul className="mt-6 space-y-2.5">
                                    <li className="flex items-center gap-2 text-sm text-gray-700">
                                        <CheckCircle size={16} className="shrink-0 text-indigo-600" />
                                        {jobsLimit === -1 ? "Unlimited" : jobsLimit} Jobs
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-700">
                                        <CheckCircle size={16} className="shrink-0 text-indigo-600" />
                                        Career Widget
                                    </li>
                                    <li className="flex items-center gap-2 text-sm text-gray-700">
                                        <CheckCircle size={16} className="shrink-0 text-indigo-600" />
                                        Analytics
                                    </li>
                                </ul>

                                <button
                                    disabled={isCurrent}
                                    className="mt-6 w-full rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500"
                                >
                                    {isCurrent ? "Current Plan" : "Upgrade"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}