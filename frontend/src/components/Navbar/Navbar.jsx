import React from "react";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
import SearchBar from "./components/Searchbar";

function Navbar() {
  const { user, loading, logout } = useAuth();

  const handleClick = async () => {
    try {
      await logout();
      toast.success("Logged out.");
    } catch {
      // Error is handled by the Axios interceptor.
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 h-16 px-6 bg-surface flex justify-between items-center shadow-md">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="SlotDesk Logo" className="h-14 w-auto" />
      </Link>

      <SearchBar />

      {loading ? null : !user ? (
        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-primary transition-colors hover:bg-primary-hover px-3 py-2 rounded-sm font-semibold"
          >
            Register
          </Link>

          <Link
            to="/login"
            className="bg-primary transition-colors hover:bg-primary-hover px-3 py-2 rounded-sm font-semibold"
          >
            Login
          </Link>
        </div>
      ) : (
        <button
          onClick={handleClick}
          className="bg-primary transition-colors hover:bg-primary-hover px-3 py-2 rounded-sm font-semibold"
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
