import { motion } from "framer-motion";
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "", confirmPassword: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Emri është i detyrueshëm.";
      valid = false;
    }

    if (!validateEmail(formData.email)) {
      newErrors.email = "Email-i nuk është i vlefshëm.";
      valid = false;
    }

    if (formData.password.length < 8) {
      newErrors.password = "Fjalëkalimi duhet të ketë së paku 8 karaktere.";
      valid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Fjalëkalimet nuk përputhen.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        });
        

        const data = await res.json();

        if (res.ok) {
          alert("Përdoruesi u regjistrua me sukses! Mund të kyçeni tani.");
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          setErrors({ name: "", email: "", password: "", confirmPassword: "" });
          window.location.href = "/login";
        } else {
          alert(data.message || "Dështoi regjistrimi.");
        }
      } catch (error) {
        alert("Ndodhi një gabim gjatë regjistrimit.");
        console.error("Register error:", error);
      }
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
          <h1 className="text-5xl font-serif font-bold mb-4">Regjistrohuni</h1>
          <p className="text-xl font-light">
            Krijoni një llogari të re duke plotësuar formularin më poshtë.
          </p>
        </motion.section>

        <motion.section
          className="max-w-md w-full py-20 px-6"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="bg-white p-10 rounded-xl shadow-md">
            <h2 className="text-3xl font-serif font-bold text-[#526d88] mb-6 text-center">
              Forma e Regjistrimit
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium">Emri juaj</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#526d88]"
                  placeholder="Shkruani emrin tuaj"
                  required
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#526d88]"
                  placeholder="Shkruani email-in tuaj"
                  required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Fjalëkalimi</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#526d88]"
                  placeholder="Krijoni një fjalëkalim"
                  required
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Përsërit Fjalëkalimin</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-[#526d88]"
                  placeholder="Përsëritni fjalëkalimin tuaj"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="mt-4 px-6 py-3 bg-[#bdbab0] text-white font-semibold rounded-xl shadow hover:bg-[#a6a397] transition"
                >
                  Regjistrohu
                </motion.button>
              </div>
            </form>
          </div>
        </motion.section>

        <motion.section
          className="w-full py-10 bg-[#f8f5e4] text-center text-[#171717]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <p>
            Keni tashmë një llogari?{" "}
            <a href="/login" className="text-[#526d88] underline">
              Kyçuni këtu
            </a>
          </p>
        </motion.section>
      </div>
    </div>
  );
}

Register.displayName = "Register | My Application";
