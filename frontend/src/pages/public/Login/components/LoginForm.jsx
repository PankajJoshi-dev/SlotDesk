import React, { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { toast } from "sonner";

function LoginForm() {
  const { loading, login } = useAuth();

  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear form error as soon as user starts editing
    setFormError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError("");

    try {
      await login(formData);
      toast.success("Welcome back!");
    } catch (error) {
      setFormError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Email */}
      <div className="flex flex-col w-80">
        <label htmlFor="email" className="font-semibold text-xs text-text">
          Email
        </label>

        <input
          type="email"
          id="email"
          name="email"
          className={`border rounded p-2 transition-colors outline-none focus:border-white/80 focus:ring-1 focus:ring-white/80 text-text text-sm ${formError ? "border-red-500" : "border-border"}`}
          placeholder="Enter your email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col w-80">
        <label htmlFor="password" className="font-semibold text-xs text-text">
          Password
        </label>

        <input
          type="password"
          id="password"
          name="password"
          className={`border rounded p-2 transition-colors outline-none focus:border-white/80 focus:ring-2 focus:ring-white/80 text-text text-sm ${formError ? "border-red-500" : "border-border"}`}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      {/* Form Error */}
      {formError && (
        <p className="text-sm font-medium text-error">{formError}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-text text-sm rounded p-2 transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
