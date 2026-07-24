"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";

import JobCard from "@/components/jobs/JobCard";
import Alert from "@/components/ui/Alert";

import {
    getJobs,
    deleteJob,
    publishJob,
    closeJob,
    archiveJob,
} from "@/services/job.service";

const PAGE_SIZE = 10;

export default function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(false);

    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchJobs(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchJobs = async (pageNumber = 1) => {
        try {
            setError("");

            if (pageNumber === 1) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const res = await getJobs({ page: pageNumber, limit: PAGE_SIZE });

            const data = res.data?.data || [];
            const pagination = res.data?.pagination;

            setJobs((prev) => (pageNumber === 1 ? data : [...prev, ...data]));

            if (pagination) {
                setTotal(pagination.total);
                setHasMore(pagination.hasMore);
                setPage(pagination.page);
            } else {
                // Fallback if the backend doesn't return pagination metadata.
                setTotal((prevTotal) => (pageNumber === 1 ? data.length : prevTotal + data.length));
                setHasMore(data.length === PAGE_SIZE);
                setPage(pageNumber);
            }
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to load jobs.");
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const reloadJobs = () => fetchJobs(1);

    const runAction = async (action, id, failureMessage) => {
        try {
            await action(id);
            reloadJobs();
        } catch (err) {
            setError(err.response?.data?.message || failureMessage);
        }
    };

    const handleDelete = (id) => {
        if (!window.confirm("Delete this job?")) return;
        runAction(deleteJob, id, "Failed to delete job.");
    };

    const handlePublish = (id) => runAction(publishJob, id, "Failed to publish job.");
    const handleClose = (id) => runAction(closeJob, id, "Failed to close job.");
    const handleArchive = (id) => runAction(archiveJob, id, "Failed to archive job.");

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Jobs</h1>
                    <p className="text-gray-500">Manage all your job postings</p>
                </div>

                <Link
                    href="/company/jobs/create"
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                >
                    <Plus size={16} />
                    New Job
                </Link>
            </div>

            {error && <Alert type="error" message={error} />}

            {loading ? (
                <div className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-12 text-sm text-gray-500 shadow-sm">
                    <Loader2 size={16} className="animate-spin" />
                    Loading jobs…
                </div>
            ) : jobs.length === 0 ? (
                <div className="rounded-xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center text-sm text-gray-500">
                    No jobs yet. Create your first job posting to get started.
                </div>
            ) : (
                <>
                    <p className="text-sm text-gray-500">
                        Showing {jobs.length} of {total} jobs
                    </p>

                    <div className="grid gap-4 lg:grid-cols-2">
                        {jobs.map((job) => (
                            <JobCard
                                key={job._id}
                                job={job}
                                onDelete={handleDelete}
                                onPublish={handlePublish}
                                onClose={handleClose}
                                onArchive={handleArchive}
                            />
                        ))}
                    </div>

                    {hasMore && (
                        <div className="flex justify-center pt-2">
                            <button
                                onClick={() => fetchJobs(page + 1)}
                                disabled={loadingMore}
                                className="rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {loadingMore ? "Loading…" : "Load More"}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}