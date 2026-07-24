"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

export default function LocationForm({ initialData = {}, onSubmit, submitText = "Save Location" }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: initialData.name || "",
            city: initialData.city || "",
            state: initialData.state || "",
            country: initialData.country || "",
            type: initialData.type || "Onsite",
        },
    });

    const submitHandler = async (data) => {
        try {
            setLoading(true);
            setErrorMessage("");
            await onSubmit(data);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-5">
            <Alert type="error" message={errorMessage} />

            <Input
                label="Location Name"
                placeholder="Head Office"
                {...register("name", { required: "Location name is required" })}
                error={errors.name?.message}
            />

            <Input
                label="City"
                placeholder="Hyderabad"
                {...register("city", { required: "City is required" })}
                error={errors.city?.message}
            />

            <Input
                label="State"
                placeholder="Telangana"
                {...register("state", { required: "State is required" })}
                error={errors.state?.message}
            />

            <Input
                label="Country"
                placeholder="India"
                {...register("country", { required: "Country is required" })}
                error={errors.country?.message}
            />

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Location Type
                </label>
                <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                    {...register("type")}
                >
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
            </div>

            <Button type="submit" loading={loading}>
                {submitText}
            </Button>
        </form>
    );
}