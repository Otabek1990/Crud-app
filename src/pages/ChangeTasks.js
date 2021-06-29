import React, {useState, useContext,useEffect,useCallback } from "react";
import style from "../style/addTask.module.css";
import db from "../firebase";
import {useHistory,  useParams } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import NewContext from "../useContext";

export default function ChangeTasks() {

  const { state,dispatch } = useContext(NewContext);
  const { tasksData } = state;
  const history = useHistory();
  const { id } = useParams();
  //----------------------------------------
  const filteredTaskId = tasksData.filter(item => item.id === id);
  //----------------------------
  const [name, setName] = useState(filteredTaskId.map(item=>{
    return item.name
  }));
  const [desc, setDesc] = useState(filteredTaskId.map(item=>{
    return item.desc
  }));
  const [status, setStatus] = useState(filteredTaskId.map(item=>{
    return item.status
  }));
  const [importance, setImportance] = useState(filteredTaskId.map(item=>{
    return item.importance
  }));
  //-----------------------
  
  const saveAndChangeBtn = (e,id) => {
    e.preventDefault();
    db.collection("tasks").where("id", "==", id)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            doc.ref.update({name,desc,status,importance})
        });
   })
   history.push("/tasks")
  };
   //-----------------------------------------
   const getTaskDatas=useCallback(()=>{
    db.collection("tasks").onSnapshot((snapshot)=>{
    const tasksDatas=snapshot.docs.map(doc=>{
      return {id:doc.id,...doc.data()}
    })
    dispatch({type:"ADD_TASKDATA",payload:tasksDatas})
  })
 
  },[dispatch])

  //------------------------------------
  
  useEffect(() => {
    getTaskDatas();
     
  }, [getTaskDatas])
  //-------------------

  return (
    <div className={style.MainContainer}>
      <Sidebar />
      <div>
        <NavbarComponent />

        <div className={style.TasksContainer}>
          <div className={style.create_user}>
            <h1>Change Task Infos</h1>
          </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className={style.Labels}>
                <label name="name">Name:</label>
                <input
                 value={name}
                  onChange={(e)=>setName(e.target.value)}
                  type="text" />
              </div>
              <div className={style.Labels}>
                <label name="desc">Desc: </label>
                <input
                value={desc}
                onChange={(e)=>setDesc(e.target.value)}
                type="text" />
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
            {filteredTaskId.map(item=>(

            <button type="submit" onClick={(e,id)=>saveAndChangeBtn(e,item.id)}>
              Change and Save
            </button>
              ))}

          </div>
        </div>
      </div>
    </div>
  );
}
