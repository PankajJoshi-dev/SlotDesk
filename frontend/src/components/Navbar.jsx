import React from "react";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 h-16 px-6 bg-surface  flex flex-row justify-between items-center  shadow-md">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="SlotDesk Logo" className="h-14 w-auto" />
      </Link>
      <div className="flex flex-row justify-end gap-4">
        <Link
          to={"/register"}
          className="bg-primary transition-colors hover:bg-primary-hover px-3 py-2 rounded-sm font-semibold"
        >
          Register
        </Link>
        <Link
          to={"/Login"}
          className="bg-primary transition-colors hover:bg-primary-hover px-3 py-2 rounded-sm font-semibold"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
