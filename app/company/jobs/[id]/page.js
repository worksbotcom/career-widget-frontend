"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
    Briefcase,
    FileText,
    ListChecks,
    ClipboardList,
    Gift,
    Tag,
    Pencil,
    ArrowLeft,
    Loader2,
} from "lucide-react";

import { getJob } from "@/services/job.service";

const STATUS_STYLES = {
    draft: "bg-yellow-100 text-yellow-700",
    published: "bg-green-100 text-green-700",
    closed: "bg-red-100 text-red-700",
    archived: "bg-gray-200 text-gray-700",
};

function statusColor(status) {
    return STATUS_STYLES[status?.toLowerCase()] || STATUS_STYLES.draft;
}

function Section({ icon: Icon, title, children }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                    <Icon size={17} strokeWidth={2} />
                </div>
                <h2 className="text-base font-semibold text-gray-900">{title}</h2>
            </div>
            {children}
        </div>
    );
}

function DetailItem({ label, value }) {
    return (
        <div className="rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-500">{label}</p>
            <h3 className="mt-1 font-semibold text-gray-900">{value ?? "-"}</h3>
        </div>
    );
}

function ListSection({ icon, title, items, emptyLabel }) {
    return (
        <Section icon={icon} title={title}>
            {items?.length ? (
                <ul className="list-disc space-y-2 pl-6 text-sm text-gray-700">
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-400">{emptyLabel}</p>
            )}
        </Section>
    );
}

export default function JobDetailsPage() {
    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchJob();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchJob = async () => {
        try {
            const res = await getJob(id);
            setJob(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center gap-2 text-sm text-gray-500">
                <Loader2 size={16} className="animate-spin" />
                Loading job…
            </div>
        );
    }

    if (!job) {
        return (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center text-sm text-gray-500">
                Job not found.
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
                    <p className="mt-2 text-gray-500">
                        Created on {new Date(job.createdAt).toLocaleDateString()}
                    </p>
                </div>

                <div className="flex gap-3">
                    <Link
                        href={`/company/jobs/edit/${job._id}`}
                        className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                    >
                        <Pencil size={15} />
                        Edit
                    </Link>

                    <Link
                        href="/company/jobs"
                        className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <ArrowLeft size={15} />
                        Back
                    </Link>
                </div>
            </div>

            <Section icon={Briefcase} title="Overview">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <DetailItem label="Department" value={job.departmentId?.name} />
                    <DetailItem label="Location" value={job.locationId?.name} />
                    <DetailItem label="Employment Type" value={job.employmentType} />
                    <DetailItem label="Experience Level" value={job.experienceLevel} />
                    <DetailItem
                        label="Salary"
                        value={`${job.currency ?? ""} ${job.salaryMin ?? "-"} - ${job.salaryMax ?? "-"}`}
                    />
                    <DetailItem label="Openings" value={job.openings} />
                    <DetailItem
                        label="Deadline"
                        value={
                            job.applicationDeadline
                                ? new Date(job.applicationDeadline).toLocaleDateString()
                                : "-"
                        }
                    />
                    <div className="rounded-lg border border-gray-200 p-4">
                        <p className="text-sm text-gray-500">Status</p>
                        <span
                            className={`mt-1 inline-flex rounded-full px-3 py-1 text-sm font-semibold ${statusColor(
                                job.status
                            )}`}
                        >
                            {job.status}
                        </span>
                    </div>
                </div>
            </Section>

            <Section icon={FileText} title="Job Description">
                <p className="whitespace-pre-line text-sm text-gray-700">{job.description || "-"}</p>
            </Section>

            <ListSection
                icon={ListChecks}
                title="Requirements"
                items={job.requirements}
                emptyLabel="No requirements added."
            />

            <ListSection
                icon={ClipboardList}
                title="Responsibilities"
                items={job.responsibilities}
                emptyLabel="No responsibilities added."
            />

            <ListSection icon={Gift} title="Benefits" items={job.benefits} emptyLabel="No benefits added." />

            <Section icon={Tag} title="Skills">
                {job.skills?.length ? (
                    <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                            <span
                                key={index}
                                className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-400">No skills added.</p>
                )}
            </Section>
        </div>
    );
}