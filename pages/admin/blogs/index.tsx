import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import { CircularProgress, Link } from "@mui/material";
import { motion } from "framer-motion";
import { Blog } from "api/models/Blog";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { FaFacebook, FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";
import AdminSidebar from "../AdminSidebar";
import Image from "next/image";

interface Post {
  id: string;
  title: string;
  body: string;
}

interface BlogSectionProps {
  title: string;
  posts: Post[] | null;
  loading: boolean;
  hrefBase: string;
  onDelete: (id: string) => void;
}

export default function Blogs() {
  const { data: initialPosts, loading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const handleDelete = (id: string) => {
    if (posts) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const router = useRouter();
  const {
    data: blogsData,
    loading: blogsLoading,
    remove,
  } = useFetch<Blog[]>("/api/blogs");

  const handleDeleteBlog = async (id: string) => {
    const confirmed = confirm("A jeni i sigurt që doni të fshini këtë blog?");
    if (!confirmed) return;
    try {
      await remove(`/api/blogs/${id}`);
      alert("Blogu u fshi me sukses.");
      router.reload();
    } catch (error) {
      alert("Gabim gjatë fshirjes së blogut");
      console.error(error);
    }
  };

  const { data: session } = useSession();
  const name = session?.user?.name || "Admin";

  return (
    <div className="flex min-h-screen bg-[#f4f6fc] text-gray-800">
      <AdminSidebar name={name} />

      <main className="flex-1 p-10">
        {blogsLoading ? (
          <CircularProgress />
        ) : (
          <div className="w-full py-12 px-4">
            <h1 className="text-4xl font-serif font-bold pb-10 text-center text-[#526d88]">
              Shfaqja e Blogave nga databaza jonë
            </h1>
            <div className="flex flex-wrap justify-center gap-10">
              {blogsData && blogsData.length > 0 ? (
                blogsData.map((post: Blog) => (
                  <motion.section
                    key={post._id}
                    className="w-96 bg-white p-6 rounded-xl shadow-md text-center"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="w-full h-48 mb-4 rounded overflow-hidden">
<Image
  src={post.coverImage ?? "/fallback.jpg"}
  alt={post.title}
  width={384}
  height={192}
  className="object-cover w-full h-full"
/>

                    </div>
                    <h2 className="text-3xl font-serif font-bold mb-4 text-[#526d88] uppercase">
                      {post.title}
                    </h2>
                    <p className="text-gray-700 mb-6">{post.body}</p>
                    <div className="mb-4">
                      <Link href={`/admin/blogs/${post._id}`}>
                        <button className="px-6 py-2 bg-[#bdbab0] hover:bg-[#a6a397] text-white rounded-xl transition">
                          Përditëso
                        </button>
                      </Link>
                    </div>
                    <button
                      onClick={() => handleDeleteBlog(post._id!)}
                      className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                    >
                      Fshij Postimin
                    </button>
                  </motion.section>
                ))
              ) : (
                <p className="text-xl text-center py-10 text-[#526d88]">
                  Nuk ka blogs në databazën
                </p>
              )}
            </div>
            <div className="text-center mt-10">
              <Link href="/admin/blogs/create">
                <button className="px-6 py-2 bg-[#bdbab0] hover:bg-[#a6a397] text-white rounded-xl transition">
                  Krijo blog
                </button>
              </Link>
            </div>
          </div>
        )}

        <BlogSection
          title="Static Site Generation (SSG)"
          posts={posts}
          loading={loading}
          hrefBase="/blogs/ssg/"
          onDelete={handleDelete}
        />
        <BlogSection
          title="Server Side Rendering (SSR)"
          posts={posts}
          loading={loading}
          hrefBase="/blogs/ssr/"
          onDelete={handleDelete}
        />
        <BlogSection
          title="Incremental Static Regeneration (ISR)"
          posts={posts}
          loading={loading}
          hrefBase="/blogs/isr/"
          onDelete={handleDelete}
        />

        <footer className="mt-16 text-center text-gray-500 text-sm border-t pt-4">
          © {new Date().getFullYear()} Admin Panel. All rights reserved.
          <div className="flex justify-center gap-4 mt-2 text-lg text-purple-600">
            <FaInstagram className="hover:text-pink-500 cursor-pointer" />
            <FaFacebook className="hover:text-blue-600 cursor-pointer" />
            <FaTwitter className="hover:text-sky-500 cursor-pointer" />
            <FaTelegram className="hover:text-cyan-600 cursor-pointer" />
          </div>
        </footer>
      </main>
    </div>
  );
}

function BlogSection({ title, posts, loading, hrefBase, onDelete }: BlogSectionProps) {
  return loading ? (
    <CircularProgress />
  ) : (
    <div className="bg-[#f8f5e4] w-full px-4 py-16">
      <h1 className="text-4xl font-serif font-bold text-center text-[#526d88] pb-10">
        Shfaqja e Blogut në Single Page me {title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {posts &&
          posts.slice(0, 3).map((post: Post) => (
            <motion.section
              key={post.id}
              className="bg-white p-8 rounded-xl text-center shadow w-full max-w-sm"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-2xl font-serif font-bold mb-4 text-[#526d88] uppercase">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-6">{post.body}</p>
              <Link href={`${hrefBase}${post.id}`}>
                <button className="px-6 py-2 bg-[#bdbab0] hover:bg-[#a6a397] text-white rounded-xl transition">
                  Shiko Detajet
                </button>
              </Link>
              <div className="mt-4">
                <button
                  onClick={() => onDelete(post.id)}
                  className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                >
                  Fshij Postin
                </button>
              </div>
            </motion.section>
          ))}
      </div>
    </div>
  );
}
