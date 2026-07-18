import { auth0 } from "@/lib/auth0";

export default async function Home() {
  const session = await auth0.getSession();
  const user = session?.user;

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 pt-24">
      <div className="w-full max-w-2xl">
        {user ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back, {user.name}!</h1>
            <p className="text-gray-600">You are now logged in to the League of Locals Admin Panel.</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to League of Locals</h1>
            <h3 className="text-md font-medium text-gray-700 mb-4">Admin Panel</h3>
            <p className="text-gray-600">Please Sign-in to Continue</p>
          </div>
        )}
      </div>
    </main>
  );
}