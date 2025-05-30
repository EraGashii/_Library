import { create } from "zustand";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
}

interface CartStore {
  cart: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void; // <-- Add this
}

export const useCartStore = create<CartStore>((set) => ({
  cart: [],
  addToCart: (book) =>
    set((state) => ({
      cart: [...state.cart, book],
    })),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((book) => book.id !== id),
    })),
  clearCart: () => set({ cart: [] }), // <-- Implement this
}));
