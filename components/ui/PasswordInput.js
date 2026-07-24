"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = forwardRef(function PasswordInput(
    {
        label,
        error,
        className = "",
        ...props
    },
    ref
) {

    const [show, setShow] = useState(false);

    return (

        <div className="space-y-2">

            {label && (

                <label className="block text-sm font-medium text-gray-700">

                    {label}

                </label>

            )}

            <div className="relative">

                <input

                    ref={ref}

                    type={show ? "text" : "password"}

                    {...props}

                    className={`w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 ${className}`}

                />

                <button

                    type="button"

                    onClick={() => setShow(!show)}

                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"

                >

                    {show ? <EyeOff size={18} /> : <Eye size={18} />}

                </button>

            </div>

            {error && (

                <p className="text-sm text-red-500">

                    {error}

                </p>

            )}

        </div>

    );

});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;