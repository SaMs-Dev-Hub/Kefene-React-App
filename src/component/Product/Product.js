import React from "react";
import style from "./Product.module.css";
import { useEffect, useState } from "react";
import { getProducts } from "../service/Index";
import Navbar from "../../component/Navbar";
const Product = () => {
  const [product, setProduct] = useState([]);
  const [listCount, setListCount] = useState(0);
  const [expired, setExpired] = useState(true);
  const [lowStock, setStock] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => {
        // console.log("resolve from product", res);
        setProducts(res);
        setListCount(res.length);
        setProduct(res);
      })
      .catch((err) => {
        // console.log("error coming= ", err);
      });
  }, []);

  const handleChange = (e) => {
    let pushArr = products;
    const value = e.target.value;
    const flag = e.target.checked;
    let expire = true;
    let lowStock = true;
    let pushexpire = false;
    let pushlowStock = false;

    if (value === "expire") {
      expire = flag;
      pushexpire = flag;
    }
    if (value === "lowStock") {
      lowStock = flag;
      pushlowStock = flag;
    }

    const arr = product;
    if (!expire) {
      for (let i = 0; i < arr.length; i++) {
        var apiDate = arr[i].expiryDate;
        var currDate = new Date();
        if (new Date(apiDate) < currDate) {
          arr.splice(i, 1);
          i--;
        }
      }
    }
    if (!lowStock) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].stock < 100) {
          arr.splice(i, 1);
          i--;
        }
      }
    }
    if (pushexpire) {
      for (let i = 0; i < pushArr.length; i++) {
        var apiDate = pushArr[i].expiryDate;
        var currDate = new Date();
        if (new Date(apiDate) < currDate) {
          arr.push(pushArr[i]);
        }
      }
    }
    if (pushlowStock) {
      for (let i = 0; i < pushArr.length; i++) {
        if (pushArr[i].stock < 100) {
          arr.push(pushArr[i]);
        }
      }
    }
    setProduct([...arr]);
    setListCount(product.length);
  };

  return (
    <>
      <Navbar />
      <h1>Product</h1>
      <h5>Filter</h5>
      <h6>count:{listCount}</h6>
      <div className={style.checkbox}>
        <span className={style.inputorder}>
          <input
            defaultChecked={expired}
            type="checkbox"
            id="expire"
            onChange={handleChange}
          />
          Expired
        </span>
        <br />
        <span classvalue={style.inputorder}>
          <input
            defaultChecked={lowStock}
            type="checkbox"
            value="lowStock"
            onChange={handleChange}
          />
          Low stock
        </span>
        <br />
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
                    <th className={style.column2}>Product Name</th>
                    <th className={style.column3}>Product Brand</th>
                    <th className={style.column4}>Expiry Date</th>
                    <th className={style.column5}>Unit Price</th>
                    <th className={style.column6}>Stock</th>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.tableData}>
        {product.map((userList, index) => {
          return (
            <tr className={style.active} key={userList.profilePic}>
              <td className={style.columnp1}>{userList.id}</td>
              <td className={style.columnp2}>{userList.medicineName}</td>
              <td className={style.columnp3}>{userList.medicineBrand}</td>
              <td className={style.columnp4}>{userList.expiryDate}</td>
              <td className={style.columnp5}>{userList.unitPrice}</td>
              <td className={style.columnp6}>{userList.stock}</td>
            </tr>
          );
        })}
      </div>
    </>
  );
};

export default Product;
