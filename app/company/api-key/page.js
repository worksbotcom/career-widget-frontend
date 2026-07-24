import ApiKeyCard from "@/components/company/ApiKeyCard";

export default function ApiKeyPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">API Key</h1>
                <p className="text-gray-500">Manage your API key used by the Career Widget.</p>
            </div>

            <ApiKeyCard />
        </div>
    );
}