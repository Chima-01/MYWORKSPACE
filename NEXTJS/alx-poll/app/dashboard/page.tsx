import { getUser }  from "@/features/auth/authentication";
import DashboardCard from "@/components/utility/dashboardCard";
import { FaPoll, FaClipboard } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import Link from "next/link";


export default async function DashboardPage() {
  const user = await getUser();
  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <h1 className="text-xl font-bold text-blue-500 md:text-3xl">
        Welcome to your Dashboard, {user?.user_metadata?.full_name || user?.user_metadata?.firstname}!
      </h1>

      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mx-auto md:mt-20 mt-10">
        <Link href="/dashboard/create-poll">
          <DashboardCard cardName="Create Poll" cardIcon={CiSquarePlus} cardDescription="Create a new poll to gather feedback."/>
        </Link>
        <Link href="/dashboard/polls">
          <DashboardCard cardName="View Polls" cardIcon={FaPoll} cardDescription="See all your existing polls and their results.."/>
        </Link>
        <Link href="/dashboard/create-survey">
          <DashboardCard cardName="Create Survey" cardIcon={CiSquarePlus} cardDescription="Create a new survey to collect detailed responses."/>
        </Link>
        <Link href="/dashboard/surveys">
          <DashboardCard cardName="View Surveys" cardIcon={FaClipboard} cardDescription="View all existing and currently running Surveys."/>
        </Link>
      </div>
    </main>
  );
}
