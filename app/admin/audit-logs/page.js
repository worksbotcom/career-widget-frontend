"use client";

import { useEffect, useState } from "react";
import { getAdminAuditLogs } from "@/services/audit.service";
import AuditFilters from "@/components/audit/AuditFilters";
import AuditTable from "@/components/audit/AuditTable";

export default function AdminAuditLogsPage() {
    const [logs, setLogs] = useState([]);
    const [search, setSearch] = useState("");
    const [module, setModule] = useState("");

    useEffect(() => {
        loadLogs();
    }, [search, module]);

    const loadLogs = async () => {
        try {
            const res = await getAdminAuditLogs({ search, module });
            setLogs(res.data.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Audit Logs</h1>
                <p className="text-gray-500">Review recent administrative activity and events.</p>
            </div>

            <AuditFilters
                search={search}
                setSearch={setSearch}
                module={module}
                setModule={setModule}
            />

            <AuditTable logs={logs} />
        </div>
    );
}
