"use client";

export default function AuditFilters({

    search,

    setSearch,

    module,

    setModule

}){

    return(

        <div className="grid gap-4 md:grid-cols-2">

            <input

                placeholder="Search..."

                value={search}

                onChange={(e)=>setSearch(e.target.value)}

                className="rounded-lg border px-4 py-3"

            />

            <select

                value={module}

                onChange={(e)=>setModule(e.target.value)}

                className="rounded-lg border px-4 py-3"

            >

                <option value="">

                    All Modules

                </option>

                <option>

                    Auth

                </option>

                <option>

                    Company

                </option>

                <option>

                    Widget

                </option>

                <option>

                    API

                </option>

                <option>

                    Subscription

                </option>

            </select>

        </div>

    );

}