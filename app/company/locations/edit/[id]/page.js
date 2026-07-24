"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import LocationForm from "@/components/locations/LocationForm";

import {
    getLocation,
    updateLocation
} from "@/services/location.service";

export default function EditLocationPage() {

    const router = useRouter();

    const params = useParams();

    const { id } = params;

    const [location, setLocation] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchLocation();

    }, []);

    const fetchLocation = async () => {

        try {

            const res = await getLocation(id);

            setLocation(res.data.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleUpdate = async (data) => {

        try {

            await updateLocation(id, data);

            router.push("/company/locations");

        } catch (error) {

            console.error(error);

        }

    };

    if (loading) {

        return (

            <div className="p-8">

                Loading...

            </div>

        );

    }

    if (!location) {

        return (

            <div className="p-8">

                Location not found.

            </div>

        );

    }

    return (

        <div className="max-w-4xl">

            <div className="mb-8">

                <h1 className="text-3xl font-bold">

                    Edit Location

                </h1>

                <p className="mt-2 text-gray-500">

                    Update location details.

                </p>

            </div>

            <div className="rounded-xl border bg-white p-6 shadow-sm">

                <LocationForm

                    initialData={location}

                    onSubmit={handleUpdate}

                    submitText="Update Location"

                />

            </div>

        </div>

    );

}