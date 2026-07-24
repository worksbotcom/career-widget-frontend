import { Inbox } from "lucide-react";

export default function EmptyState({

    title,

    subtitle

}) {

    return (

        <div className="flex flex-col items-center justify-center py-16">

            <Inbox size={70}/>

            <h2 className="mt-4 text-xl font-semibold">

                {title}

            </h2>

            <p className="text-gray-500">

                {subtitle}

            </p>

        </div>

    );

}