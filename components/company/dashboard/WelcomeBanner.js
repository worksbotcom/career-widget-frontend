"use client";

import { Sparkles, Building2 } from "lucide-react";

export default function WelcomeBanner({ company }) {
    const currentHour = new Date().getHours();

    const greeting =
        currentHour < 12
            ? "Good Morning"
            : currentHour < 17
            ? "Good Afternoon"
            : "Good Evening";

    return (
        <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-10 shadow-[0_35px_60px_-30px_rgba(15,23,42,0.8)] sm:px-8">
            <div className="absolute inset-y-0 right-0 hidden w-72 bg-cyan-500/10 blur-3xl sm:block" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />

            <div className="relative z-10 grid gap-8 lg:grid-cols-[1.9fr_1fr] lg:items-center">
                <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100 backdrop-blur-xl">
                        <Sparkles size={16} />
                        Recruitment Dashboard
                    </div>

                    <div>
                        <p className="text-sm uppercase tracking-[0.24em] text-cyan-300/80">Welcome back</p>
                        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                            {greeting}, <span className="text-cyan-300">{company?.companyName || "Hiring Team"}</span>
                        </h1>
                    </div>

                    <p className="max-w-2xl text-base leading-7 text-slate-300">
                        Your company dashboard is ready. Manage job postings, review applications, and monitor company activity from a clean and responsive workspace.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-[1.5rem] bg-white/5 p-4 text-sm text-slate-200 ring-1 ring-white/10">
                            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">Jobs posted</p>
                            <p className="mt-3 text-3xl font-semibold text-white">{company.jobsCount || 0}</p>
                        </div>
                        <div className="rounded-[1.5rem] bg-white/5 p-4 text-sm text-slate-200 ring-1 ring-white/10">
                            <p className="text-xs uppercase tracking-[0.24em] text-cyan-300/80">Current plan</p>
                            <p className="mt-3 text-3xl font-semibold text-white">
                                {company.subscription?.name || "Free"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-xl">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-cyan-400 text-slate-950 shadow-md">
                            <Building2 size={28} />
                        </div>

                        <div>
                            <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/80">Company</p>
                            <h2 className="mt-2 text-2xl font-semibold text-white">{company.companyName || "Your Company"}</h2>
                        </div>
                    </div>

                    <div className="mt-6 space-y-4 rounded-3xl bg-white/5 p-4 text-sm text-slate-300">
                        <p>Get real-time updates on your hiring process and keep your profile information current.</p>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="rounded-2xl bg-white/10 p-3">
                                <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Status</p>
                                <p className="mt-2 font-semibold text-white">{company.isVerified ? "Verified" : "Pending"}</p>
                            </div>
                            <div className="rounded-2xl bg-white/10 p-3">
                                <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">Website</p>
                                <p className="mt-2 font-semibold text-white truncate">{company.website || "Not set"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}