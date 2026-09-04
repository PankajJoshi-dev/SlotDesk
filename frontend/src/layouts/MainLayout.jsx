import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function MainLayout() {
  return (
    <div className="flex flex-col">
      <Navbar />

      <main className="min-h-[94vh] pt-16 pb-4 max-w-7xl px-6 sm:px-8 lg:px-10 mx-auto w-full">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default MainLayout;
