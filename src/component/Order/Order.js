import React, { useEffect, useState } from "react";
import { getOrders } from "../service/Index";
import { useNavigate } from "react-router-dom";
import style from "./Order.module.css";
import Navbar from "../../component/Navbar";
const Order = () => {
  const [orderData, setorderData] = useState([]);
  const [authenticated, setauthenticated] = useState(null);
  const [newitem, setNewitem] = useState(true);
  const [pack, setPack] = useState(true);
  const [intransit, setIntarnsit] = useState(true);
  const [deliever, setDeliever] = useState(true);
  const [orderApiData, setorderApiData] = useState([]);
  const [listCount, setListCount] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("authenticated");
    if (loggedInUser === "true") {
      setauthenticated(loggedInUser);
      
    } else {
      setauthenticated("false");
     
    }
    getOrders()
      .then((res) => { 
        setorderApiData(res.data);
        setorderData(res.data);
        setListCount(res.data.length);
      })
      .catch((err) => {
        console.log("error coming= ", err);
      });
    // checkFilter();
  }, []);
  let pushArr = orderApiData;
  const handleChange = (e) => { 
    const value = e.target.value;
    const flag = e.target.checked;
    let vehicle1 = true;
    let vehicle2 = true;
    let vehicle3 = true;
    let vehicle4 = true;
    let pushVehicle1 = false;
    let pushVehicle2 = false;
    let pushVehicle3 = false;
    let pushVehicle4 = false;
    if (value === "vehicle1") {
      vehicle1 = flag
      pushVehicle1 = flag
    }
    if (value === "vehicle2") {
      vehicle2 = flag
      pushVehicle2 = flag
    }
    if (value === "vehicle3") {
      vehicle3 = flag
      pushVehicle3 = flag
    }
    if (value === "vehicle4") {
      vehicle4 = flag
      pushVehicle4 = flag
    }
   
    var data1 = ['New'];
    var data2 = ['Packed'];
    var data3 = ['InTransit'];
    var data4 = ['Delivered'];
    const arr = orderData;
    if (!vehicle1) {
      for (let i = 0; i < arr.length; i++) {
        if (data1.indexOf(arr[i].orderStatus) != -1) {
          arr.splice(i, 1);
          i--;
        }
      }
    }
    if (!vehicle2) {
      for (let i = 0; i < arr.length; i++) {
        if (data2.indexOf(arr[i].orderStatus) != -1) {
          arr.splice(i, 1);
          i--;
        }
      }
    }
    if (!vehicle3) {
      for (let i = 0; i < arr.length; i++) {
        if (data3.indexOf(arr[i].orderStatus) != -1) {
          arr.splice(i, 1);
          i--;
        }
      }
    }
    if (!vehicle4) {
      for (let i = 0; i < arr.length; i++) {
        if (data4.indexOf(arr[i].orderStatus) != -1) {
          arr.splice(i, 1);
          i--;
        }
      }
    }
  

    if (pushVehicle1) {
      pushArr.map((ele) => {
        if (ele.orderStatus === "New") {
          arr.push(ele);
        }
      });
    }
    if (pushVehicle2) {
      pushArr.map((ele) => {
        if (ele.orderStatus === "Packed") {
          arr.push(ele);
        }
      });
    }
    if (pushVehicle3) {
      pushArr.map((ele) => {
        if (ele.orderStatus === "InTransit") {
          arr.push(ele);
        }
      });
    }
    if (pushVehicle4) {
      pushArr.map((ele) => {
        if (ele.orderStatus === "Delivered") {
          arr.push(ele);
        }
      });
    }
 
    setorderData([...arr])
    setListCount(orderData.length)
  };
 
  if (authenticated === "false") {
    navigate("/");
    return <div></div>;
  } else {
    return (
      <>
       <Navbar />
        <div>
          <h1> Order</h1>
          <h5>Filter</h5>
          <h6>count:{listCount}</h6>
          <div className={style.checkbox}>
            <span className={style.inputorder}>
              <input
                defaultChecked={newitem}
                type="checkbox"
                id="vehicle1"
                value="vehicle1"
                onChange={handleChange}
              />
              New
            </span>
            <br />
            <span className={style.inputorder}>
              <input
                defaultChecked={pack}
                type="checkbox"
                id="vehicle2"
                value="vehicle2"
                onChange={handleChange}
              />
              Packed
            </span>
            <br />
            <span className={style.inputorder}>
              <input
                defaultChecked={intransit}
                type="checkbox"
                id="vehicle3"
                value="vehicle3"
                onChange={handleChange}
              />
              InTransit
            </span>
            <br />
            <span className={style.inputorder}>
              <input
                defaultChecked={deliever}
                type="checkbox"
                id="vehicle4"
                value="vehicle4"
                onChange={handleChange}
              />
              Delievered
            </span>
            <br />
          </div>
        </div>
        <div className={style.subContainer}></div>

        <div className={style.container}>
          <div>
            <div id="table-section">
              <div id="table-wrapper">
                <div id="table-headers">
                  <table>
                    <tr className={style.trHeader}>
                      <th className={style.column1}>Id</th>
                      <th className={style.column2}>Customer</th>
                      <th className={style.column3}>Date</th>
                      <th className={style.column4}>Amount</th>
                      <th className={style.column5}>orderStatus</th>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={style.tableData}>
          {orderData &&
            orderData.map((userList, index) => {
              return (
                <tr className={style.active} key={userList.profilePic}>
                  <td className={style.columnp1}>{userList.id}</td>
                  <td className={style.columnp2}>{userList.customerName}</td>
                  <td className={style.columnp3}>{userList.orderDate}</td>
                  <td className={style.columnp4}>{userList.amount}</td>
                  <td className={style.columnp5}>{userList.orderStatus}</td>
                </tr>
              );
            })}
        </div>
      </>
    );
  }
};

export default Order;
