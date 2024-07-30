"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();

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
              className={classNames({
                "text-zinc-900": currentPath === href,
                "text-zinc-500": currentPath !== href,
                "hover:text-zinc-800 transition-colors": true,
              })}
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
