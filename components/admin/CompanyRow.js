"use client";

import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";

import { deleteCompany } from "@/services/admin.service";
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

export default function CompanyRow({ company, reload }) {
    const remove = async () => {
        if (!confirm(`Delete ${company.companyName}? This cannot be undone.`)) return;

        try {
            await deleteCompany(company._id);
            reload();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to delete company.");
        }
    };

    return (
        <tr className="transition hover:bg-gray-50">
            <td className="px-5 py-4">
                <img
                    src={company.logo || "/company-placeholder.png"}
                    className="h-10 w-10 rounded-full object-cover"
                    alt={company.companyName}
                />
            </td>

            <td className="px-5 py-4">
                <h3 className="font-medium text-gray-900">{company.companyName}</h3>
            </td>

            <td className="px-5 py-4 text-gray-700">{company.email}</td>

            <td className="px-5 py-4 text-gray-700">{company.subscription?.name || "-"}</td>

            <td className="px-5 py-4">
                <StatusBadge verified={company.isVerified} />
            </td>

            <td className="px-5 py-4">
                <div className="flex flex-wrap justify-center gap-2">
                    <ActionButton
                        icon={Eye}
                        label="View"
                        href={`/admin/companies/${company._id}`}
                    />
                    <ActionButton icon={Trash2} label="Delete" tone="danger" onClick={remove} />
                </div>
            </td>
        </tr>
    );
}