// components/RecommendedBooksSection.tsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/shared/Button";



interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  stock: number;
  description?: string;
  coverImage?: string;
}

export default function RecommendedBooksSection() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch("/api/services/book")
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(0, 3)))
      .catch((err) => console.error("Failed to fetch books", err));
  }, []);

  return (
    <motion.section className="w-full bg-[#f3f2ef]">
      <div className="max-w-screen-2xl mx-auto py-20 px-4 sm:px-8">
        <h2 className="text-4xl font-bold text-center mb-10 text-[#3f5267]">
          Libra të Rekomanduar
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white p-6 rounded-xl shadow-md text-left flex flex-col"
            >
              <h3 className="text-xl font-semibold text-[#2c2c2c] mb-2">
                {book.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {book.description?.slice(0, 100) ||
                  "Një libër që nuk duhet ta humbisni këtë muaj."}
              </p>
             <Button
  text="Shiko Librin"
  onClick={() => alert("Redirecting...")}
  className="mt-4"
/>

            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
