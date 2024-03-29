import React from "react";
import style from "./Form.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/Navbar";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";

function Form() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [passText, setpasstext] = useState("");
  const onClick = (e) => {
    const value = e.target.value;
    console.log(value);
    setText(value);
  };
  const onClickPass = (e) => {
    const valuePass = e.target.value;
    console.log(valuePass);
    setpasstext(valuePass);
  };
  const onLogin = () => {
    if (text === passText) {
      localStorage.setItem("authenticated", true);
      navigate("/orders");
      alert("Login Successful!");
    } else {
      alert(
        `Please Enter Valid Credentials  Email and Password should be same  ${text}  ${passText}`
      );
    }
  };

  return (
    <>
  
      <MDBContainer className={style.containerl}>
        <div className={style.container}>
          <h1 className={style.mb}>Log In</h1>
          <div>
            <MDBInput
              wrapperClass={style.mail}
              label="Email address"
              id="form1"
              type="text"
              value={text}
              onChange={onClick}
            />
          </div>
          <MDBInput
            wrapperClass={style.pass}
            label="Password"
            id="form2"
            type="password"
            value={passText}
            onChange={onClickPass}
            
          />

          <MDBBtn className={style.login} onClick={onLogin}>
            Login
          </MDBBtn>
        </div>
      </MDBContainer>
    </>
  );
}

export default Form;
