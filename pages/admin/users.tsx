import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import { FaFacebook, FaInstagram, FaTwitter, FaTelegram, FaEdit } from "react-icons/fa";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const name = session?.user?.name || "Admin";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated") {
      fetchUsers();
    }
  }, [status]);

  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users");
    const data = await res.json();
    setUsers(data);
  };

  const confirmDelete = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    await fetch(`/api/admin/users/${selectedUser._id}`, {
      method: "DELETE",
    });

    setShowModal(false);
    setSelectedUser(null);
    fetchUsers();
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-[#f4f6fc] text-gray-800">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col py-6 px-4">
        <h2 className="text-2xl font-bold mb-8">📚 Admin Panel</h2>
        <nav className="flex flex-col gap-4">
          <a href="/admin" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">🏠 Dashboard</a>
          <a href="/admin/users" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">👥 Përdoruesit</a>
          <a href="/admin/books" className="hover:bg-[#1f2a6d] px-4 py-2 rounded">📘 Book Register</a>
          <a className="bg-pink-600 px-4 py-2 rounded text-white">👤 Profili</a>
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
        <h1 className="text-2xl font-bold mb-6">👥 Lista e Përdoruesve</h1>
        <div className="bg-white rounded-xl shadow p-6">
          <table className="w-full table-auto text-left border">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">Emri</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">Roli</th>
                <th className="p-2 border">Veprime</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t">
                  <td className="p-2 border">{user.name}</td>
                  <td className="p-2 border">{user.email}</td>
                  <td className="p-2 border">{user.role}</td>
                  <td className="p-2 border">
                    <button
                      onClick={() => confirmDelete(user)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                    >
                      Fshij
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    Nuk ka përdorues të regjistruar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal për konfirmim */}
        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md text-center shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                A jeni të sigurt që doni të fshini <br />
                <span className="text-red-600">{selectedUser.name}</span>?
              </h2>
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Po, fshije
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                  Anulo
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
