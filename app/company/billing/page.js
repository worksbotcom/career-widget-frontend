"use client";

import { useEffect, useState } from "react";

import CurrentPlanCard from "@/components/billing/CurrentPlanCard";
import PricingTable from "@/components/billing/PricingTable";
import UpgradeModal from "@/components/billing/UpgradeModal";

import { getSubscription } from "@/services/company.service";

export default function BillingPage() {

    const [currentPlan, setCurrentPlan] = useState(null);

    const [plans, setPlans] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedPlan, setSelectedPlan] = useState(null);

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const response = await getSubscription();
            const subscriptionData = response.data.data;

            setCurrentPlan(subscriptionData.currentPlan);
            setPlans(subscriptionData.plans || []);

        }

        catch (error) {

            console.error("Failed to load billing data", error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleUpgrade = (plan) => {

        setSelectedPlan(plan);

        setShowModal(true);

    };

    const confirmUpgrade = (plan) => {

        console.log("Upgrade to:", plan);

        setShowModal(false);

        // Razorpay integration comes here later
    };

    if (loading) {

        return (

            <div className="flex h-[70vh] items-center justify-center">

                Loading...

            </div>

        );

    }

    return (

        <div className="space-y-8">

            <CurrentPlanCard
                subscription={currentPlan}
            />

            <PricingTable
                plans={plans}
                currentPlan={currentPlan?.subscription?._id}
                onUpgrade={handleUpgrade}
            />

            <UpgradeModal
                open={showModal}
                plan={selectedPlan}
                onClose={() => setShowModal(false)}
                onConfirm={confirmUpgrade}
            />

        </div>

    );

}