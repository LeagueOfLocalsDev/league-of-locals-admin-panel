"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavLinksProps {
  isAuthenticated: boolean;
}

export default function NavLinks({ isAuthenticated }: NavLinksProps) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/users", label: "Users" },
    { href: "/courses", label: "Courses" },
    { href: "/meets", label: "Meets" },
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-auto items-center justify-center gap-16">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`text-sm font-medium transition-colors ${
            pathname === link.href
              ? "text-gray-900"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
