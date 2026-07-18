"use client";

export default function LoginButton() {
  return (
    <a
      href="/admin/auth/login?returnTo=/home"
      className="inline-block px-6 py-2.5 bg-black hover:bg-yellow-300 text-yellow-200 hover:text-black font-medium rounded-xl text-[15px] tracking-[-0.01em] transition-all duration-200 hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-px active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
    >
      Sign in
    </a>
  );
}