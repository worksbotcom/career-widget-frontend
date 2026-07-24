"use client";

import { useEffect, useState } from "react";
import { Download, Loader2, Filter } from "lucide-react";

import ApplicationTable from "@/components/applications/ApplicationTable";
import StatusUpdateModal from "@/components/applications/StatusUpdateModal";
import Alert from "@/components/ui/Alert";

import {
    getApplications,
    exportApplications,
    deleteApplication,
    updateApplicationStatus,
} from "@/services/application.service";

import { getJobs } from "@/services/job.service";

const PAGE_SIZE = 15;

const STATUS_OPTIONS = [
    "Applied",
    "Shortlisted",
    "Interview",
    "Offered",
    "Hired",
    "Rejected",
    "Withdrawn",
];

// Shared with JobForm's <select> styling so filters look the same everywhere.
const selectClass =
    "w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 " +
    "focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900";

export default function ApplicationsPage() {
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);

    const [jobFilter, setJobFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");

    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [error, setError] = useState("");

    const [selectedApplication, setSelectedApplication] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Load the job list once (for the filter dropdown).
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getJobs();
                setJobs(res.data.data || []);
            } catch (err) {
                console.error(err);
            }
        };

        fetchJobs();
    }, []);

    // Fetch the first page whenever a filter changes.
    useEffect(() => {
        const fetchFirstPage = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await getApplications({
                    page: 1,
                    limit: PAGE_SIZE,
                    ...(jobFilter && { jobId: jobFilter }),
                    ...(statusFilter && { status: statusFilter }),
                });

                const { data, pagination } = res.data;

                setApplications(data || []);
                setTotal(pagination?.total ?? (data ? data.length : 0));
                setHasMore(pagination?.hasMore ?? false);
                setPage(1);
            } catch (err) {
                console.error(err);
                setError("Failed to load applications.");
            } finally {
                setLoading(false);
            }
        };

        fetchFirstPage();
    }, [jobFilter, statusFilter]);

    const handleLoadMore = async () => {
        const nextPage = page + 1;
        setLoadingMore(true);

        try {
            const res = await getApplications({
                page: nextPage,
                limit: PAGE_SIZE,
                ...(jobFilter && { jobId: jobFilter }),
                ...(statusFilter && { status: statusFilter }),
            });

            const { data, pagination } = res.data;

            setApplications((prev) => [...prev, ...(data || [])]);
            setHasMore(pagination?.hasMore ?? false);
            setPage(pagination?.page ?? nextPage);
        } catch (err) {
            console.error(err);
            setError("Failed to load more applications.");
        } finally {
            setLoadingMore(false);
        }
    };

    // Reload exactly the rows currently on screen (used after edits/deletes).
    const reloadLoaded = async () => {
        const count = applications.length || PAGE_SIZE;

        try {
            const res = await getApplications({
                page: 1,
                limit: count,
                ...(jobFilter && { jobId: jobFilter }),
                ...(statusFilter && { status: statusFilter }),
            });

            const { data, pagination } = res.data;

            setApplications(data || []);
            setTotal(pagination?.total ?? (data ? data.length : 0));
            setHasMore((pagination?.total ?? 0) > (data ? data.length : 0));
            setPage(Math.max(1, Math.ceil((data ? data.length : 0) / PAGE_SIZE)));
        } catch (err) {
            console.error(err);
            setError("Failed to refresh applications.");
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this application?")) return;

        try {
            await deleteApplication(id);
            await reloadLoaded();
        } catch (err) {
            console.error(err);
            setError("Failed to delete application.");
        }
    };

    const handleStatusClick = (application) => {
        setSelectedApplication(application);
        setShowModal(true);
    };

    const handleStatusUpdate = async (status, recruiterNotes) => {
        try {
            await updateApplicationStatus(selectedApplication._id, { status, recruiterNotes });
            setShowModal(false);
            setSelectedApplication(null);
            await reloadLoaded();
        } catch (err) {
            console.error(err);
            setError("Failed to update application status.");
        }
    };

    const handleExport = async () => {
        setExporting(true);
        setError("");

        try {
            const res = await exportApplications({
                ...(jobFilter && { jobId: jobFilter }),
                ...(statusFilter && { status: statusFilter }),
            });

            const blob = new Blob([res.data], {
                type: res.headers["content-type"] || "text/csv",
            });

            const disposition = res.headers["content-disposition"] || "";
            const match = disposition.match(/filename="?(.*?)"?$/);
            const filename = match ? match[1] : "applications.csv";

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Export failed", err);
            setError("Failed to export applications.");
        } finally {
            setExporting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
                    <p className="mt-2 text-gray-500">Manage candidate applications.</p>
                </div>

                <button
                    onClick={handleExport}
                    disabled={exporting || total === 0}
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {exporting ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <Download size={16} />
                    )}
                    {exporting ? "Exporting…" : "Download Excel"}
                </button>
            </div>

            {error && <Alert type="error" message={error} />}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                        <Filter size={17} strokeWidth={2} />
                    </div>
                    <h2 className="text-base font-semibold text-gray-900">Filters</h2>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Job</label>
                        <select
                            value={jobFilter}
                            onChange={(e) => setJobFilter(e.target.value)}
                            className={selectClass}
                        >
                            <option value="">All Jobs</option>
                            {jobs.map((job) => (
                                <option key={job._id} value={job._id}>
                                    {job.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className={selectClass}
                        >
                            <option value="">All Statuses</option>
                            {STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                    {status}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-12 text-sm text-gray-500 shadow-sm">
                    <Loader2 size={16} className="animate-spin" />
                    Loading applications…
                </div>
            ) : (
                <>
                    <p className="text-sm text-gray-500">
                        Showing {applications.length} of {total} application{total === 1 ? "" : "s"}
                    </p>

                    <ApplicationTable
                        applications={applications}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusClick}
                    />

                    {hasMore && (
                        <div className="flex justify-center">
                            <button
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                className="rounded-lg border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loadingMore ? "Loading…" : "Load More"}
                            </button>
                        </div>
                    )}
                </>
            )}

            {showModal && (
                <StatusUpdateModal
                    application={selectedApplication}
                    onClose={() => {
                        setShowModal(false);
                        setSelectedApplication(null);
                    }}
                    onSave={handleStatusUpdate}
                />
            )}
        </div>
    );
}