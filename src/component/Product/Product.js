import React from 'react'
import style from './Product.module.css'
import { useEffect,useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getProducts } from '../service/Index';
const Product = () => {
    const [product, setProduct] = useState([]);
    const [authenticated, setauthenticated] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
      const loggedInUser = localStorage.getItem("authenticated");
      if (loggedInUser==='true') {
        setauthenticated(loggedInUser);
      }else{
        setauthenticated('false');
    }
       getProducts().then((res) => {
          console.log("resolve from product", res);
          setProduct(res)
          }).catch((err)=>{
          console.log('error coming= ',err)
          })
     },[])
     if(authenticated==='false'){
      navigate("/login");
     return <div></div>
     }else{
      return (
        <>
      <h1>Product</h1>
      <h5>Filter</h5>
      <h6>count:</h6>
      <div className={style.checkbox}>
      <span className={style.inputorder}><input type="checkbox" id="vehicle1" name="vehicle1"/>Expired</span><br/>
      <span className={style.inputorder}><input type="checkbox" id="vehicle1" name="vehicle1"/>Low stock</span><br/>
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
    {product &&
      product.map((userList, index) => {
        return (
          <tr className={style.active}  key={userList.profilePic}>
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
    )
     }
  
  
}

export default Product
