import { useEffect, useState } from "react";
import { useCartStore } from "../stores/cartStore";
import ClientSidebar from "./ClientSidebar";
import Image from "next/image";

export default function ShoppingCart() {
  const [hasMounted, setHasMounted] = useState(false);
  const { cart, removeFromCart } = useCartStore();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null; // Avoid hydration mismatch

  return (
    <div className="flex min-h-screen bg-[#f4f6fc] text-gray-800">
      {/* Sidebar */}
      <ClientSidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">🛒 Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((book) => (
              <div
                key={book.id}
                className="flex items-center justify-between bg-white shadow-md rounded p-4 hover:shadow-lg transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-20 h-28 relative">
                    <Image
                      src={book.image}
                      alt={book.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded"
                      unoptimized
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
                  onClick={() => removeFromCart(book.id)}
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
