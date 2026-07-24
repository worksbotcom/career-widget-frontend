import StatusBadge from "./StatusBadge";

export default function AuditRow({ log }) {

    return (

        <tr className="border-b hover:bg-gray-50">

            <td className="px-4 py-4">

                {new Date(log.createdAt).toLocaleString()}

            </td>

            <td className="px-4 py-4">

                {log.module}

            </td>

            <td className="px-4 py-4">

                {log.action}

            </td>

            <td className="px-4 py-4">

                {log.description}

            </td>

            <td className="px-4 py-4">

                {log.ipAddress}

            </td>

            <td className="px-4 py-4">

                {log.browser}

            </td>

            <td className="px-4 py-4">

                <StatusBadge status={log.status} />

            </td>

        </tr>

    );

}