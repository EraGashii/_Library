import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";

export default function BrowseBooks() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const name = session?.user?.name || "User";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-[#f4f6fc] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col py-6 px-4">
        <h2 className="text-2xl font-bold mb-8">📚 Bookstore</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/Client" className="hover:bg-gray-800 px-4 py-2 rounded">🏠 Dashboard</Link>
          <Link href="/Client/browsebooks" className="hover:bg-gray-800 px-4 py-2 rounded">📚 Browse Books</Link>
          <a className="hover:bg-gray-800 px-4 py-2 rounded">❤️ My Wishlist</a>
          <a className="hover:bg-gray-800 px-4 py-2 rounded">🛒 My Shopping List</a>
          <Link href="/Client/profile" className="hover:bg-gray-800 px-4 py-2 rounded">👤 My Profile</Link>
          <a className="hover:bg-gray-800 px-4 py-2 rounded">🧾 My Orders</a>
          <a className="hover:bg-gray-800 px-4 py-2 rounded">📞 Contact Support</a>
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

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Example book card - Replace with dynamic data later */}
          {[1, 2, 3, 4, 5, 6].map((book) => (
            <div key={book} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition">
              <img
                src="/book-placeholder.jpg"
                alt="Book Cover"
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-lg font-semibold">Book Title {book}</h2>
              <p className="text-sm text-gray-600">Author Name</p>
              <p className="mt-2 text-purple-600 font-bold">$14.99</p>
              <button className="mt-3 w-full bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}