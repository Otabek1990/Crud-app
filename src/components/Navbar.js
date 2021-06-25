import React,{useContext} from 'react';
import style from "../style/navbar.module.css";
import MenuIcon from '@material-ui/icons/Menu';
import NewContext from '../useContext'
//import { useHistory } from "react-router-dom";
//import {useSelector,useDispatch} from 'react-redux';
//import {addUserAction} from '../redux/action';
import {Link} from 'react-router-dom';

export default function NavbarComponent(){
 // const user=useSelector(state=>state.user)
 //const dispatch=useDispatch()
 //const history=useHistory()
 
 const {dispatch}=useContext(NewContext)
 
    return (
        <div className={style.Navbar}>
        <MenuIcon />
        <div className={style.right}>
          <p>Welcome <span> </span> </p>
          <p>
            CHange Password/
         <Link to='signIn'>
           <span
           className={style.logout}
            onClick={
             ()=>{
               localStorage.removeItem("token")
               dispatch({type:"ADD_USER",payload:""})
             }
          }>Log Out</span>
          </Link>
          </p>
        </div>
      </div>
    )
}
