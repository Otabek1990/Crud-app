import React, { useContext } from "react";
import style from "../style/tasksList.module.css";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import NewContext from "../useContext";
import db from "../firebase";
import { Link } from "react-router-dom";

export default function TasksList({ taskSearchItem }) {
  const { state } = useContext(NewContext);
  const { tasksData } = state;
//---------------------------
  const filteredTasksList =
    tasksData && 
    tasksData.filter((item) =>
    item.name.toLowerCase().includes(taskSearchItem.toLowerCase())
    );
  
  //-----------------------

  const deleteItem = (e, id) => {
    e.preventDefault();
    const ref = db.collection("tasks").where("id", "==", id);
    ref.get().then(function (querySnapshot) {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  };

  return (
    <div className={style.TasksListContainer}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Desc</th>
            <th scope="col">Status</th>
            <th scope="col">Importance</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        {taskSearchItem === "" && tasksData
          ? tasksData.map((item, index) => (
              <tbody>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.desc}</td>
                  <td>{item.status}</td>
                  <td>{item.importance}</td>
                  <td>
                    <Link to={`tasks/changeTask/${item.id}`}>
                      <CreateIcon
                        style={{
                          color: "orange",
                          cursor: "pointer",
                          marginRight: "8px",
                        }}
                      />
                    </Link>
                    <DeleteIcon
                      onClick={(e, id) => deleteItem(e, item.id)}
                      style={{ color: "white", cursor: "pointer" }}
                    />
                  </td>
                </tr>
              </tbody>
            ))
          : filteredTasksList.map((item, index) => (
              <tbody>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.desc}</td>
                  <td>{item.status}</td>
                  <td>{item.importance}</td>
                  <td>
                    <Link to={`tasks/changeTask/${item.id}`}>
                      <CreateIcon
                        style={{
                          color: "orange",
                          cursor: "pointer",
                          marginRight: "8px",
                        }}
                      />
                    </Link>
                    <DeleteIcon
                      onClick={(e, id) => deleteItem(e, item.id)}
                      style={{ color: "white", cursor: "pointer" }}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
      </table>
    </div>
  );
}
