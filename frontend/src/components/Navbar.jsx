import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md 
      border-b border-gray-800 shadow-lg"
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo & App Name */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-all">
          <div className="size-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-xl font-bold text-white">ChitChat</h1>
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/settings"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800
            hover:bg-gray-700 transition-all text-white text-sm"
          >
            <Settings className="w-5 h-5" />
            <span className="hidden sm:inline">Settings</span>
          </Link>

          {authUser && (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800
                hover:bg-gray-700 transition-all text-white text-sm"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>

              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600
                hover:bg-red-500 transition-all text-white text-sm"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
