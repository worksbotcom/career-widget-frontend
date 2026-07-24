"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
    Mail,
    Phone,
    Briefcase,
    Calendar,
    Wallet,
    Download,
    RefreshCcw,
    Trash2,
    Loader2,
    ArrowLeft,
    FileText,
    StickyNote,
} from "lucide-react";

import StatusBadge from "@/components/applications/StatusBadge";
import StatusUpdateModal from "@/components/applications/StatusUpdateModal";
import Alert from "@/components/ui/Alert";

import {
    getApplication,
    deleteApplication,
    updateApplicationStatus,
    downloadResume,
} from "@/services/application.service";

function getInitials(firstName, lastName) {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
}

function InfoRow({ icon: Icon, label, value }) {
    if (!value) return null;
    return (
        <div className="flex items-start gap-3">
            <Icon size={16} className="mt-0.5 shrink-0 text-gray-400" />
            <div className="min-w-0">
                <p className="text-xs uppercase tracking-wide text-gray-400">{label}</p>
                <p className="truncate text-sm font-medium text-gray-900">{value}</p>
            </div>
        </div>
    );
}

function Card({ title, children }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">{title}</h2>
            {children}
        </div>
    );
}

export default function ApplicationDetailsPage() {
    const { id } = useParams();
    const router = useRouter();

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchApplication();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchApplication = async () => {
        try {
            const res = await getApplication(id);
            setApplication(res.data.data);
        } catch (err) {
            console.error(err);
            setError("Failed to load this application.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Delete this application?")) return;

        try {
            await deleteApplication(id);
            router.push("/company/applications");
        } catch (err) {
            console.error(err);
            setError("Failed to delete application.");
        }
    };

    const handleStatusUpdate = async (status, recruiterNotes) => {
        try {
            await updateApplicationStatus(id, { status, recruiterNotes });
            setShowModal(false);
            fetchApplication();
        } catch (err) {
            console.error(err);
            setError("Failed to update application status.");
        }
    };

    const handleResumeDownload = async () => {
        try {
            const response = await downloadResume(id);
            const blob = new Blob([response.data], {
                type: response.headers["content-type"] || "application/octet-stream",
            });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            const disposition = response.headers["content-disposition"] || "";
            const filenameMatch = disposition.match(/filename="?(.*)"?/);
            const filename = filenameMatch ? filenameMatch[1] : "resume";

            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Resume download failed", err);
            setError("Failed to download resume.");
        }
    };

    if (loading) {
        return (
            <div className="flex h-64 items-center justify-center gap-2 text-sm text-gray-500">
                <Loader2 size={16} className="animate-spin" />
                Loading application…
            </div>
        );
    }

    if (!application) {
        return (
            <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center text-sm text-gray-500">
                Application not found.
            </div>
        );
    }

    const fullName = `${application.firstName} ${application.lastName}`;

    return (
        <div className="space-y-6">
            <button
                onClick={() => router.push("/company/applications")}
                className="flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-gray-900"
            >
                <ArrowLeft size={15} />
                Back to Applications
            </button>

            {error && <Alert type="error" message={error} />}

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Left: candidate summary card */}
                <div className="space-y-6 lg:col-span-1">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-2xl font-bold text-white">
                            {getInitials(application.firstName, application.lastName)}
                        </div>

                        <h1 className="mt-4 text-xl font-bold text-gray-900">{fullName}</h1>
                        <p className="text-sm text-gray-500">
                            {application.currentDesignation || "Candidate"}
                        </p>

                        <div className="mt-3 flex justify-center">
                            <StatusBadge status={application.status} />
                        </div>

                        <div className="mt-6 space-y-3 border-t border-gray-100 pt-5 text-left">
                            <InfoRow icon={Mail} label="Email" value={application.email} />
                            <InfoRow icon={Phone} label="Phone" value={application.phone} />
                            <InfoRow icon={Briefcase} label="Applied For" value={application.jobId?.title} />
                            <InfoRow
                                icon={Calendar}
                                label="Available From"
                                value={
                                    application.availableFrom
                                        ? new Date(application.availableFrom).toLocaleDateString()
                                        : null
                                }
                            />
                        </div>

                        <div className="mt-6 space-y-2">
                            <button
                                onClick={() => setShowModal(true)}
                                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                            >
                                <RefreshCcw size={15} />
                                Update Status
                            </button>

                            <button
                                type="button"
                                onClick={handleResumeDownload}
                                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                <Download size={15} />
                                Download Resume
                            </button>

                            <button
                                onClick={handleDelete}
                                className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-red-300 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                            >
                                <Trash2 size={15} />
                                Delete Application
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right: details */}
                <div className="space-y-6 lg:col-span-2">
                    <Card title="Professional Details">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3">
                            <InfoRow
                                icon={Briefcase}
                                label="Current Company"
                                value={application.currentCompany || "-"}
                            />
                            <InfoRow
                                icon={Briefcase}
                                label="Experience"
                                value={application.experience != null ? `${application.experience} yrs` : "-"}
                            />
                            <InfoRow
                                icon={Calendar}
                                label="Notice Period"
                                value={application.noticePeriod || "-"}
                            />
                            <InfoRow
                                icon={Wallet}
                                label="Current CTC"
                                value={application.currentCTC != null ? `₹ ${application.currentCTC}` : "-"}
                            />
                            <InfoRow
                                icon={Wallet}
                                label="Expected CTC"
                                value={application.expectedCTC != null ? `₹ ${application.expectedCTC}` : "-"}
                            />
                        </div>
                    </Card>

                    <Card title="Cover Letter">
                        <div className="flex items-start gap-3">
                            <FileText size={16} className="mt-0.5 shrink-0 text-gray-400" />
                            <p className="whitespace-pre-line text-sm text-gray-700">
                                {application.coverLetter || "No cover letter."}
                            </p>
                        </div>
                    </Card>

                    <Card title="Recruiter Notes">
                        <div className="flex items-start gap-3">
                            <StickyNote size={16} className="mt-0.5 shrink-0 text-gray-400" />
                            <p className="whitespace-pre-line text-sm text-gray-700">
                                {application.recruiterNotes || "No notes added."}
                            </p>
                        </div>
                    </Card>
                </div>
            </div>

            {showModal && (
                <StatusUpdateModal
                    application={application}
                    onClose={() => setShowModal(false)}
                    onSave={handleStatusUpdate}
                />
            )}
        </div>
    );
}