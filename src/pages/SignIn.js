import React,{useState,useContext} from "react";
import style from "../style/signIn.module.css";
import VisibilityIcon from "@material-ui/icons/Visibility";
//import firebase from 'firebase';
//import {useDispatch} from 'react-redux';
//import {addUserAction} from '../redux/action';
import {auth} from '../firebase'
import {useHistory} from 'react-router-dom';
import NewContext from '../useContext'


export default function SignIn() {
 //const dispatch=useDispatch()
 const {dispatch}=useContext(NewContext)
 const history=useHistory()

    const [signed, setSigned] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [eyeClick, setEyeClick] = useState(false)
  
  const signUp=()=>{
    auth.createUserWithEmailAndPassword(email, password)
  .then(() => {
    localStorage.setItem("token",email)
    setEmail("")
    setPassword("")
    setError("")

  })
  .catch((error) => {
   setError(error.message)
  });
  }
  //-----------------------------
    const signIn=()=>{
      auth.signInWithEmailAndPassword(email, password)
  .then(() => {
    setError("")
    localStorage.setItem("token",email)
    dispatch({type:"ADD_USER",payload:email})
    setEmail("")
    setPassword("")
    history.push("/")
  })
  .catch((error) => {
   setError(error.message)
  });

    }
    //------------------------
const emailHandler=(e)=>{
    setEmail(e.target.value)
}
//--------------------------
const passwordHandler=(e)=>{
    setPassword(e.target.value)
}
//----------------------------
    return (
    <div className={style.SignInContainer}>
      <h1>Sign In</h1>
      <form onSubmit={(e) => e.preventDefault()} className={style.Form}>
        <label> Email:</label>
        <div className={style.Input}>
          <input
           name="email"
            placeholder="email" 
            type="email"
            value={email}
            onChange={emailHandler} />
        </div>
        <label>Password:</label>
        <div className={style.SecondInput}>
          <input
           name="password"
            placeholder="password"
            value={password}
            onChange={passwordHandler}
             type={!eyeClick ? "password":"text"}
            />
            <VisibilityIcon 
            onClick={()=>setEyeClick(!eyeClick)}
            style=
            {!eyeClick ?
                { color: "black",
             cursor: "pointer"
           }:
           { color: "red",
           cursor: "pointer"
         }
                                 
        } 
          className={style.EyeIcon}
          />
          <p>{error}</p>
          </div>
        <button
        onClick={signed ? signUp: signIn}
         className="my-4 btn btn-success" type="submit">
         {signed ? "Sign Up": "Sign In "}
         
        </button>
        {signed? <p>Do you have account already? <span onClick={()=>setSigned(false)}>Sign In!</span></p>:
        <h3>Didn't you have account yet? <span onClick={()=>setSigned(true)}>Sign up!</span> </h3>
        }
      
      </form>
    </div>
  );
}
