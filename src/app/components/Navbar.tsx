"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navLink = (href: string, label: string) => (
    <Link
      href={href}
      className={`px-4 py-2 rounded hover:bg-blue-600 hover:text-white ${
        pathname === href ? "bg-blue-500 text-white" : "text-gray-700"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-gray-100 px-6 py-4 shadow-md flex items-center justify-between">
      <h1 className="text-xl font-bold text-blue-700">BlogUser App</h1>
      <div className="space-x-2">
        {navLink("/", "Home")}
        {navLink("/users", "Users")}
        {navLink("/blog", "Blog")}
        {navLink('/categories', 'Categories')}
      </div>
    </nav>
  );
};

export default Navbar;
