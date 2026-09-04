"use client";

import Link from "next/link";

export default function TeamMemberTable({

    members = [],

    onDelete

}) {

    const statusBadge = (status) => {

        switch (status) {

            case "Active":

                return "bg-green-100 text-green-700";

            case "Inactive":

                return "bg-red-100 text-red-700";

            default:

                return "bg-gray-100 text-gray-700";

        }

    };

    if (members.length === 0) {

        return (

            <div className="rounded-xl border bg-white p-12 text-center">

                <h3 className="text-xl font-semibold">

                    No Team Members

                </h3>

                <p className="mt-2 text-gray-500">

                    Invite your first recruiter or hiring manager.

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

                            Name

                        </th>

                        <th className="px-5 py-3 text-left">

                            Email

                        </th>

                        <th className="px-5 py-3 text-left">

                            Role

                        </th>

                        <th className="px-5 py-3 text-left">

                            Department

                        </th>

                        <th className="px-5 py-3 text-center">

                            Status

                        </th>

                        <th className="px-5 py-3 text-center">

                            Joined

                        </th>

                        <th className="px-5 py-3 text-center">

                            Actions

                        </th>

                    </tr>

                </thead>

                <tbody>

                    {

                        members.map((member) => (

                            <tr

                                key={member._id}

                                className="border-t hover:bg-gray-50"

                            >

                                <td className="px-5 py-4 font-medium">

                                    {member.name}

                                </td>

                                <td className="px-5 py-4">

                                    {member.email}

                                </td>

                                <td className="px-5 py-4">

                                    {member.role}

                                </td>

                                <td className="px-5 py-4">

                                    {member.departmentId?.name || "-"}

                                </td>

                                <td className="px-5 py-4 text-center">

                                    <span

                                        className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge(member.status)}`}

                                    >

                                        {member.status}

                                    </span>

                                </td>

                                <td className="px-5 py-4 text-center">

                                    {

                                        new Date(

                                            member.createdAt

                                        ).toLocaleDateString()

                                    }

                                </td>

                                <td className="px-5 py-4">

                                    <div className="flex justify-center gap-2">

                                        <Link

                                            href={`/company/team-members/edit/${member._id}`}

                                            className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"

                                        >

                                            Edit

                                        </Link>

                                        <button

                                            onClick={() => onDelete(member._id)}

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