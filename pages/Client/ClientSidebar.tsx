import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function ClientSidebar() {
  const { data: session, status } = useSession();

  if (status === "loading") return null; // Avoid rendering during hydration mismatch

  const name = session?.user?.name || "N";

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col py-6 px-4">
      <Link href="/Client">
        <h2 className="text-2xl font-bold mb-8 cursor-pointer hover:text-yellow-300 transition">
          📚 Bookstore
        </h2>
      </Link>
      <nav className="flex flex-col gap-4">
        <Link href="/Client/browsebooks" className="hover:bg-gray-800 px-4 py-2 rounded">
          📚 Browse Books
        </Link>
        <Link href="/Client/wishlist" className="hover:bg-gray-800 px-4 py-2 rounded">
          🔖 My Wishlist
        </Link>
        <Link href="/Client/shoppingcart" className="hover:bg-gray-800 px-4 py-2 rounded">
          🛒 My Shopping List
        </Link>
        <Link href="/Client/profile" className="hover:bg-gray-800 px-4 py-2 rounded">
          👤 My Profile
        </Link>
      </nav>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="mt-auto bg-red-600 px-4 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-2"
      >
        <span className="rounded-full bg-gray-800 w-6 h-6 flex items-center justify-center text-xs font-bold">
          {name.charAt(0)}
        </span>
        Çkyçu
      </button>
    </aside>
  );
}
