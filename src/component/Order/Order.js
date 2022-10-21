import React, { useEffect, useState } from "react";
import { getOrders } from "../service/Index";
import { useNavigate } from "react-router-dom";
import style from "./Order.module.css";
const Order = () => {
  const [orderData, setorderData] = useState([]);
  const [authenticated, setauthenticated] = useState(null);
  const [newitem, setNewitem] = useState(true);
  const [pack, setPack] = useState(true);
  const [intransit, setIntarnsit] = useState(true);
  const [deliever, setDeliever] = useState(true);

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
        // console.log("resolve from Orders", res);
        setorderData(res.data);
      })
      .catch((err) => {
        console.log("error coming= ", err);
      });
    checkFilter();
  }, []);

  const handleChange = (e) => {
    console.log("event from value", e.target.value);
    console.log("event from onchange", e.target.checked);
    const value = e.target.value;
    const flag = e.target.checked;
    if (value === "vehicle1") {
      setNewitem(flag);
    }
    if (value === "vehicle2") {
      setPack(flag);
    }
    if (value === "vehicle3") {
      setIntarnsit(flag);
    }
    if (value === "vehicle4") {
      setDeliever(flag);
    }
    checkFilter();
  };
  const checkFilter = () => {
    const arr = [];
    // for (let i = 0; i < res.length; i++) {
    // if (newitem && pack && intransit && deliever) {
    //   setorderData(res);
    //   res.map((ele) => {
    //     if (ele.orderStatus === "Delivered") {
    //       arr.push(ele);
    //     }
    //   });
    // }
    if (newitem == true) {
      orderData.map((ele) => {
        if (ele.orderStatus === "New") {
          arr.push(ele);
        }
      });
    }
    if (pack == true) {
      orderData.map((ele) => {
        if (ele.orderStatus === "Packed") {
          arr.push(ele);
        }
      });
    }
    if (intransit == true) {
      orderData.map((ele) => {
        if (ele.orderStatus === "InTransit") {
          arr.push(ele);
        }
      });
    }
    if (deliever == true) {
      orderData.map((ele) => {
        if (ele.orderStatus === "Delivered") {
          arr.push(ele);
        }
      });
    }
    if (newitem != true) {
      orderData.map((ele, i) => {
        if (ele.orderStatus === "New") {
          arr.splice(i, 1);
        }
      });
    }
    if (pack != true) {
      orderData.map((ele, i) => {
        if (ele.orderStatus === "Packed") {
          arr.splice(i, 1);
        }
      });
    }
    if (intransit != true) {
      orderData.map((ele, i) => {
        if (ele.orderStatus === "InTransit") {
          arr.splice(i, 1);
        }
      });
    }
    if (deliever != true) {
      orderData.map((ele, i) => {
        if (ele.orderStatus === "Delivered") {
          arr.splice(i, 1);
        }
      });
    }
    // }
    setorderData(arr);
  };
  if (authenticated === "false") {
    navigate("/login");
    return <div></div>;
  } else {
    return (
      <>
        <div>
          <h1> Order</h1>
          <h5>Filter</h5>
          <h6>count:</h6>
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
