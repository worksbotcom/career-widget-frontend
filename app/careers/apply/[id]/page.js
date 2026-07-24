"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Briefcase, MapPin, GraduationCap, ListChecks, Loader2, ClipboardList } from "lucide-react";

import ApplyForm from "@/components/careers/ApplyForm";
import Alert from "@/components/ui/Alert";
import { getPublishedJob } from "@/services/widget.service";

// Same building blocks as the job details page, so the flow feels continuous.
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
    if (!value) return null;
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

export default function ApplyJobPage() {
    const { id } = useParams();
    const searchParams = useSearchParams();
    const companyId = searchParams.get("companyId");

    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id && companyId) {
            fetchJob();
        }
    }, [id, companyId]);

    const fetchJob = async () => {
        try {
            const res = await getPublishedJob(companyId, id);
            setJob(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center gap-2 text-sm text-gray-500">
                <Loader2 size={16} className="animate-spin" />
                Loading job details…
            </div>
        );
    }

    if (!job) {
        return (
            <div className="mx-auto max-w-2xl pt-24">
                <Alert type="error" message="This job could not be found." />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="mx-auto max-w-7xl space-y-6 px-4 lg:px-6">
                {/* Page header */}
                <div>
                    {job.companyId?.companyName && (
                        <p className="mb-1 text-sm font-medium text-gray-500">
                            {job.companyId.companyName}
                        </p>
                    )}
                    <h1 className="text-3xl font-bold text-gray-900">
                        Apply for {job.title}
                    </h1>
                </div>

                {/* Job summary */}
                <Section>
                    <SectionHeader
                        icon={Briefcase}
                        title="Role summary"
                        subtitle="Double-check the details before you apply"
                    />

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <Stat icon={ListChecks} label="Department" value={job.departmentId?.name} />
                        <Stat icon={MapPin} label="Location" value={job.locationId?.name} />
                        <Stat icon={Briefcase} label="Employment type" value={job.employmentType} />
                        <Stat icon={GraduationCap} label="Experience" value={job.experienceLevel} />
                    </div>
                </Section>

                {/* Application form */}
                <Section>
                    <SectionHeader
                        icon={ClipboardList}
                        title="Your application"
                        subtitle="Fill in your details to apply for this role"
                    />

                    <ApplyForm jobId={job._id} />
                </Section>
            </div>
        </div>
    );
}