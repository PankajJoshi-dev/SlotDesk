import React, { useState } from "react";
import { toast } from "sonner";
import { useFacility } from "../../../../contexts/FacilityContext";

function RegisterFacilityForm() {
  const { loading, registerFacility } = useFacility();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    city: "",
    pinCode: "",
    state: "",
    capacity: "",
    openingTime: "",
    closingTime: "",
    slotDuration: "",
    workingDays: [],
    facilityImage: null,
  });

  const inputClass = (field) =>
    `border rounded-lg p-3 transition-all outline-none
    bg-transparent
    focus:border-white/80
    focus:ring-1
    focus:ring-white/80
    text-text text-sm
    placeholder:text-text-muted
    ${errors[field] ? "border-red-500" : "border-border"}`;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      facilityImage: file,
    }));

    setErrors((prev) => ({
      ...prev,
      facilityImage: "",
    }));
  };

  const handleWorkingDayChange = (day) => {
    setFormData((prev) => ({
      ...prev,
      workingDays: prev.workingDays.includes(day)
        ? prev.workingDays.filter((d) => d !== day)
        : [...prev.workingDays, day],
    }));

    setErrors((prev) => ({
      ...prev,
      workingDays: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});

    const {
      name,
      category,
      city,
      pinCode,
      state,
      capacity,
      openingTime,
      closingTime,
      slotDuration,
      workingDays,
      facilityImage,
    } = formData;

    // Basic client-side validation
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Facility name is required.";
    }

    if (!category) {
      newErrors.category = "Select a Category.";
    }

    if (!city.trim()) {
      newErrors.city = "City is required.";
    }

    if (!state) {
      newErrors.state = "State is required.";
    }

    if (!/^\d{6}$/.test(pinCode)) {
      newErrors.pinCode = "Enter a valid 6-digit PIN code.";
    }

    if (!capacity || Number(capacity) < 1) {
      newErrors.capacity = "Capacity must be at least 1.";
    }

    if (!openingTime) {
      newErrors.openingTime = "Opening time is required.";
    }

    if (!closingTime) {
      newErrors.closingTime = "Closing time is required.";
    }

    if (openingTime && closingTime && openingTime >= closingTime) {
      newErrors.closingTime = "Closing time must be after opening time.";
    }

    if (!slotDuration) {
      newErrors.slotDuration = "Select a slot duration.";
    }

    if (workingDays.length === 0) {
      newErrors.workingDays = "Select at least one working day.";
    }

    if (!facilityImage) {
      newErrors.facilityImage = "Facility image is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const toMinutes = (time) => {
        // Time input — value uses 24-hour HH:mm format

        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
      };

      // formData:  React state containing the user's input
      // data:  FormData being prepared for the API
      const data = new FormData();

      data.append("name", name.trim());
      data.append("category", category);
      data.append("city", city.trim());
      data.append("pinCode", pinCode);
      data.append("state", state);
      data.append("capacity", Number(capacity));
      data.append("openingTime", toMinutes(openingTime));
      data.append("closingTime", toMinutes(closingTime));
      data.append("slotDuration", Number(slotDuration));

      workingDays.forEach((day) => {
        data.append("workingDays", day);
      });

      // File
      data.append("facilityImage", facilityImage);

      console.log(facilityImage);
      console.log(facilityImage instanceof File);
      console.log(facilityImage.name);
      console.log(facilityImage.size);

      await registerFacility(data);
      toast.success("Facility created successfully!");

      setFormData({
        name: "",
        category: "",
        city: "",
        pinCode: "",
        state: "",
        capacity: "",
        openingTime: "",
        closingTime: "",
        slotDuration: "",
        workingDays: [],
        facilityImage: null,
      });
    } catch (error) {
      const field = error.response?.data?.field;

      setErrors({
        field: error.response?.data?.message || "Something went wrong.",
      });
    }
  };

  const categories = [
    "Sports",
    "Fitness",
    "Recreation",
    "Academic",
    "Study",
    "Meeting",
    "Events",
    "Arts",
    "Workspace",
    "Dining",
    "Parking",
    "Other",
  ];

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <form
      className="
        w-full
        max-w-6xl
        mx-auto
        border
        border-border
        rounded-xl
        p-8
      "
      onSubmit={handleSubmit}
    >
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-text">Register Facility</h2>

        <p className="text-sm text-text-muted mt-1">
          Add your facility details to get started.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6">
        {/* Facility Image */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-xs text-text">
            Facility Image
          </label>

          <label
            htmlFor="facilityImage"
            className="
              h-24
              border
              border-dashed
              border-primary
              rounded-lg
              flex
              flex-col
              items-center
              justify-center
              cursor-pointer
              hover:bg-surface
              transition
            "
          >
            <span className="text-primary text-xl">+</span>

            <span className="text-sm text-text">
              {formData.facilityImage
                ? formData.facilityImage.name
                : "Upload facility image"}
            </span>

            <span className="text-xs text-text-muted mt-1">
              JPG, PNG up to 5MB
            </span>
          </label>

          <input
            id="facilityImage"
            type="file"
            accept="image/png,image/jpeg"
            className="hidden"
            onChange={handleImageChange}
          />

          {errors.facilityImage && (
            <p className="text-sm text-error">{errors.facilityImage}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold text-xs text-text">
            Facility Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            className={inputClass("name")}
            placeholder="Enter facility name"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && <p className="text-sm text-error">{errors.name}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="font-semibold text-xs text-text">
            Category
          </label>

          <select
            id="category"
            name="category"
            className={inputClass("category")}
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>

            {categories.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {errors.category && (
            <p className="text-sm text-error">{errors.category}</p>
          )}
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <p className="font-semibold text-xs text-text mb-3">Address</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="city" className="font-semibold text-xs text-text">
                City
              </label>

              <input
                type="text"
                id="city"
                name="city"
                className={inputClass("city")}
                placeholder="Enter city"
                autoComplete="address-level2"
                value={formData.city}
                onChange={handleChange}
              />

              {errors.city && (
                <p className="text-sm text-error">{errors.city}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
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
                placeholder="Enter PIN code"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                value={formData.pinCode}
                onChange={handleChange}
              />

              {errors.pinCode && (
                <p className="text-sm text-error">{errors.pinCode}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="state"
                className="font-semibold text-xs text-text"
              >
                State
              </label>

              <select
                id="state"
                name="state"
                className={inputClass("state")}
                value={formData.state}
                onChange={handleChange}
              >
                <option value="">Select state</option>

                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              {errors.state && (
                <p className="text-sm text-error">{errors.state}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="capacity" className="font-semibold text-xs text-text">
            Capacity
          </label>

          <input
            type="number"
            id="capacity"
            name="capacity"
            min="1"
            className={inputClass("capacity")}
            placeholder="e.g. 50"
            value={formData.capacity}
            onChange={handleChange}
          />

          {errors.capacity && (
            <p className="text-sm text-error">{errors.capacity}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="slotDuration"
            className="font-semibold text-xs text-text"
          >
            Slot Duration
          </label>

          <select
            id="slotDuration"
            name="slotDuration"
            className={inputClass("slotDuration")}
            value={formData.slotDuration}
            onChange={handleChange}
          >
            <option value="">Select slot duration</option>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="45">45 minutes</option>
            <option value="60">1 hour</option>
          </select>

          {errors.slotDuration && (
            <p className="text-sm text-error">{errors.slotDuration}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-xs text-text">
            Operating Hours
          </label>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="openingTime"
                className="text-xs text-text-secondary"
              >
                Opens
              </label>
              <input
                type="time"
                id="openingTime"
                name="openingTime"
                className={inputClass("openingTime")}
                value={formData.openingTime}
                onChange={handleChange}
              />

              {errors.openingTime && (
                <p className="text-sm text-error">{errors.openingTime}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="closingTime"
                className="text-xs text-text-secondary"
              >
                Closes
              </label>

              <input
                type="time"
                id="closingTime"
                name="closingTime"
                className={inputClass("closingTime")}
                value={formData.closingTime}
                onChange={handleChange}
              />

              {errors.closingTime && (
                <p className="text-sm text-error">{errors.closingTime}</p>
              )}
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <p className="font-semibold text-xs text-text">Working Days</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {days.map((day) => (
              <label
                key={day}
                className="
                  flex
                  items-center
                  gap-2
                  border
                  border-border
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  text-text
                  cursor-pointer
                  hover:bg-white/5
                  transition
                "
              >
                <input
                  type="checkbox"
                  checked={formData.workingDays.includes(day)}
                  onChange={() => handleWorkingDayChange(day)}
                />

                {day}
              </label>
            ))}
          </div>

          {errors.workingDays && (
            <p className="text-sm text-error">{errors.workingDays}</p>
          )}
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-primary
              text-text
              text-sm
              font-medium
              rounded-lg
              py-3
              transition-colors
              hover:bg-primary-hover
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Creating Facility..." : "Create Facility"}
          </button>
        </div>
      </div>

      {errors.general && (
        <p className="text-sm text-error mt-4">{errors.general}</p>
      )}
    </form>
  );
}

export default RegisterFacilityForm;
