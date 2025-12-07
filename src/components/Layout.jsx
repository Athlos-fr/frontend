import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Outlet renders the child route (Discover, Profile, etc.) */}
        <Outlet />
      </main>

      {/* Optional Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 text-center text-gray-400 text-sm">
        © 2025 Athlos. Gamify your life.
      </footer>
    </div>
  );
};

export default Layout;
