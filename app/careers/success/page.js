"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function ApplicationSuccessPage() {

    return (

        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">

            <div className="w-full max-w-xl rounded-2xl bg-white p-10 text-center shadow-lg">

                <CheckCircle2

                    size={80}

                    className="mx-auto text-green-600"

                />

                <h1 className="mt-6 text-4xl font-bold">

                    Application Submitted!

                </h1>

                <p className="mt-4 text-gray-600">

                    Thank you for applying.

                    <br />

                    Your application has been received successfully.

                </p>

                <p className="mt-2 text-gray-500">

                    If your profile matches our requirements,
                    our recruitment team will contact you.

                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

                    {/* <Link

                        href="/careers"

                        className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"

                    >

                        Browse More Jobs

                    </Link> */}

                    <Link

                        href="/"

                        className="rounded-lg border border-gray-300 px-6 py-3 font-medium hover:bg-gray-100"

                    >

                        Back to Home

                    </Link>

                </div>

            </div>

        </div>

    );

}