"use client";

import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
    return (
        <div className="relative">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
                placeholder="Search company..."
                onChange={(e) => onSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-red-400 focus:outline-none focus:ring-2 focus:ring-red-100"
            />
        </div>
    );
}