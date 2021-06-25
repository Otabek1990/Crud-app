export const addUserAction=(user)=>{
    return{
       type:"ADD_USER",
       payload:user
    }
}
export const addUserDataAction=(userData)=>{
    return{
       type:"ADD_USERDATA",
       payload:userData
    }
}
export const addTaskDataAction=(taskData)=>{
    return{
       type:"ADD_TASKDATA",
       payload:taskData
    }
}
export const loginAction=()=>{
    return{
       type:"LOG_IN"
    }
}