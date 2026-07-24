import { TrendingUp } from "lucide-react";

export default function StatsCard({

    title,

    value,

    icon: Icon,

    color = "bg-indigo-600",

    subtitle

}) {

    return (

        <div className="rounded-xl bg-white p-6 shadow-sm border hover:shadow-md transition">

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-gray-500">

                        {title}

                    </p>

                    <h2 className="mt-2 text-3xl font-bold">

                        {value}

                    </h2>

                    {subtitle && (

                        <p className="mt-2 text-sm text-green-600 flex items-center gap-1">

                            <TrendingUp size={14}/>

                            {subtitle}

                        </p>

                    )}

                </div>

                <div className={`${color} h-14 w-14 rounded-xl flex items-center justify-center text-white`}>

                    <Icon size={26}/>

                </div>

            </div>

        </div>

    );

}