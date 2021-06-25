import React from 'react'
import style from "../style/sidebar.module.css";
import {Link} from "react-router-dom";
import ReactLogo from '../images/reactLogo.png';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default function Sidebar() {

    return (
        <div className={style.SidebarContainer}>
            <Link 
            style={{textDecoration:"none"}}
            to="/">
            <header>
                <img src={ReactLogo} alt="reactlogo"/>
                 <h4>ADMIN DASHBOARD </h4>
               
            </header>
            </Link>
            <div>
                <Link style={{textDecoration:"none"}}
                 to="/users">
                <div className={style.Users}>
                    <PersonOutlineIcon/>
                    <p>Users</p>
                
                </div>
                </Link>
                <Link style={{textDecoration:"none"}}
                to="/tasks">
                <div className={style.Tasks}>
                    <AssignmentIcon/>
                    <p>Tasks</p>
                
                </div>
                </Link>
                
            </div>
            
        </div>
    )
}
