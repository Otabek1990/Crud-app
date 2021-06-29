import React, { useState, useContext, useEffect, useCallback } from "react";
import style from "../style/addUser.module.css";
import Sidebar from "../components/Sidebar";
import NavbarComponent from "../components/Navbar";
import NewContext from "../useContext";
import db from "../firebase";
import { useHistory, useParams } from "react-router-dom";

export default function ChangeUsers() {
  const { state, dispatch } = useContext(NewContext);
  const { usersData } = state;
  const { id } = useParams();
  const history = useHistory();

  //--------------------

  const filteredUserId = usersData.filter((item) => item.id === id);
  //------------------------------------------
  const [name, setName] = useState(
    filteredUserId.map((item) => {
      return item.name;
    })
  );
  const [email, setEmail] = useState(
    filteredUserId.map((item) => {
      return item.email;
    })
  );
  const [type, setType] = useState(
    filteredUserId.map((item) => {
      return item.type;
    })
  );
  const [isManager, setIsManager] = useState(
    filteredUserId.map((item) => {
      return item.isManager;
    })
  );

  //----------------------------------
  const saveAndChangeBtn = (e, id) => {
    e.preventDefault();
    db.collection("users")
      .where("id", "==", id)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({ name, email, type, isManager });
        });
      });
    history.push("/users");
  };
  //-----------------------------------------
  const getUserDatas = useCallback(() => {
    db.collection("users").onSnapshot((snapshot) => {
      const usersDatas = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      dispatch({ type: "ADD_USERDATA", payload: usersDatas });
    });
  }, [dispatch]);

  //------------------------------------

  useEffect(() => {
    getUserDatas();
  }, [getUserDatas]);
  //---------------------------------
  return (
    <div className={style.MainContainer}>
      <Sidebar />
      <div>
        <NavbarComponent />

        <div className={style.UsersContainer}>
          <div className={style.create_user}>
            <h1>Change User Infos</h1>
          </div>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className={style.Labels}>
              <label name="name">Name:</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              />
            </div>
            <div className={style.Labels}>
              <label name="email">Email: </label>
              <input
                value={email}
                name="email"
                placeholder="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={style.Labels}>
              <label name="type">Type:</label>
              <select
               value={type} 
               onChange={(e) => setType(e.target.value)}>
                <option value="None">None</option>
                <option value="Client">Client</option>
                <option value="Author">Author</option>
              </select>
            </div>
            <div className={style.Checkbox}>
              <label name="isManager">IsManager:</label>
              <input
                type="checkbox"
                checked={isManager}
                onChange={() => setIsManager(!isManager)}
              />
            </div>
          </form>

          <div className={style.Buttons}>
            {filteredUserId &&
              filteredUserId.map((item) => (
                <button
                key={item.id}
                  type="submit"
                  onClick={(e, id) => saveAndChangeBtn(e, item.id)}
                >
                  Change and save
                </button>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
