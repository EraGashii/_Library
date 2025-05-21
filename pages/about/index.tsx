import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="pt-16 bg-[#f4f4f4] text-[#1f1f1f] font-sans">
      {/* Hero Section */}
      <motion.section
        className="w-full py-24 bg-[#2e4a62] text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold mb-4">Rreth Nesh</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Jemi një ekip inovativ që krijon platforma të avancuara për promovimin e leximit dhe shpërndarjen digjitale të librave nëpërmjet teknologjisë moderne.
        </p>
      </motion.section>

      {/* Mission Section */}
      {/* <motion.section
        className="w-full py-20 px-6 bg-white text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-[#2e4a62] mb-6">Misioni Ynë</h2>
        <p className="text-lg max-w-4xl mx-auto">
          Ne synojmë të mundësojmë akses të lehtë dhe të këndshëm në botën e librave përmes platformave digjitale, duke i sjellë lexuesit dhe autorët më afër se kurrë më parë.
        </p>
      </motion.section> */}

      {/* Vision Section */}
      <motion.section
        className="w-full py-20 bg-[#fffbea]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#2e4a62] mb-6">Vizioni Ynë</h2>
            <p className="text-lg leading-relaxed">
              Ne dëshirojmë të udhëheqim inovacionin në industrinë e librave përmes teknologjisë, duke krijuar produkte të adaptueshme që promovojnë kulturën e leximit në çdo moshë dhe komunitet.
            </p>
          </div>
          <div>
            <Image
              src="/uploads/about.png"
              alt="Lexuesit tanë"
              width={500}
              height={320}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* Values Section as a Single Image */}
      <motion.section
        className="w-full py-20 px-6 bg-white text-center"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-4xl font-bold text-[#2e4a62] mb-10">Vlerat Tona</h2>
        <div className="flex justify-center">
          <Image
            src="/uploads/values-icons.png"
            alt="Vlerat tona si ikona"
            width={1200}
            height={350}
            className="rounded-md shadow"
          />
        </div>
      </motion.section>

      {/* Team Section */}
<motion.section
  className="w-full py-20 bg-[#f9f9f9] text-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <h2 className="text-4xl font-bold text-[#2e4a62] mb-12">Ekipi Ynë</h2>
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
    {[
      { name: "Altina", role: "Software Developer", img: "/uploads/altina.avif" },
      { name: "Erion", role: "Software Developer", img: "/uploads/erion.webp" },
      { name: "Erza", role: "Software Developer", img: "/uploads/era.avif" },
    ].map((member, index) => (
      <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
        <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#2e4a62]">
          <Image
            src={member.img}
            alt={member.name}
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="text-xl font-semibold text-[#2e4a62]">{member.name}</h3>
        <p className="text-sm text-gray-600">{member.role}</p>
      </div>
    ))}
  </div>
</motion.section>


      {/* Timeline Section */}
<motion.section
  className="w-full py-20 px-6 bg-white text-center"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <h2 className="text-4xl font-bold text-[#2e4a62] mb-12">Rrugëtimi Ynë</h2>
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      { year: "2022", text: "Ideja për Librarinë Online lindi." },
      { year: "2023", text: "Ndërtimi i platformës dhe dizajni fillestar." },
      { year: "2024", text: "Lansimi zyrtar me mbi 1,000 libra në katalog." },
    ].map((item, idx) => (
      <div
        key={idx}
        className="bg-[#f9f8f6] rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-2"
      >
        <div className="text-3xl font-bold text-[#2e4a62] mb-2">{item.year}</div>
        <p className="text-gray-700 text-base">{item.text}</p>
      </div>
    ))}
  </div>
</motion.section>


      {/* CTA */}
     <motion.section
  className="w-full py-20 bg-[#2e4a62] text-white text-center"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 1 }}
>
  <h2 className="text-3xl font-bold mb-4">Bëhu pjesë e komunitetit tonë lexues!</h2>
  <p className="mb-6 text-lg">
    Na ndiq për përditësime, libra të rinj dhe oferta ekskluzive.
  </p>
  <Link href="/login">
    <button className="bg-white text-[#2e4a62] px-6 py-2 rounded-full font-semibold hover:bg-gray-200 transition">
      Abonohu tani
    </button>
  </Link>
</motion.section>
    </div>
  );
}

About.displayName = "About | Libraria Bookstore";
