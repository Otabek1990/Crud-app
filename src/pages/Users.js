import React,{useState,useEffect,useContext,useCallback} from "react";
import style from "../style/users.module.css";
import AddNewUser from "../components/AddNewUser";
import UsersList from "../components/UsersList";
import Sidebar from "../components/Sidebar";
import NavbarComponent from "../components/Navbar";
import db from "../firebase";
import NewContext from '../useContext'

export default function Users() {
  const {dispatch}=useContext(NewContext)
const [userSearchItem, setUserSearchItem] = useState("")

const getUserDatas=useCallback(()=>{
  db.collection("users").onSnapshot((snapshot)=>{
  const usersDatas=snapshot.docs.map(doc=>{
    return {id:doc.id,...doc.data()}
  })
  dispatch({type:"ADD_USERDATA",payload:usersDatas})
})
},[dispatch])

useEffect(() => {
  getUserDatas()
}, [userSearchItem,getUserDatas])

  return (
    <div className={style.MainContainer}>
      <Sidebar />
      <div>
        <NavbarComponent />
        <div className={style.UsersContainer}>
          <AddNewUser
           setUserSearchItem={setUserSearchItem}
           userSearchitem={userSearchItem}/>
          <UsersList userSearchItem={userSearchItem}/>
        </div>
      </div>
    </div>
  );
}
