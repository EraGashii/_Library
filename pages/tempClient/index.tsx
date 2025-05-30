import { useSession, signOut } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import ClientSidebar from "./ClientSidebar";
import Image from "next/image";

interface User {
  name?: string;
  email?: string;
  role?: string;
}

export default function ClientDashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const user = session?.user as User;

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <ClientSidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold mb-6">Dashboard – Client</h1>

        {/* 🏷️ Book Promo Banner */}
        <div className="bg-[#f5efe9] text-center rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-10 shadow-md">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-[#382f5d] mb-2">Build your library</h2>
            <p className="text-[#6f5d92]">Buy two selected books and get one for free</p>
            <button className="mt-4 px-5 py-2 bg-[#8064e9] text-white rounded-lg hover:bg-[#5e44d1]">
              View All
            </button>
          </div>
          <Image
            src="/books-banner.png"
            alt="Books Promo"
            width={160}
            height={160}
            className="object-contain rounded-lg"
          />
        </div>

        {/* 📦 Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600">📖 Top Selling Book</p>
            <h2 className="text-2xl font-bold">&lsquo;Atomic Habits&rsquo;</h2>
            <p className="text-green-500 text-sm mt-2">+120 sales this week</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600">⭐ New Reviews</p>
            <h2 className="text-2xl font-bold">320</h2>
            <p className="text-green-500 text-sm mt-2">+10% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <p className="text-gray-600">🆕 Books Added</p>
            <h2 className="text-2xl font-bold">48</h2>
            <p className="text-blue-500 text-sm mt-2">Curated by our editors</p>
          </div>
        </div>

        {/* 🎨 Book Inspiration Image */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-10 max-w-4xl mx-auto">
          <Image
            src="/photoo1.jpg"
            alt="Book Inspiration"
            width={1200}
            height={400}
            className="w-full object-cover"
          />
        </div>

        {/* 👤 Profile Card */}
        <div className="bg-white p-6 rounded-xl shadow-md max-w-xl w-full">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
              {user.name?.charAt(0) || "U"}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                🛡️ Roli: <strong>{user.role}</strong>
              </p>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <p className="text-gray-600 flex items-center gap-2">
              📧 <span>Email:</span> <strong>{user.email}</strong>
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              🌟 <span>Membership:</span> <strong>Gold</strong>
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              🛍️ <span>Total Purchases:</span> <strong>32 books</strong>
            </p>
            <p className="text-gray-600 flex items-center gap-2">
              🕓 <span>Last Login:</span> <strong>2 days ago</strong>
            </p>
          </div>
          <div className="flex justify-between mt-6">
            <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">
              Edit Profile
            </button>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Çkyçu
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// Server-side auth
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const user = session.user as User;
  if (user.role !== "user") {
    return {
      redirect: {
        destination: "/unauthorized",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
