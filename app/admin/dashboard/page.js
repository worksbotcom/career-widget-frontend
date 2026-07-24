"use client";

import { useEffect, useState } from "react";

import { getDashboard, getCompanies } from "@/services/admin.service";
import DashboardOverview from "@/components/admin/DashboardOverview";

export default function DashboardPage() {
    const [stats, setStats] = useState({
        totalCompanies: 0,
        verifiedCompanies: 0,
        unverifiedCompanies: 0,
        activeCompanies: 0,
        inactiveCompanies: 0,
        subscriptions: {
            freePlan: 0,
            basicPlan: 0,
            proPlan: 0,
            enterprisePlan: 0
        }
    });
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        loadDashboard();
        loadCompanies();
    }, []);

    async function loadDashboard() {
        try {
            const res = await getDashboard();
            setStats(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function loadCompanies() {
        try {
            const res = await getCompanies();
            setCompanies(res.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="space-y-8">
            <DashboardOverview stats={stats} companies={companies} />
        </div>
    );
}
