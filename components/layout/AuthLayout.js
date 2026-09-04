import Image from "next/image";

export default function AuthLayout({

    title,
    subtitle,
    children

}) {

    return (

        <div className="min-h-screen bg-gray-100">

            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Left */}

                <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 p-12">

                    <div className="max-w-md text-white">
{/* 
                        <Image
                            src="/logo.png"
                            alt="Career Widget"
                            width={70}
                            height={70}
                        /> */}

                        <h1 className="mt-8 text-5xl font-bold leading-tight">

                            Career Widget

                        </h1>

                        <p className="mt-6 text-lg text-indigo-100">

                            Build your careers page,
                            manage applicants,
                            and hire better with one
                            modern recruitment platform.

                        </p>

                    </div>

                </div>

                {/* Right */}

                <div className="flex items-center justify-center p-6">

                    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

                        <h2 className="text-3xl font-bold">

                            {title}

                        </h2>

                        <p className="mt-2 text-gray-500">

                            {subtitle}

                        </p>

                        <div className="mt-8">

                            {children}

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}