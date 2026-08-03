import React from "react";
import favicon from "/favicon.png";
import RegisterForm from "./components/RegisterForm";

function Register() {
  return (
    <div className="min-h-[90%] flex flex-col justify-start items-center gap-4 pt-12">
      <img src={favicon} alt="logo" className="h-10" />
      <p className="text-text font-semibold text-lg">Register to SlotDesk</p>
      <RegisterForm />
    </div>
  );
}

export default Register;
