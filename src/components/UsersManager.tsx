import { getUsers, UserProfile } from "@/lib/fetcher/clients/users";
import { auth0 } from "@/lib/auth0";

export default async function UsersManager() {
  let userProfiles: UserProfile[] = [];
  let error: string | null = null;

  try {
    const data = await getUsers();
    userProfiles = data;
  } catch (e: any) {
    error = e.message;
  }

  const session = await auth0.getSession();
  const user = session?.user;

  if (!user) return <div>Please sign in to manage users.</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      {error ? (
        <div className="text-red-600">Error: {error}</div>
      ) : (
        <table className="min-w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-3 border-b text-gray-600">Username</th>
              <th className="py-2 px-3 border-b text-gray-600">Email / Auth0</th>
              <th className="py-2 px-3 border-b text-gray-600">Home City</th>
              <th className="py-2 px-3 border-b text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userProfiles.map((p) => (
              <tr key={p.userId} className="odd:bg-white even:bg-gray-50">
                <td className="py-2 px-3 border-b text-gray-600">{p.username}</td>
                <td className="py-2 px-3 border-b text-gray-600">{p.auth0UserId}</td>
                <td className="py-2 px-3 border-b text-gray-600">{p.homeCity}</td>
                <td className="py-2 px-3 border-b text-gray-600">Button</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
