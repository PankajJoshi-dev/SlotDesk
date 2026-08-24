import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-16 max-w-7xl px-6 sm:px-8 lg:px-10 mx-auto w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
