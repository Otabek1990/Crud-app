import React,{useRef,useEffect} from 'react';
import style from "../style/addNewTask.module.css";
import SearchIcon from '@material-ui/icons/Search';
import { useHistory} from "react-router-dom";
//import {useSelector,useDispatch} from 'react-redux';
//import {addTaskDataAction} from '../redux/action';


export default function AddNewTask({taskSearchItem,setTaskSearchItem}) {
  //const tasksData=useSelector(state=>state.tasksData)
//const dispatch=useDispatch()
  const history=useHistory()
  const inputRef=useRef(null)

  const addNew=()=>{
    history.push("tasks/addTask")
  }
  //----------------
  const searchInput=(e)=>{
    setTaskSearchItem(e.target.value)
  }
    
useEffect(() => {
 inputRef.current.focus()
}, [])

 

 //-----------


    return (
        <div className={style.AddNewUser}>
        <div className={style.UserSearch}>
          <div className={style.Left}>
            <h5>Task</h5>
            <p>Task entity</p>
          </div>
          <div className={style.Right}>
              <input
              ref={inputRef}
              value={taskSearchItem}
              type="text" 
              onChange={searchInput}
              placeholder="Search..." />
              <SearchIcon/>
          </div>
        </div>
        <div className={style.Add_New}>
          <button  onClick={addNew}>Add new</button>
          <div className={style.Type}>
          <select  >
              <option value="Status">Status</option>
              <option value="Created">Created</option>
              <option value="In progress">In progress</option>
              <option value="Closed">Closed</option>

          </select>
          <select  >
              <option value="Importance">Importance</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>

          </select>
          </div>
        </div>
      </div>
    )
}
