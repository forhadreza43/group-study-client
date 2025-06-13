import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="transition-colors duration-500">
      <Navbar />
      <div className="dark:bg-gray-800 pt-[68px]">
        <div className="w-11/12 mx-auto max-w-7xl min-h-[calc(100vh-68px)]">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
