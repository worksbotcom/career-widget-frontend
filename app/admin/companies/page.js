"use client";

import { useEffect, useState } from "react";
import { getCompanies } from "@/services/admin.service";

import SearchBar from "@/components/admin/SearchBar";
import CompanyTable from "@/components/admin/CompanyTable";

export default function CompaniesPage() {
    const [companies, setCompanies] = useState([]);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        loadCompanies();
    }, []);

    const loadCompanies = async () => {
        try {
            const res = await getCompanies();
            setCompanies(res.data.data);
            setFiltered(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const search = (keyword) => {
        const data = companies.filter(
            (company) =>
                company.companyName.toLowerCase().includes(keyword.toLowerCase()) ||
                company.email.toLowerCase().includes(keyword.toLowerCase())
        );

        setFiltered(data);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Companies</h1>
                <p className="text-gray-500">Manage all registered companies.</p>
            </div>

            <SearchBar onSearch={search} />
            <CompanyTable companies={filtered} reload={loadCompanies} />
        </div>
    );
}