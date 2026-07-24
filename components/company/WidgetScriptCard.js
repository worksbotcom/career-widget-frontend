"use client";

import { useEffect, useState } from "react";
import { Copy, CheckCircle, Code, Monitor, Eye } from "lucide-react";

import { getWidgetScript } from "@/services/company.service";
import Button from "../ui/Button";
import Alert from "../ui/Alert";

function SectionHeader({ icon: Icon, title }) {
    return (
        <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                <Icon size={17} strokeWidth={2} />
            </div>
            <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        </div>
    );
}

export default function WidgetScriptCard() {
    const [script, setScript] = useState("");
    const [copied, setCopied] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadWidgetScript();
    }, []);

    const loadWidgetScript = async () => {
        setError("");

        try {
            const res = await getWidgetScript();
            setScript(res.data.data.script);
        } catch (err) {
            setError(err.response?.data?.message || "Unable to load widget script.");
        }
    };

    const copyScript = async () => {
        if (!script) return;

        await navigator.clipboard.writeText(script);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-6">
            {error && <Alert type="error" message={error} />}

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionHeader icon={Code} title="Widget Script" />

                <div className="overflow-auto rounded-lg bg-gray-900 p-5">
                    <pre className="whitespace-pre-wrap font-mono text-sm text-green-400">
                        {script || "Loading widget script…"}
                    </pre>
                </div>

                <div className="mt-5">
                    <Button onClick={copyScript} disabled={!script}>
                        <Copy size={17} className="mr-2" />
                        Copy Script
                    </Button>
                </div>

                {copied && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle size={17} />
                        Script copied successfully.
                    </div>
                )}
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionHeader icon={Monitor} title="Installation Guide" />

                <ol className="list-inside list-decimal space-y-3 text-sm text-gray-600">
                    <li>Open your company website.</li>
                    <li>Navigate to your Careers page.</li>
                    <li>
                        Paste the widget script before the closing{" "}
                        <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-800">
                            &lt;/body&gt;
                        </code>{" "}
                        tag.
                    </li>
                    <li>Save and publish your website.</li>
                    <li>Visit your Careers page to see the Career Widget.</li>
                </ol>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <SectionHeader icon={Eye} title="Widget Preview" />

                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                    <h3 className="text-lg font-semibold text-gray-900">Careers</h3>
                    <p className="mb-5 text-sm text-gray-500">Current Open Positions</p>

                    <div className="space-y-3">
                        <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
                            Software Engineer
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
                            UI/UX Designer
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
                            QA Engineer
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}