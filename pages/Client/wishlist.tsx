import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ClientSidebar from "./ClientSidebar";
import { useWishlistStore } from "../stores/wishlistStore";
import Image from "next/image";

export default function Wishlist() {
  const [hasMounted, setHasMounted] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const { wishlist, removeFromWishlist } = useWishlistStore();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (!hasMounted || status === "loading") return null;

  return (
    <div className="flex min-h-screen bg-[#f4f6fc] text-gray-800">
      <ClientSidebar />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">🔖 My Wishlist</h1>

        {wishlist.length === 0 ? (
          <p className="text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="space-y-6">
            {wishlist.map((book) => (
              <div
                key={book.id}
                className="flex items-center justify-between bg-white shadow-md rounded p-4 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-28 relative">
                    <Image
                      src={book.image ?? "/fallback.jpg"}
                      alt={book.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                    />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-gray-800">{book.title}</h2>
                    <p className="text-sm text-gray-500">👤 {book.author}</p>
                    <p className="text-sm font-semibold text-gray-700 mt-1">
                      💶 € {book.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromWishlist(book.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
