import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen px-8 py-4">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
