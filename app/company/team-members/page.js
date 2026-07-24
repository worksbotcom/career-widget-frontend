"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import TeamMemberTable from "@/components/team-members/TeamMemberTable";

import {
    getTeamMembers,
    deleteTeamMember
} from "@/services/teamMember.service";

export default function TeamMembersPage() {

    const [members, setMembers] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchMembers = async () => {

        try {

            const res = await getTeamMembers();

            setMembers(res.data.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchMembers();

    }, []);

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(

            "Are you sure you want to delete this team member?"

        );

        if (!confirmDelete) return;

        try {

            await deleteTeamMember(id);

            fetchMembers();

        }

        catch (error) {

            alert(

                error.response?.data?.message ||

                "Failed to delete team member."

            );

        }

    };

    if (loading) {

        return (

            <div className="p-8">

                Loading...

            </div>

        );

    }

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">

                        Team Members

                    </h1>

                    <p className="mt-2 text-gray-500">

                        Manage recruiters and hiring managers.

                    </p>

                </div>

                <Link

                    href="/company/team-members/create"

                    className="rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"

                >

                    + Invite Member

                </Link>

            </div>

            <TeamMemberTable

                members={members}

                onDelete={handleDelete}

            />

        </div>

    );

}