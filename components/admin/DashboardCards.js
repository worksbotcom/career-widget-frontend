"use client";

import {

    Building2,

    BadgeCheck,

    CreditCard,

    IndianRupee

} from "lucide-react";

import StatsCard from "./StatsCard";

export default function DashboardCards({

    stats

}) {

    return (

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

            <StatsCard

                title="Companies"

                value={stats.totalCompanies}

                icon={Building2}

                color="bg-indigo-600"

                subtitle="Registered"

            />

            <StatsCard

                title="Verified"

                value={stats.verifiedCompanies}

                icon={BadgeCheck}

                color="bg-green-600"

                subtitle="Verified Accounts"

            />

            <StatsCard

                title="Subscriptions"

                value={stats.totalPlans}

                icon={CreditCard}

                color="bg-yellow-500"

                subtitle="Available Plans"

            />

            <StatsCard

                title="Revenue"

                value={`₹ ${stats.revenue}`}

                icon={IndianRupee}

                color="bg-purple-600"

                subtitle="Monthly"

            />

        </div>

    );

}