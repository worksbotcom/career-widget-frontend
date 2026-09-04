"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

import { adminLogin } from "@/services/admin.service";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await adminLogin({
                email,
                password
            });

            const token = res.data?.data?.token;

            if (!token) {
                throw new Error("Invalid login response");
            }

            Cookies.set("adminToken", token, {
                expires: 1,
                path: "/"
            });

            localStorage.setItem("adminToken", token);

            router.push("/admin/dashboard");
        } catch (err) {
            alert(
                err.response?.data?.message ||
                err.message ||
                "Login Failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={submit}
                className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
            >
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Super Admin Login
                </h1>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 mb-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-lg px-4 py-3 mb-6"
                />

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white rounded-lg py-3"
                    disabled={loading}
                >
                    {loading ? "Signing In..." : "Login"}
                </button>
            </form>
        </div>
    );
}