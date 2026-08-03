import React, { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";
import { toast } from "sonner";

function RegisterForm() {
  const { register, loading } = useAuth();

  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    city: "",
    pinCode: "",
    state: "",
    password: "",
    confirmPassword: "",
  });

  const inputClass = (field) =>
    `border rounded p-2 transition-all outline-none
   focus:border-white/80
   focus:ring-1
   focus:ring-white/80 text-text text-sm
   ${errors[field] ? "border-red-500" : "border-border"}`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for the field being edited
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        confirmPassword: "Passwords do not match.",
      });
      return;
    }

    const { city, state, pinCode, ...rest } = formData;

    const userData = {
      ...rest,
      address: {
        city,
        state,
        pinCode,
      },
    };

    try {
      await register(userData);
      toast.success("Welcome to SlotDesk!");
    } catch (error) {
      setErrors({
        [error.response?.data?.field]:
          error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      {/* Name */}
      <div className="flex flex-col w-80">
        <label htmlFor="fullName" className="font-semibold text-xs text-text">
          Name
        </label>

        <input
          type="text"
          id="fullName"
          name="fullName"
          className={inputClass("fullName")}
          placeholder="Enter your name"
          autoComplete="name"
          required
          value={formData.fullName}
          onChange={handleChange}
        />

        {errors.fullName && (
          <p className="text-sm text-error">{errors.fullName}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col w-80">
        <label htmlFor="email" className="font-semibold text-xs text-text">
          Email
        </label>

        <input
          type="email"
          id="email"
          name="email"
          className={inputClass("email")}
          placeholder="Enter your email"
          autoComplete="email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        {errors.email && <p className="text-sm text-error">{errors.email}</p>}
      </div>

      {/* Address */}
      <div className="flex w-80 gap-2">
        <div className="flex flex-col gap-2 flex-1">
          {/* City */}
          <div className="flex flex-col">
            <label htmlFor="city" className="font-semibold text-xs text-text">
              City
            </label>

            <input
              type="text"
              id="city"
              name="city"
              className={inputClass("city")}
              placeholder="Enter your city"
              autoComplete="address-level2"
              required
              value={formData.city}
              onChange={handleChange}
            />

            {errors.city && <p className="text-sm text-error">{errors.city}</p>}
          </div>

          {/* PIN Code */}
          <div className="flex flex-col">
            <label
              htmlFor="pinCode"
              className="font-semibold text-xs text-text"
            >
              PIN Code
            </label>

            <input
              type="text"
              id="pinCode"
              name="pinCode"
              className={inputClass("pinCode")}
              placeholder="Enter your PIN Code"
              autoComplete="postal-code"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              required
              value={formData.pinCode}
              onChange={handleChange}
            />

            {errors.pinCode && (
              <p className="text-sm text-error">{errors.pinCode}</p>
            )}
          </div>
        </div>

        {/* State */}
        <div className="flex flex-col flex-1">
          <label htmlFor="state" className="font-semibold text-xs text-text">
            State
          </label>

          <select
            id="state"
            name="state"
            className={inputClass("state")}
            autoComplete="address-level1"
            required
            value={formData.state}
            onChange={handleChange}
          >
            <option value="">Select State</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Delhi">Delhi</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>

          {errors.state && <p className="text-sm text-error">{errors.state}</p>}
        </div>
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
          className={inputClass("password")}
          placeholder="Enter your password"
          autoComplete="new-password"
          required
          value={formData.password}
          onChange={handleChange}
        />

        {errors.password && (
          <p className="text-sm text-error">{errors.password}</p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col w-80">
        <label
          htmlFor="confirmPassword"
          className="font-semibold text-xs text-text"
        >
          Confirm Password
        </label>

        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          className={inputClass("confirmPassword")}
          placeholder="Confirm your password"
          autoComplete="new-password"
          required
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {errors.confirmPassword && (
          <p className="text-sm text-error">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-text text-sm rounded p-2 transition-colors hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}

export default RegisterForm;
