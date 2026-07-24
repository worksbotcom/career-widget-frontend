import { CheckCircle } from "lucide-react";

export default function RecentActivity() {
    const activities = [
        "Company Registered",
        "Email Verified",
        "API Key Generated",
        "Widget Activated",
    ];

    return (
        <div className="rounded-[1.75rem] bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-semibold text-slate-900">Recent Activity</h2>
                    <p className="text-sm text-slate-500">Latest events from your company workspace.</p>
                </div>
            </div>

            <div className="mt-6 space-y-4">
                {activities.map((item, index) => (
                    <div
                        key={index}
                        className="flex gap-4 rounded-3xl border border-slate-200/80 bg-slate-50 p-4"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-700">
                            <CheckCircle size={18} />
                        </div>
                        <div>
                            <p className="font-medium text-slate-900">{item}</p>
                            <p className="text-sm text-slate-500">Completed successfully</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
