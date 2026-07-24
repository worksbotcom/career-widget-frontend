export default function DashboardHeader() {

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if (hour < 12) greeting = "Good Morning";
    else if (hour < 17) greeting = "Good Afternoon";

    return (

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

                <h1 className="text-3xl font-bold">

                    {greeting}, Admin 👋

                </h1>

                <p className="text-gray-500 mt-1">

                    Welcome to Career Widget Admin Dashboard

                </p>

            </div>

            <div className="rounded-xl bg-white border px-5 py-3 shadow-sm">

                <p className="text-sm text-gray-500">

                    Today's Date

                </p>

                <h3 className="font-semibold">

                    {new Date().toDateString()}

                </h3>

            </div>

        </div>

    );

}