"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    User,
    Briefcase,
    Link as LinkIcon,
    FileText,
    UploadCloud,
    Loader2,
} from "lucide-react";

import { applyForJob } from "@/services/widget.service";

// ---- Shared building blocks (mirrors the Section/SectionHeader pattern used on the job page) ----

function FormSection({ icon: Icon, title, subtitle, children }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                    <Icon size={17} strokeWidth={2} />
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                </div>
            </div>
            <div className="grid gap-5 md:grid-cols-2">{children}</div>
        </div>
    );
}

function Field({ label, error, span2, children }) {
    return (
        <div className={span2 ? "md:col-span-2" : undefined}>
            {label && (
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}
            {children}
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}

const inputClass = (hasError) =>
    `w-full rounded-lg border p-3 text-sm outline-none transition focus:border-red-500 focus:ring-1 focus:ring-red-500 ${
        hasError ? "border-red-400" : "border-gray-300"
    }`;

// ---- Field definitions grouped by section ----

const PERSONAL_FIELDS = [
    { name: "firstName", label: "First name", required: true },
    { name: "lastName", label: "Last name", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "phone", label: "Phone", type: "tel", required: true },
    { name: "currentLocation", label: "Current location", span2: true },
];

const PROFESSIONAL_FIELDS = [
    { name: "currentCompany", label: "Current company" },
    { name: "currentDesignation", label: "Current designation" },
    { name: "experience", label: "Experience (years)", type: "number", min: 0 },
    { name: "noticePeriod", label: "Notice period" },
    { name: "currentCTC", label: "Current CTC", type: "number", min: 0 },
    { name: "expectedCTC", label: "Expected CTC", type: "number", min: 0 },
    { name: "availableFrom", label: "Available from", type: "date" },
];

const LINK_FIELDS = [
    { name: "linkedin", label: "LinkedIn URL", type: "url", span2: true },
    { name: "portfolio", label: "Portfolio URL", type: "url", span2: true },
];

const INITIAL_FORM = Object.fromEntries(
    [...PERSONAL_FIELDS, ...PROFESSIONAL_FIELDS, ...LINK_FIELDS, { name: "coverLetter" }].map(
        (f) => [f.name, ""]
    )
);

const MAX_RESUME_MB = 5;
const ACCEPTED_RESUME_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function ApplyForm({ jobId }) {
    const router = useRouter();

    const [form, setForm] = useState(INITIAL_FORM);
    const [resume, setResume] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const handleResumeChange = (e) => {
        const file = e.target.files?.[0] || null;

        if (file) {
            if (!ACCEPTED_RESUME_TYPES.includes(file.type)) {
                setErrors((prev) => ({ ...prev, resume: "Please upload a PDF, DOC, or DOCX file." }));
                setResume(null);
                e.target.value = "";
                return;
            }
            if (file.size > MAX_RESUME_MB * 1024 * 1024) {
                setErrors((prev) => ({ ...prev, resume: `File must be under ${MAX_RESUME_MB}MB.` }));
                setResume(null);
                e.target.value = "";
                return;
            }
        }

        setErrors((prev) => ({ ...prev, resume: undefined }));
        setResume(file);
    };

    const validate = () => {
        const nextErrors = {};

        [...PERSONAL_FIELDS].forEach((f) => {
            if (f.required && !form[f.name]?.trim()) {
                nextErrors[f.name] = `${f.label} is required.`;
            }
        });

        if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) {
            nextErrors.email = "Enter a valid email address.";
        }

        if (!resume) {
            nextErrors.resume = "Please attach your resume.";
        }

        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        if (!validate()) {
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("jobId", jobId);
            Object.entries(form).forEach(([key, value]) => formData.append(key, value));
            formData.append("resume", resume);

            await applyForJob(formData);
            router.push("/careers/success");
        } catch (error) {
            console.error(error);
            setSubmitError(
                error?.response?.data?.message || "Application submission failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    const renderField = (f) => (
        <Field key={f.name} label={`${f.label}${f.required ? " *" : ""}`} error={errors[f.name]} span2={f.span2}>
            <input
                type={f.type || "text"}
                name={f.name}
                min={f.min}
                value={form[f.name]}
                onChange={handleChange}
                placeholder={f.label}
                className={inputClass(errors[f.name])}
            />
        </Field>
    );

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <FormSection icon={User} title="Personal details" subtitle="How we'll reach you">
                {PERSONAL_FIELDS.map(renderField)}
            </FormSection>

            <FormSection icon={Briefcase} title="Professional details" subtitle="Your current role and expectations">
                {PROFESSIONAL_FIELDS.map(renderField)}
            </FormSection>

            <FormSection icon={LinkIcon} title="Links & cover letter" subtitle="Optional, but helps your application stand out">
                {LINK_FIELDS.map(renderField)}
                <Field label="Cover letter" span2>
                    <textarea
                        rows={6}
                        name="coverLetter"
                        value={form.coverLetter}
                        onChange={handleChange}
                        placeholder="Tell us why you're a great fit for this role"
                        className={inputClass(false)}
                    />
                </Field>
            </FormSection>

            <FormSection icon={FileText} title="Resume" subtitle="PDF, DOC, or DOCX — max 5MB">
                <Field error={errors.resume} span2>
                    <label
                        htmlFor="resume-upload"
                        className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-8 text-center transition hover:border-indigo-400 hover:bg-indigo-50/40 ${
                            errors.resume ? "border-red-400" : "border-gray-300"
                        }`}
                    >
                        <UploadCloud size={22} className="text-gray-400" />
                        <span className="text-sm font-medium text-gray-700">
                            {resume ? resume.name : "Click to upload your resume"}
                        </span>
                        <span className="text-xs text-gray-400">PDF, DOC, or DOCX up to {MAX_RESUME_MB}MB</span>
                        <input
                            id="resume-upload"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleResumeChange}
                            className="hidden"
                        />
                    </label>
                </Field>
            </FormSection>

            {submitError && (
                <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{submitError}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading ? "Submitting..." : "Submit application"}
            </button>
        </form>
    );
}