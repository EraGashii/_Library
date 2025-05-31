// src/stores/orderStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Order = {
  id: string;
  user: {
    name: string;
    email: string;
  };
  items: {
    id: string;
    title: string;
    author: string;
    price: number;
    image: string;
  }[];
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
  paymentMethod: string;
};

type OrderStore = {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateStatus: (id: string, status: "approved" | "rejected") => void;
};

export const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],
      addOrder: (order) =>
        set((state) => ({
          orders: [...state.orders, order],
        })),
      updateStatus: (id, status) =>
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, status } : order
          ),
        })),
    }),
    {
      name: "order-storage",
    }
  )
);