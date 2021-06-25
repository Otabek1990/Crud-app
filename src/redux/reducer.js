export const initiialState={
    user:localStorage.getItem("token"),
    usersData:[],
    tasksData:[],
    login:false,
  
  }
   const reducer=(state=initiialState,action)=>{
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
        case "LOG_IN":{
            return {...state,login:true}
        }
        default:
            return state
        
      }
  }
export default reducer;  