import { motion } from "framer-motion";
import Image from "next/image";
import CustomImage from "@/assets/images/image.png";

export default function About() {
  return (
    <div className="pt-14 bg-[#e7e5df] text-[#171717]">
     <div className="flex flex-col items-center justify-center min-h-screen px-4">

        {/* Hero Section */}
        <motion.section
          className="w-full py-20 bg-[#526d88] text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-serif font-bold mb-4">
            Rreth Nesh
          </h1>
          <p className="text-xl font-light">
            Ne jemi një ekip pasionant që ndërtojmë aplikacione moderne dhe të fuqishme me teknologji të avancuar.
          </p>
        </motion.section>

        {/* Misioni */}
        <motion.section
          className="max-w-6xl py-20 px-6 text-center"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-[#526d88] font-serif">
            Misioni Ynë
          </h2>
          <p className="text-gray-700 text-lg">
            Misioni ynë është të ofrojmë zgjidhje inovative dhe të qëndrueshme për zhvillimin e aplikacioneve që përmbushin nevojat e klientëve tanë në mënyrë të plotë.
          </p>
        </motion.section>

        {/* Vizioni */}
        <motion.section
          className="w-full py-20 bg-[#f8f5e4] text-center"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-[#526d88] font-serif">
              Vizioni Ynë
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-white text-left text-[#171717] p-8 rounded-xl shadow">
                <p className="text-lg leading-relaxed">
                  Ne aspirojmë të bëhemi liderë në fushën e zhvillimit të aplikacioneve, duke krijuar produkte të qëndrueshme dhe të adaptueshme për të gjithë përdoruesit.
                </p>
              </div>
              <div>
                <Image
                  src={CustomImage}
                  alt="Ekipi ynë"
                  width={500}
                  height={300}
                  className="rounded-xl shadow-md object-cover"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Vlerat */}
        <motion.section
          className="max-w-6xl py-20 px-6 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-10 text-[#526d88] font-serif">
            Vlerat Tona
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-[#bdbab0] text-white rounded-xl shadow-md">
              <p className="text-lg font-semibold">Integriteti & Transparenca</p>
            </div>
            <div className="p-6 bg-[#bdbab0] text-white rounded-xl shadow-md">
              <p className="text-lg font-semibold">Pasioni për Teknologjinë</p>
            </div>
            <div className="p-6 bg-[#bdbab0] text-white rounded-xl shadow-md">
              <p className="text-lg font-semibold">Kujdesi për Përdoruesin</p>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="w-full py-20 bg-[#526d88] text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 font-serif">Na Kontaktoni</h2>
          <p>Email: contact@mycompany.com</p>
          <p>Tel: +383 123 456 789</p>
          <p>Adresa: Prishtinë, Kosovë</p>
        </motion.section>
      </div>
    </div>
  );
}

About.displayName = "About | My Application";