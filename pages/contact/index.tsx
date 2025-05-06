import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

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
    formState: { errors, isSubmitSuccessful },
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
    <div className="pt-14 bg-[#e7e5df] text-[#171717]">
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <motion.section
          className="w-full py-20 bg-[#526d88] text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-serif font-bold mb-4">Na Kontaktoni</h1>
          <p className="text-xl font-light">
            Jemi të gatshëm t'ju ndihmojmë! Plotësoni formularin më poshtë për të na kontaktuar.
          </p>
        </motion.section>

        <motion.section
          className="max-w-4xl w-full py-20 px-6"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="bg-white p-10 rounded-xl shadow-md">
            <h2 className="text-3xl font-serif font-bold text-[#526d88] mb-6 text-center">
              Formulari i Kontaktit
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium">Emri juaj</label>
                <input
                  type="text"
                  {...register("name", { required: "Emri është i detyrueshëm." })}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#526d88]"
                  placeholder="Shkruani emrin tuaj"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email-i është i detyrueshëm.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Email-i nuk është valid.",
                    },
                  })}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#526d88]"
                  placeholder="Shkruani email-in tuaj"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Mesazhi</label>
                <textarea
                  {...register("message", { required: "Mesazhi është i detyrueshëm." })}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#526d88]"
                  placeholder="Shkruani mesazhin tuaj"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="mt-4 px-6 py-3 bg-[#bdbab0] text-white font-semibold rounded-xl shadow hover:bg-[#a6a397] transition"
                >
                  Dërgo Mesazhin
                </motion.button>
              </div>
            </form>
          </div>
        </motion.section>

        <motion.section
          className="w-full py-20 bg-[#f8f5e4] text-center text-[#171717]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl font-serif font-bold mb-6">
            Mund të na kontaktoni edhe në:
          </h2>
          <p>Email: contact@mycompany.com</p>
          <p>Tel: +383 123 456 789</p>
          <p>Adresa: Prishtinë, Kosovë</p>
        </motion.section>
      </div>
    </div>
  );
}


Contact.displayName = "Contact Us | My Application";
