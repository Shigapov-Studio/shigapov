import React from "react";
import { Outlet } from "react-router";
import Footer from "./Footer";
import Header from "./Header";
import CookieWarning from "./CookieWarning";
import Modal from "./Modal";

const Layout = () => {
  return (
    <>
      <Header />
      <main >
        <Outlet />
      </main>
      <Footer />
      <CookieWarning />
      <Modal />
    </>
  );
};

export { Layout };
