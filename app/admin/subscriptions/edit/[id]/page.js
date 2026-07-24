"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getSubscriptions } from "@/services/subscription.service";

import SubscriptionForm from "@/components/admin/SubscriptionForm";

export default function EditPlan() {

    const { id } = useParams();

    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        loadPlan();
    }, [id]);

    const loadPlan = async () => {
        try {
            const res = await getSubscriptions();
            const plans = res.data?.data || [];
            const found = plans.find((p) => p._id === id);
            setPlan(found || null);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center text-gray-500">
                Loading plan...
            </div>
        );
    }

    if (!plan) {
        return (
            <div className="flex min-h-[40vh] items-center justify-center text-gray-500">
                Plan not found.
            </div>
        );
    }

    return <SubscriptionForm initialData={plan} />;
}
