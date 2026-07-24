export default function ProfileCompletion({ company }) {
    const total = 5;
    let completed = 0;

    if (company.companyName) completed++;
    if (company.website) completed++;
    if (company.logo) completed++;
    if (company.isVerified) completed++;
    if (company.email) completed++;

    const percentage = Math.round((completed / total) * 100);

    return (
        <div className="rounded-[1.75rem] bg-white p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">Profile Completion</h2>
                    <p className="mt-2 text-sm text-slate-500">Keep your company profile complete to build candidate confidence.</p>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-900">
                    {percentage}%
                </div>
            </div>

            <div className="mt-6">
                <div className="h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                        className="h-3 rounded-full bg-emerald-500 transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <p className="mt-3 text-sm text-slate-500">
                    {completed} of {total} completed
                </p>
            </div>
        </div>
    );
}
