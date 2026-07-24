"use client";

import { ListChecks } from "lucide-react";

export default function ProfileCompletion({ company = {} }) {
    const fields = [
        company.logo,
        company.website,
        company.industry,
        company.companySize,
        company.headquarters,
        company.description,
        company.linkedin,
        company.facebook,
        company.twitter,
    ];

    const completed = fields.filter(Boolean).length;
    const percentage = Math.round((completed / fields.length) * 100);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                        <ListChecks size={17} strokeWidth={2} />
                    </div>
                    <div>
                        <h2 className="text-base font-semibold text-gray-900">Profile Completion</h2>
                        <p className="text-sm text-gray-500">
                            {completed} of {fields.length} details added
                        </p>
                    </div>
                </div>

                <span className="text-lg font-bold text-indigo-600">{percentage}%</span>
            </div>

            <div className="h-2.5 rounded-full bg-gray-100">
                <div
                    className="h-2.5 rounded-full bg-indigo-600 transition-all"
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <p className="mt-4 text-sm text-gray-500">
                Complete your profile to build trust with candidates.
            </p>
        </div>
    );
}