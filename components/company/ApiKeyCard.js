"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Copy, RefreshCcw, KeyRound } from "lucide-react";

import api from "@/lib/axios";
import { regenerateApiKey as regenerateCompanyApiKey } from "@/services/company.service";

import Button from "../ui/Button";
import Alert from "../ui/Alert";

export default function ApiKeyCard() {
    const [apiKey, setApiKey] = useState("");
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const res = await api.get("/company/profile");
            setApiKey(res.data.data.apiKey);
        } catch (err) {
            console.log(err);
        }
    };

    const copyKey = async () => {
        if (!apiKey) return;

        await navigator.clipboard.writeText(apiKey);
        setMessage("API Key copied.");
        setTimeout(() => setMessage(""), 2000);
    };

    const regenerateKey = async () => {
        const confirmed = window.confirm("Regenerate API Key? Old key will stop working.");
        if (!confirmed) return;

        try {
            setLoading(true);
            setError("");
            setMessage("");

            const res = await regenerateCompanyApiKey();
            setApiKey(res.data.data.apiKey);
            setMessage(res.data.message);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to regenerate.");
        }

        setLoading(false);
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            {message && <Alert type="success" message={message} />}
            {error && <Alert type="error" message={error} />}

            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                    <KeyRound size={17} strokeWidth={2} />
                </div>
                <h2 className="text-base font-semibold text-gray-900">Current API Key</h2>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
                <p className="break-all font-mono text-sm text-gray-900">
                    {apiKey ? (show ? apiKey : "•".repeat(apiKey.length || 32)) : "No API key generated yet."}
                </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
                <button
                    onClick={() => setShow(!show)}
                    disabled={!apiKey}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {show ? <EyeOff size={17} /> : <Eye size={17} />}
                    {show ? "Hide" : "Show"}
                </button>

                <button
                    onClick={copyKey}
                    disabled={!apiKey}
                    className="flex items-center gap-2 rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Copy size={17} />
                    Copy
                </button>

                <Button onClick={regenerateKey} loading={loading}>
                    <RefreshCcw size={17} className="mr-2" />
                    Regenerate
                </Button>
            </div>

            <div className="mt-6 rounded-lg border border-yellow-200 bg-yellow-50 p-5">
                <h3 className="text-sm font-semibold text-gray-900">Important</h3>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-600">
                    <li>Keep your API Key secure.</li>
                    <li>Never expose it publicly.</li>
                    <li>Regenerating invalidates the previous key.</li>
                </ul>
            </div>
        </div>
    );
}