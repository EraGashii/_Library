import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImage?: string;
}

export default function BrowseBooks() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const name = session?.user?.name || "User";

  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchBooks();
    }
  }, [status]);

  const fetchBooks = async () => {
    try {
      const res = await fetch("/api/services/book");
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-[#f4f6fc] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col py-6 px-4">
        <Link href="/Client"><h2 className="text-2xl font-bold mb-8 cursor-pointer hover:text-yellow-300 transition">📚 Bookstore </h2></Link>
        <nav className="flex flex-col gap-4">
          <Link href="/Client/browsebooks" className="hover:bg-gray-800 px-4 py-2 rounded">📚 Browse Books</Link>
          <a className="hover:bg-gray-800 px-4 py-2 rounded">🔖 My Wishlist</a>
          <a className="hover:bg-gray-800 px-4 py-2 rounded">🛒 My Shopping List</a>
          <Link href="/Client/profile" className="hover:bg-gray-800 px-4 py-2 rounded">👤 My Profile</Link>

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

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">📚 Browse Books</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">No books available.</p>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col"
              >
<div className="w-full aspect-[3/4] bg-white rounded-t-lg overflow-hidden flex items-center justify-center">
  <img
    src={book.coverImage}
    alt={book.title}
    className="max-w-full max-h-full object-contain"
  />
</div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-gray-800 truncate">{book.title}</h2>
                    <p className="text-sm text-gray-500">👤 {book.author}</p>
                    <p className="text-sm text-gray-700 font-semibold mt-1">💶 € {book.price.toFixed(2)}</p>
                  </div>
                  <button className="mt-4 bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
