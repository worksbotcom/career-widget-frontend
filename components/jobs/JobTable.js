"use client";

import Link from "next/link";

export default function JobTable({

    jobs = [],

    onDelete,

    onPublish,

    onClose,

    onArchive

}) {

    const getStatusColor = (status) => {

        switch (status) {

            case "Published":

                return "bg-green-100 text-green-700";

            case "Closed":

                return "bg-red-100 text-red-700";

            case "Archived":

                return "bg-gray-200 text-gray-700";

            default:

                return "bg-yellow-100 text-yellow-700";

        }

    };

    if (jobs.length === 0) {

        return (

            <div className="rounded-xl border bg-white p-12 text-center">

                <h3 className="text-xl font-semibold">

                    No Jobs Found

                </h3>

                <p className="mt-2 text-gray-500">

                    Create your first job posting.

                </p>

            </div>

        );

    }

    return (

        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">

            <table className="min-w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-5 py-3 text-left">

                            Job

                        </th>

                        <th className="px-5 py-3 text-left">

                            Department

                        </th>

                        <th className="px-5 py-3 text-left">

                            Location

                        </th>

                        <th className="px-5 py-3 text-center">

                            Type

                        </th>

                        <th className="px-5 py-3 text-center">

                            Status

                        </th>

                        <th className="px-5 py-3 text-center">

                            Openings

                        </th>

                        <th className="px-5 py-3 text-center">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        jobs.map((job) => (

                            <tr

                                key={job._id}

                                className="border-t hover:bg-gray-50"

                            >

                                <td className="px-5 py-4">

                                    <div>

                                        <h3 className="font-semibold">

                                            {job.title}

                                        </h3>

                                        <p className="text-sm text-gray-500">

                                            {new Date(job.createdAt).toLocaleDateString()}

                                        </p>

                                    </div>

                                </td>

                                <td className="px-5 py-4">

                                    {job.departmentId?.name}

                                </td>

                                <td className="px-5 py-4">

                                    {job.locationId?.name}

                                </td>

                                <td className="px-5 py-4 text-center">

                                    {job.employmentType}

                                </td>

                                <td className="px-5 py-4 text-center">

                                    <span

                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(job.status)}`}

                                    >

                                        {job.status}

                                    </span>

                                </td>

                                <td className="px-5 py-4 text-center">

                                    {job.openings}

                                </td>

                                <td className="px-5 py-4">

                                    <div className="flex flex-wrap justify-center gap-2">

                                        <Link

                                            href={`/company/jobs/${job._id}`}

                                            className="rounded bg-gray-600 px-3 py-1 text-sm text-white hover:bg-gray-700"

                                        >

                                            View

                                        </Link>

                                        <Link

                                            href={`/company/jobs/edit/${job._id}`}

                                            className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"

                                        >

                                            Edit

                                        </Link>

                                        {

                                            job.status === "Draft" && (

                                                <button

                                                    onClick={() => onPublish(job._id)}

                                                    className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"

                                                >

                                                    Publish

                                                </button>

                                            )

                                        }

                                        {

                                            job.status === "Published" && (

                                                <button

                                                    onClick={() => onClose(job._id)}

                                                    className="rounded bg-orange-600 px-3 py-1 text-sm text-white hover:bg-orange-700"

                                                >

                                                    Close

                                                </button>

                                            )

                                        }

                                        {

                                            job.status !== "Archived" && (

                                                <button

                                                    onClick={() => onArchive(job._id)}

                                                    className="rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-black"

                                                >

                                                    Archive

                                                </button>

                                            )

                                        }

                                        <button

                                            onClick={() => onDelete(job._id)}

                                            className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"

                                        >

                                            Delete

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}