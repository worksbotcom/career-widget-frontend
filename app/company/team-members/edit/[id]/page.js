"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import TeamMemberForm from "@/components/team-members/TeamMemberForm";

import {
    getTeamMember,
    updateTeamMember
} from "@/services/teamMember.service";

export default function EditTeamMemberPage() {

    const { id } = useParams();

    const router = useRouter();

    const [member, setMember] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchMember();

    }, []);

    const fetchMember = async () => {

        try {

            const res = await getTeamMember(id);

            setMember(res.data.data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const handleUpdate = async (data) => {

        try {

            await updateTeamMember(id, data);

            router.push("/company/team-members");

        }

        catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return (

            <div className="p-8">

                Loading...

            </div>

        );

    }

    if (!member) {

        return (

            <div className="p-8">

                Team member not found.

            </div>

        );

    }

    return (

        <div className="max-w-4xl">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Edit Team Member

                </h1>

                <p className="mt-2 text-gray-500">

                    Update team member details.

                </p>

            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm">

                <TeamMemberForm

                    initialData={member}

                    onSubmit={handleUpdate}

                    submitText="Update Member"

                />

            </div>

        </div>

    );

}