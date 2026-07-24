"use client";

import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

function ActionButton({ icon: Icon, label, onClick, href, tone = "default" }) {
    const toneClass =
        tone === "danger"
            ? "border-red-300 text-red-600 hover:bg-red-50"
            : tone === "primary"
            ? "border-indigo-300 text-indigo-600 hover:bg-indigo-50"
            : "border-gray-300 text-gray-700 hover:bg-gray-50";

    const className = `flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${toneClass}`;

    if (href) {
        return (
            <Link href={href} className={className}>
                <Icon size={14} />
                {label}
            </Link>
        );
    }

    return (
        <button type="button" onClick={onClick} className={className}>
            <Icon size={14} />
            {label}
        </button>
    );
}

export default function DepartmentTable({ departments = [], onDelete }) {
    if (departments.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900">No Departments Found</h3>
                <p className="mt-2 text-sm text-gray-500">
                    Create your first department to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Department
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Description
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Created
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {departments.map((department) => (
                        <tr key={department._id} className="transition hover:bg-gray-50">
                            <td className="px-5 py-4">
                                <h3 className="font-medium text-gray-900">{department.name}</h3>
                            </td>

                            <td className="px-5 py-4 text-gray-700">
                                {department.description || "-"}
                            </td>

                            <td className="px-5 py-4 text-center text-gray-500">
                                {new Date(department.createdAt).toLocaleDateString()}
                            </td>

                            <td className="px-5 py-4">
                                <div className="flex flex-wrap justify-center gap-2">
                                    <ActionButton
                                        icon={Pencil}
                                        label="Edit"
                                        tone="primary"
                                        href={`/company/departments/edit/${department._id}`}
                                    />
                                    <ActionButton
                                        icon={Trash2}
                                        label="Delete"
                                        tone="danger"
                                        onClick={() => onDelete(department._id)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}