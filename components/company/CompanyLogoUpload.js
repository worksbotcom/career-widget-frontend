"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageUp, Upload } from "lucide-react";

import api from "@/lib/axios";
import Button from "../ui/Button";
import Alert from "../ui/Alert";

export default function CompanyLogoUpload({ logo, onUploaded }) {
    const inputRef = useRef();

    const [preview, setPreview] = useState(logo || "/company-placeholder.png");
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (file) return;
        setPreview(logo || "/company-placeholder.png");
    }, [file, logo]);

    // Revoke the object URL once it's no longer needed, to avoid leaking memory.
    useEffect(() => {
        return () => {
            if (file) URL.revokeObjectURL(preview);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    const handleChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        setError("");
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };

    const uploadLogo = async () => {
        if (!file) return;

        try {
            setLoading(true);
            setError("");

            const formData = new FormData();
            formData.append("logo", file);

            const res = await api.put("/company/logo", formData);

            setFile(null);
            onUploaded(res.data.logo);
        } catch (err) {
            setError(err?.response?.data?.message || "Logo upload failed.");
        }

        setLoading(false);
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-900 text-white">
                    <ImageUp size={17} strokeWidth={2} />
                </div>
                <div>
                    <h3 className="text-base font-semibold text-gray-900">Company Logo</h3>
                    <p className="text-sm text-gray-500">Shown on your job listings and profile</p>
                </div>
            </div>

            {error && <Alert type="error" message={error} />}

            <div className="flex flex-col items-center">
                <div className="relative h-[130px] w-[130px] overflow-hidden rounded-full border border-gray-200">
                    <Image src={preview} alt="Company logo" fill className="object-cover" />
                </div>

                <input ref={inputRef} type="file" hidden accept="image/*" onChange={handleChange} />

                <button
                    type="button"
                    onClick={() => inputRef.current.click()}
                    className="mt-4 flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700"
                >
                    <Upload size={15} />
                    Choose Logo
                </button>

                {file && <p className="mt-1 text-xs text-gray-500">{file.name}</p>}

                <div className="mt-5 w-full">
                    <Button onClick={uploadLogo} loading={loading} disabled={!file}>
                        Upload Logo
                    </Button>
                </div>
            </div>
        </div>
    );
}