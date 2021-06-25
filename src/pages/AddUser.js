import React, { useState } from "react";
import style from "../style/addUser.module.css";
import db from "../firebase";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import NavbarComponent from "../components/Navbar";

export default function Add() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("None");
  const [isManager, setIsManager] = useState(false);

  const history = useHistory();
  //------------------
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  //-----------------------------
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  //-----------------------------
  const typeHandler = (e) => {
    setType(e.target.value);
  };
  //-----------------------------------------
  const saveBtn = (e) => {
    e.preventDefault();
    db.collection("users").add({
      name,
      email,
      type,
      isManager,
      id: nanoid(),
    });

    setName("");
    setEmail("");
    setType("");
    setIsManager(false);
    history.push("/users");
  };
  //----------------------------------
  const saveAndAddBtn = (e) => {
    e.preventDefault();
    db.collection("users").add({
      name,
      email,
      type,
      isManager,
      id: nanoid(),
    });

    setName("");
    setEmail("");
    setType("");
    setIsManager(false);
  };

  return (
    <div className={style.MainContainer}>
      <Sidebar />
      <div>
        <NavbarComponent />

        <div className={style.UsersContainer}>
          <div className={style.create_user}>
            <h1>Create User</h1>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={style.Labels}>
              <label name="name">Name:</label>
              <input value={name} onChange={nameHandler} type="text" />
            </div>
            <div className={style.Labels}>
              <label name="email">Email: </label>
              <input
                name="email"
                placeholder="email"
                type="email"
                value={email}
                onChange={emailHandler}
              />
            </div>
            <div className={style.Labels}>
              <label name="type">Type:</label>
              <select value={type} onChange={typeHandler}>
                <option value="None">None</option>
                <option value="Client">Client</option>
                <option value="Author">Author</option>
              </select>
            </div>
            <div className={style.Checkbox}>
              <label name="isManager">IsManager:</label>
              <input
                type="checkbox"
                onChange={() => setIsManager(!isManager)}
              />
            </div>
          </form>

          <div className={style.Buttons}>
            <button onClick={saveBtn} type="submit">
              Save
            </button>
            <button type="submit" onClick={saveAndAddBtn}>
              Save and add another
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
