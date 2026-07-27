import React from "react";

function RegisterForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <div className="flex flex-col w-80">
        <label htmlFor="name" className="font-semibold text-sm">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="fullName"
          className="border rounded p-2"
          placeholder="Enter your name"
          autoComplete="name"
          required
        />
      </div>

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
          autoComplete="email"
          required
        />
      </div>

      <div className="min-w-0 flex flex-row w-80 gap-2">
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex flex-col">
            <label htmlFor="city" className="font-semibold text-sm">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              className="border rounded p-2 w-full"
              placeholder="Enter your city"
              autoComplete="address-level2"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pinCode" className="font-semibold text-sm">
              PIN Code
            </label>
            <input
              type="text"
              id="pinCode"
              name="pinCode"
              className="border rounded p-2"
              placeholder="Enter your PIN Code"
              maxLength={6}
              inputMode="numeric"
              pattern="[0-9]{6}"
              required
            />
          </div>
        </div>

        <div className="min-w-0 flex flex-col flex-1">
          <label htmlFor="state" className="font-semibold text-sm">
            State
          </label>
          <select
            id="state"
            name="state"
            className="border rounded p-2 w-full"
            autoComplete="address-level1"
            required
          >
            <option value="">Select State</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Delhi">Delhi</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
          </select>
        </div>
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
          autoComplete="new-password"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-primary text-text rounded p-2 transition-colors hover:bg-primary-hover"
      >
        Create Account
      </button>
    </form>
  );
}

export default RegisterForm;
