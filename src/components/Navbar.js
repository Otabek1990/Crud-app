import React,{useContext} from 'react';
import style from "../style/navbar.module.css";
import MenuIcon from '@material-ui/icons/Menu';
import NewContext from '../useContext'
import { useHistory } from "react-router-dom";


export default function NavbarComponent(){
 const history=useHistory()
 
 const {dispatch}=useContext(NewContext)
 
    return (
        <div className={style.Navbar}>
        <MenuIcon />
        <div className={style.right}>
          <p>Welcome <span> </span> </p>
          <p>
            CHange Password/
           <span
           className={style.logout}
            onClick={
             ()=>{
               history.push("signIn")
               localStorage.removeItem("token")
               dispatch({type:"ADD_USER",payload:""})
             }
          }>Log Out</span>
          </p>
        </div>
      </div>
    )
}
