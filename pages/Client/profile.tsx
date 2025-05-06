import { useSession, signOut } from "next-auth/react";
import { FaFacebook, FaInstagram, FaTwitter, FaTelegram, FaEdit } from "react-icons/fa";

export default function ProfilePage() {
  const { data: session } = useSession();
  const name = session?.user?.name || "Era Gashi";

  return (
    <div className="flex min-h-screen bg-[#f4f6fc] text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col py-6 px-4">

        <h2 className="text-2xl font-bold mb-8">📚 Bookstore</h2>
        <nav className="flex flex-col gap-4">
          <a href="/Client" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">🏠 Dashboard</a>
          <a href="#" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">📚 Browse Books</a>
          <a href="#" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">❤️ Wishlist</a>
          <a href="#" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">🛒 Shopping List</a>
          <a className="bg-pink-600 px-4 py-2 rounded text-white">👤 My Profile</a>
          <a href="#" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">🧾 Orders</a>
          <a href="#" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">📞 Contact Support</a>
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

      {/* Main Content */}
      <main className="flex-1 p-10">
        {/* Welcome Box */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Welcome back, {name}!</h1>
            <p className="text-gray-500 mt-1">Thank you for being our customer. You're the best! 📚💖</p>
          </div>
          <img
            src="/books-banner.png"
            alt="Books"
            className="w-32 h-32 object-contain"
          />
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col lg:flex-row gap-10 mb-10">
          {/* Avatar */}
          <div className="w-40 h-40 bg-purple-100 rounded-full flex items-center justify-center text-4xl font-bold text-purple-700 border-4 border-purple-400">
            {name.charAt(0)}
          </div>

          {/* Info */}
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">{name}</h2>
              <button
                className="text-blue-600 hover:text-blue-800 transition"
                title="Edit profile"
              >
                <FaEdit size={20} />
              </button>
            </div>
            <p>📅 Member since: <strong>24 Nëntor 2022</strong></p>
            <p>📍 Location: <strong>Prishtina, Kosovë</strong></p>
            <p>🎂 Birthday: <strong>08.04.1999</strong></p>
            <p>📧 Email: <strong>{session?.user?.email}</strong></p>
            <p>📞 Phone: <strong>+383 44 123 456</strong></p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div>
                <p className="text-lg font-bold text-[#382f5d]">32</p>
                <p className="text-sm text-gray-600">Books Purchased</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[#382f5d]">12</p>
                <p className="text-sm text-gray-600">In Wishlist</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[#382f5d]">8</p>
                <p className="text-sm text-gray-600">Reviews Written</p>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-4 mt-6 text-purple-600 text-lg">
              <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              <FaFacebook className="hover:text-blue-600 cursor-pointer" />
              <FaTwitter className="hover:text-sky-500 cursor-pointer" />
              <FaTelegram className="hover:text-cyan-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
