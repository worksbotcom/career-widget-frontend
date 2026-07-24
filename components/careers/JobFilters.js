"use client";

import { Search } from "lucide-react";

export default function JobFilters({

    filters,

    departments = [],

    locations = [],

    onChange

}) {

    const handleChange = (e) => {

        onChange({

            ...filters,

            [e.target.name]: e.target.value

        });

    };

    return (

        <div className="mb-8 rounded-xl border bg-white p-6 shadow-sm">

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">

                {/* Search */}

                <div className="relative">

                    <Search
                        size={18}
                        className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input

                        type="text"

                        name="search"

                        placeholder="Search jobs..."

                        value={filters.search}

                        onChange={handleChange}

                        className="w-full rounded-lg border py-2 pl-10 pr-3 focus:border-indigo-500 focus:outline-none"

                    />

                </div>

                {/* Department */}

                <select

                    name="department"

                    value={filters.department}

                    onChange={handleChange}

                    className="rounded-lg border p-2"

                >

                    <option value="">

                        All Departments

                    </option>

                    {

                        departments.map((department) => (

                            <option

                                key={department._id}

                                value={department._id}

                            >

                                {department.name}

                            </option>

                        ))

                    }

                </select>

                {/* Location */}

                <select

                    name="location"

                    value={filters.location}

                    onChange={handleChange}

                    className="rounded-lg border p-2"

                >

                    <option value="">

                        All Locations

                    </option>

                    {

                        locations.map((location) => (

                            <option

                                key={location._id}

                                value={location._id}

                            >

                                {location.name}

                            </option>

                        ))

                    }

                </select>

                {/* Employment Type */}

                <select

                    name="employmentType"

                    value={filters.employmentType}

                    onChange={handleChange}

                    className="rounded-lg border p-2"

                >

                    <option value="">

                        Employment Type

                    </option>

                    <option value="Full Time">

                        Full Time

                    </option>

                    <option value="Part Time">

                        Part Time

                    </option>

                    <option value="Contract">

                        Contract

                    </option>

                    <option value="Internship">

                        Internship

                    </option>

                </select>

                {/* Remote */}

                <select

                    name="workMode"

                    value={filters.workMode}

                    onChange={handleChange}

                    className="rounded-lg border p-2"

                >

                    <option value="">

                        Work Mode

                    </option>

                    <option value="On Site">

                        On Site

                    </option>

                    <option value="Hybrid">

                        Hybrid

                    </option>

                    <option value="Remote">

                        Remote

                    </option>

                </select>

            </div>

        </div>

    );

}