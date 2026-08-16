import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import Landing from "../pages/public/Landing/Landing";
import Login from "../pages/public/Login/Login";
import Register from "../pages/public/Register/Register";

import Home from "../pages/user/Home/Home";
import BrowseFacilities from "../pages/user/BrowseFacilities/BrowseFacilities";
import FacilityBooking from "../pages/user/FacilityBooking/FacilityBooking";
import BookingSuccess from "../pages/user/BookingSuccess/BookingSuccess";
import MyBookings from "../pages/user/MyBookings/MyBookings";

import OwnerDashboard from "../pages/owner/Dashboard/Dashboard";
import MyFacilities from "../pages/owner/MyFacilities/MyFacilities";
import CreateFacility from "../pages/owner/CreateFacility/CreateFacility";
import FacilityBookings from "../pages/owner/FacilityBookings/FacilityBookings";

import AdminDashboard from "../pages/admin/Dashboard/Dashboard";
import Users from "../pages/admin/Users/Users";

import Error from "../pages/errors/Error";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<PrivateRoute />}>
          {/* User */}
          <Route path="/home" element={<Home />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/bookings/:bookingId" element={<MyBookings />} />
          {/* Owner */}
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/facilities/create" element={<CreateFacility />} />
          <Route path="/owner/facilities" element={<MyFacilities />} />
          <Route
            path="/owner/facilities/:facilityId/bookings"
            element={<FacilityBookings />}
          />
          {/* Admin */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
        </Route>

        <Route path="/facilities" element={<BrowseFacilities />} />
        <Route path="/facilities/:facilityId" element={<FacilityBooking />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}
