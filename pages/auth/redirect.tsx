import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function OAuthRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (window.location.hash === "#_=_") {
      history.replaceState(null, "", window.location.href.split("#")[0]);
    }
  }, []);

  useEffect(() => {
    console.log("Session status:", status);
    console.log("Session data:", session);

    if (status === "authenticated" && session?.user) {
      const role = (session.user as any).role ?? "user"; // fallback
      if (role === "admin") {
        router.replace("/admin");
      } else if (role === "user") {
        router.replace("/Client");
      } else {
        router.replace("/unauthorized");
      }
    }
  }, [status, session, router]);

  return (
    <div className="flex items-center justify-center h-screen text-lg font-semibold text-gray-600">
      <div className="text-center">
        <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-[#526d88] rounded-full mx-auto mb-4"></div>
        <p>Po ju ridrejtojmë në dashboard-in tuaj...</p>
      </div>
    </div>
  );
}
