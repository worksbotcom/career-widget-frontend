"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";

import JobCard from "@/components/careers/JobCard";
import JobFilters from "@/components/careers/JobFilters";

import { getPublishedJobs } from "@/services/widget.service";
import { getDepartments } from "@/services/department.service";
import { getLocations } from "@/services/location.service";

export default function CareersPage() {

    const { companyId } = useParams();

    const [jobs, setJobs] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        search: "",
        department: "",
        location: "",
        employmentType: "",
        workMode: ""
    });

    useEffect(() => {

        if (companyId) {

            fetchData();

        }

    }, [companyId]);

    const fetchData = async () => {

        try {

            const jobsRes = await getPublishedJobs(companyId);

            setJobs(jobsRes.data.data);

            // Optional if these APIs are public
            try {

                const departmentRes = await getDepartments();
                setDepartments(departmentRes.data.data);

            } catch {}

            try {

                const locationRes = await getLocations();
                setLocations(locationRes.data.data);

            } catch {}

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    };

    const filteredJobs = useMemo(() => {

        return jobs.filter((job) => {

            const matchesSearch =
                !filters.search ||
                job.title.toLowerCase().includes(filters.search.toLowerCase());

            const matchesDepartment =
                !filters.department ||
                job.departmentId?._id === filters.department;

            const matchesLocation =
                !filters.location ||
                job.locationId?._id === filters.location;

            const matchesEmploymentType =
                !filters.employmentType ||
                job.employmentType === filters.employmentType;

            return (
                matchesSearch &&
                matchesDepartment &&
                matchesLocation &&
                matchesEmploymentType
            );

        });

    }, [jobs, filters]);

    if (loading) {

        return (
            <div className="flex h-screen items-center justify-center">
                Loading Jobs...
            </div>
        );

    }

    return (

        <div className="mx-auto max-w-7xl px-6 py-10">

            <div className="mb-10 text-center">

                <h1 className="text-4xl font-bold">
                    Careers
                </h1>

                <p className="mt-3 text-gray-500">
                    Find your next opportunity.
                </p>

            </div>

            <JobFilters
                filters={filters}
                departments={departments}
                locations={locations}
                onChange={setFilters}
            />

            {
                filteredJobs.length === 0 ?

                    <div className="rounded-xl border bg-white py-16 text-center">
                        <h2 className="text-2xl font-semibold">
                            No Jobs Found
                        </h2>
                    </div>

                    :

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {
                            filteredJobs.map(job => (

                                <JobCard
                                    key={job._id}
                                    job={job}
                                />

                            ))
                        }

                    </div>
            }

        </div>

    );

}