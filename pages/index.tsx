import Image from "next/image";
import { motion } from "framer-motion";
import CustomImage from "@/assets/images/image.png"
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import { Rocket, BarChart, ShieldCheck } from "lucide-react";
import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";


export interface Post{
  id: string;
  title: string;
  body: string;
}
export default function Home() {
  const {data: intitalPosts, loading} = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
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
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Hero Section */}
        <motion.section
          className="w-full py-20 bg-yellow-600 text-black text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold mb-4">
            Mirë se Vini në Aplikacionin Tonë!
          </h1>
          <p className="text-xl">
            Ndërtoni aplikacione të fuqishme dhe të shpejta me Next.js
          </p>
          <Button text="Meso me shume" 
          variant="secondary" 
          onClick={()=> alert("Redirecting...")}
          />
        </motion.section>

          {/* About Section */}
        <motion.section
          className="max-w-6xl py-20 px-6 text-center"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-yellow-600">
            Rreth Nesh
          </h2>
          <p className="text-gray-700 mb-6">
            Ne krijojmë aplikacione të avancuara duke përdorur teknologjitë më të fundit. 
            Fokusimi ynë kryesor është të ofrojmë produkte të optimizuara dhe SEO-friendly.
          </p>
        <Image
          src={CustomImage}
          alt="Imazh Rreth Nesh"
          width={500}
          height={300}
          className="rounded-xl"
      />
        </motion.section>

        {/* Features Section */}
        <motion.section
          className="w-full py-20 bg-gray-200 text-center"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
>
          <div className="container m-auto">
            <h2 className="text-4xl font-bold mb-6 text-yellow-600">
              Karakteristikat Kryesore
            </h2>
            <div className="grid grid-cols-1 md: grid-cols-3 gap-8">
            <Card 
            icon={Rocket} 
            title="Shpejtesi & Performance"
            description="Aplikacionet me te shpejta me optimizim te avancuar."
            />
            <Card 
            icon={BarChart} 
            title="SEO e Avancuar"
            description="Rankim me i mire ne motoret e kerkimit."
            />
            <Card 
            icon={ShieldCheck} 
            title="Siguri Maksimale"
            description="Mbrojtje e te dhenave dhe siguri e larte per perdoruesit."
            />
            </div>
            </div>
          </motion.section>
          {/* Services Section */}
          <motion.section
            className="max-w-6xl py-20 px-6 text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-yellow-600">
              Shërbimet Tona
            </h2>
            <p className="text-gray-700 mb-6">
              Ofrojmë një gamë të gjerë shërbimesh duke përfshirë zhvillimin e aplikacioneve web, optimizimin për SEO dhe integrimin me API të jashtme.
            </p>
            <Button 
            text="Shikoni Sherbimet" 
            onClick={()=> alert ("Redirecting...")}
            />
          </motion.section>

          {/* Blog Section */}
            <div className="grid grid-cols-3 py-20 bg-gray-200">
    {loading ? (
      <CircularProgress />
    ) : (
        posts &&
      posts?.map((post) => (
        <motion.section
          key={post.id}
          className="max-w-6xl py-20 px-6 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
            {post.title}
          </h2>
          <p className="text-gray-700 mb-6">{post.body}</p>
          <button
           onClick={()=> handleDelete(post.id)}
           className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition">
            Fshij Postin
          </button>
        </motion.section>
      ))
    )}
  </div>

          {/* Contact Section */}
          <motion.section
            className="w-full py-20 bg-yellow-600 text-black text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl font-bold mb-6">Kontaktoni Me Ne</h2>
            <p>Email: contact@mycompany.com</p>
            <p>Tel: +383 123 456 789</p>
            <p>Adresa: Prishtinë, Kosovë</p>
            <Button 
            text="Na Kontaktoni"
            variant="secondary"
            onClick={()=> alert("Opening Contact Form...") }
            />
          </motion.section>
      </div>
    </div>
  );
}


Home.displayName = "My Application";
