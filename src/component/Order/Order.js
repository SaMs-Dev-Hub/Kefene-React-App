import React, { useEffect, useState } from "react";
import { getOrders } from "../service/Index";
import { useNavigate } from "react-router-dom";
import style from "./Order.module.css";
import Navbar from "../../component/Navbar";
const Order = () => {
  const [orderData, setorderData] = useState([]);
  const [listCount, setListCount] = useState(0);
  const [orderType, setorderType] = useState([
    { id: 1, value: "New" },
    { id: 2, value: "Packed" },
    { id: 3, value: "InTransit" },
    { id: 4, value: "Delivered" },
  ]);
  const [checkedItems, setcheckedItems] = useState(new Map());
  const updateMap = () => {
    orderType.map((item)=>{
      setcheckedItems(checkedItems.set(item.value,true));
    })
  }
 

  useEffect(() => {
    getOrders()
      .then((res) => {
        // console.log('respnse = ',res)
        setorderData(res.data);
        setListCount(res.data.length);
      })
      .catch((err) => {
        console.log("error coming= ", err);
      });
      updateMap()
    
  }, []);


  const handleChange = (e) => {
    var isChecked = e.target.checked;
    var item = e.target.value;
    console.log( 'items = ',item ,isChecked)
    setcheckedItems((map) => new Map(map.set(item, isChecked)));
    console.log(checkedItems);
  
  };
  
  return (
    <>
      <Navbar />
      <div>
        <h1> Order</h1>
        <h5>Filter</h5>
        <h6>count:{listCount}</h6>
        <div className={style.checkbox}>
          {orderType.map((item) => (
            <li style={{listStyle:"none"}}>
              <label>
                <input
                  defaultChecked={true}
                  type="checkbox"
                  value={item.value}
                  onChange={handleChange}
                />{" "}
                {item.value}
              </label>
            </li>
          ))}
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
       
        {orderData.map((userList, index,arr) => {
          if(checkedItems.get(userList.orderStatus)) {
          
            console.log(Number(checkedItems.get(userList.orderStatus)))
            // setListCount(index+1);
          return (
          
            <tr className={style.active} key={userList.profilePic}>
              <td className={style.columnp1}>{userList.id}</td>
              <td className={style.columnp2}>{userList.customerName}</td>
              <td className={style.columnp3}>{userList.orderDate}</td>
              <td className={style.columnp4}>{userList.amount}</td>
              <td className={style.columnp5}>{userList.orderStatus}</td>
            </tr>
          )}
        })}
      </div>
    </>
  );
};

export default Order;
