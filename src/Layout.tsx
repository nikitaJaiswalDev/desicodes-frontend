// src/layout/Layout.tsx
import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

const Layout = () => {
  return (
    <div className="bg-[#121212] min-h-screen flex flex-col">
      <Header />

      {/* all child pages appear here */}
      <main className="grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
