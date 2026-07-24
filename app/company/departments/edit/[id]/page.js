"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import DepartmentForm from "@/components/departments/DepartmentForm";
import { getDepartment, updateDepartment } from "@/services/department.service";

export default function EditDepartmentPage() {
    const router = useRouter();
    const params = useParams();
    const { id } = params;

    const [department, setDepartment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDepartment();
    }, []);

    const fetchDepartment = async () => {
        try {
            const res = await getDepartment(id);
            setDepartment(res.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (data) => {
        await updateDepartment(id, data);
        router.push("/company/departments");
    };

    if (loading) {
        return <div className="p-8 text-gray-500">Loading...</div>;
    }

    if (!department) {
        return <div className="p-8 text-gray-500">Department not found.</div>;
    }

    return (
        <div className="max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Edit Department</h1>
                <p className="mt-2 text-gray-500">Update department details.</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <DepartmentForm
                    initialData={department}
                    onSubmit={handleUpdate}
                    submitText="Update Department"
                />
            </div>
        </div>
    );
}