// Incremental Static Regeneration(ISR)

import { GetStaticPaths, GetStaticProps } from "next";

interface Post {
  id: number;
  title: string;
  body: string;
}


export const getStaticPaths: GetStaticPaths = async () => {
    return {
      paths: [], // Nuk japim asnjë ID paraprakisht
      fallback: "blocking", // Renderohet në kohë reale dhe ruhet për përdorime të ardhshme
    };
  };

  export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params?.id}`
    );
    const post = await res.json();
    return { props: { post },
    revalidate: 10, //refresh after 10 seconds
};
};
export default function Blog({ post }: { post: Post }) {
  return (
    <div className="pt-12 px-20 flex flex-col items-center justify-center min-h-screen gap-y-20">
      <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
        Incremental Static Regeneration (ISR) për Post ID: {post.id}
      </h1>
      <h2 className="text-4xl text-center font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
        {post.title}
      </h2>
      <p className="text-gray-700 mb-6">{post.body}</p>
      <p>Rifreskohet automatikisht çdo 10 sekonda në sfond.</p>
    </div>
  );
}

  
  Blog.displayName = "Blog | My Application";
  