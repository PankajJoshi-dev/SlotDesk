import { useState } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "sonner";
import { X, Menu } from "lucide-react";

function Navbar() {
  const { user, loading, logout, isLoggingOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
      closeMenu();

      // Navigte directly to landing page even if private
      window.location.replace("/");

      toast.success("Logged out.");
    } catch {
      // Error is handled by the Axios interceptor.
    }
  };

  const navLinkClass = ({ isActive }) =>
    `text-sm transition-all ${
      isActive
        ? "font-medium"
        : "text-text-secondary hover:text-text hover:underline"
    }`;

  return (
    <nav className="fixed top-0 left-0 z-50 h-16 w-full bg-surface  shadow-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <NavLink to="/" className="flex items-center" onClick={closeMenu}>
          <img src={logo} alt="SlotDesk Logo" className="h-10 w-auto" />
        </NavLink>

        <div className="hidden items-center gap-6 md:flex">
          <NavLink to="/facilities" className={navLinkClass}>
            Browse
          </NavLink>

          {!loading && user && (
            <>
              <NavLink to="/bookings" className={navLinkClass}>
                My Bookings
              </NavLink>
              <NavLink
                to="/register-facility"
                className={navLinkClass}
                onClick={closeMenu}
              >
                Register Facility
              </NavLink>
              {user.isFacilityOwner && (
                <NavLink
                  to="/owner"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  Owner
                </NavLink>
              )}
            </>
          )}

          {!loading &&
            (!user ? (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/register"
                  className="rounded-sm bg-primary px-3 py-2 text-sm transition-all hover:bg-primary-hover"
                >
                  Register
                </NavLink>

                <NavLink
                  to="/login"
                  className="rounded-sm bg-primary px-3 py-2 text-sm transition-all hover:bg-primary-hover"
                >
                  Login
                </NavLink>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-sm bg-primary px-3 py-2 text-sm transition-all hover:bg-primary-hover"
              >
                Logout
              </button>
            ))}
        </div>

        <button
          type="button"
          className="text-2xl leading-none text-text-secondary transition-all hover:text-text md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div
        className="overflow-hidden bg-surface transition-all duration-500 ease-in-out md:hidden"
        style={{
          maxHeight: isMenuOpen ? "300px" : "0px",
          opacity: isMenuOpen ? 1 : 0,
        }}
      >
        <div className="border-t border-text-secondary/10 px-6 py-4 shadow-md">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 text-center">
            <NavLink
              to="/facilities"
              className={navLinkClass}
              onClick={closeMenu}
            >
              Browse
            </NavLink>

            {!loading && user && (
              <>
                <NavLink
                  to="/bookings"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  My Bookings
                </NavLink>
                <NavLink
                  to="/register-facility"
                  className={navLinkClass}
                  onClick={closeMenu}
                >
                  Register Facility
                </NavLink>
                {user.isFacilityOwner && (
                  <NavLink
                    to="/owner"
                    className={navLinkClass}
                    onClick={closeMenu}
                  >
                    Owner
                  </NavLink>
                )}
              </>
            )}

            {!loading &&
              (!user ? (
                <div className="flex justify-center gap-2">
                  <NavLink
                    to="/register"
                    onClick={closeMenu}
                    className="rounded-sm bg-primary px-3 py-2 text-sm transition-all hover:bg-primary-hover"
                  >
                    Register
                  </NavLink>

                  <NavLink
                    to="/login"
                    onClick={closeMenu}
                    className="rounded-sm bg-primary px-3 py-2 text-sm transition-all hover:bg-primary-hover"
                  >
                    Login
                  </NavLink>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  className="rounded-sm bg-primary px-3 py-2 text-sm transition-all hover:bg-primary-hover"
                >
                  Logout
                </button>
              ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
