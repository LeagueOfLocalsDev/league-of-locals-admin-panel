"use client";

import { useUser } from "@auth0/nextjs-auth0/client";
import { usePathname } from "next/navigation";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import LeagueOfLocalsLogo from "@/assets/LeagueOfLocalsLogo.png";
import Link from "next/link";

export default function Navigation() {
  const { user, isLoading } = useUser();
  const pathname = usePathname();

  const navLinks = [
    { href: "/users", label: "Users" },
    { href: "/courses", label: "Courses" },
    { href: "/meets", label: "Meets" },
  ];

  return (
    <div className="fixed py-4 top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex flex-1 items-center gap-3">
          <img src={LeagueOfLocalsLogo.src} alt="League of Locals" className="h-8 w-auto" />
          <span className="text-lg font-semibold text-gray-900">League of Locals</span>
        </div>
        
        <div className="flex flex-1 items-center justify-center gap-16">
          {user && navLinks.map((link) => (
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

        <div className="flex flex-1 items-center justify-end gap-4">
          {isLoading ? (
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <LogoutButton />
            </div>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </div>
  );
}
