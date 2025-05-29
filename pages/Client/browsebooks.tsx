import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClientSidebar from "./ClientSidebar";
import { useCartStore } from "../stores/cartStore";
import { useWishlistStore } from "../stores/wishlistStore"; // ⭐ Import wishlist store
import Image from "next/image";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImage?: string;
}

export default function BrowseBooks() {
  const { status } = useSession();
  const router = useRouter();

  const [books, setBooks] = useState<Book[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [wishlistMessage, setWishlistMessage] = useState<string | null>(null);

  const addToCart = useCartStore((state) => state.addToCart);
  const addToWishlist = useWishlistStore((state) => state.addToWishlist);
  const wishlist = useWishlistStore((state) => state.wishlist);

  // Handle auth status
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Fetch books only when authenticated
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

  const handleAddToCart = (book: Book) => {
    addToCart({
      id: book._id,
      title: book.title,
      author: book.author,
      price: book.price,
      image: book.coverImage || "",
    });

    setSuccessMessage(`✅ "${book.title}" u shtua në shportë!`);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleAddToWishlist = (book: Book) => {
    const alreadyInWishlist = wishlist.some((item) => item.id === book._id);
    if (!alreadyInWishlist) {
      addToWishlist({
        id: book._id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.coverImage || "",
      });
      setWishlistMessage(`⭐ "${book.title}" u shtua me sukses në wishlist!`);
      setTimeout(() => setWishlistMessage(null), 3000);
    }
  };

  // Show loading while auth status is loading
  if (status === "loading") return <p>Loading...</p>;

  // Don't render anything if unauthenticated (redirect handled in useEffect)
  if (status === "unauthenticated") return null;

  // Now we are sure user is authenticated, render the main UI
  return (
    <div className="flex min-h-screen bg-[#f4f6fc] text-gray-800">
      <ClientSidebar />
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-4">📚 Browse Books</h1>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded shadow">
            {successMessage}
          </div>
        )}

        {wishlistMessage && (
          <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded shadow">
            {wishlistMessage}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No books available.
            </p>
          ) : (
            books.map((book) => {
              const alreadyInWishlist = wishlist.some(
                (item) => item.id === book._id
              );

              return (
                <div
                  key={book._id}
                  className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col"
                >
                  {/* ⭐ Wishlist Button */}
                  <button
                    onClick={() => handleAddToWishlist(book)}
                    disabled={alreadyInWishlist}
                    title={
                      alreadyInWishlist
                        ? "Already in Wishlist"
                        : "Add to Wishlist"
                    }
                    className={`absolute top-2 right-2 text-xl ${
                      alreadyInWishlist
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-yellow-400 hover:scale-110 transition"
                    }`}
                  >
                    ⭐
                  </button>

                  <div className="w-full aspect-[3/4] bg-white rounded-t-lg overflow-hidden flex items-center justify-center">
                   <Image
  src={book.coverImage || "/fallback.jpg"}
  alt={book.title}
  width={300}
  height={400}
  className="object-cover w-full h-full"
/>

                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="text-base font-semibold text-gray-800 truncate">
                        {book.title}
                      </h2>
                      <p className="text-sm text-gray-500">👤 {book.author}</p>
                      <p className="text-sm text-gray-700 font-semibold mt-1">
                        💶 € {book.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(book)}
                      className="mt-4 bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
