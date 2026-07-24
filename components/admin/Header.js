"use client";

export default function Header(){

    return(

        <header className="h-16 bg-white border-b px-8 flex items-center justify-between">

            <div>

                <h2 className="text-2xl font-bold">

                    Super Admin Dashboard

                </h2>

            </div>

            <div>

                <span className="text-gray-600">

                    Administrator

                </span>

            </div>

        </header>

    );

}