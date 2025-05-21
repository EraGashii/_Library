import { Blog } from "api/models/Blog";
import useFetch from "hooks/useFetch";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function UpdateBlog() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session, status } = useSession();
  const name = session?.user?.name || "Admin";
  const [newBlog, setNewBlog] = useState({ title: "", body: "" });
  const { data: existingBlog, loading, put } = useFetch<Blog>(`/api/blogs/${id}`);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status]);

  useEffect(() => {
    if (existingBlog) {
      setNewBlog({
        title: existingBlog.title,
        body: existingBlog.body,
      });
    }
  }, [existingBlog]);

  const handleUpdate = async () => {
    if (!newBlog.title || !newBlog.body || !id) return;
    await put(newBlog);
    router.push("/admin/blogs");
  };

  if (status === "loading" || loading) return <p className="text-center mt-10">Duke u ngarkuar...</p>;

  return (
    <div className="flex min-h-screen bg-[#f4f6fc] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col py-6 px-4">
        <h2 className="text-2xl font-bold mb-8">📚 Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <a href="/admin" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">🏠 Dashboard</a>
          <a href="/admin/users" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">👥 Përdoruesit</a>
          <a href="/admin/books" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">📘 Book Register</a>
          <a href="/admin/blogs" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">📝 Blogs</a>
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-auto bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2"
        >
          <span className="rounded-full bg-gray-800 w-6 h-6 flex items-center justify-center text-xs font-bold">
            {name.charAt(0)}
          </span>
          Çkyçu
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-black text-2xl font-semibold mb-4">
            Përditëso Blogun
          </h2>
          <input
            type="text"
            placeholder="Titulli"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <textarea
            placeholder="Përmbajtja"
            value={newBlog.body}
            onChange={(e) => setNewBlog({ ...newBlog, body: e.target.value })}
            className="w-full px-4 py-2 mb-4 border rounded placeholder-gray-400 text-black"
          />
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Përditëso Blogun
          </button>
        </div>
      </main>
    </div>
  );
}
