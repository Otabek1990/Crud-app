import React from "react";
import style from "../style/main.module.css";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import NavbarComponent from "../components/Navbar";

export default function Main() {
  return (
    <div className={style.MainContainer}>
      <Sidebar />
      <div>
        <NavbarComponent />
        <Home />
      </div>
    </div>
  );
}
