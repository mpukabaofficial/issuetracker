"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" },
  ];

  return (
    <nav className="gap-8 border-b p-4">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              // <Link href={"/api/auth/signout"}>Logout</Link>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <button>
                    <Avatar
                      fallback={
                        session.user?.name!.slice(0, 1).toUpperCase() ?? ""
                      }
                      src={session.user!.image!}
                      size="2"
                      radius="full"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Label>
                    <Text size="2">{session.user?.email}</Text>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item>
                    <Link href={"/api/auth/signout"}>Logout</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href={"/api/auth/signin"}>Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
