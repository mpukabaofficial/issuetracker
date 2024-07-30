import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
const Navbar = () => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues", label: "Issues" },
  ];

  return (
    <nav className="flex gap-8 border-b p-4">
      <Link href={"/"}>
        <AiFillBug className="text-2xl" />
      </Link>
      <ul className="flex gap-4">
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <Link
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
