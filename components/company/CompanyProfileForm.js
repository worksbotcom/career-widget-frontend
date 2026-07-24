"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Building2, Share2, FileText } from "lucide-react";

import api from "@/lib/axios";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import CompanyLogoUpload from "./CompanyLogoUpload";

function FormSection({ icon: Icon, title, subtitle, children }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                    <Icon size={17} strokeWidth={2} />
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                    {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
                </div>
            </div>
            {children}
        </div>
    );
}

export default function CompanyProfileForm({ company: initialCompany = {}, onProfileLoaded }) {
    const { register, handleSubmit, reset } = useForm();

    const [company, setCompany] = useState(initialCompany);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (Object.keys(initialCompany).length) {
            setCompany(initialCompany);
            reset(initialCompany);
            return;
        }

        loadProfile();
    }, [initialCompany, reset]);

    const loadProfile = async () => {
        try {
            const res = await api.get("/company/profile");
            const profile = res.data.data;

            setCompany(profile);
            reset(profile);

            if (typeof onProfileLoaded === "function") {
                onProfileLoaded(profile);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setError("");
            setSuccess("");

            const res = await api.put("/company/profile", data);
            setSuccess(res.data.message);
            loadProfile();
        } catch (err) {
            setError(err.response?.data?.message || "Update failed");
        }

        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <CompanyLogoUpload logo={company.logo} onUploaded={loadProfile} />

            {success && <Alert type="success" message={success} />}
            {error && <Alert type="error" message={error} />}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <FormSection
                    icon={Building2}
                    title="Company details"
                    subtitle="Basic information candidates will see"
                >
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <Input label="Company Name" {...register("companyName")} />
                        <Input label="Website" {...register("website")} />
                        <Input label="Industry" {...register("industry")} />
                        <Input label="Company Size" {...register("companySize")} />
                        <Input label="Headquarters" {...register("headquarters")} />
                        <Input label="Contact Email" {...register("email")} />
                    </div>
                </FormSection>

                <FormSection
                    icon={Share2}
                    title="Social links"
                    subtitle="Help candidates learn more about you"
                >
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <Input label="LinkedIn" {...register("linkedin")} />
                        <Input label="Facebook" {...register("facebook")} />
                        <Input label="Twitter" {...register("twitter")} />
                    </div>
                </FormSection>

                <FormSection icon={FileText} title="Description" subtitle="Tell candidates about your company">
                    <textarea
                        rows={5}
                        placeholder="What makes your company a great place to work?"
                        className="w-full rounded-lg border border-gray-300 p-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        {...register("description")}
                    />
                </FormSection>

                <Button type="submit" loading={loading}>
                    Save Changes
                </Button>
            </form>
        </div>
    );
}