import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import { windowAlert } from "../Error/Alerts";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [UserLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const navigation = useNavigate();
  useEffect(() => {}, []);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserLogin({ ...UserLogin, [name]: value });
  };
  const options = {
    url: "http://localhost:3001/login",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    data: {
      ...UserLogin,
    },
  };
  const loginRequest = async () => {
    axios(options)
      .then((loginData) => {
        localStorage.setItem("name", loginData.data.name);
        localStorage.setItem("phone", loginData.data.phone);
        localStorage.setItem("id", loginData.data._id);
        localStorage.setItem("email", loginData.data.email);
        localStorage.setItem("token", loginData.data.token);
        localStorage.setItem("profilePicture", loginData.data.profilePicture);
        localStorage.setItem(
          "totalStorageCapacity",
          loginData.data.totalStorageCapacity
        );
        localStorage.setItem(
          "availableStorage",
          loginData.data.availableStorage
        );
        navigation("/");
        window.location.reload(false)
      })
      .catch((err) => {
        console.log(err);
        windowAlert(err.response.data.message);
      });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-lone-blocks
    {
      UserLogin.email.length === 0 || UserLogin.email.length === 0
        ? windowAlert("email should present")
        : loginRequest();
    }
  };  

  return (
    <div>
      <div className="container">
        <div className="main">
          <div className="login">
            <form>
              <label>Login</label>
              <input
                type="text"
                autoComplete="off"
                value={UserLogin.email}
                onChange={handleChange}
                name="email"
                id="email"
                placeholder="Email"
                required
              />
              <input
                type="password"
                autoComplete="off"
                value={UserLogin.password}
                onChange={handleChange}
                name="password"
                id="password"
                placeholder="Password"
                required
              />
              <button onClick={handleSubmit}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
