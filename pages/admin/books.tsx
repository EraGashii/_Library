import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

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
          <a href="/admin" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">🏠 Dashboard</a>
          <a href="/admin/users" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">👥 Users</a>
          <a className="bg-pink-600 px-4 py-2 rounded text-white">📘 Book Register</a>
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

          {/* Book Table */}
          <div className="bg-white rounded-2xl shadow-xl p-6 overflow-auto">
            <table className="w-full table-auto text-left border">
              <thead className="bg-gradient-to-r from-blue-100 to-purple-100 text-gray-800">
                <tr>
                  <th className="p-3 border">Title</th>
                  <th className="p-3 border">Author</th>
                  <th className="p-3 border">Price</th>
                  <th className="p-3 border">Stock</th>
                  <th className="p-3 border">Description</th>
                  <th className="p-3 border">Cover</th>
                  <th className="p-3 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3 border">{book.title}</td>
                    <td className="p-3 border">{book.author}</td>
                    <td className="p-3 border">{book.price.toFixed(2)} €</td>
                    <td className="p-3 border">{book.stock}</td>
                    <td className="p-3 border max-w-xs truncate" title={book.description}>
                      {book.description || "-"}
                    </td>
                    <td className="p-3 border">
                      {book.coverImage ? (
                        <a href={book.coverImage} download target="_blank" rel="noopener noreferrer">
                          <img
                            src={book.coverImage}
                            alt={book.title}
                            className="h-12 w-12 object-cover rounded shadow-sm hover:opacity-80"
                          />
                        </a>
                      ) : (
                        "No image"
                      )}
                    </td>
                    <td className="p-3 border">
                      <button
                        onClick={() => confirmDelete(book)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {books.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-4 text-gray-500">
                      No books added yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
