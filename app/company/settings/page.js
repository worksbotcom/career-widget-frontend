import SettingsForm from "@/components/company/SettingsForm";
import ChangePasswordForm from "@/components/company/ChangePasswordForm";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                <p className="mt-2 text-gray-500">Manage your company account settings.</p>
            </div>

            <SettingsForm />
            <ChangePasswordForm />
        </div>
    );
}