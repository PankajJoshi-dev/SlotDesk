import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { LoaderCircle, Building2, Home, LogOut, X } from "lucide-react";

import logo from "../../assets/images/logo.png";

import { getMyFacilityRequest } from "../../api/facilityApi";
import { useAuth } from "../../contexts/AuthContext";

import SidebarLink from "./SidebarLink";
import getFacilityIcon from "../../utils/FacilityIcons";

function Sidebar({ isOpen, onClose }) {
  const { logout, isLoggingOut } = useAuth();

  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getMyFacilities() {
    setLoading(true);

    try {
      const res = await getMyFacilityRequest();
      setFacilities(res.data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMyFacilities();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      window.location.replace("/");
    } catch {}
  };

  return (
    <>
      {isOpen && (
        <button
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
        />
      )}

      <div
        className={` fixed inset-y-0 left-0 z-50 w-60 lg:w-[12vw] bg-surface transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <div className="flex h-full min-w-0 flex-col">
          <div className="flex min-w-0 items-center justify-between px-4 pt-4 lg:justify-center">
            <NavLink to="/owner" onClick={onClose} className="min-w-0">
              <img
                src={logo}
                alt="SlotDesk Logo"
                className="h-10 max-w-full object-contain"
              />
            </NavLink>

            <button
              onClick={onClose}
              className="rounded-lg p-2 text-text-secondary hover:bg-surface hover:text-text lg:hidden"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="mt-6 flex min-w-0 flex-col gap-1 px-2">
            <SidebarLink to="/owner" icon={Home} onClick={onClose}>
              Dashboard
            </SidebarLink>

            <div className="mt-5 min-w-0">
              <p className="mb-2 truncate px-3 text-xs font-medium uppercase tracking-wide text-text-secondary">
                Facilities
              </p>

              {loading ? (
                <div className="flex justify-center py-3">
                  <LoaderCircle
                    size={18}
                    className="animate-spin text-text-secondary"
                  />
                </div>
              ) : facilities.length === 0 ? (
                <p className="truncate px-3 text-sm text-text-secondary">
                  No facilities
                </p>
              ) : (
                <div className="flex min-w-0 flex-col gap-1">
                  {facilities.map((facility) => (
                    <SidebarLink
                      key={facility._id}
                      to={`/owner/facilities/${facility._id}`}
                      icon={getFacilityIcon(facility?.category)}
                      onClick={onClose}
                    >
                      {facility.name}
                    </SidebarLink>
                  ))}
                </div>
              )}
            </div>
          </nav>
          <div className="mt-auto px-2 pb-4">
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="group flex w-full min-w-0 items-center gap-2 rounded-lg border border-transparent px-3 py-2 text-sm text-text-secondary transition-all hover:border-border hover:bg-surface hover:text-text hover:shadow-sm"
            >
              <LogOut
                size={18}
                className="shrink-0 transition-colors group-hover:text-text"
              />

              <span className="min-w-0 truncate">Logout</span>
            </button>

            <div className="mt-4 border-t border-border pt-3 text-center">
              <p className="truncate text-xs font-medium text-text-secondary">
                SlotDesk
              </p>

              <p className="mt-0.5 truncate text-[10px] text-text-secondary/70">
                &copy; {new Date().getFullYear()} SlotDesk
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
