"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const getTokenFromPath = (path) => {
    if (!path) return null;
    const parts = path.split("/").filter(Boolean);
    return parts[parts.length - 1] || null;
};

import api from "@/lib/axios";

import AuthLayout from "@/components/layout/AuthLayout";
import Button from "@/components/ui/Button";

import {
    CheckCircle,
    XCircle,
    Loader2
} from "lucide-react";

export default function VerifyPage() {

    const params = useParams();
    const router = useRouter();
    const token = params?.token || getTokenFromPath(typeof window !== "undefined" ? window.location.pathname : "");

    const [loading, setLoading] = useState(true);

    const [success, setSuccess] = useState(false);

    const [message, setMessage] = useState("");

    useEffect(() => {

        verifyEmail();

    }, []);

    const verifyEmail = async () => {

        try {

            const res = await api.get(`/auth/verify/${token}`);

            setSuccess(true);

            setMessage(res.data.message);

            setTimeout(() => {

                router.push("/auth/login");

            }, 3000);

        } catch (error) {

            setSuccess(false);

            setMessage(

                error.response?.data?.message ||

                "Verification failed."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <AuthLayout

            title="Email Verification"

            subtitle="Please wait while we verify your account."

        >

            <div className="text-center">

                {

                    loading && (

                        <>

                            <Loader2
                                className="mx-auto h-14 w-14 animate-spin text-indigo-600"
                            />

                            <p className="mt-6 text-gray-600">

                                Verifying your email...

                            </p>

                        </>

                    )

                }

                {

                    !loading && success && (

                        <>

                            <CheckCircle
                                className="mx-auto h-16 w-16 text-green-500"
                            />

                            <h2 className="mt-5 text-2xl font-bold">

                                Email Verified

                            </h2>

                            <p className="mt-3 text-gray-600">

                                {message}

                            </p>

                            <p className="mt-4 text-sm text-gray-500">

                                Redirecting to Login...

                            </p>

                        </>

                    )

                }

                {

                    !loading && !success && (

                        <>

                            <XCircle
                                className="mx-auto h-16 w-16 text-red-500"
                            />

                            <h2 className="mt-5 text-2xl font-bold">

                                Verification Failed

                            </h2>

                            <p className="mt-3 text-gray-600">

                                {message}

                            </p>

                            <div className="mt-8">

                                <Button

                                    onClick={() => router.push("/auth/login")}

                                >

                                    Go to Login

                                </Button>

                            </div>

                        </>

                    )

                }

            </div>

        </AuthLayout>

    );

}