import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e: any) =>{
        const {name,value} = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // You can add an API call here to submit the form data
        setFormData({ name: "", email: "", message: "" }); // Clear the form after submission
      };
      
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
              <h1 className="text-5xl font-bold mb-4">Na Kontaktoni</h1>
              <p className="text-xl">
                Jemi të gatshëm t'ju ndihmojmë! Plotësoni formularin më poshtë për të na kontaktuar.
              </p>
            </motion.section>
      
            {/* Contact Form Section */}
            <motion.section
              className="max-w-4xl w-full py-20 px-6"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-3xl font-bold text-yellow-600 mb-6 text-center">
                  Formulari i Kontaktit
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700">Emri juaj</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full mt-2 p-3 border rounded-xl"
                      placeholder="Shkruani emrin tuaj"
                      required
                    />
                  </div>
      
                  <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full mt-2 p-3 border rounded-xl"
                      placeholder="Shkruani email-in tuaj"
                      required
                    />
                  </div>
      
                  <div>
                    <label className="block text-gray-700">Mesazhi</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full mt-2 p-3 border rounded-xl"
                      placeholder="Shkruani mesazhin tuaj"
                      required
                    />
                  </div>
      
                  <div className="text-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="mt-4 px-6 py-3 bg-yellow-600 text-black rounded-xl"
                    >
                      Dërgo Mesazhin
                    </motion.button>
                  </div>
                </form>
              </div>
            </motion.section>
            {/* Contact Information Section */}
            <motion.section
              className="w-full py-20 bg-yellow-600 text-black text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-3xl font-bold mb-6">
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
