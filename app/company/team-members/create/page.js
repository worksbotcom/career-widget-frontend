"use client";

import { useRouter } from "next/navigation";

import TeamMemberForm from "@/components/team-members/TeamMemberForm";

import { createTeamMember } from "@/services/teamMember.service";

export default function CreateTeamMemberPage() {

    const router = useRouter();

    const handleCreate = async (data) => {

        try {

            await createTeamMember(data);

            router.push("/company/team-members");

        }

        catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="max-w-4xl">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Invite Team Member

                </h1>

                <p className="mt-2 text-gray-500">

                    Add a recruiter, hiring manager, or administrator to your company.

                </p>

            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm">

                <TeamMemberForm

                    onSubmit={handleCreate}

                    submitText="Invite Member"

                />

            </div>

        </div>

    );

}