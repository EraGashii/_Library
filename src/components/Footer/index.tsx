import Link from "next/link";
import Logo from "@/assets/icons/logo1.svg";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Footer() {
  const router = useRouter();

  const hiddenRoutes = ["/Client", "/Client/profile", "/Client/shoppingcart", "/Client/wishlist"];
  if (hiddenRoutes.includes(router.pathname)) return null;
  
  return (
    <footer className="border-t bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Kolona 1 - Logo & Newsletter */}
        <div>
       <Link href="/" className="block w-fit">
  <Image
    src={Logo.src}
    alt="Logo"
    width={120}
    height={40}
    className="mb-4"
  />
</Link>

          <p className="text-sm mb-2">Për të qëndruar i informuar</p>
          <p className="text-lg font-bold mb-2">Abonohu në newsletter-in tonë.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-300 rounded-l px-3 py-2 text-sm w-full"
            />
            <button className="bg-gray-800 text-white px-4 rounded-r text-sm">
              Subscribe
            </button>
          </form>
        </div>

        {/* Kolona 2 - Libraria */}
        <div>
          <h4 className="font-semibold mb-3">Libraria</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Rreth Nesh</Link></li>
            <li><Link href="#">Shërbimet</Link></li>
            <li><Link href="#">Ofertat</Link></li>
            <li><Link href="#">Karriera</Link></li>
          </ul>
        </div>

        {/* Kolona 3 - Për Klientë */}
        <div>
          <h4 className="font-semibold mb-3">Për Klientë</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="#">Kontakt</Link></li>
            <li><Link href="#">Politika e Kthimit</Link></li>
            <li><Link href="#">Pyetje të Shpeshta</Link></li>
            <li><Link href="#">Ndihmë</Link></li>
          </ul>
        </div>

        {/* Kolona 4 - Rrjetet sociale */}
        <div>
          <h4 className="font-semibold mb-3">Na ndiqni</h4>
          <div className="flex space-x-4 text-lg">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaWhatsapp /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Email: contact@libraria.com</p>
            <p>Tel: +383 123 456 789</p>
            <p>Adresa: Prishtinë, Kosovë</p>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 py-4 border-t">
        © {new Date().getFullYear()} Libraria Online. All rights reserved.
      </div>
    </footer>
  );
}
