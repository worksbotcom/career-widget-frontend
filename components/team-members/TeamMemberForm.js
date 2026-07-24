"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Alert from "@/components/ui/Alert";

import { getDepartments } from "@/services/department.service";

export default function TeamMemberForm({

    initialData = {},

    onSubmit,

    submitText = "Save Team Member"

}) {

    const [loading, setLoading] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [departments, setDepartments] = useState([]);

    const {

        register,

        handleSubmit,

        formState: {

            errors

        }

    } = useForm({

        defaultValues: {

            name: initialData.name || "",

            email: initialData.email || "",

            role: initialData.role || "Recruiter",

            departmentId: initialData.departmentId?._id || "",

            status: initialData.status || "Active"

        }

    });

    useEffect(() => {

        loadDepartments();

    }, []);

    const loadDepartments = async () => {

        try {

            const res = await getDepartments();

            setDepartments(res.data.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const submitHandler = async (data) => {

        try {

            setLoading(true);

            setErrorMessage("");

            await onSubmit(data);

        }

        catch (error) {

            setErrorMessage(

                error.response?.data?.message ||

                "Failed to save team member."

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form

            onSubmit={handleSubmit(submitHandler)}

            className="space-y-6"

        >

            <Alert

                type="error"

                message={errorMessage}

            />

            <Input

                label="Full Name"

                placeholder="John Doe"

                {...register("name", {

                    required: "Full name is required"

                })}

                error={errors.name?.message}

            />

            <Input

                label="Email Address"

                type="email"

                placeholder="john@example.com"

                {...register("email", {

                    required: "Email is required"

                })}

                error={errors.email?.message}

            />

            <div className="grid grid-cols-2 gap-4">

                <div>

                    <label className="mb-2 block font-medium">

                        Role

                    </label>

                    <select

                        className="w-full rounded-lg border p-2"

                        {...register("role", {

                            required: true

                        })}

                    >

                        <option value="Admin">

                            Admin

                        </option>

                        <option value="Recruiter">

                            Recruiter

                        </option>

                        <option value="Hiring Manager">

                            Hiring Manager

                        </option>

                    </select>

                </div>

                <div>

                    <label className="mb-2 block font-medium">

                        Department

                    </label>

                    <select

                        className="w-full rounded-lg border p-2"

                        {...register("departmentId")}

                    >

                        <option value="">

                            Select Department

                        </option>

                        {

                            departments.map((department) => (

                                <option

                                    key={department._id}

                                    value={department._id}

                                >

                                    {department.name}

                                </option>

                            ))

                        }

                    </select>

                </div>

            </div>

            <div>

                <label className="mb-2 block font-medium">

                    Status

                </label>

                <select

                    className="w-full rounded-lg border p-2"

                    {...register("status")}

                >

                    <option value="Active">

                        Active

                    </option>

                    <option value="Inactive">

                        Inactive

                    </option>

                </select>

            </div>

            <Button

                type="submit"

                loading={loading}

            >

                {submitText}

            </Button>

        </form>

    );

}