export default function RecentActivity() {
    const activities = [
        {
            title: "New company registered",
            description: "A new company signed up and awaits verification.",
            time: "2 hours ago"
        },
        {
            title: "Subscription plan updated",
            description: "A subscription plan was updated by Admin.",
            time: "5 hours ago"
        },
        {
            title: "Company deactivated",
            description: "A company account was deactivated due to inactivity.",
            time: "1 day ago"
        }
    ];

    return (
        <div className="bg-white rounded-xl border shadow p-6">
            <h2 className="text-xl font-bold mb-5">Recent Activity</h2>
            <div className="space-y-4">
                {activities.map((activity, index) => (
                    <div key={index} className="rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{activity.title}</h3>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                        <p className="text-sm text-gray-600">{activity.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
