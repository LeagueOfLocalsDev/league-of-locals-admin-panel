import { auth0 } from "@/lib/auth0";
import NavLinks from "./NavLinks";
import AuthButtons from "./AuthButtons";
import LeagueOfLocalsLogo from "@/assets/LeagueOfLocalsLogo.png";

export default async function Navigation() {
  const session = await auth0.getSession();
  const isAuthenticated = !!session?.user;

  return (
    <div className="fixed py-4 top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex flex-1 items-center gap-3">
          <img src={LeagueOfLocalsLogo.src} alt="League of Locals" className="h-8 w-auto" />
          <span className="text-lg font-semibold text-gray-900">League of Locals</span>
        </div>
        
        <NavLinks isAuthenticated={isAuthenticated} />

        <div className="flex flex-1 items-center justify-end gap-4">
          <AuthButtons isAuthenticated={isAuthenticated} />
        </div>
      </div>
    </div>
  );
}
