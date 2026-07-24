import SubscriptionCard from "@/components/company/SubscriptionCard";

export default function SubscriptionPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Subscription</h1>
                <p className="text-gray-500">Manage your current subscription plan.</p>
            </div>

            <SubscriptionCard />
        </div>
    );
}