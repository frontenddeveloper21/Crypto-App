import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Sidebar/Navbar";
import Header from "../Components/Header/Header";

const Layout = () => {
  const [showSideBar, setShowSideBar] = useState(false);      // mobile overlay
  const [collapsedSidebar, setCollapsedSidebar] = useState(false); // desktop collapsed/expanded

  const handleShowSideBar = () => {
    // If on desktop, toggle collapsed
    if (window.innerWidth >= 1024) {
      setCollapsedSidebar(prev => !prev);
    } else {
      // on mobile, toggle overlay
      setShowSideBar(prev => !prev);
    }
  };

  return (
    <div className="max-w-[1920px] h-screen overflow-y-auto mx-auto flex relative">
      <div className={`hidden min-h-screen lg:flex transition-all duration-300 ${collapsedSidebar ? "w-20" : "w-[280px]"}`}>
        <Navbar
          showSideBar={true}
          collapsed={collapsedSidebar}
          setShowSideBar={setShowSideBar}
        />
      </div>

      <div className="flex-1 flex flex-col min-h-screen overflow-y-auto relative z-0">
        <Header
          className="sticky top-0 z-10"
          handleShowSideBar={handleShowSideBar}
        />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen w-[280px] lg:hidden transition-transform duration-300 z-50
          ${showSideBar ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Navbar showSideBar={showSideBar} setShowSideBar={setShowSideBar} collapsed={false} />
      </div>

      {showSideBar && (
        <div
          onClick={() => setShowSideBar(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}
    </div>
  );
};

export default Layout;
