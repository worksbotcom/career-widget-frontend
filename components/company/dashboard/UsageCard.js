export default function UsageCard({ company }) {
    const used = company.jobsCount || 0;
    const total = company.subscription?.maxJobs ?? 5;
    const percent = total === -1 ? 100 : Math.min(100, Math.round((used / total) * 100));
    const label = total === -1 ? "Unlimited jobs" : `${used} of ${total} jobs used`;

    return (
        <div className="rounded-[1.75rem] bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">Job Usage</h2>
                    <p className="mt-2 text-sm text-slate-500">Monitor your job posting quota and stay ahead of your plan limits.</p>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-900">{label}</div>
            </div>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                    className="h-3 rounded-full bg-indigo-600 transition-all duration-300"
                    style={{ width: `${percent}%` }}
                />
            </div>

            {total === -1 ? (
                <p className="mt-4 text-sm text-emerald-600">Unlimited posting enabled</p>
            ) : (
                <p className="mt-4 text-sm text-slate-500">{percent}% of plan quota used</p>
            )}
        </div>
    );
}
