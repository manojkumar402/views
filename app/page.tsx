import ListBooks from "@/components/ListBooks";
import NewBook from "@/components/NewBook";
import axios from "axios";
import { Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic'

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Home({ searchParams }: SearchParamProps) {
  const add = searchParams?.add;
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_NODE_SERVER}/files`);
  const model = add == "true" ? true : false

  if (data.status != "success") {
    console.error("Error Fetching apps");
    return Promise.reject(data);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-xl font-semibold">My Drive</h1>
        <input
          type="text"
          placeholder="Search in Drive"
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
        />
        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          U
        </div>
      </header>

      {/* File Grid Section */}
      <main className="flex-1 p-6 overflow-auto">
        <ListBooks Files={data.data} />
        {model && <NewBook/>}
      </main>

      {/* Floating Action Button */}
      <Link href="/?add=true" className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-4 rounded-full shadow-lg transition cursor-pointer flex items-center space-x-2">
        <Plus />
        <span className="text-white font-medium">New</span>
      </Link>

    </div>
  )
}
