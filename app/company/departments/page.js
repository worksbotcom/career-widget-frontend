"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";

import DepartmentTable from "@/components/departments/DepartmentTable";
import Alert from "@/components/ui/Alert";

import { getDepartments, deleteDepartment } from "@/services/department.service";

export default function DepartmentsPage() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchDepartments = async () => {
        try {
            setError("");
            const res = await getDepartments();
            setDepartments(res.data.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load departments.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDepartments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Delete this department?");
        if (!confirmDelete) return;

        try {
            await deleteDepartment(id);
            fetchDepartments();
        } catch (err) {
            setError(err.response?.data?.message || "Unable to delete department.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
                    <p className="text-gray-500">Manage company departments</p>
                </div>

                <Link
                    href="/company/departments/create"
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                    <Plus size={16} />
                    New Department
                </Link>
            </div>

            {error && <Alert type="error" message={error} />}

            {loading ? (
                <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-12 text-sm text-gray-500 shadow-sm">
                    <Loader2 size={16} className="animate-spin" />
                    Loading departments…
                </div>
            ) : (
                <DepartmentTable departments={departments} onDelete={handleDelete} />
            )}
        </div>
    );
}