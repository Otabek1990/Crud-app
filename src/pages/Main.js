import React, { useContext } from "react";
import style from "../style/main.module.css";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
//import { Redirect } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import NewContext from "../useContext";
//import AddNewTask from "../components/AddNewTask";
//import { useSelector } from "react-redux";

export default function Main() {
  //const user = useSelector((state) => state.user);
  const { state } = useContext(NewContext);
  console.log(state.user);
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
