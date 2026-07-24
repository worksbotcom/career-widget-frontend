"use client";

import { useRouter } from "next/navigation";

import LocationForm from "@/components/locations/LocationForm";
import { createLocation } from "@/services/location.service";

export default function CreateLocationPage() {

    const router = useRouter();

    const handleCreate = async (data) => {

        try {

            await createLocation(data);

            router.push("/company/locations");

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="max-w-4xl">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Create Location

                </h1>

                <p className="text-gray-500 mt-2">

                    Add a new office or work location.

                </p>

            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">

                <LocationForm

                    onSubmit={handleCreate}

                    submitText="Create Location"

                />

            </div>

        </div>

    );

}