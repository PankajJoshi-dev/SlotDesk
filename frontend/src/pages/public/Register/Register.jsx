import React from "react";
import favicon from "/favicon.png";
import RegisterForm from "./components/RegisterForm";

function Register() {
  return (
    <div className="min-h-[90%] flex flex-col justify-start items-center gap-4 pt-24">
      <img src={favicon} alt="logo" className="h-16" />
      <p className="text-text font-bold text-xl">Register to SlotDesk</p>
      <RegisterForm />
    </div>
  );
}

export default Register;
