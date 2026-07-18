"use client";

export default function LogoutButton() {
  return (
    <a
      href="/admin/auth/logout?returnTo=http://localhost:3000/admin/home"
      className="inline-block px-6 py-2.5 bg-white/[0.04] hover:bg-red-500/10 text-slate-300 hover:text-red-400 font-medium rounded-xl text-[15px] tracking-[-0.01em] border border-white/[0.08] hover:border-red-500/20 transition-all duration-200 focus:outline-none"
    >
      Sign out
    </a>
  );
}