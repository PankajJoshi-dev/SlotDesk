import React from "react";

function LoginForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col w-80">
        <label htmlFor="email" className="font-semibold text-sm">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="border rounded p-2"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="flex flex-col w-80">
        <label htmlFor="password" className="font-semibold text-sm">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="border rounded p-2"
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-primary text-text rounded p-2 transition-colors hover:bg-primary-hover"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
