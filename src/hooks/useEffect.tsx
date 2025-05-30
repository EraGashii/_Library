import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      const role = (session?.user as any)?.role;
      if (role === "admin") router.replace("/admin");
      else if (role === "user") router.replace("/client");
    }
  }, [status, session, router]);

  return <p className="text-center mt-10">Duke u ngarkuar...</p>;
}
