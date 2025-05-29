import Link from "next/link";
import { signOut } from "next-auth/react";

interface AdminSidebarProps {
  name: string;
}

export default function AdminSidebar({ name }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col py-6 px-4 min-h-screen">
      <h2 className="text-2xl font-bold mb-8">📚 Admin Panel</h2>
      <nav className="flex flex-col gap-4">
        <Link href="/admin" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">
          🏠 Dashboard
        </Link>
        <Link
          href="/admin/users"
          className="hover:bg-[#1f2a6d] px-4 py-2 rounded"
        >
          👥 Përdoruesit
        </Link>
        <Link
          href="/admin/books"
          className="hover:bg-[#1f2a6d] px-4 py-2 rounded"
        >
          📘 Book Register
        </Link>
        <Link
          href="/admin/blogs"
          className="hover:bg-[#1f2a6d] px-4 py-2 rounded"
        >
          📝 Blogs
        </Link>
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-auto bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2"
      >
        <span className="rounded-full bg-gray-800 w-6 h-6 flex items-center justify-center text-xs font-bold">
           {name?.charAt(0)?.toUpperCase() || "A"}
        </span>
        Logout
      </button>
    </aside>
  );
}
