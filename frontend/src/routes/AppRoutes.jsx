import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import OwnerRoute from "./OwnerRoute";

import Landing from "../pages/public/Landing/Landing";
import Login from "../pages/public/Login/Login";
import Register from "../pages/public/Register/Register";

import Home from "../pages/user/Home/Home";
import BrowseFacilities from "../pages/user/BrowseFacilities/BrowseFacilities";
import FacilityBooking from "../pages/user/FacilityBooking/FacilityBooking";
import BookingSuccess from "../pages/user/BookingSuccess/BookingSuccess";
import MyBookings from "../pages/user/MyBookings/MyBookings";
import RegisterFacility from "../pages/user/RegisterFacility/RegisterFacility";

import OwnerDashboard from "../pages/owner/Dashboard/Dashboard";
import MyFacilities from "../pages/owner/MyFacilities/MyFacilities";
import ManageFacility from "../pages/owner/ManageFacility/ManageFacility";
import EditFacility from "../pages/owner/EditFacility/EditFacility";
import FacilityBookings from "../pages/owner/FacilityBookings/FacilityBookings";

import Error from "../pages/errors/Error";
import OwnerLayout from "../layouts/OwnerLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/facilities" element={<BrowseFacilities />} />
        <Route path="/facilities/:facilityId" element={<FacilityBooking />} />

        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/bookings/:bookingId" element={<MyBookings />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/register-facility" element={<RegisterFacility />} />
        </Route>

        <Route path="/404" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Route>

      <Route element={<OwnerLayout />}>
        <Route element={<PrivateRoute />}>
          {/* Owner */}
          <Route element={<OwnerRoute />}>
            <Route path="/owner" element={<OwnerDashboard />} />
            <Route path="/owner/facilities" element={<MyFacilities />} />
            <Route
              path="/owner/facilities/:facilityId"
              element={<ManageFacility />}
            />
            <Route
              path="/owner/facilities/:facilityId/edit"
              element={<EditFacility />}
            />
            <Route
              path="/owner/facilities/:facilityId/bookings"
              element={<FacilityBookings />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
