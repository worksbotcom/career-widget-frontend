export default function StatusBadge({ verified }) {

    return (

        <span

            className={`rounded-full px-3 py-1 text-xs font-semibold

            ${verified

                ? "bg-green-100 text-green-700"

                : "bg-red-100 text-red-700"

            }`}

        >

            {verified ? "Verified" : "Pending"}

        </span>

    );

}