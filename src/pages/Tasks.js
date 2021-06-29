import React, {useState, useEffect, useContext,useCallback } from "react";
import style from "../style/tasks.module.css";
import AddNewTask from "../components/AddNewTask";
import TasksList from "../components/TasksList";
import NavbarComponent from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import db from "../firebase";
import NewContext from "../useContext";

export default function Tasks() {
  const { dispatch } = useContext(NewContext);
const [taskSearchItem, setTaskSearchItem] = useState("")
//-------------------------------
 const getTaskDatas=useCallback(() => {
    db.collection("tasks").onSnapshot((snapshot) => {
      const taskdatas = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      dispatch({ type: "ADD_TASKDATA", payload: taskdatas });
    })
  },[dispatch])
  //------------------------------
  useEffect(() => {
   getTaskDatas()
  }, [taskSearchItem,getTaskDatas]);

  return (
    <div className={style.MainContainer}>
      <Sidebar />
      <div>
        <NavbarComponent />

        <div className={style.TasksContainer}>
          <AddNewTask 
          setTaskSearchItem={setTaskSearchItem}
           taskSearchitem={taskSearchItem}
           />
          <TasksList 
           taskSearchItem={taskSearchItem}
          />
        </div>
      </div>
    </div>
  );
}
