import React from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <main >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export { Layout };
