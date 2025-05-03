import useFetch from "hooks/useFetch";
import { useEffect, useState } from "react";
import { Post } from "..";
import { CircularProgress, Link } from "@mui/material";
import { motion } from "framer-motion";

export interface Props{
    id: string;
    title: string;
    body: string;
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
        setPosts(posts?.filter((post) => post.id !== id));
      }
    };
  
    return (
      <div className="pt-12">
        <div className="flex flex-col items-center justify-center min-h-screen gap-y-20">
          {/* Blogs Section: Single Page Loading with Static Site Generation (SSG) */}

                     {loading ? (
             <CircularProgress />
           ) : (
             <div className="bg-gray-200">
               <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
                 Shfaqja e Blogut në Single Page me Static Site Generation (SSG)
               </h1>
               <div className="grid grid-cols-3">
                 {posts &&
                   posts.slice(0, 3).map((post: Post) => (
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
                       <div>
                        <Link href ={"/blogs/ssg/" + post.id}>
                        <button
                        className="px-6 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition">
                            Shiko Detajet
                            </button>
                        </Link>
                        <div>
                            <button 
                                onClick={()=> handleDelete(post.id)}
                                className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                                >
                                Fshij Postin
                            </button>
                        </div>
                       </div>
                     </motion.section>
                   ))}
               </div>
             </div>
           )}
            {/* Blogs Section: Single Page Loading with Server Side Rendering (SSR) */}
            {loading ? (
             <CircularProgress />
           ) : (
             <div className="bg-gray-200">
               <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
                 Shfaqja e Blogut në Single Page me Server Side Rendering (SSR)
               </h1>
               <div className="grid grid-cols-3">
                 {posts &&
                   posts.slice(0, 3).map((post: Post) => (
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
                       <div>
                        <Link href ={"/blogs/ssr/" + post.id}>
                        <button
                        className="px-6 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition">
                            Shiko Detajet
                            </button>
                        </Link>
                        <div>
                            <button 
                                onClick={()=> handleDelete(post.id)}
                                className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                                >
                                Fshij Postin
                            </button>
                        </div>
                       </div>
                     </motion.section>
                   ))}
               </div>
             </div>
           )}
            {/* Blogs Section: Single Page Loading with Incremental Static Regeneration (ISR) */}
            {loading ? (
             <CircularProgress />
           ) : (
             <div className="bg-gray-200">
               <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
                 Shfaqja e Blogut në Single Page me Incremental Static Regeneration (ISR)
               </h1>
               <div className="grid grid-cols-3">
                 {posts &&
                   posts.slice(0, 3).map((post: Post) => (
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
                       <div>
                        <Link href ={"/blogs/isr/" + post.id}>
                        <button
                        className="px-6 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition">
                            Shiko Detajet
                            </button>
                        </Link>
                        <div>
                            <button 
                                onClick={()=> handleDelete(post.id)}
                                className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                                >
                                Fshij Postin
                            </button>
                        </div>
                       </div>
                     </motion.section>
                   ))}
               </div>
             </div>
           )}
            </div>
      </div>
    );
  }
  

Blogs.displayName = "Blogs | My Application";