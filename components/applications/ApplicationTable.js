"use client";

import Link from "next/link";
import { Eye, RefreshCcw, Trash2 } from "lucide-react";
import StatusBadge from "./StatusBadge";

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

export default function ApplicationTable({ applications = [], onDelete, onStatusChange }) {
    if (applications.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center">
                <h3 className="text-lg font-semibold text-gray-900">No Applications Found</h3>
                <p className="mt-2 text-sm text-gray-500">
                    Applications will appear here once candidates apply.
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
                            Candidate
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Job
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Email
                        </th>
                        <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Phone
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Status
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Applied On
                        </th>
                        <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {applications.map((application) => (
                        <tr key={application._id} className="transition hover:bg-gray-50">
                            <td className="px-5 py-4">
                                <h3 className="font-medium text-gray-900">
                                    {application.firstName} {application.lastName}
                                </h3>
                            </td>

                            <td className="px-5 py-4 text-gray-700">{application.jobId?.title || "-"}</td>

                            <td className="px-5 py-4 text-gray-700">{application.email}</td>

                            <td className="px-5 py-4 text-gray-700">{application.phone}</td>

                            <td className="px-5 py-4 text-center">
                                <StatusBadge status={application.status} />
                            </td>

                            <td className="px-5 py-4 text-center text-gray-500">
                                {new Date(application.createdAt).toLocaleDateString()}
                            </td>

                            <td className="px-5 py-4">
                                <div className="flex flex-wrap justify-center gap-2">
                                    <ActionButton
                                        icon={Eye}
                                        label="View"
                                        href={`/company/applications/${application._id}`}
                                    />
                                    <ActionButton
                                        icon={RefreshCcw}
                                        label="Status"
                                        tone="primary"
                                        onClick={() => onStatusChange(application)}
                                    />
                                    <ActionButton
                                        icon={Trash2}
                                        label="Delete"
                                        tone="danger"
                                        onClick={() => onDelete(application._id)}
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