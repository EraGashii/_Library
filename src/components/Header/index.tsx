import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "@/assets/icons/logo1.svg";
import cs from "classnames";

export function Header() {
  const router = useRouter();

  const hiddenRoutes = ["/Client", "/Client/profile"];
  if (hiddenRoutes.includes(router.pathname)) return null;

  const navItems = [
    { name: "Home", pathName: "/" },
    { name: "About", pathName: "/about" },
    { name: "Contact Us", pathName: "/contact" },
  ];

  return (
    <div className="py-2 px-6 fixed z-50 bg-white border-b w-full shadow-sm">
      <div className="container m-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <img className="h-10" src={Logo.src} alt="Logo" />
        </Link>

        {/* Navigation Links */}
      <div className="flex items-center space-x-8">
      {navItems.map((item, index) => (
        <Link key={index} href={item.pathName} passHref>
          <span
            className={cs("text-gray-800 hover:text-blue-700 transition", {
              "underline font-semibold": router.pathname === item.pathName,
            })}
          >
            {item.name}
          </span>
        </Link>
      ))}
    </div>

        {/* Login/Register Buttons */}
        <div className="flex items-center space-x-4">
          <Link href="/register">
            <button className="px-5 py-2 bg-[#526d88] hover:bg-[#3b5168] text-white rounded-full shadow-md transition">
              Regjistrohu
            </button>
          </Link>
          <Link href="/login">
            <button className="px-5 py-2 border border-[#526d88] text-[#526d88] hover:bg-[#e7e7e7] rounded-full transition">
              Kyçu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
