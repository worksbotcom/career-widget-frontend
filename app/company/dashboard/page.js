import { Briefcase, Users, Crown, KeyRound } from "lucide-react";
import { cookies } from "next/headers";
import axios from "axios";

import WelcomeBanner from "@/components/company/dashboard/WelcomeBanner";
import StatCard from "@/components/company/dashboard/StatCard";
import QuickActions from "@/components/company/dashboard/QuickActions";
import RecentActivity from "@/components/company/dashboard/RecentActivity";
import ProfileCompletion from "@/components/company/dashboard/ProfileCompletion";
import UsageCard from "@/components/company/dashboard/UsageCard";
import Alert from "@/components/ui/Alert";

async function getCompanyProfile() {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/company/profile`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    return res.data.data;
}

export default async function DashboardPage() {
    let company = null;
    let loadError = null;

    try {
        company = await getCompanyProfile();
    } catch (error) {
        console.error(error);
        loadError = error?.response?.data?.message || "We couldn't load your dashboard right now.";
    }

    if (loadError || !company) {
        return (
            <div className="mx-auto max-w-2xl pt-24">
                <Alert type="error" message={loadError || "This company profile could not be found."} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <WelcomeBanner company={company} />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                <StatCard title="Jobs" value={company.jobsCount} icon={Briefcase} color="bg-indigo-600" />

                <StatCard
                    title="Plan"
                    value={company.subscription?.name || "Free"}
                    icon={Crown}
                    color="bg-yellow-500"
                />

                <StatCard title="API" value="Active" icon={KeyRound} color="bg-emerald-500" />

                <StatCard title="Candidates" value="0" icon={Users} color="bg-fuchsia-500" />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
                <QuickActions />
                <div className="grid gap-6">
                    <RecentActivity />
                    <ProfileCompletion company={company} />
                </div>
            </div>

            <UsageCard company={company} />
        </div>
    );
}
