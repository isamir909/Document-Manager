import React, { useState } from "react";
import "./Profile.css";
import axios from "axios";
import { windowAlert } from "../Error/Alerts";
const Profile = () => {
  const [Profile] = useState(localStorage.profilePicture);
  const [UserUpdate, setUserUpdate] = useState({
    name: localStorage.name,
    email: localStorage.email,
    phone: localStorage.phone,
    profilePicture: "",
    password: "",
  });
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserUpdate({ ...UserUpdate, [name]: value });
  };

  const options = {
    url: "http://localhost:3001/user/:id",
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      jwt: localStorage.token,
    },
    data: {
      ...UserUpdate,
    },
  };

  const updateUserRequest = async () => {
    axios(options)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("phone", response.data.data.phone);
        windowAlert(response.data.message);
      })
      .catch((err) => {
        windowAlert(err.response.data.message);
      });
  };

  const handleUserUpdate = () => {
    updateUserRequest();
  };
  return (
    <div className="profile-container">
      <div className="profile-main">
        <div className="profile">
          <img
            alt="userImage"
            src={ Profile || require(`../../assets/images/profile.jpg`)}
          />
          <br />
        </div>
      </div>
      <div className="form-fields">
        <form autoComplete="off">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={UserUpdate.name}
          ></input>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={UserUpdate.email}
          ></input>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={UserUpdate.password}
          ></input>
          <input
            type="number"
            placeholder="Phone"
            name="phone"
            onChange={handleChange}
            value={UserUpdate.phone}
          ></input>
        </form>
        <div className="buttons">
          <button type="button" onClick={handleUserUpdate}>
            Save Changes
          </button>
          <button>Increase Storage</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
 