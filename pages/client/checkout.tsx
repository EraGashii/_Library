// pages/client/checkout.tsx
import ClientSidebar from "./ClientSidebar";
import { useCartStore } from "../../src/stores/cartStore";
import { useOrderStore } from "../../src/stores/orderStore";
import type { Order } from "../../src/stores/orderStore";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const { cart, clearCart } = useCartStore();
  const { addOrder } = useOrderStore();
  const { data: session } = useSession();
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const total = cart.reduce((acc, book) => acc + book.price, 0);

  const handleCheckout = () => {
    const order: Order = {
      id: uuidv4(),
      user: {
        name: session?.user?.name || "Anonymous",
        email: session?.user?.email || "unknown@example.com",
      },
      items: cart,
      status: "pending",
      createdAt: new Date(),
      paymentMethod,
    };

    addOrder(order);
    clearCart();
    alert("✅ Porosia u pranua me sukses dhe është duke u shqyrtuar!");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <ClientSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">💳 Checkout</h1>

        <table className="w-full mb-6 table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="text-left p-2">📚 Title</th>
              <th className="text-left p-2">Author</th>
              <th className="text-left p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((book) => (
              <tr key={book.id} className="border-t">
                <td className="p-2">{book.title}</td>
                <td className="p-2">{book.author}</td>
                <td className="p-2">€ {book.price.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="border-t font-bold">
              <td colSpan={2} className="p-2 text-right">
                Total:
              </td>
              <td className="p-2">€ {total.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">💳 Payment Method</label>
          <select
            className="w-full p-2 border rounded"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>Bank Transfer</option>
          </select>
        </div>

        <button
          onClick={handleCheckout}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Confirm and Pay
        </button>
      </main>
    </div>
  );
}
