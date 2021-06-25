import React, { useState, useContext } from "react";
import style from "../style/usersList.module.css";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
//import db from '../firebase';
//import {useSelector,useDispatch} from 'react-redux';
//import {addUserDataAction} from '../redux/action';
//import { SentimentSatisfied } from '@material-ui/icons';
//import {nanoid} from "nanoid";
import NewContext from "../useContext";
import db from '../firebase'

export default function UsersList({ userSearchItem }) {
  //const usersData=useSelector(state=>state.usersData)
  //const dispatch = useDispatch()
  //const [name, setName] = useState('')
  //const [email, setEmail] = useState('')
  //const [type, setType] = useState('')
  const [ismanager, setIsmanager] = useState("false");
  //-------------------
  const { state } = useContext(NewContext);
  const { usersData } = state;
  const filteredUsersList =
    usersData &&
    usersData.filter((item) =>
      item.name.toLowerCase().includes(userSearchItem.toLowerCase())
    );
  const deleteItem = (e, id) => {
    e.preventDefault();
    const ref = db.collection("users").where("id", "==", id);
    ref.get().then(function (querySnapshot) {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  };
  //--------------------------

  return (
    <div className={style.UsersListContainer}>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Type</th>
            <th scope="col">isManager</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>

        {userSearchItem === "" && usersData
          ? usersData.map((item, index) => (
              <tbody>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.type}</td>
                  <td>{item.isManager}</td>
                  <td>
                    <CreateIcon
                      value={ismanager}
                      style={{
                        color: "orange",
                        cursor: "pointer",
                        marginRight: "8px",
                      }}
                    />
                    <DeleteIcon
                      onClick={(e, id) => deleteItem(e, item.id)}
                      style={{ color: "white", cursor: "pointer" }}
                    />
                  </td>
                </tr>
              </tbody>
            ))
          : filteredUsersList.map((item, index) => (
              <tbody>
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.type}</td>
                  <td>{item.isManager}</td>
                  <td>
                    <CreateIcon
                      value={ismanager}
                      style={{
                        color: "orange",
                        cursor: "pointer",
                        marginRight: "8px",
                      }}
                    />
                    <DeleteIcon
                      onClick={(e, id) => deleteItem(e, item.id)}
                      style={{ color: "white", cursor: "pointer" }}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
      </table>
    </div>
  );
}
