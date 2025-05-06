import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function Login() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.ok) {
      const session = await getSession();
      const role = session?.user?.role;

      if (role === "admin") {
        router.push("/admin");
      } else if (role === "user") {
        router.push("/Client");
      } else {
        router.push("/");
      }
    } else {
      alert("Kyçja dështoi. Kontrolloni kredencialet.");
    }
  };

  return (
    <div className="pt-14 bg-[#e7e5df] text-[#171717]">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <motion.section className="w-full py-20 bg-[#526d88] text-white text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <h1 className="text-5xl font-serif font-bold mb-4">Kyçu</h1>
          <p className="text-xl font-light">Hyni në llogarinë tuaj duke plotësuar formularin më poshtë.</p>
        </motion.section>

        <motion.section className="max-w-md w-full py-20 px-6" initial={{ y: 100 }} animate={{ y: 0 }} transition={{ duration: 1 }}>
          <div className="bg-white p-10 rounded-xl shadow-md">
            <h2 className="text-3xl font-serif font-bold text-[#526d88] mb-6 text-center">Forma e Kyçjes</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#526d88]" placeholder="Shkruani email-in tuaj" required />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Fjalëkalimi</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#526d88]" placeholder="Shkruani fjalëkalimin tuaj" required />
              </div>
              <div className="text-center">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" className="mt-4 px-6 py-3 bg-[#bdbab0] text-white font-semibold rounded-xl shadow hover:bg-[#a6a397] transition">Kyçu</motion.button>
              </div>
            </form>

            <div className="my-6 border-t border-gray-300"></div>

            <div className="flex flex-col gap-4">
              <button onClick={() => signIn("google", { callbackUrl: "/" })} className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold">Kyçu me Google</button>
              <button onClick={() => signIn("facebook", { callbackUrl: "/" })} className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold">Kyçu me Facebook</button>
            </div>
          </div>
        </motion.section>

        <motion.section className="w-full py-10 bg-[#f8f5e4] text-center text-[#171717]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <p>Nuk keni llogari? <Link href="/register" className="text-[#526d88] underline">Regjistrohuni këtu</Link></p>
        </motion.section>
      </div>
    </div>
  );
}

Login.displayName = "Login | My Application";
