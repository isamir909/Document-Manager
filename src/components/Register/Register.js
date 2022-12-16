import React, { useState } from "react";
import "../Login/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { windowAlert } from "../Error/Alerts";
const Register = () => {
  const[name, setName]=useState("")
  const[email, setEmail]=useState("")
  const[phone, setPhone]=useState("")
  const[profilePicture, setProfilePicture]=useState(null)
  const[password, setPassword]=useState("")
  const[confirmPassword, setConfirmPassword]=useState("")
 
 
  const navigate=useNavigate()

  const RegisterData=async()=>{
    const formData = new FormData()
    formData.append('name', name )
    formData.append('email', email )
    formData.append('phone', phone )
    formData.append('password', password )
    formData.append('profilePicture', profilePicture )

    const options = {
        headers:{
            "Content-Type":"multipart/form-data",
        }
    }
    axios.post('http://localhost:3001/register', formData, options )
    .then (res=>{
      console.log(res);
      windowAlert("user created successfully please login")
      navigate('/login')
  })
    .catch(err=>alert(err.response.data.message))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setConfirmPassword("")
    setPassword ("")
    setProfilePicture ("")
    setPhone ("")
    setPhone ("")
    setEmail ("")
    setName("")
  };

  return (
    <div className="container">
      <div className="main">
        <div className="signup">
          <form  onSubmit={handleSubmit}  autoComplete="off" >
            <label>Sign up</label>
            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              type="text"
              required
              placeholder="name"
            />
            <label
              style={{
                fontSize: "12px",
                margin: "0",
                padding: "0",
                marginRight: "30%",
              }}
            >
              Add Profile Picture
            </label>
            <input
              accept=".jpeg, .png, .jpg"
              onChange={(e)=>setProfilePicture(e.target.files[0])}
              type="file"
              name="img"
            />
      
            <input
              type="text"
              autoComplete="off"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            <input
              type="number"
              autoComplete="off"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              placeholder="phone number"
              maxLength="10"
              required
            />
            <input
              type="password"
              autoComplete="off"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <input
              type="password"
              autoComplete="off"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              required
            />
            <button onClick={RegisterData}>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

