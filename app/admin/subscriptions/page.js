"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { getSubscriptions } from "@/services/subscription.service";

import SubscriptionTable from "@/components/admin/SubscriptionTable";

export default function SubscriptionPage() {
    const [plans, setPlans] = useState([]);

    useEffect(() => {
        loadPlans();
    }, []);

    const loadPlans = async () => {
        try {
            const res = await getSubscriptions();
            setPlans(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Subscription Plans</h1>
                    <p className="text-gray-500">Manage pricing plans.</p>
                </div>

                <Link
                    href="/admin/subscriptions/create"
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    + Add Plan
                </Link>
            </div>

            <SubscriptionTable plans={plans} reload={loadPlans} />
        </div>
    );
}