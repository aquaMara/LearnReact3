import React from "react";
import { Outlet } from "react-router-dom";
import TopNavigation from "./TopNavigation";

const Layout = () => {
  return (
    <>
        <TopNavigation />
        <Outlet />
    </>
  )
}

export default Layout