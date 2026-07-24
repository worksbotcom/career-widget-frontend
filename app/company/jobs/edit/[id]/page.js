"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import JobForm from "@/components/jobs/JobForm";

import {
    getJob,
    updateJob
} from "@/services/job.service";

export default function EditJobPage() {

    const { id } = useParams();

    const router = useRouter();

    const [job, setJob] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchJob();

    }, []);

    const fetchJob = async () => {

        try {

            const res = await getJob(id);

            setJob(res.data.data);

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

            await updateJob(id, data);

            router.push("/company/jobs");

        }

        catch (error) {

            console.error(error);

            // Re-throw so JobForm can display the failure message.
            throw error;

        }

    };

    if (loading) {

        return (

            <div className="p-8">

                Loading...

            </div>

        );

    }

    if (!job) {

        return (

            <div className="p-8">

                Job not found.

            </div>

        );

    }

    return (

        <div className="max-w-6xl">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Edit Job

                </h1>

                <p className="mt-2 text-gray-500">

                    Update the job information.

                </p>

            </div>

            <div className="rounded-xl border bg-white p-8 shadow-sm">

                <JobForm

                    initialData={job}

                    onSubmit={handleUpdate}

                    submitText="Update Job"

                />

            </div>

        </div>

    );

}