import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useEffect } from "react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Client-side redirect as a safety net
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Dashboard – Admin</h1>

      <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
        <p className="mb-4 text-lg">
          👋 Përshëndetje, <strong>{session?.user?.name || session?.user?.email}</strong>
        </p>
        <p className="mb-4">
          📧 Email: <strong>{session?.user?.email}</strong>
        </p>
        <p className="mb-6">
          🛡️ Roli: <strong>{(session?.user as any)?.role}</strong>
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Çkyçu
        </button>
      </div>
    </div>
  );
}

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

  if ((session.user as any)?.role !== "admin") {
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
