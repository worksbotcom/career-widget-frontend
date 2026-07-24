"use client";

import { useEffect, useState } from "react";
import { Save, Building2 } from "lucide-react";

import api from "@/lib/axios";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Alert from "../ui/Alert";

function SectionHeader({ icon: Icon, title }) {
    return (
        <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                <Icon size={17} strokeWidth={2} />
            </div>
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        </div>
    );
}

export default function SettingsForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        companyName: "",
        website: "",
        email: "",
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await api.get("/company/profile");
            const company = res.data.data;
            setForm({
                companyName: company.companyName || "",
                website: company.website || "",
                email: company.email || "",
            });
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const res = await api.put("/company/profile", form);
            setMessage(res.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to update profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {message && <Alert type="success" message={message} />}
            {error && <Alert type="error" message={error} />}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionHeader icon={Building2} title="Company Information" />

                <div className="grid gap-5 md:grid-cols-2">
                    <Input
                        label="Company Name"
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                    />

                    <Input
                        label="Website"
                        name="website"
                        value={form.website}
                        onChange={handleChange}
                    />

                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <Button type="submit" loading={loading}>
                        <Save size={17} className="mr-2" />
                        Save Changes
                    </Button>
                </div>
            </div>
        </form>
    );
}