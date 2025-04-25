import ListBooks from "@/components/ListBooks";
import NewBook from "@/components/NewBook";
import axios from "axios";
import { FileText, Plus } from "lucide-react";
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

  /*
  return (
    <main className="flex justify-center items-center flex-col gap-10 p-5 text-xl">
      <div className="w-full">
        <h2 className="text-5xl text-center">Book Store</h2>
        <div className="flex justify-end pr-16">
          <Link 
            href="/?add=true" 
            className="px-4 py-2 place-items-end bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
            Add New Book
          </Link>
        </div>
      </div>
      {model && <NewBook/>}
      <ListBooks Books={data.data}/>
    </main>
  );

  */

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
        <h2 className="text-lg font-semibold mb-4">Uploaded Files</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer transition"
            >
              <FileText className="text-blue-500 mb-2" />
              <p className="text-sm truncate">File_{i + 1}.docx</p>
            </div>
          ))}
        </div>
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
