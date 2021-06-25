import React from "react";
import style from "../style/home.module.css";

export default function Home() {
  return (
    <div className={style.HomeContainer}>
          <h1>Welcome to Admin dashboard</h1>
          <p>Select an entity to start</p>
        </div>
  );
}
