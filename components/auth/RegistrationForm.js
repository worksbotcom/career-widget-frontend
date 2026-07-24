"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import api from "@/lib/axios";

import Input from "../ui/Input";
import PasswordInput from "../ui/PasswordInput";
import Button from "../ui/Button";
import Alert from "../ui/Alert";

export default function RegisterForm() {

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const {

        register,

        handleSubmit,

        formState: {

            errors

        }

    } = useForm();

    const onSubmit = async (data) => {
    console.log("Submitting:", data);

    try {
        setLoading(true);
        setErrorMessage("");

        const res = await api.post("/auth/register", data);

        console.log("Success:", res.data);

        if (typeof window !== "undefined") {
            window.localStorage.setItem("pendingVerificationEmail", data.email);
        }

        setMessage(res.data.message);

        setTimeout(() => {
            router.push("/auth/verify-sent");
        }, 2000);

    } catch (error) {

        console.error("Registration error:", error);

        setErrorMessage(
            error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            "Registration Failed"
        );

    } finally {
        setLoading(false);
    }
};

    return (

        <form

            onSubmit={handleSubmit(onSubmit)}

            className="space-y-5"

        >

            <Alert

                type="success"

                message={message}

            />

            <Alert

                type="error"

                message={errorMessage}

            />

            <Input

                label="Company Name"

                placeholder="Tech Solutions"

                {...register("companyName", {

                    required: "Company name is required"

                })}

                error={errors.companyName?.message}

            />

            <Input

                label="Website"

                placeholder="https://company.com"

                {...register("website")}

            />

            <Input

                label="Email"

                type="email"

                placeholder="admin@company.com"

                {...register("email", {

                    required: "Email is required"

                })}

                error={errors.email?.message}

            />

            <PasswordInput

                label="Password"

                placeholder="********"

                {...register("password", {

                    required: "Password is required",

                    minLength: {

                        value: 8,

                        message: "Minimum 8 characters"

                    }

                })}

                error={errors.password?.message}

            />

            <Button

                loading={loading}

                type="submit"

            >

                Register Company

            </Button>

            <div className="text-center text-sm text-gray-600">

            Already have an account?

            <a

                href="/login"

                className="ml-1 font-semibold text-indigo-600 hover:underline"

            >

                Login

            </a>

        </div>

        </form>

    );

}