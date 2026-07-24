export default function StatusBadge({ status }) {
    const statusStyles = {
        Applied: "bg-indigo-50 text-indigo-600",
        Shortlisted: "bg-yellow-50 text-yellow-700",
        Interview: "bg-purple-50 text-purple-700",
        Offered: "bg-orange-50 text-orange-700",
        Hired: "bg-green-50 text-green-700",
        Rejected: "bg-red-50 text-red-700",
        Withdrawn: "bg-gray-100 text-gray-600",
    };

    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
                statusStyles[status] || "bg-gray-100 text-gray-600"
            }`}
        >
            {status}
        </span>
    );
}