"use client";

import { useState } from "react";
import { KeyRound } from "lucide-react";

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

export default function ChangePasswordForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const res = await api.put("/company/change-password", form);
            setMessage(res.data.message);
            setForm({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (err) {
            setError(err.response?.data?.message || "Unable to update password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {message && <Alert type="success" message={message} />}
            {error && <Alert type="error" message={error} />}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionHeader icon={KeyRound} title="Change Password" />

                <div className="grid gap-5 md:grid-cols-2">
                    <Input
                        label="Current Password"
                        type="password"
                        name="currentPassword"
                        value={form.currentPassword}
                        onChange={handleChange}
                    />

                    <Input
                        label="New Password"
                        type="password"
                        name="newPassword"
                        value={form.newPassword}
                        onChange={handleChange}
                    />

                    <Input
                        label="Confirm Password"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-6 flex justify-end">
                    <Button type="submit" loading={loading}>
                        Update Password
                    </Button>
                </div>
            </div>
        </form>
    );
}