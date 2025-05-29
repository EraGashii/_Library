// stores/wishlistStore.ts
import { create } from "zustand";

interface WishlistItem {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
}

interface WishlistState {
  wishlist: WishlistItem[];
  addToWishlist: (book: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: [],
  addToWishlist: (book) =>
    set((state) => ({
      wishlist: state.wishlist.some((item) => item.id === book.id)
        ? state.wishlist
        : [...state.wishlist, book],
    })),
  removeFromWishlist: (id) =>
    set((state) => ({
      wishlist: state.wishlist.filter((item) => item.id !== id),
    })),
}));
