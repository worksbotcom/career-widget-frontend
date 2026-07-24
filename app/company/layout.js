"use client";

import { useEffect, useState } from "react";

import ProtectedRoute from "../../components/common/ProtectedRoute";
import DashboardLayout from "../../components/layout/DashboardLayout";

import { getCompanyProfile } from "@/services/company.service";

export default function CompanyLayout({ children }) {

    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCompany();
    }, []);

    const fetchCompany = async () => {

        try {

            const res = await getCompanyProfile();

            const companyData = res.data.data;

            // Use uploaded logo or generate avatar from company name
            companyData.logo =
                companyData.logo ||
                `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(
                    companyData.companyName
                )}`;

            setCompany(companyData);

        } catch (error) {

            console.error("Error fetching company profile:", error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="flex h-screen items-center justify-center">

                <p className="text-lg font-medium text-gray-600">

                    Loading...

                </p>

            </div>

        );

    }

    if (!company) {

        return (

            <div className="flex h-screen items-center justify-center">

                <p className="text-lg font-medium text-gray-600">

                    Unable to load company profile. Please sign in again.

                </p>

            </div>

        );

    }

    return (

        <ProtectedRoute>

            <DashboardLayout

                role="company"

                company={company}

            >

                {children}

            </DashboardLayout>

        </ProtectedRoute>

    );

}