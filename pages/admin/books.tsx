import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  stock: number;
  description?: string;
  coverImage?: string;
}

export default function AdminBooksPage() {
  const { data: session, status } = useSession();
  const [books, setBooks] = useState<Book[]>([]);
  const [form, setForm] = useState<any>({
    title: "",
    author: "",
    price: 0,
    stock: 0,
    description: "",
    coverImage: null,
  });

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const name = session?.user?.name || "Admin";

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
    if (status === "authenticated") fetchBooks();
  }, [status]);

  const fetchBooks = async () => {
    const res = await fetch("/api/services/book");
    const data = await res.json();
    setBooks(data);
  };

  const handleAddBook = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("author", form.author);
    formData.append("price", form.price.toString());
    formData.append("stock", form.stock.toString());
    formData.append("description", form.description);
    formData.append("coverImage", form.coverImage);

    await fetch("/api/services/book", {
      method: "POST",
      body: formData,
    });

    setForm({
      title: "",
      author: "",
      price: 0,
      stock: 0,
      description: "",
      coverImage: null,
    });
    fetchBooks();
  };

  const confirmDelete = (book: Book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedBook) return;
    await fetch(`/api/services/book?id=${selectedBook._id}`, { method: "DELETE" });
    setShowModal(false);
    setSelectedBook(null);
    fetchBooks();
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col py-6 px-4">
        <h2 className="text-2xl font-bold mb-8">📚 Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/admin" className="hover:bg-[#1f2a6d] px-4 py-2 rounded"> 🏠 Dashboard</Link>
          <Link href="/admin/users" className="hover:bg-[#1f2a6d] px-4 py-2 rounded"> 👥 Përdoruesit</Link>
          <Link href="/admin/books" className="hover:bg-[#1f2a6d] px-4 py-2 rounded"> 📘 Book Register</Link>
          <Link href="/admin/blogs" className="hover:bg-[#1f2a6d] px-4 py-2 rounded"> 📝 Blogs</Link>
        </nav>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-auto bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2"
        >
          <span className="rounded-full bg-gray-800 w-6 h-6 flex items-center justify-center text-xs font-bold">
            {name.charAt(0)}
          </span>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-8 flex items-center gap-2">
            📚 Book List
          </h1>

          {/* Add Book Form */}
          <form
            onSubmit={handleAddBook}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input
                  className="border p-3 rounded-lg w-full"
                  placeholder="Title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Author</label>
                <input
                  className="border p-3 rounded-lg w-full"
                  placeholder="Author"
                  value={form.author}
                  onChange={(e) => setForm({ ...form, author: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Price (€)</label>
                <input
                  className="border p-3 rounded-lg w-full"
                  type="number"
                  placeholder="Price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Stock</label>
                <input
                  className="border p-3 rounded-lg w-full"
                  type="number"
                  placeholder="Stock"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea
                  className="border p-3 rounded-lg w-full"
                  placeholder="Description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Cover Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setForm({ ...form, coverImage: e.target.files[0] });
                    }
                  }}
                  className="border p-3 rounded-lg w-full"
                />
              </div>
            </div>

            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:scale-105 transition-transform">
              Add Book
            </button>
          </form>

          {/* Book Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.length === 0 ? (
              <p className="text-center col-span-full text-gray-500">No books added yet.</p>
            ) : (
              books.map((book) => (
                <div
                  key={book._id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all border border-gray-200 flex flex-col"
                >
                  {book.coverImage ? (
                    <div className="w-full aspect-[3/4] overflow-hidden rounded-md mb-4">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 w-full bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}

                  <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
                  <p className="text-sm text-gray-600">👤 {book.author}</p>
                  <p className="text-sm text-gray-600">💰 {book.price.toFixed(2)} €</p>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-3">
                    {book.description || "No description."}
                  </p>
                  <div className="mt-auto flex justify-end gap-2 pt-4">
                    <button
                      onClick={() => confirmDelete(book)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {showModal && selectedBook && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{selectedBook.title}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
