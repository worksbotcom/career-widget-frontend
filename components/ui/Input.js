import { forwardRef } from "react";

const Input = forwardRef(function Input(
    {
        label,
        error,
        className = "",
        ...props
    },
    ref
) {

    return (

        <div className="space-y-2">

            {label && (

                <label className="block text-sm font-medium text-gray-700">

                    {label}

                </label>

            )}

            <input

                ref={ref}

                {...props}

                className={`w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-red-600 focus:ring-2 focus:ring-red-200 ${className}`}

            />

            {error && (

                <p className="text-sm text-red-500">

                    {error}

                </p>

            )}

        </div>

    );

});

Input.displayName = "Input";

export default Input;