import Image from "next/image";
import { motion } from "framer-motion";
import CustomImage from "@/assets/images/image.png";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import { Rocket, BarChart, ShieldCheck } from "lucide-react";
import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";

export interface Post {
  id: string;
  title: string;
  body: string;
}

export default function Home() {
  const { data: intitalPosts, loading } = useFetch<Post[]>(
    ""
  );
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (intitalPosts) {
      setPosts(intitalPosts);
    }
  }, [intitalPosts]);

  const handleDelete = (id: string) => {
    if (posts) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <div className="bg-[#f8f5e4] text-[#333] font-serif">
      {/* Hero Section */}
      <motion.section className="w-full py-24 text-center bg-[#526d88] text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <h1 className="text-5xl font-bold mb-3">Mirë se Vini në Librarinë Tonë Online!</h1>
        <p className="text-lg mb-6">Zbuloni botën magjike të librave — për çdo zemër, çdo mendje.</p>
      </motion.section>

      {/* About Section */}
      <motion.section className="w-full bg-[#f8f5e4]">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div>
            <h2 className="text-4xl font-bold text-[#2c2c2c] leading-tight">Books are a uniquely <br /><span className="italic text-[#3f5267]">portable magic</span></h2>
            <p className="text-[#3f5267] text-lg mt-4 italic">Do not miss out our bestselling books</p>
            <p className="mt-6 text-[#555]">Discover the stories that inspire, challenge, and move hearts. From thrilling fiction to insightful nonfiction — your next favorite book is waiting.</p>
          </div>
          <div className="flex justify-center">
            <Image src={CustomImage} alt="Books" width={420} height={300} className="rounded-lg shadow-lg object-contain" />
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section className="w-full bg-[#e7e5df] text-center">
        <div className="max-w-screen-2xl mx-auto py-20 px-4 sm:px-8">
          <h2 className="text-4xl font-bold mb-10 text-[#3f5267]">Karakteristikat Kryesore</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card icon={Rocket} title="Shpejtësi & Performance" description="Lexoni shpejt dhe pa ndërprerje me teknologji moderne." />
            <Card icon={BarChart} title="Katalog i Avancuar" description="Qasni librat më të mirë dhe me filtre të mençura." />
            <Card icon={ShieldCheck} title="Siguri Maksimale" description="Të dhënat tuaja dhe preferencat janë të sigurta." />
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section className="w-full bg-[#f8f5e4] text-center">
        <div className="max-w-screen-2xl mx-auto py-20 px-4 sm:px-8">
          <h2 className="text-4xl font-bold mb-6 text-[#2c2c2c]">Shërbimet Tona</h2>
          <p className="text-[#555] mb-6">Ofrojmë një gamë të gjerë shërbimesh për lexues, autorë dhe bashkëpunëtorë.</p>
          <Button text="Shikoni Shërbimet" onClick={() => alert("Redirecting...")} />
        </div>
      </motion.section>

      {/* Blog Section */}
      <section className="w-full bg-[#f8f5e4]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-20">
          <h2 className="text-center text-4xl font-bold mb-10 text-[#2c2c2c]">Bloget e Fundit</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <CircularProgress />
            ) : (
              posts?.map((post) => (
                <motion.div key={post.id} className="bg-white shadow-lg rounded-xl p-6 text-left" initial={{ opacity: 0.8 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                  <h3 className="text-xl font-bold text-[#3f5267] mb-4">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.body}</p>
                  <button onClick={() => handleDelete(post.id)} className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Fshij Postin</button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <motion.section className="w-full py-20 bg-[#3f5267] text-white text-center">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8">
          <h2 className="text-4xl font-bold mb-6">Kontaktoni Me Ne</h2>
          <p>Email: contact@libraria.com</p>
          <p>Tel: +383 123 456 789</p>
          <p>Adresa: Prishtinë, Kosovë</p>
          <Button text="Na Kontaktoni" variant="secondary" onClick={() => alert("Opening Contact Form...")} />
        </div>
      </motion.section>
    </div>
  );
}

Home.displayName = "Libraria Bookstore";
