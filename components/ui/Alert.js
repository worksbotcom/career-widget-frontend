import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    Info
} from "lucide-react";

export default function Alert({

    type = "success",
    message

}) {

    if (!message) return null;

    const variants = {

        success: {
            icon: <CheckCircle size={20} />,
            className:
                "bg-green-50 border-green-300 text-green-700"
        },

        error: {
            icon: <XCircle size={20} />,
            className:
                "bg-red-50 border-red-300 text-red-700"
        },

        warning: {
            icon: <AlertTriangle size={20} />,
            className:
                "bg-yellow-50 border-yellow-300 text-yellow-700"
        },

        info: {
            icon: <Info size={20} />,
            className:
                "bg-blue-50 border-blue-300 text-blue-700"
        }

    };

    const current = variants[type];

    return (

        <div
            className={`flex items-start gap-3 rounded-lg border p-4 ${current.className}`}
        >

            <div>

                {current.icon}

            </div>

            <p className="text-sm">

                {message}

            </p>

        </div>

    );

}