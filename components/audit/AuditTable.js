import AuditRow from "./AuditRow";

export default function AuditTable({ logs }) {

    return (

        <div className="overflow-auto rounded-xl bg-white shadow">

            <table className="min-w-full">

                <thead className="bg-gray-100">

                    <tr>

                        <th className="px-4 py-4 text-left">Date</th>

                        <th className="px-4 py-4 text-left">Module</th>

                        <th className="px-4 py-4 text-left">Action</th>

                        <th className="px-4 py-4 text-left">Description</th>

                        <th className="px-4 py-4 text-left">IP</th>

                        <th className="px-4 py-4 text-left">Browser</th>

                        <th className="px-4 py-4 text-left">Status</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        logs.map(log=>(

                            <AuditRow

                                key={log._id}

                                log={log}

                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}