import React from "react";
import Header from "./../components/common/header/index";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router";
import ThemeToggle from "../components/common/Themetoggele";
import { AuthProvider } from "../context/AuthProvider";
import AppToaster from "../components/common/AppToaster";
import ScrollToTop from "../components/common/ScrollToTop";

function AppLayout() {
  return (
    <AuthProvider>
      <ScrollToTop></ScrollToTop>
      <AppToaster></AppToaster>
      <Header></Header>
      <ThemeToggle></ThemeToggle>
      <Outlet></Outlet>
      <Footer></Footer>
    </AuthProvider>
  );
}

export default AppLayout;
