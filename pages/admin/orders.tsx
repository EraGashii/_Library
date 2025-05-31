import React, { useEffect, useState } from "react";
import { useOrderStore } from "../../src/stores/orderStore";
import AdminSidebar from "./AdminSidebar";

export default function AdminOrdersPage() {
  const { orders, updateStatus } = useOrderStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <AdminSidebar name="admin" />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">📦 Porositë</h1>

        {orders.length === 0 ? (
          <p className="text-gray-600">Asnjë porosi e regjistruar.</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-6 rounded-xl shadow-md border border-gray-200"
              >
                <div className="mb-4">
                  <p className="text-sm text-gray-500">🆔 Porosia #{order.id}</p>
                  <p className="text-sm text-gray-500">👤 {order.user.name} ({order.user.email})</p>
                  <p className="text-sm text-gray-500">💳 Pagesa: {order.paymentMethod}</p>
                  <p className="text-sm text-gray-500">📅 {new Date(order.createdAt).toLocaleString()}</p>
                  <p className="text-sm font-semibold">📦 Statusi: {order.status}</p>
                </div>
                <div className="mb-4">
                  <h2 className="font-semibold mb-2">Librat:</h2>
                  <ul className="list-disc pl-6">
                    {order.items.map((item) => (
                      <li key={item.id} className="text-gray-700">
                        {item.title} - € {item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => updateStatus(order.id, "approved")}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    ✅ Aprovo
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, "rejected")}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    ❌ Refuzo
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}