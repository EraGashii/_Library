import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import { Rocket, BarChart, ShieldCheck, Truck } from "lucide-react";
import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";

export interface Blog {
  _id: string;
  title: string;
  body: string;
}

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  stock: number;
  description?: string;
  coverImage?: string;
}

export default function Home() {
  const { data: blogs, loading } = useFetch<Blog[]>("/api/blogs");
  const [posts, setPosts] = useState<Blog[] | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (blogs) {
      setPosts(blogs);
    }
  }, [blogs]);

  useEffect(() => {
    fetch("/api/services/book")
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(0, 3)))
      .catch((err) => console.error("Failed to fetch books", err));
  }, []);

  const handleDelete = (id: string) => {
    if (posts) {
      setPosts(posts.filter((post) => post._id !== id));
    }
  };

  return (
    <div className="bg-[#f8f5e4] text-[#333] font-serif">
      {/* Hero Section */}
      <motion.section
        className="w-full text-center text-white relative h-[80vh]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative w-full h-full">
          <Image
            src="/uploads/PastedGraphic.png"
            alt="Library Background"
            layout="fill"
            objectFit="cover"
            quality={90}
            className="z-0"
          />
          <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center z-10 px-4">
            <h1 className="text-5xl font-bold mb-4">Mirë se Vini në Librarinë Tonë Online!</h1>
            <p className="text-lg max-w-2xl">
              Zbuloni botën magjike të librave — për çdo zemër, çdo mendje.
            </p>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section className="w-full bg-[#f8f5e4]">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-8 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
          <div>
            <h2 className="text-4xl font-bold text-[#2c2c2c] leading-tight">
              Books are a uniquely <br />
              <span className="italic text-[#3f5267]">portable magic</span>
            </h2>
            <p className="text-[#3f5267] text-lg mt-4 italic">
              Do not miss out our bestselling books
            </p>
            <p className="mt-6 text-[#555]">
              Discover the stories that inspire, challenge, and move hearts. From
              thrilling fiction to insightful nonfiction — your next favorite
              book is waiting.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/uploads/book-spotlight.jpg"
              alt="Books"
              width={420}
              height={200}
              className="rounded-lg shadow-lg object-contain"
            />
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section className="w-full bg-[#f3f2ef] text-center">
        <div className="max-w-screen-2xl mx-auto py-20 px-4 sm:px-8">
          <h2 className="text-4xl font-bold mb-12 text-[#3f5267]">
            Karakteristikat Kryesore
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card
              icon={Rocket}
              title="Shpejtësi & Performancë"
              description="Bleni librat tuaj të preferuar me proces të shpejtë dhe të thjeshtë."
            />
            <Card
              icon={BarChart}
              title="Katalog i Avancuar"
              description="Filtroni sipas autorit, zhanrit ose vlerësimeve dhe gjeni lehtësisht atë që kërkoni."
            />
            <Card
              icon={ShieldCheck}
              title="Siguri Maksimale"
              description="Të dhënat dhe pagesat tuaja janë të mbrojtura me teknologji moderne."
            />
            <Card
              icon={Truck}
              title="Dërgesë e Sigurt"
              description="Porosit sot dhe merr librat në derë me shërbime të besueshme postare."
            />
          </div>
        </div>
      </motion.section>

      {/* Recommended Books Section */}
      <motion.section className="w-full bg-[#f3f2ef]">
        <div className="max-w-screen-2xl mx-auto py-20 px-4 sm:px-8">
          <h2 className="text-4xl font-bold text-center mb-10 text-[#3f5267]">
            Libra të Rekomanduar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {books.map((book) => (
              <div
                key={book._id}
                className="bg-white p-6 rounded-xl shadow-md text-left flex flex-col items-center"
              >
                {book.coverImage && (
                  <div className="w-full h-96 overflow-hidden rounded-md mb-4">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-semibold text-[#2c2c2c] mb-1">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">👤 {book.author}</p>
                <p className="text-gray-600 text-sm mb-4 text-center">
                  {book.description?.slice(0, 100) || "Një libër që nuk duhet ta humbisni këtë muaj."}
                </p>
                {/* <Button
                  text="Shiko Librin"
                  onClick={() => alert("Redirecting to book page...")}
                  className="mt-auto"
                /> */}
              </div>
            ))}
          </div>
        </div>
      </motion.section>

{/* Reviews Section */}
<motion.section className="w-full bg-white text-center">
  <div className="max-w-screen-2xl mx-auto py-20 px-4 sm:px-8">
    <h2 className="text-4xl font-bold mb-14 text-[#3f5267]">Çfarë Thonë Klientët Tanë</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { name: "Arta", review: "Librat erdhën shumë shpejt dhe ishin të paketuar bukur!" },
        { name: "Blerim", review: "Përzgjedhje e mrekullueshme dhe çmime të arsyeshme." },
        { name: "Liridona", review: "Platformë shumë e lehtë për përdorim – jam shumë e kënaqur!" }
      ].map((r, i) => (
        <div key={i} className="bg-[#fdfaf0] p-8 rounded-3xl shadow-lg border border-[#eaeaea] relative">
          <div className="absolute -top-4 -left-4 text-5xl text-yellow-400">“</div>
          <p className="italic text-[#555] mb-6 text-lg leading-relaxed">"{r.review}"</p>
          <div className="text-right font-bold text-[#3f5267]">— {r.name}</div>
        </div>
      ))}
    </div>
  </div>
</motion.section>


      {/* Weekly Offer Section */}
<motion.section className="w-full bg-[#fdf8f3] text-center md:text-left">
  <div className="max-w-screen-2xl mx-auto py-20 px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-10">
    <div>
      <span className="bg-red-500 text-white text-xs px-3 py-1 rounded-full inline-block mb-4">
        ⏳ Limited Time
      </span>
      <h2 className="text-4xl font-bold text-[#3f5267] mb-4">Oferta e Javës</h2>
      <p className="text-[#2c2c2c] mb-6 text-lg">
        Bli 2 libra dhe përfito të tretin <strong className="text-[#c93]">FALAS</strong>!
        Mos e humb, oferta vlen vetëm këtë javë.
      </p>
      <Button text="Përfito Ofertën" onClick={() => router.push("/login")} />
    </div>
    <div className="flex justify-center">
      <Image
        src="/uploads/bookSale.avif"
        alt="Oferta"
        width={900}
        height={600}
        className="rounded-xl shadow-lg object-cover"
      />
    </div>
  </div>
</motion.section>

      {/* Blog Section */}
      <section className="w-full bg-[#f8f5e4]">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-8 py-20">
          <h2 className="text-center text-4xl font-bold mb-10 text-[#2c2c2c]">
            Bloget e Fundit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {loading ? (
              <CircularProgress />
            ) : (
              posts?.map((post) => (
                <motion.div
                  key={post._id}
                  className="bg-white shadow-lg rounded-xl p-6 text-left"
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl font-bold text-[#3f5267] mb-4">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.body}</p>
                  {/* <button
                    onClick={() => handleDelete(post._id)}
                    className="text-sm px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Fshij Postin
                  </button> */}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

Home.displayName = "Libraria Bookstore";
