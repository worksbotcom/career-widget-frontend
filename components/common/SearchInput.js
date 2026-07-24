import { Search } from "lucide-react";

export default function SearchInput({

    value,

    onChange

}) {

    return (

        <div className="relative">

            <Search className="absolute left-3 top-3"/>

            <input

                value={value}

                onChange={onChange}

                placeholder="Search..."

                className="w-full rounded-lg border py-3 pl-10"

            />

        </div>

    );

}