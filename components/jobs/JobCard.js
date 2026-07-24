"use client";

import Link from "next/link";
import {
    Briefcase,
    MapPin,
    GraduationCap,
    Users,
    Calendar,
    Eye,
    Pencil,
    PlayCircle,
    XCircle,
    Archive,
    Trash2,
} from "lucide-react";

const STATUS_STYLES = {
    draft: "bg-gray-100 text-gray-600",
    published: "bg-green-50 text-green-700",
    closed: "bg-amber-50 text-amber-700",
    archived: "bg-gray-100 text-gray-500",
};

function StatusBadge({ status }) {
    const style = STATUS_STYLES[status] || STATUS_STYLES.draft;
    return (
        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold capitalize ${style}`}>
            {status || "draft"}
        </span>
    );
}

function MetaItem({ icon: Icon, label, value }) {
    if (!value) return null;
    return (
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
            <Icon size={15} className="shrink-0 text-gray-400" />
            <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-wide text-gray-400">{label}</p>
                <p className="truncate text-sm font-medium text-gray-900">{value}</p>
            </div>
        </div>
    );
}

function ActionButton({ icon: Icon, label, onClick, tone = "default" }) {
    const toneClass =
        tone === "danger"
            ? "border-red-300 text-red-600 hover:bg-red-50"
            : "border-gray-300 text-gray-700 hover:bg-gray-50";

    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${toneClass}`}
        >
            <Icon size={14} />
            {label}
        </button>
    );
}

export default function JobCard({ job, onDelete, onPublish, onClose, onArchive }) {
    const deadline = job.applicationDeadline
        ? new Date(job.applicationDeadline).toLocaleDateString()
        : null;

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-gray-300">
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="truncate text-lg font-bold text-gray-900">{job.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {job.departmentId?.name || "No department"}
                    </p>
                </div>
                <StatusBadge status={job.status} />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <MetaItem icon={MapPin} label="Location" value={job.locationId?.city || job.locationId?.name} />
                <MetaItem icon={Briefcase} label="Type" value={job.employmentType} />
                <MetaItem icon={GraduationCap} label="Experience" value={job.experienceLevel} />
                <MetaItem icon={Users} label="Openings" value={job.openings} />
            </div>

            {deadline && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar size={13} />
                    Application deadline: {deadline}
                </div>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4">
                <Link
                    href={`/company/jobs/${job._id}`}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    <Eye size={14} />
                    View
                </Link>

                <Link
                    href={`/company/jobs/edit/${job._id}`}
                    className="flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                >
                    <Pencil size={14} />
                    Edit
                </Link>

                {job.status === "draft" && (
                    <ActionButton icon={PlayCircle} label="Publish" onClick={() => onPublish(job._id)} />
                )}

                {job.status === "published" && (
                    <ActionButton icon={XCircle} label="Close" onClick={() => onClose(job._id)} />
                )}

                {job.status !== "archived" && (
                    <ActionButton icon={Archive} label="Archive" onClick={() => onArchive(job._id)} />
                )}

                <ActionButton
                    icon={Trash2}
                    label="Delete"
                    tone="danger"
                    onClick={() => onDelete(job._id)}
                />
            </div>
        </div>
    );
}