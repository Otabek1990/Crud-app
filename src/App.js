import React, {useReducer} from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./pages/SignIn";
import Main from "./pages/Main";
//import { useSelector } from "react-redux";
//import Users from "./pages/Users";
//import Tasks from "./pages/Tasks";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import NewContext from "./useContext";
import {initialState} from './useContext'
import {reducer} from './useContext';
import Users from "./pages/Users";
import Tasks from "./pages/Tasks";
import AddUser from "./pages/AddUser";
import AddTask from "./pages/AddTask";

function App() {
  //const user = useSelector((state) => state.user);
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <NewContext.Provider value={{state,dispatch}}>
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/users" component={Users} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/users/:addUser" component={AddUser} />
          <Route exact path="/tasks/:addTask" component={AddTask} />
          <Route exact path="/signIn" component={SignIn}/>  
        </Switch>
      </div>
    </Router>
    </NewContext.Provider>
  );
}

export default App;
