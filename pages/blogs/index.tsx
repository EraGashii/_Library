import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import { Post } from "..";
import { CircularProgress, Link } from "@mui/material";
import { motion } from "framer-motion";
import { Blog } from "api/models/Blog";
import { useRouter } from "next/router";

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
      setPosts(posts?.filter((post) => post.id !== id));
    }
  };

  const router = useRouter();
  const {
    data: blogsData,
    loading: blogsLoading,
    remove,
  } = useFetch<Blog[]>("/api/blogs");

  const handleDeleteBlog = async (id: string) => {
    const confirmed = confirm("A jeni i sigurt qe doni te fshini kete blog?");
    if (!confirmed) return;
    try {
      await remove(`/api/blogs/${id}`);
      alert("Blogu u fshi me sukses.");
      router.reload();
    } catch (error) {
      alert("Gabim gjat fshirjes se blogut");
      console.error(error);
    }
  };

  return (
    <div className="pt-12 bg-gradient-to-br from-[#e4e8ed] to-[#cfd8e4] text-[#171717] min-h-screen">
      <div className="flex flex-col items-center justify-center gap-y-20">
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
                    className="w-96 bg-white p-6 rounded-3xl shadow-xl text-center border border-gray-200 hover:shadow-2xl transition"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-2xl font-bold mb-4 text-[#526d88] uppercase tracking-wide">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-6">{post.body}</p>
                    <div className="mb-4">
                      <Link href={`/update/blog/${post._id}`}>
                        <button className="px-5 py-2 bg-[#526d88] hover:bg-[#42546f] text-white rounded-full shadow transition">
                          Përditëso
                        </button>
                      </Link>
                    </div>
                    <button
                      onClick={() => handleDeleteBlog(post._id!)}
                      className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow transition"
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
              <Link href="/create/blog">
                <button className="px-6 py-2 bg-[#526d88] hover:bg-[#42546f] text-white rounded-full shadow-md transition">
                  + Krijo Blog të Ri
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
      </div>
    </div>
  );
}

function BlogSection({ title, posts, loading, hrefBase, onDelete }: any) {
  return loading ? (
    <CircularProgress />
  ) : (
    <div className="bg-[#e7ecf2] w-full px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#526d88] pb-10">
        Shfaqja e Blogut në Single Page me {title}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {posts &&
          posts.slice(0, 3).map((post: Post) => (
            <motion.section
              key={post.id}
              className="bg-white p-8 rounded-3xl text-center shadow w-full max-w-sm border border-gray-200 hover:shadow-lg transition"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-4 text-[#526d88] uppercase">
                {post.title}
              </h2>
              <p className="text-gray-700 mb-6">{post.body}</p>
              <Link href={`${hrefBase}${post.id}`}>
                <button className="px-6 py-2 bg-[#526d88] hover:bg-[#42546f] text-white rounded-full transition">
                  Shiko Detajet
                </button>
              </Link>
              <div className="mt-4">
                <button
                  onClick={() => onDelete(post.id)}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full transition"
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

Blogs.displayName = "Blogs | My Application";