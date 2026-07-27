import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

// Public
import Landing from "../pages/public/Landing/Landing";
import Login from "../pages/public/Login/Login";
import Register from "../pages/public/Register/Register";

// User
import Home from "../pages/user/Home/Home";
import BrowseFacilities from "../pages/user/BrowseFacilities/BrowseFacilities";
import FacilityDetails from "../pages/user/FacilityDetails/FacilityDetails";
import BookSlot from "../pages/user/BookSlot/BookSlot";
import MyBookings from "../pages/user/MyBookings/MyBookings";

// Owner
import OwnerDashboard from "../pages/owner/Dashboard/Dashboard";
import MyFacilities from "../pages/owner/MyFacilities/MyFacilities";
import CreateFacility from "../pages/owner/CreateFacility/CreateFacility";
import FacilityBookings from "../pages/owner/FacilityBookings/FacilityBookings";

// Admin
import AdminDashboard from "../pages/admin/Dashboard/Dashboard";
import Users from "../pages/admin/Users/Users";
import Facilities from "../pages/admin/Facilities/Facilities";

// Errors
import Error from "../pages/errors/Error";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* ---------- Public ---------- */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ---------- User ---------- */}
          <Route path="/home" element={<Home />} />
          <Route path="/facilities" element={<BrowseFacilities />} />
          <Route path="/facilities/:facilityId" element={<FacilityDetails />} />
          <Route path="/facilities/:facilityId/book" element={<BookSlot />} />
          <Route path="/bookings" element={<MyBookings />} />

          {/* ---------- Owner ---------- */}
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/facilities" element={<MyFacilities />} />
          <Route path="/owner/facilities/create" element={<CreateFacility />} />
          <Route
            path="/owner/facilities/:facilityId/bookings"
            element={<FacilityBookings />}
          />

          {/* ---------- Admin ---------- */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/facilities" element={<Facilities />} />

          {/* ---------- Catch All ---------- */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
