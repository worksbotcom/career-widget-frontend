"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";

export default function DepartmentForm({ initialData = {}, onSubmit, submitText = "Save Department" }) {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: initialData.name || "",
            description: initialData.description || "",
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
        <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
            <Alert type="error" message={errorMessage} />

            <Input
                label="Department Name"
                placeholder="Engineering"
                {...register("name", { required: "Department name is required" })}
                error={errors.name?.message}
            />

            <Input
                label="Description"
                placeholder="Department description"
                {...register("description")}
            />

            <div className="flex gap-3">
                <Button type="submit" loading={loading}>
                    {submitText}
                </Button>
            </div>
        </form>
    );
}