"use client";

import { useRouter } from "next/navigation";

import DepartmentForm from "@/components/departments/DepartmentForm";
import { createDepartment } from "@/services/department.service";

export default function CreateDepartmentPage() {
    const router = useRouter();

    const handleCreate = async (data) => {
        await createDepartment(data);
        router.push("/company/departments");
    };

    return (
        <div className="max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Create Department</h1>
                <p className="mt-2 text-gray-500">Add a new department to your company.</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <DepartmentForm onSubmit={handleCreate} submitText="Create Department" />
            </div>
        </div>
    );
}