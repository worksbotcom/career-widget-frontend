"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import LocationTable from "@/components/locations/LocationTable";
import { getLocations, deleteLocation } from "@/services/location.service";

export default function LocationsPage() {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchLocations = async () => {
        try {
            const res = await getLocations();
            setLocations(res.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLocations();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this location?");

        if (!confirmDelete) return;

        try {
            await deleteLocation(id);
            fetchLocations();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to delete location.");
        }
    };

    if (loading) {
        return <div className="p-8 text-gray-500">Loading...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
                    <p className="text-gray-500">Manage your company locations</p>
                </div>

                <Link
                    href="/company/locations/create"
                    className="rounded-lg bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
                >
                    + New Location
                </Link>
            </div>

            <LocationTable locations={locations} onDelete={handleDelete} />
        </div>
    );
}