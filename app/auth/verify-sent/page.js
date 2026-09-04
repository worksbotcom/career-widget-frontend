"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";

import api from "@/lib/axios";

import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";

const RESEND_COOLDOWN_SECONDS = 120;

export default function VerifySentPage() {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN_SECONDS);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedEmail = window.localStorage.getItem("pendingVerificationEmail") || "";
            setEmail(storedEmail);
        }
    }, []);

    useEffect(() => {
        if (canResend) return;

        const timer = setInterval(() => {
            setSecondsLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCanResend(true);
                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [canResend]);

    const handleResend = async (e) => {
        e.preventDefault();

        if (!email) {
            setErrorMessage("Please enter your email address.");
            return;
        }

        try {
            setLoading(true);
            setErrorMessage("");
            setMessage("");

            const res = await api.post("/auth/resend-verification", { email });

            setMessage(res.data.message);
            setCanResend(false);
            setSecondsLeft(RESEND_COOLDOWN_SECONDS);
        } catch (error) {
            setErrorMessage(
                error.response?.data?.message ||
                "Unable to resend verification email."
            );
        } finally {
            setLoading(false);
        }
    };

    return (

        <AuthLayout
            title="Check Your Email"
            subtitle="We've sent a verification link to your email address."
        >

            <div className="text-center">

                <Mail className="mx-auto h-16 w-16 text-indigo-600" />

                <p className="mt-6 text-gray-600">

                    Please open your email and click the verification link to activate your company account.

                </p>

                <form onSubmit={handleResend} className="mt-8 space-y-4 text-left">

                    <Alert
                        type="success"
                        message={message}
                    />

                    <Alert
                        type="error"
                        message={errorMessage}
                    />

                    <Input
                        label="Email Address"
                        type="email"
                        placeholder="admin@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                        <Button
                        type="submit"
                        loading={loading}
                        disabled={!canResend || loading}
                    >
                        {loading
                            ? "Sending..."
                            : canResend
                                ? "Resend Verification Email"
                                : `Resend in ${secondsLeft}s`}
                    </Button>

                </form>

                <div className="mt-8">

                    <Link href="/auth/login">

                        <Button>

                            Back to Login

                        </Button>

                    </Link>

                </div>

            </div>

        </AuthLayout>

    );

}