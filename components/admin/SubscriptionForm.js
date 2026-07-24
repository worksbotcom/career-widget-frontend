"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createSubscription, updateSubscription } from "@/services/subscription.service";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

export default function SubscriptionForm({ initialData = {} }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm] = useState({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price ?? 0,
        maxJobs: initialData.maxJobs ?? 0,
        maxRecruiters: initialData.maxRecruiters ?? 0,
        billingCycle: initialData.billingCycle || "Monthly",
        currency: initialData.currency || "USD",
        analytics: initialData.analytics || false,
        apiAccess: initialData.apiAccess || false,
        prioritySupport: initialData.prioritySupport || false,
        customDomain: initialData.customDomain || false,
    });

    const change = (e) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setForm({ ...form, [e.target.name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage("");

        try {
            const payload = {
                ...form,
                price: Number(form.price) || 0,
                maxJobs: Number(form.maxJobs) || 0,
                maxRecruiters: Number(form.maxRecruiters) || 0,
                billingCycle: form.billingCycle || "Monthly",
                currency: form.currency || "USD",
                analytics: Boolean(form.analytics),
                apiAccess: Boolean(form.apiAccess),
                prioritySupport: Boolean(form.prioritySupport),
                customDomain: Boolean(form.customDomain),
            };

            if (initialData._id) {
                await updateSubscription(initialData._id, payload);
            } else {
                await createSubscription(payload);
            }

            router.push("/admin/subscriptions");
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.response?.data?.errors?.[0]?.msg ||
                err.response?.data?.[0]?.msg ||
                "Failed to save subscription plan.";

            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto max-w-2xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    {initialData._id ? "Edit Subscription Plan" : "Create Subscription Plan"}
                </h1>
                <p className="mt-2 text-gray-500">
                    Define a plan with pricing, job limits, and available recruiters.
                </p>
            </div>

            <form
                onSubmit={submit}
                className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
                <Alert type="error" message={errorMessage} />

                <Input
                    label="Plan Name"
                    name="name"
                    placeholder="e.g. Growth Plan"
                    value={form.name}
                    onChange={change}
                />

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">Plan Description</label>
                <textarea
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={change}
                    placeholder="Add a short summary of the plan benefits"
                    className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm text-gray-900 shadow-sm transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <Input
                    label="Price"
                    name="price"
                    type="number"
                    min="0"
                    placeholder="Enter monthly price"
                    value={form.price}
                    onChange={change}
                />

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Currency</label>
                    <select
                        name="currency"
                        value={form.currency}
                        onChange={change}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="USD">USD</option>
                        <option value="INR">INR</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>
            </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                        <Input
                            label="Maximum Jobs"
                            name="maxJobs"
                            type="number"
                            min="-1"
                            placeholder="e.g. 10 or -1 for unlimited"
                            value={form.maxJobs}
                            onChange={change}
                        />
                        <p className="mt-1.5 text-xs text-gray-500">Set -1 for unlimited active jobs.</p>
                    </div>

                    <div>
                        <Input
                            label="Maximum Recruiters"
                            name="maxRecruiters"
                            type="number"
                            min="-1"
                            placeholder="e.g. 5 or -1 for unlimited"
                            value={form.maxRecruiters}
                            onChange={change}
                        />
                        <p className="mt-1.5 text-xs text-gray-500">Set -1 for unlimited recruiter seats.</p>
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">Billing Cycle</label>
                    <select
                        name="billingCycle"
                        value={form.billingCycle}
                        onChange={change}
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="Monthly">Monthly</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </div>

                <div className="grid gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-900">Plan Features</p>

                    <label className="flex items-center gap-3 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            name="analytics"
                            checked={form.analytics}
                            onChange={change}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        Analytics
                    </label>

                    <label className="flex items-center gap-3 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            name="apiAccess"
                            checked={form.apiAccess}
                            onChange={change}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        API Access
                    </label>

                    <label className="flex items-center gap-3 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            name="prioritySupport"
                            checked={form.prioritySupport}
                            onChange={change}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        Priority Support
                    </label>

                    <label className="flex items-center gap-3 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            name="customDomain"
                            checked={form.customDomain}
                            onChange={change}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        Custom Domain
                    </label>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" loading={loading}>
                        Save Plan
                    </Button>
                </div>
            </form>
        </div>
    );
}