import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Image from "next/image";

type ContactFormInputs = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormInputs>();

  const onSubmit = async (data: ContactFormInputs) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        alert("Mesazhi u ruajt me sukses!");
        reset();
      } else {
        alert(result.message || "Dështoi ruajtja.");
      }
    } catch (error) {
      alert("Gabim gjatë dërgimit të mesazhit.");
      console.error(error);
    }
  };

  return (
    <div className="relative pt-20 bg-[#f5f4f0] text-[#1a1a1a] min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
     <Image
  src="/uploads/contact-bg.jpg"
  alt="Kontakt Background"
  layout="fill"
  objectFit="cover"
  className="blur-sm brightness-75"
/>
      </div>

      {/* Contact Form */}
      <motion.section
        className="relative z-10 w-full max-w-3xl bg-[#fffdf8]/90 shadow-2xl rounded-3xl p-10 border border-[#eeeae2]"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-[#2e4a62] mb-2 text-center font-serif">
          Na Kontaktoni
        </h2>
        <p className="text-gray-700 text-center mb-10 text-lg max-w-xl mx-auto">
          Plotësoni formularin më poshtë dhe ekipi ynë do t’ju kontaktojë së shpejti.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-[#2e4a62] mb-1">Emri juaj</label>
            <input
              type="text"
              {...register("name", { required: "Emri është i detyrueshëm." })}
              placeholder="Shkruani emrin tuaj"
              className="w-full p-4 border border-gray-300 rounded-lg bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2e4a62]"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2e4a62] mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email-i është i detyrueshëm.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email-i nuk është valid.",
                },
              })}
              placeholder="Shkruani email-in tuaj"
              className="w-full p-4 border border-gray-300 rounded-lg bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2e4a62]"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#2e4a62] mb-1">Mesazhi</label>
            <textarea
              {...register("message", { required: "Mesazhi është i detyrueshëm." })}
              placeholder="Shkruani mesazhin tuaj"
              className="w-full p-4 border border-gray-300 rounded-lg bg-white/90 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#2e4a62] min-h-[140px]"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
          </div>

          <div className="text-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-8 py-3 bg-[#2e4a62] text-white font-semibold rounded-lg shadow hover:bg-[#1d324a] transition duration-200"
            >
              Dërgo Mesazhin
            </motion.button>
          </div>
        </form>
      </motion.section>
    </div>
  );
}

Contact.displayName = "Contact Us | Libraria";