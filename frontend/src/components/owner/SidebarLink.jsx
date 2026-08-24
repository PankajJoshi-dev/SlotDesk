import { NavLink } from "react-router-dom";

function SidebarLink({ to, icon: Icon, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      end
      className={({ isActive }) =>
        `group flex min-w-0 w-full items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all ${
          isActive
            ? "border-primary/10 bg-primary/10 font-medium"
            : "border-transparent text-text-secondary hover:border-border hover:bg-surface hover:text-text hover:shadow-sm"
        }`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={18}
            className={
              isActive
                ? "shrink-0 text-primary"
                : "shrink-0 text-text-secondary group-hover:text-text"
            }
          />

          <span className="min-w-0 truncate">{children}</span>
        </>
      )}
    </NavLink>
  );
}

export default SidebarLink;
