import React,{useRef,useEffect} from 'react';
import style from "../style/addNewUser.module.css";
import SearchIcon from '@material-ui/icons/Search';
import { useHistory } from "react-router-dom";
//import {useSelector,useDispatch} from 'react-redux';
//import {addUserDataAction} from '../redux/action';

export default function AddNewUser({userSearchItem,setUserSearchItem}) {
  //const usersData=useSelector(state=>state.usersData)
  //const dispatch=useDispatch()
  const history=useHistory()
  const inputRef = useRef(null)

  const addNew=()=>{
    history.push("users/addUser")
  }
  //----------------
  

  const searchInput=(e)=>{
    setUserSearchItem(e.target.value)
  }

  useEffect(() => {
    inputRef.current.focus()

  }, [])
  
    return (
      
        <div className={style.AddNewUser}>
        <div className={style.UserSearch}>
          <div className={style.Left}>
            <h5>User</h5>
            <p>User entity</p>
          </div>
          <div className={style.Right}>
              <input
              ref={inputRef}
              value={userSearchItem}
              onChange={searchInput}
              type="text" 
              placeholder="Search..." />
              <SearchIcon />
          </div>
        </div>
        <div className={style.Add_New}>
          <button  onClick={addNew}>Add new</button>
          <div className={style.Type}>
          <select  >
              <option value="Client">Client</option>
              <option value="Author">Author</option>

          </select>
          </div>
        </div>
      </div>
    )
}
