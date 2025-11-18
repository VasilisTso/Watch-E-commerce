import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* NAVBAR */}
      <Navbar />
      {/* MAIN CONTENT – FULL WIDTH BG + CENTERED INNER CONTAINER */}
      <main className="flex-grow w-full pt-26">
        <div className="mx-auto">
          <Outlet /> {/* This renders the current page */}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout