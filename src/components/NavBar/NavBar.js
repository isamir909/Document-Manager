import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";


const NavBar = () => {
  const token = localStorage.getItem("token");
  const logout=()=>{
    localStorage.clear() 
    window.location.reload(false)
   
}
  const id=localStorage.id
  return ( 
    <div>
      {!token ? (
        <div className="navBar">
          <div className="title">
            <h1> 📄 Doc Manager</h1>
            <h3>All documents right on your finger tip</h3>
          </div>
          <div className="elements">
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </div>
        </div>
      ) : (
        <div className="navBar">
          <div className="title">
            <h1> 📄 Doc Manager</h1>
            <h3>All documents right on your finger tip</h3>
          </div>
          <div>
            <ul  className="elements">
              <li className="nav-ele"> <NavLink to="/">Home</NavLink></li>
              <li  className="nav-ele"> <NavLink to="/documents">Documents</NavLink></li>
              <li  className="nav-ele"> <NavLink to={`user/${id}`}>Profile</NavLink></li>
              <li  className="nav-ele"> <NavLink onClick={logout} to="/login">Logout</NavLink></li>
            </ul>
           
           
            
           
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
