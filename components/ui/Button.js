"use client";

export default function Button({
    children,
    type = "button",
    onClick,
    disabled = false,
    loading = false,
    variant = "primary",
    className = ""
}) {

    const variants = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
        success: "bg-green-600 hover:bg-green-700 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
        outline: "border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`w-full rounded-lg px-4 py-3 font-medium transition duration-200 disabled:opacity-50 ${variants[variant]} ${className}`}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}