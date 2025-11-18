import { Outlet } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow">
        {/* This is where the Page content (HomePage, LoginPage) gets injected */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default Layout;
