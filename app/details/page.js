"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    Briefcase,
    MapPin,
    Wallet,
    ListChecks,
    FileText,
    Loader2,
    Users,
    CalendarDays,
    GraduationCap,
    Building2
} from "lucide-react";

import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

// Reused from JobForm so the read view and the edit view feel like the same product.
function SectionHeader({ icon: Icon, title, subtitle }) {
    return (
        <div className="mb-5 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                <Icon size={17} strokeWidth={2} />
            </div>
            <div>
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
        </div>
    );
}

function Section({ children }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            {children}
        </div>
    );
}

function Stat({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center gap-2.5 rounded-lg border border-gray-200 px-3.5 py-2.5">
            <Icon size={16} className="shrink-0 text-gray-400" />
            <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wide text-gray-400">{label}</p>
                <p className="truncate text-sm font-medium text-gray-900">{value}</p>
            </div>
        </div>
    );
}

function Fact({ label, value }) {
    if (value === undefined || value === null || value === "") return null;
    return (
        <div className="flex items-center justify-between py-2.5 text-sm">
            <span className="text-gray-500">{label}</span>
            <span className="font-medium text-gray-900">{value}</span>
        </div>
    );
}

function BulletList({ items }) {
    return (
        <ul className="space-y-2">
            {items.map((item, index) => (
                <li key={index} className="flex gap-2.5 text-sm leading-6 text-gray-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-900" />
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    );
}

function formatDeadline(dateString) {
    if (!dateString) return null;
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return null;

    const formatted = date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric"
    });

    const daysLeft = Math.ceil((date - new Date()) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) return { formatted, status: "Applications closed" };
    if (daysLeft === 0) return { formatted, status: "Closes today" };
    return { formatted, status: `${daysLeft} day${daysLeft === 1 ? "" : "s"} left to apply` };
}

function formatSalary(job) {
    const currency = job.currency || "USD";
    if (job.salaryMin && job.salaryMax) {
        return `${currency} ${job.salaryMin.toLocaleString()} – ${job.salaryMax.toLocaleString()}`;
    }
    if (job.salaryMin) return `${currency} ${job.salaryMin.toLocaleString()}+`;
    if (job.salaryMax) return `Up to ${currency} ${job.salaryMax.toLocaleString()}`;
    return "Not disclosed";
}

function JobDetailsContent() {
    const searchParams = useSearchParams();
    const companyId = searchParams.get("companyId");
    const jobId = searchParams.get("jobId");

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadJob = async () => {
            if (!companyId || !jobId) {
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/widget/${companyId}/jobs/${jobId}`
                );
                const result = await res.json();

                if (result.success) {
                    setJob(result.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        loadJob();
    }, [companyId, jobId]);

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center gap-2 text-sm text-gray-500">
                <Loader2 size={16} className="animate-spin" />
                Loading job details…
            </div>
        );
    }

    if (!job) {
        return (
            <div className="mx-auto max-w-2xl pt-10">
                <Alert type="error" message="This job could not be found." />
            </div>
        );
    }

    const location = job.locationId?.name || job.locationId?.city || "Remote";
    const deadline = formatDeadline(job.applicationDeadline);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="mx-auto max-w-6xl px-4 lg:px-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* LEFT */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Overview */}
                        <Section>
                            <SectionHeader
                                icon={Briefcase}
                                title={job.title}
                                subtitle={job.departmentId?.name}
                            />

                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                <Stat icon={MapPin} label="Location" value={location} />
                                <Stat icon={Briefcase} label="Type" value={job.employmentType} />
                                <Stat icon={Users} label="Openings" value={job.openings} />
                                <Stat icon={Wallet} label="Salary" value={formatSalary(job)} />
                            </div>
                        </Section>

                        {/* Job details */}
                        <Section>
                            <SectionHeader
                                icon={ListChecks}
                                title="Job details"
                                subtitle="Employment terms and candidate criteria"
                            />

                            <div className="grid grid-cols-1 gap-x-8 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-y-0">
                                <div className="divide-y divide-gray-100">
                                    <Fact label="Employment type" value={job.employmentType} />
                                    <Fact label="Experience level" value={job.experienceLevel} />
                                    <Fact label="Degree" value={job.degree} />
                                </div>
                                <div className="divide-y divide-gray-100">
                                    <Fact label="Age limit" value={job.ageLimit} />
                                    <Fact label="Gender" value={job.gender} />
                                    <Fact label="Openings" value={job.openings} />
                                </div>
                            </div>
                        </Section>

                        {/* Description */}
                        <Section>
                            <SectionHeader
                                icon={FileText}
                                title="Description"
                                subtitle="What the role involves"
                            />

                            <p className="whitespace-pre-line text-sm leading-7 text-gray-700">
                                {job.description}
                            </p>
                        </Section>

                        {job.responsibilities?.length > 0 && (
                            <Section>
                                <SectionHeader icon={ListChecks} title="Responsibilities" />
                                <BulletList items={job.responsibilities} />
                            </Section>
                        )}

                        {job.requirements?.length > 0 && (
                            <Section>
                                <SectionHeader icon={GraduationCap} title="Requirements" />
                                <BulletList items={job.requirements} />
                            </Section>
                        )}

                        {job.benefits?.length > 0 && (
                            <Section>
                                <SectionHeader icon={Wallet} title="Benefits" />
                                <BulletList items={job.benefits} />
                            </Section>
                        )}

                        {job.skills?.length > 0 && (
                            <Section>
                                <SectionHeader icon={ListChecks} title="Skills required" />
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </Section>
                        )}
                    </div>

                    {/* RIGHT: sidebar */}
                    <div>
                        <div className="sticky top-6 space-y-6">
                            {/* Apply card */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <Button
                                    onClick={() =>
                                        window.open(
                                            `/careers/apply/${job._id}?companyId=${companyId}`,
                                            "_blank"
                                        )
                                    }
                                    className="w-full"
                                >
                                    Apply now
                                </Button>

                                {deadline && (
                                    <div className="mt-4 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2.5 text-xs text-gray-500">
                                        <CalendarDays size={14} className="shrink-0" />
                                        <span>
                                            {deadline.status} · closes {deadline.formatted}
                                        </span>
                                    </div>
                                )}

                                <div className="mt-5 divide-y divide-gray-100 border-t border-gray-100 pt-1">
                                    <Fact label="Salary" value={formatSalary(job)} />
                                    <Fact label="Experience" value={job.experienceLevel} />
                                    <Fact label="Employment" value={job.employmentType} />
                                    <Fact label="Location" value={location} />
                                    <Fact label="Openings" value={job.openings} />
                                    <Fact label="Degree" value={job.degree} />
                                    <Fact label="Age limit" value={job.ageLimit} />
                                    <Fact label="Gender" value={job.gender} />
                                </div>
                            </div>

                            {/* Company */}
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <SectionHeader icon={Building2} title="Hiring company" />

                                <div id="company-info" className="space-y-5">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                            {job.companyId?.logo ? (
                                                <img
                                                    src={job.companyId.logo}
                                                    alt={job.companyId.companyName}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-xl font-semibold text-gray-400">
                                                    {job.companyId?.companyName?.charAt(0)}
                                                </span>
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <h4 className="truncate text-base font-semibold text-gray-900">
                                                {job.companyId?.companyName}
                                            </h4>
                                            <p className="text-sm text-gray-500">Hiring company</p>
                                        </div>
                                    </div>

                                    {job.companyId?.description && (
                                        <p className="text-sm leading-6 text-gray-600">
                                            {job.companyId.description}
                                        </p>
                                    )}

                                    <div className="grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                                        {job.companyId?.website && (
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.24em] text-gray-400">Website</p>
                                                <a
                                                    href={job.companyId.website}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="mt-1 block font-medium text-indigo-600 hover:text-indigo-700"
                                                >
                                                    {job.companyId.website}
                                                </a>
                                            </div>
                                        )}
                                        {job.companyId?.industry && (
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.24em] text-gray-400">Industry</p>
                                                <p className="mt-1 font-medium text-gray-900">{job.companyId.industry}</p>
                                            </div>
                                        )}
                                        {job.companyId?.companySize && (
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.24em] text-gray-400">Company size</p>
                                                <p className="mt-1 font-medium text-gray-900">{job.companyId.companySize}</p>
                                            </div>
                                        )}
                                        {job.companyId?.headquarters && (
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.24em] text-gray-400">Headquarters</p>
                                                <p className="mt-1 font-medium text-gray-900">{job.companyId.headquarters}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function JobDetailsPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-[300px] items-center justify-center gap-2 text-sm text-gray-500">
                    <Loader2 size={16} className="animate-spin" />
                    Loading job details…
                </div>
            }
        >
            <JobDetailsContent />
        </Suspense>
    );
}