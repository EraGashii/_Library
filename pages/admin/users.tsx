import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import AdminSidebar from "./AdminSidebar";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const router = useRouter();
  const name = session?.user?.name || "Admin";

  const [formData, setFormData] = useState({ name: "", email: "", role: "" });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
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
    setShowDeleteModal(true);
  };

  const confirmEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    await fetch(`/api/admin/users/${selectedUser._id}`, {
      method: "DELETE",
    });
    setShowDeleteModal(false);
    setSelectedUser(null);
    fetchUsers();
  };

  const handleEdit = async () => {
    if (!selectedUser) return;
    await fetch(`/api/admin/users/${selectedUser._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    setShowEditModal(false);
    setSelectedUser(null);
    fetchUsers();
  };

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-[#f4f6fc] text-gray-800">
      {/* Admin Sidebar */}
            <AdminSidebar name={name} />
            <main className="flex-1 p-10">{/* Your admin content here */}</main>

      {/* Main content */}
      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-6">👥 Lista e Përdoruesve</h1>
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Emri</th>
                <th className="p-3">Email</th>
                <th className="p-3">Roli</th>
                <th className="p-3">Veprime</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    Nuk ka përdorues.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.role}</td>
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => confirmEdit(user)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => confirmDelete(user)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Modal - Delete */}
        {showDeleteModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                A dëshironi të fshini përdoruesin <br />
                <span className="text-red-600">{selectedUser.name}</span>?
              </h2>
              <div className="mt-6 flex justify-center gap-4">
                <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                  Po, fshije
                </button>
                <button onClick={() => setShowDeleteModal(false)} className="bg-gray-300 px-4 py-2 rounded">
                  Anulo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal - Edit */}
        {showEditModal && selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-center">Edito Përdoruesin</h2>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded"
                placeholder="Emri"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded"
                placeholder="Email"
              />
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full mb-4 px-4 py-2 border rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="flex justify-between">
                <button onClick={handleEdit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Ruaj
                </button>
                <button onClick={() => setShowEditModal(false)} className="bg-gray-300 px-4 py-2 rounded">
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
