import { motion } from "framer-motion";
import Image from "next/image";
import CustomImage from "@/assets/images/image.png";

export default function About() {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* Introduction Section */}
        <motion.section
          className="w-full py-20 bg-yellow-600 text-black text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold mb-4">Rreth Nesh</h1>
          <p className="text-xl">
            Ne jemi një ekip pasionant që ndërtojmë aplikacione moderne dhe të fuqishme me teknologji të avancuar.
          </p>
        </motion.section>

        {/* Our Mission Section */}
        <motion.section
        className="max-w-6xl py-20 px-6 text-center"
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        transition={{ duration: 1 }}
        >
        <h2 className="text-4xl font-bold mb-6 text-yellow-600">Misioni Ynë</h2>
        <p className="text-gray-700 mb-6">
            Misioni ynë është të ofrojmë zgjidhje inovative dhe të qëndrueshme për zhvillimin e aplikacioneve që përmbushin nevojat e klientëve tanë në mënyrë të plotë.
        </p>
        </motion.section>
        {/* Our Vision Section */}
        <motion.section
            className="w-full py-20 bg-gray-200 text-center"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ duration: 1 }}
        >
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-yellow-600">
            Vizioni Ynë
          </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-black rounded-xl shadow-md">
            <p>
              Ne aspirojmë të bëhemi liderë në fushën e zhvillimit të aplikacioneve, 
              duke krijuar produkte të qëndrueshme dhe të adaptueshme për të gjithë përdoruesit.
            </p>
          </div>
          <div>
            <Image
                  src={CustomImage}
                  alt="Ekipi ynë"
                  width={500}
                  height={300}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Our Values Section */}
        <motion.section
        className="max-w-6xl py-20 px-6 text-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1 }}
        >
        <h2 className="text-4xl font-bold mb-6 text-yellow-600">
            Vlerat Tona
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-black rounded-xl shadow-md">
            Integriteti & Transparenca
            </div>
            <div className="p-6 bg-black rounded-xl shadow-md">
            Pasioni për Teknologjinë
            </div>
            <div className="p-6 bg-black rounded-xl shadow-md">
            Kujdesi për Përdoruesin
            </div>
        </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="w-full py-20 bg-yellow-600 text-black text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">Na Kontaktoni</h2>
          <p>Email: contact@mycompany.com</p>
          <p>Tel: +383 123 456 789</p>
          <p>Adresa: Prishtinë, Kosovë</p>
        </motion.section>
      </div>
    </div>
  );
}

About.displayName = "About | My Application";


//git