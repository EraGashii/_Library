import { useEffect, useState } from "react";
import { useCartStore } from "../../src/stores/cartStore";
import ClientSidebar from "./ClientSidebar";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Checkout() {
  const [hasMounted, setHasMounted] = useState(false);
  const { cart, clearCart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) return null;

  const totalPrice = cart.reduce((total, book) => total + book.price, 0);

  const handleConfirmOrder = () => {
    // You can add real logic here (e.g., call an API)
    alert("Porosia u konfirmua me sukses!");
    clearCart();
    router.push("/Client"); // ose faqja që do pas porosisë
  };

  return (
    <div className="flex min-h-screen bg-[#f4f6fc] text-gray-800">
      {/* Sidebar */}
      <ClientSidebar />

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">✅ Checkout</h1>

        {cart.length === 0 ? (
          <p className="text-gray-600">Nuk ka asnjë libër në shportë.</p>
        ) : (
          <div className="space-y-6">
            {cart.map((book) => (
              <div
                key={book.id}
                className="flex items-center justify-between bg-white shadow-md rounded p-4"
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
                    <h2 className="text-lg font-bold">{book.title}</h2>
                    <p className="text-sm text-gray-500">👤 {book.author}</p>
                    <p className="text-sm font-semibold mt-1">
                      💶 € {book.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <div className="mt-8 text-right">
              <p className="text-xl font-semibold">
                Totali: <span className="text-green-700">€ {totalPrice.toFixed(2)}</span>
              </p>
              <button
                onClick={handleConfirmOrder}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Konfirmo Porosinë
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
