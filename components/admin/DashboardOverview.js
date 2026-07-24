import DashboardHeader from "./DashboardHeader";
import DashboardCards from "./DashboardCards";
import QuickActions from "./QuickActions";
import RecentCompanies from "./RecentCompanies";
import RecentActivity from "./RecentActivity";

export default function DashboardOverview({

    stats,

    companies

}){

    return(

        <div className="space-y-8">

            <DashboardHeader/>

            <DashboardCards

                stats={stats}

            />

            <div className="grid lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2">

                    <RecentCompanies

                        companies={companies}

                    />

                </div>

                <RecentActivity/>

            </div>

            <QuickActions/>

        </div>

    );

}