// на аккаунт ссылка
// в апп внутри лэйаута будет предметная грид, секционная, артиклс
// тут вместо них аутлет
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