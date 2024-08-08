"use client";

import Link from "next/link";
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
import { usePathname } from "next/navigation";
import { Skeleton } from "./components";

const Navbar = () => {
  return (
    <nav className="gap-8 border-b p-4">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href={"/"}>
              <AiFillBug className="text-2xl" />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" },
  ];

  return (
    <ul className="flex gap-4">
      {links.map(({ href, label }) => (
        <li key={`${href}${label}`}>
          <Link
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": currentPath === href,
            })}
            href={href}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href={"/api/auth/signin"}>
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <button>
            <Avatar
              fallback={session!.user?.name!.slice(0, 1).toUpperCase() ?? ""}
              src={session!.user!.image!}
              size="2"
              radius="full"
              referrerPolicy="no-referrer"
            />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={"/api/auth/signout"}>Logout</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;
