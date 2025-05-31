import { create } from "zustand";
import { persist } from "zustand/middleware";

type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
};

type CartStore = {
  cart: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void; // ✅ Shto këtë këtu
};


export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (book) =>
        set((state) => ({
          cart: [...state.cart, book],
        })),
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((book) => book.id !== id),
        })),
        clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // emri i key-t në localStorage
    }
  )
);
