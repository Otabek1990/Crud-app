import React from "react";
const NewContext=React.createContext()

export const initialState={
   user:localStorage.getItem("token"),
   usersData:[],
   tasksData:[]
}
export const reducer=(state,action)=>{
    switch(action.type){
      case "ADD_USER":{
         return {...state,user:action.payload}
     }
     case "ADD_USERDATA":{
         return {...state,usersData:action.payload}
     }
     case "ADD_TASKDATA":{
         return {...state,tasksData:action.payload}
     }
     
     default:
         return state
     
   }
}

export default NewContext;