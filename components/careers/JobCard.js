"use client";

import Link from "next/link";

import {
    Briefcase,
    Building2,
    MapPin,
    IndianRupee,
    Clock3
} from "lucide-react";

export default function JobCard({ job }) {

    return (

        <div className="rounded-xl border bg-white p-6 shadow-sm transition hover:shadow-lg">

            <div className="flex items-start justify-between">

                <div>

                    <h2 className="text-xl font-bold text-gray-900">

                        {job.title}

                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-gray-500">

                        <Building2 size={18} />

                        <span>

                            {job.department?.name || "General"}

                        </span>

                    </div>

                </div>

                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">

                    {job.status}

                </span>

            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">

                <div className="flex items-center gap-2 text-gray-600">

                    <MapPin size={18} />

                    <span>

                        {job.location?.name || "Remote"}

                    </span>

                </div>

                <div className="flex items-center gap-2 text-gray-600">

                    <Briefcase size={18} />

                    <span>

                        {job.employmentType}

                    </span>

                </div>

                <div className="flex items-center gap-2 text-gray-600">

                    <Clock3 size={18} />

                    <span>

                        {job.experience} Years

                    </span>

                </div>

                <div className="flex items-center gap-2 text-gray-600">

                    <IndianRupee size={18} />

                    <span>

                        ₹ {job.salary}

                    </span>

                </div>

            </div>

            <div className="mt-6 flex items-center justify-between">

                <span className="text-sm text-gray-500">

                    Deadline

                    {" "}

                    {job.deadline
                        ? new Date(job.deadline).toLocaleDateString()
                        : "-"}

                </span>

                <Link

                    href={`/careers/${job._id}`}

                    className="rounded-lg bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"

                >

                    View Details

                </Link>

            </div>

        </div>

    );

}