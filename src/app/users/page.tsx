import { auth0 } from "@/lib/auth0";
import { notFound } from "next/navigation";

export default async function Users() {
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pt-24">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Users</h1>
          <p className="text-gray-600">Manage user accounts and permissions.</p>
        </div>
      </div>
    </main>
  );
}
