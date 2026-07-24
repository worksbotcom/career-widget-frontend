"use client";

import { useState } from "react";
import { X, RefreshCcw, Loader2 } from "lucide-react";

// Shared with JobForm so this modal's inputs look identical to the rest of the app.
const selectClass =
    "w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 " +
    "focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900";

const textareaClass =
    "w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-900 " +
    "placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

const STATUS_OPTIONS = [
    "Applied",
    "Shortlisted",
    "Interview",
    "Offered",
    "Hired",
    "Rejected",
    "Withdrawn",
];

export default function StatusUpdateModal({ application, onClose, onSave }) {
    const [status, setStatus] = useState(application?.status || "Applied");
    const [notes, setNotes] = useState(application?.recruiterNotes || "");
    const [saving, setSaving] = useState(false);

    if (!application) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
            await onSave(status, notes);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-200 p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                            <RefreshCcw size={17} strokeWidth={2} />
                        </div>
                        <h2 className="text-base font-semibold text-gray-900">
                            Update Application Status
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 p-6">
                    <div>
                        <label className={labelClass}>Candidate</label>
                        <input
                            readOnly
                            value={`${application.firstName} ${application.lastName}`}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 p-2.5 text-sm text-gray-700"
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className={selectClass}
                        >
                            {STATUS_OPTIONS.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className={labelClass}>Recruiter Notes</label>
                        <textarea
                            rows={5}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            className={textareaClass}
                            placeholder="Add notes..."
                        />
                    </div>

                    <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={saving}
                            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {saving && <Loader2 size={16} className="animate-spin" />}
                            {saving ? "Saving…" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}