"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Briefcase, CalendarDays, GraduationCap, MapPin } from "lucide-react";

import { getPublishedJob } from "@/services/widget.service";

export default function JobDetailsPage() {

    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            getPublishedJob(null, id)
                .then((response) => setJob(response.data.data))
                .catch((requestError) => {
                    console.error(requestError);
                    setError(true);
                })
                .finally(() => setLoading(false));
        }
    }, [id]);

    if (loading) {

        return (
            <div className="flex h-screen items-center justify-center">
                Loading job details...
            </div>
        );

    }

    if (error || !job) {
        return <div className="mx-auto max-w-2xl py-24 text-center">This job could not be found.</div>;
    }

    return (
        <main className="mx-auto max-w-4xl px-6 py-10">
            <Link href="/careers" className="text-sm font-medium text-red-600 hover:text-red-700">
                Back to all jobs
            </Link>
            <div className="mt-6 rounded-xl border bg-white p-8 shadow-sm">
                <p className="text-sm font-medium text-gray-500">{job.companyId?.companyName}</p>
                <h1 className="mt-2 text-4xl font-bold text-gray-900">{job.title}</h1>
                <div className="mt-5 grid gap-3 text-sm text-gray-600 sm:grid-cols-3">
                    <span><Briefcase className="mr-2 inline" size={16} />{job.employmentType}</span>
                    <span><MapPin className="mr-2 inline" size={16} />{job.locationId?.name || "Remote"}</span>
                    <span><GraduationCap className="mr-2 inline" size={16} />{job.experienceLevel}</span>
                </div>
                <Link href={`/careers/apply/${job._id}?companyId=${job.companyId?.companyId || ""}`} className="mt-8 inline-flex rounded-lg bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700">
                    Apply now
                </Link>
            </div>
            <section className="mt-6 space-y-6 rounded-xl border bg-white p-8 shadow-sm">
                <div><h2 className="text-xl font-semibold">Job description</h2><p className="mt-2 whitespace-pre-line text-gray-600">{job.description}</p></div>
                {job.requirements?.length > 0 && <div><h2 className="text-xl font-semibold">Requirements</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600">{job.requirements.map((item) => <li key={item}>{item}</li>)}</ul></div>}
                {job.responsibilities?.length > 0 && <div><h2 className="text-xl font-semibold">Responsibilities</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-gray-600">{job.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul></div>}
            </section>
        </main>
    );

}