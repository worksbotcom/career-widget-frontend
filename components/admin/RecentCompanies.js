export default function RecentCompanies({

    companies

}){

    return(

        <div className="bg-white rounded-xl border shadow p-6">

            <h2 className="text-xl font-bold mb-5">

                Recent Companies

            </h2>

            <div className="space-y-4">

                {

                    companies.map(company=>(

                        <div

                            key={company._id}

                            className="flex items-center justify-between"

                        >

                            <div>

                                <h3 className="font-semibold">

                                    {company.companyName}

                                </h3>

                                <p className="text-sm text-gray-500">

                                    {company.email}

                                </p>

                            </div>

                            <span className="text-xs rounded-full bg-green-100 text-green-700 px-3 py-1">

                                {

                                    company.isVerified

                                    ?

                                    "Verified"

                                    :

                                    "Pending"

                                }

                            </span>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}