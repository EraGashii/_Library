// Server-Side Rendering (SSR)
import { GetServerSideProps } from "next";
interface Post {
  id: number;
  title: string;
  body: string;
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.id}`
  );
  const post = await res.json();
  return { props: { post } };
};

export default function Blog({ post }: { post: Post }) {
  return (
    <div className="pt-12 px-20 flex flex-col items-center justify-center min-h-screen gap-y-20">
      <h1 className="text-4xl font-bold pt-20 pb-6 text-black text-center">
        Server-Side Rendering (SSR) për Post ID: {post.id}
      </h1>
      <h2 className="text-4xl text-center font-bold mb-6 text-yellow-600 line-clamp-2 uppercase">
        {post.title}
      </h2>
      <p className="text-gray-700 mb-6">{post.body}</p>
      <p className="text-sm text-gray-500 mt-4">
        Renderuar në çdo request nga serveri.
      </p>
    </div>
  );
}


Blog.displayName = "Blog | My Application";
