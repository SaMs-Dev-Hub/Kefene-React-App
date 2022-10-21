import { Routes, Route } from "react-router-dom";
// import "./App.css";
import Navbar from "./component/Navbar";
import Order from "./component/Order/Order";
import Product from "./component/Product/Product";

import Form from "./component/Form/Form ";
import Users from "./component/Users/Users";
function App() {
  return (
    <>
       <Navbar />
      <Routes>
        <Route path="/login" element={<Form />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/products" element={<Product />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </>
  );
}

export default App;
