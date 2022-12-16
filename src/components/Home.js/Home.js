import React, { useState } from "react";
import SideNav from "../SideNav/SideNav";
import "./Home.css";
import axios from "axios";
import { windowAlert } from "../Error/Alerts";
const Home = () => {
  const [inputFile, setInputFile] = useState("");
  const handleUpload = async (event) => {
    event.preventDefault(); 
    const formData = new FormData();
    formData.append("file", inputFile);
    try {
      const response = await axios({
        method: "POST",
        url: "http://localhost:3001/upload-document",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          jwt: localStorage.token,
        },
      });

      console.log(response);
      windowAlert(response.data.message);
      // setoutput(response.data)
      localStorage.setItem(
        "totalStorageCapacity",
        response.data.totalStorageCapacity
      );
      localStorage.setItem("availableStorage", response.data.availableStorage);
    } catch (error) {
      windowAlert(error.response.data.message);
      console.log(error);
    }
  };
  const handleChange = (event) => {
    setInputFile(event);
  };
  return (
    <div className="home-container">
      <SideNav />
      <div className="upload-file">
        <form>
          <label>Upload Document</label>
          <input
            type="file"
            accept=".csv, .pdf , .xlsx"
            onChange={(e) => handleChange(e.target.files[0])}
          ></input>
          <button type="button" onClick={handleUpload}>
            upload File
          </button>
        </form>
      </div> 
    </div>
  );
};

export default Home;
