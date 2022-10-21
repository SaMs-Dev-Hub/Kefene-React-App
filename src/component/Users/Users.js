import React from "react";
import { getUsers } from "../service/Index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from  "./User.module.css";
import Navbar from "../../component/Navbar";
const Users = () => {
  const [user, setUser] = useState([]);
  const [authenticated, setauthenticated] = useState(null);
  const [filter, setFilter] = useState([])
  const [text,setText] = useState('')
  const navigate = useNavigate();
  useEffect(() => {
    getUsers()
      .then((res) => {
        // console.log("resolve from User page", res);
        const respons = res;
        setUser(respons);
        setFilter(respons);
      })
      .catch((err) => {
        console.log("error coming from User page= ", err);
      });
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser === "true") {
      setauthenticated(loggedInUser);
    } else {
      setauthenticated("false");
    }
  }, []);

  const requestSearch = (searchedVal) => {
    setText(searchedVal)
    const filteredRows = user.filter((row) => {
        return row.fullName.toString().toLowerCase().includes(searchedVal.toString().toLowerCase());
    });
    if (searchedVal.length < 1) {
        setFilter(user)
    }
    else {
        setFilter(filteredRows)
    }
  };
  const clearText= (e) => {
   console.log('clicke',e.target.value)
  let clearInput ="";
  setText(clearInput);
  setFilter(user)}

  if (authenticated === "false") {
    navigate("/");
    return <div></div>;
  } else {
    return (
      <>
        <Navbar />
        <div className={style.divContainer}>
          <h1>Users</h1>
          <span>
            <input
              type="text"
              className={style.searchbar}
              placeholder="Search by Name"
              onChange={(e) => requestSearch(e.target.value)}
              value={text}
            />
            <button className={style.clearBtn} value={text}  onClick={clearText}>Clear</button>
          </span>
        </div>
        <div className={style.subContainer}></div>

        <div className={style.container}>
          <div>
            <div className={style.tableSection}>
              <div className={style.tableWrapper}>
                <div className={style.tableHeaders}>
                  <table>
                    <tr className={style.trHeader}>
                      <th className={style.column1}>Id</th>
                      <th className={style.column2}>User Avtar</th>
                      <th className={style.column3}>FullName</th>
                      <th className={style.column4}>DOB</th>
                      <th className={style.column5}>Gender</th>
                      <th className={style.column6}>Current Location</th>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
    
          <div className={style.tableData}>
            {
              filter.map((userList, index) => {
                return (
                  <tr className={style.active}  key={userList.profilePic}>
                    <td className={style.column11}>{userList.id}</td>
                    <td className={style.column21}><img src={userList.profilePic} alt="Profile pic"/></td>
                    <td className={style.column31}>{userList.fullName}</td>
                    <td className={style.column41}>{userList.dob}</td>
                    <td className={style.column51}>{userList.gender}</td>
                    <td className={style.column61}>{`${userList.currentCity},${userList.currentCountry}`}</td>
                  </tr>
                );
              })}
          </div>
  
      </>
    );
  }
};

export default Users;
