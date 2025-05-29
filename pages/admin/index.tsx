import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaTelegram, FaEdit } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import Image from "next/image";

interface User {
  name?: string;
  email?: string;
  role?: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const user = session?.user as User;
  const name = user?.name || "Admin";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-[#f4f6fc] text-gray-800">
      <AdminSidebar name={name} />
      <main className="flex-1 p-10">
        <div className="bg-white rounded-xl shadow-md p-6 mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Mirësevini, {name}!</h1>
            <p className="text-gray-500 mt-1">Ju jeni kyçur si administrator. 🎓</p>
          </div>
          <Image src="/books-banner.png" alt="Books" width={128} height={128} className="object-contain" />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col lg:flex-row gap-10 mb-10">
          <div className="w-40 h-40 bg-purple-100 rounded-full flex items-center justify-center text-4xl font-bold text-purple-700 border-4 border-purple-400">
            {name.charAt(0)}
          </div>
          <div className="flex-1 space-y-2">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">{name}</h2>
              <button className="text-blue-600 hover:text-blue-800 transition" title="Edit profile">
                <FaEdit size={20} />
              </button>
            </div>
            <p>📅 U anëtarësua më: <strong>24 Nëntor 2022</strong></p>
            <p>📍 Lokacioni: <strong>Prishtinë, Kosovë</strong></p>
            <p>🎂 Datëlindja: <strong>08.04.1999</strong></p>
            <p>📧 Email: <strong>{user?.email}</strong></p>
            <p>🛡️ Roli: <strong>{user?.role}</strong></p>
            <p>📞 Tel: <strong>+383 44 123 456</strong></p>

            <div className="grid grid-cols-3 gap-4 mt-6 text-center">
              <div><p className="text-lg font-bold text-[#382f5d]">100+</p><p className="text-sm text-gray-600">Libra të shtuar</p></div>
              <div><p className="text-lg font-bold text-[#382f5d]">30</p><p className="text-sm text-gray-600">Usera aktivë</p></div>
              <div><p className="text-lg font-bold text-[#382f5d]">5</p><p className="text-sm text-gray-600">Raporte</p></div>
            </div>

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
