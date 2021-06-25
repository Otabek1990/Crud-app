import React, { useState} from "react";
import style from "../style/addTask.module.css";
import db from "../firebase";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Add() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("None");
  const [importance, setImportance] = useState("Low");

  const history = useHistory();
  //------------------
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  //-----------------------------
  const descHandler = (e) => {
    setDesc(e.target.value);
  };
  //----------------------
  const saveBtn = (e) => {
    e.preventDefault();

    db.collection("tasks").add({
      name,
      desc,
      status,
      importance,
      id: nanoid(),
    });
    setName("");
    setDesc("");
    setStatus("None");
    setImportance("Low");
    history.push("/tasks");
  };
  //-------------------
  const saveAndAddBtn = (e) => {
    e.preventDefault();

    db.collection("tasks").add({
      name,
      desc,
      status,
      importance,
      id: nanoid(),
    });
    setName("");
    setDesc("");
    setStatus("None");
    setImportance("Low");
  };
  return (
    <div className={style.MainContainer}>
      <Sidebar />
      <div>
        <NavbarComponent />

        <div className={style.TasksContainer}>
          <div className={style.create_user}>
            <h1>Create Task</h1>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={style.Labels}>
              <label name="name">Name:</label>
              <input value={name} onChange={nameHandler} type="text" />
            </div>
            <div className={style.Labels}>
              <label name="desc">Desc: </label>
              <input value={desc} onChange={descHandler} type="text" />
            </div>
            <div className={style.Labels}>
              <label name="status">Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="None">None</option>
                <option value="Created">Created</option>
                <option value="In progress">In progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className={style.Labels}>
              <label name="Importance">Importance:</label>
              <select
                value={importance}
                onChange={(e) => setImportance(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
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
