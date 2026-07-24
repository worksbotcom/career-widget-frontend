"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import api from "@/lib/axios";
import CompanyProfileForm from "@/components/company/CompanyProfileForm";
import ProfileCompletion from "@/components/company/ProfileCompletion";
import Alert from "@/components/ui/Alert";

export default function CompanyProfilePage() {
    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await api.get("/company/profile");
                setCompany(res.data.data || {});
            } catch (error) {
                console.error("Failed to load company profile:", error);
                setLoadError(
                    error?.response?.data?.message || "We couldn't load your company profile."
                );
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center gap-2 text-sm text-gray-500">
                <Loader2 size={16} className="animate-spin" />
                Loading company profile…
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
                <p className="text-gray-500">Manage your organization details.</p>
            </div>

            {loadError && <Alert type="error" message={loadError} />}

            <ProfileCompletion company={company} />

            <CompanyProfileForm company={company} onProfileLoaded={setCompany} />
        </div>
    );
}