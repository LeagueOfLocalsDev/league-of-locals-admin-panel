"use client";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  isLoading?: boolean;
}

export default function AuthButtons({ isAuthenticated, isLoading }: AuthButtonsProps) {
  if (isLoading) {
    return <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />;
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <LogoutButton />
      </div>
    );
  }

  return <LoginButton />;
}
