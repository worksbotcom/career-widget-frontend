"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginCompany } from "@/services/auth.service";
import useAuth from "@/hooks/useAuth";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const response = await loginCompany(form);
            const data = response?.data?.data ?? response?.data ?? {};

            if (!data.accessToken) {
                throw new Error("Invalid login response");
            }

            login({
                token: data.accessToken,
                refreshToken: data.refreshToken,
                company: data.company || {}
            });

            router.push("/company/dashboard");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
           <form
    onSubmit={handleSubmit}
    className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
>
                <h1 className="text-2xl font-bold">Company Login</h1>

                {error && <p className="text-red-500">{error}</p>}

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full border rounded-lg px-4 py-3"
                />

                <button
                    disabled={loading}
                    className="w-full bg-red-600 text-white py-3 rounded-lg"
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
}
