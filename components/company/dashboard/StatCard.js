export default function StatCard({ title, value, icon: Icon, color }) {
    return (
        <div className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-xl transition duration-200 hover:-translate-y-0.5 hover:shadow-2xl">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500">{title}</p>
                    <h2 className="mt-3 truncate text-3xl font-semibold text-slate-900">{value}</h2>
                </div>

                <div className={`flex h-12 w-12 items-center justify-center rounded-3xl ${color} text-white shadow-md`}>
                    <Icon size={22} strokeWidth={2} />
                </div>
            </div>
        </div>
    );
}