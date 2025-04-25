"use client"
import axios from "axios";
import { FileText, Loader, Pen, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const dynamic = 'force-dynamic'

type File = {
    _id: string,
    name: string,
    imageUrl: string,
}

type FilesStore = {
    Files: File[]
}


function ListBooks({ Files }: FilesStore) {
    const router = useRouter();
    const [deleteKey, setDeleteKey] = useState("");
    const onDelete = async (e: any, id: string) => {
        try {
            setDeleteKey(id);
            e.preventDefault();
            const data = await axios.delete(`${process.env.NEXT_PUBLIC_NODE_SERVER}/file/${id}`);
            if (data.status != 204) {
                console.log('error');
                return await Promise.reject(data);
            }
            setDeleteKey("");
            router.refresh();
        } catch (err) {
            console.log('error');
            return Promise.reject(err);
        } finally {
            setDeleteKey("");
        }
    }    

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Uploaded Files</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Files.map((file) => (
                    <div
                        key={file._id}
                        className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer transition flex flex-col items-center"
                    >
                        <FileText className="text-blue-500 mb-2" />
                        <p className="text-sm truncate mb-2">{file.name}</p>
                        <div className="flex gap-2">
                            <Link
                                href={`/${file._id}`} 
                                className="text-sm text-white bg-blue-500 px-2 py-1 rounded hover:bg-blue-600 flex items-center gap-1"
                            >
                                <Pencil size={14} />
                            </Link>
                            <button
                                className="text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600 flex items-center gap-1"
                                disabled={file._id === deleteKey}
                                onClick={(e:any) => onDelete(e,file._id)}
                            >
                                {file._id !== deleteKey ? <Trash2 className="stroke-red-200"/> : <Loader className="h-6 w-6 animate-spin stroke-red-100"/>}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListBooks;