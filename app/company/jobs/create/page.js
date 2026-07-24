"use client";

import { useRouter } from "next/navigation";

import JobForm from "@/components/jobs/JobForm";

import { createJob } from "@/services/job.service";

export default function CreateJobPage() {

    const router = useRouter();

    const handleCreate = async (data) => {

        try {

            await createJob(data);

            router.push("/company/jobs");

        }

        catch (error) {

            console.error(error);

            // Re-throw so JobForm can display the failure message.
            throw error;

        }

    };

    return (

        <div className="max-w-6xl">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Create Job

                </h1>

                <p className="mt-2 text-gray-500">

                    Fill in the job details to publish a new opening.

                </p>

            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm">

                <JobForm

                    onSubmit={handleCreate}

                    submitText="Create Job"

                />

            </div>

        </div>

    );

}