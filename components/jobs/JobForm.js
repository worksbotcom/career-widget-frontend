"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Briefcase,
    MapPin,
    Wallet,
    ListChecks,
    FileText,
    Loader2
} from "lucide-react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";

import { getDepartments } from "@/services/department.service";
import { getLocations } from "@/services/location.service";

// Shared classes so <select> lines up visually with the <Input /> component.
const selectClass =
    "w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 " +
    "focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 " +
    "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400";

const textareaClass =
    "w-full rounded-lg border border-gray-300 p-3 text-sm text-gray-900 " +
    "placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900";

const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

function SectionHeader({ icon: Icon, title, subtitle }) {
    return (
        <div className="mb-5 flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                <Icon size={17} strokeWidth={2} />
            </div>
            <div>
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
            </div>
        </div>
    );
}

function Section({ children }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            {children}
        </div>
    );
}

function Field({ label, error, children, hint }) {
    return (
        <div>
            <label className={labelClass}>{label}</label>
            {children}
            {hint && !error && <p className="mt-1 text-xs text-gray-400">{hint}</p>}
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
}

export default function JobForm({

    initialData = {},

    onSubmit,

    submitText = "Save Job"

}) {

    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [departments, setDepartments] = useState([]);

    const [locations, setLocations] = useState([]);

    const [dropdownsLoading, setDropdownsLoading] = useState(true);

    const {

        register,

        handleSubmit,

        formState: {

            errors

        }

    } = useForm({

        defaultValues: {

            title: initialData.title || "",

            departmentId: initialData.departmentId?._id || "",

            locationId: initialData.locationId?._id || "",

            employmentType: initialData.employmentType || "Full-time",

            experienceLevel: initialData.experienceLevel || "Junior",

            degree: initialData.degree || "",

            ageLimit: initialData.ageLimit || "",

            gender: initialData.gender || "",

            salaryMin: initialData.salaryMin || "",

            salaryMax: initialData.salaryMax || "",

            currency: initialData.currency || "USD",

            openings: initialData.openings || 1,

            applicationDeadline: initialData.applicationDeadline
                ? initialData.applicationDeadline.substring(0, 10)
                : "",

            description: initialData.description || "",

            requirements: initialData.requirements?.join("\n") || "",

            responsibilities: initialData.responsibilities?.join("\n") || "",

            benefits: initialData.benefits?.join("\n") || "",

            skills: initialData.skills?.join("\n") || ""

        }

    });

    useEffect(() => {

        loadDropdowns();

    }, []);

    const loadDropdowns = async () => {

        try {

            setDropdownsLoading(true);

            const [depRes, locRes] = await Promise.all([

                getDepartments(),

                getLocations()

            ]);

            setDepartments(depRes.data.data);

            setLocations(locRes.data.data);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setDropdownsLoading(false);

        }

    };

    const toList = (value) => (value || "")
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean);

    const submitHandler = async (data) => {

        try {

            setLoading(true);

            setErrorMessage("");

            const payload = {
                ...data,
                requirements: toList(data.requirements),
                responsibilities: toList(data.responsibilities),
                benefits: toList(data.benefits),
                skills: toList(data.skills),
                openings: Number(data.openings) || 1
            };

            // Optional numeric fields: send a number or omit entirely.
            // Empty strings fail backend validation and Mongoose casting.
            if (data.salaryMin === "" || data.salaryMin == null) {
                delete payload.salaryMin;
            }
            else {
                payload.salaryMin = Number(data.salaryMin);
            }

            if (data.salaryMax === "" || data.salaryMax == null) {
                delete payload.salaryMax;
            }
            else {
                payload.salaryMax = Number(data.salaryMax);
            }

            // Optional date field: omit when blank.
            if (!data.applicationDeadline) {
                delete payload.applicationDeadline;
            }

            // Optional currency: omit when blank so the default applies.
            if (!data.currency?.trim()) {
                delete payload.currency;
            }

            await onSubmit(payload);

        }

        catch (error) {

            const resData = error.response?.data;

            setErrorMessage(

                resData?.message ||

                resData?.errors?.[0]?.msg ||

                "Failed to save job."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form
            onSubmit={handleSubmit(submitHandler)}
            className="mx-auto max-w-6xl space-y-6 pb-10"
        >

            {errorMessage && (
                <Alert
                    type="error"
                    message={errorMessage}
                />
            )}

            {/* Basic info */}
            <Section>

                <SectionHeader
                    icon={Briefcase}
                    title="Basic information"
                    subtitle="What the role is called and where it lives in your org"
                />

                <div className="space-y-4">

                    <Input
                        label="Job Title"
                        placeholder="Senior React Developer"
                        {...register("title", {
                            required: "Job title is required"
                        })}
                        error={errors.title?.message}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <Field label="Department" error={errors.departmentId && "Select a department"}>
                            <select
                                className={selectClass}
                                disabled={dropdownsLoading}
                                {...register("departmentId", {
                                    required: true
                                })}
                            >
                                <option value="">
                                    {dropdownsLoading ? "Loading departments…" : "Select department"}
                                </option>
                                {departments.map(dep => (
                                    <option key={dep._id} value={dep._id}>
                                        {dep.name}
                                    </option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Location" error={errors.locationId && "Select a location"}>
                            <select
                                className={selectClass}
                                disabled={dropdownsLoading}
                                {...register("locationId", {
                                    required: true
                                })}
                            >
                                <option value="">
                                    {dropdownsLoading ? "Loading locations…" : "Select location"}
                                </option>
                                {locations.map(loc => (
                                    <option key={loc._id} value={loc._id}>
                                        {loc.name}
                                    </option>
                                ))}
                            </select>
                        </Field>

                    </div>

                </div>

            </Section>

            {/* Job details */}
            <Section>

                <SectionHeader
                    icon={ListChecks}
                    title="Job details"
                    subtitle="Employment terms and candidate criteria"
                />

                <div className="space-y-4">

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <Field label="Employment Type">
                            <select
                                className={selectClass}
                                {...register("employmentType", {
                                    required: true
                                })}
                            >
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                                <option value="Temporary">Temporary</option>
                            </select>
                        </Field>

                        <Field label="Experience Level">
                            <select
                                className={selectClass}
                                {...register("experienceLevel", {
                                    required: true
                                })}
                            >
                                <option value="Fresher">Fresher</option>
                                <option value="Junior">Junior</option>
                                <option value="Mid">Mid</option>
                                <option value="Senior">Senior</option>
                                <option value="Lead">Lead</option>
                            </select>
                        </Field>

                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                        <Input
                            label="Degree"
                            placeholder="Bachelor's / Master's"
                            {...register("degree")}
                        />

                        <Input
                            label="Age Limit"
                            placeholder="e.g. 18–35"
                            {...register("ageLimit")}
                        />

                        <Field label="Gender">
                            <select
                                className={selectClass}
                                {...register("gender")}
                            >
                                <option value="">Any</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </Field>

                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <Input
                            label="Openings"
                            type="number"
                            min={1}
                            {...register("openings")}
                        />

                        <Input
                            label="Application Deadline"
                            type="date"
                            {...register("applicationDeadline")}
                        />

                    </div>

                </div>

            </Section>

            {/* Compensation */}
            <Section>

                <SectionHeader
                    icon={Wallet}
                    title="Compensation"
                    subtitle="Leave salary blank if you'd rather not disclose it"
                />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                    <Input
                        label="Minimum Salary"
                        type="number"
                        placeholder="50000"
                        {...register("salaryMin")}
                    />

                    <Input
                        label="Maximum Salary"
                        type="number"
                        placeholder="70000"
                        {...register("salaryMax")}
                    />

                    <Input
                        label="Currency"
                        placeholder="USD"
                        {...register("currency")}
                    />

                </div>

            </Section>

            {/* Description & lists */}
            <Section>

                <SectionHeader
                    icon={FileText}
                    title="Description"
                    subtitle="Tell candidates about the role and what you expect"
                />

                <div className="space-y-5">

                    <Field label="Job Description" error={errors.description?.message}>
                        <textarea
                            rows={5}
                            className={textareaClass}
                            placeholder="Summarize the role, the team, and what success looks like…"
                            {...register("description", {
                                required: "Job description is required"
                            })}
                        />
                    </Field>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                        <Field label="Requirements" hint="One requirement per line">
                            <textarea
                                rows={5}
                                className={textareaClass}
                                placeholder={"3+ years of experience\nBachelor's in Computer Science"}
                                {...register("requirements")}
                            />
                        </Field>

                        <Field label="Responsibilities" hint="One responsibility per line">
                            <textarea
                                rows={5}
                                className={textareaClass}
                                placeholder={"Own the front-end architecture\nMentor junior engineers"}
                                {...register("responsibilities")}
                            />
                        </Field>

                        <Field label="Benefits" hint="One benefit per line">
                            <textarea
                                rows={5}
                                className={textareaClass}
                                placeholder={"Health insurance\nRemote-friendly"}
                                {...register("benefits")}
                            />
                        </Field>

                        <Field label="Skills" hint="One skill per line">
                            <textarea
                                rows={5}
                                className={textareaClass}
                                placeholder={"React\nTypeScript\nNode.js"}
                                {...register("skills")}
                            />
                        </Field>

                    </div>

                </div>

            </Section>

            {/* Sticky action bar */}
            <div className="sticky bottom-0 -mx-1 flex items-center justify-end gap-3 border-t border-gray-200 bg-white/90 px-1 py-4 backdrop-blur">

                <Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    className="min-w-[140px]"
                >
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin" />
                            Saving…
                        </span>
                    ) : (
                        submitText
                    )}
                </Button>

            </div>

        </form>

    );

}
