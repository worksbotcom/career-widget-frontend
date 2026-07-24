"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";

export default function ProtectedRoute({ children }) {

    const { user, loading } = useAuth();

    const router = useRouter();

    useEffect(() => {

        if (!loading && !user) {

            return;

        }

    }, [user, loading, router]);

    if (loading) {

        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );

    }

    if (!user) {

        return (
            <div className="flex min-h-screen items-center justify-center">
                <p className="text-gray-600">Please sign in to continue.</p>
            </div>
        );

    }

    return children;

}