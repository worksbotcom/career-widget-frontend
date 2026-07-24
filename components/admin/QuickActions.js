import Link from "next/link";

export default function QuickActions() {

    const actions = [

        {
            title:"Add Subscription",
            href:"/admin/subscriptions/create"
        },

        {
            title:"Manage Companies",
            href:"/admin/companies"
        },

        {
            title:"View Dashboard",
            href:"/admin/dashboard"
        }

    ];

    return (

        <div className="bg-white rounded-xl shadow border p-6">

            <h2 className="text-xl font-bold mb-5">

                Quick Actions

            </h2>

            <div className="space-y-3">

                {

                    actions.map(action=>(

                        <Link

                            key={action.href}

                            href={action.href}

                            className="block rounded-lg bg-indigo-600 text-white px-4 py-3 hover:bg-indigo-700 transition"

                        >

                            {action.title}

                        </Link>

                    ))

                }

            </div>

        </div>

    );

}