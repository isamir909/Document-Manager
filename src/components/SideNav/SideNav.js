import React, {   useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SideNav.css"
const SideNav = () => {
  const [AvailableSpace] = useState(
    Number(localStorage.availableStorage)
  );
  const [TotalSpace] = useState(
    Number(localStorage.totalStorageCapacity)
  );
  const navigation = useNavigate();
  const handleClick=(e)=>{
      e.preventDefault()
      navigation("/user/premium")
  }
  let percentage = ((AvailableSpace / TotalSpace) * 100).toFixed(2);
  return (
    <div>
       <div className="home-sideNav">
        <h3>Storage Information</h3>
        <p>☁ Storage ({percentage}% available)</p>
        <progress id="file" value={percentage} max="100">
          {" "}
        </progress>
        <div className="progress-bar-label">
          <div className="percentage">
            <div> {AvailableSpace} Kb</div>
            <div> {TotalSpace} Kb</div>
          </div>
          <br/>
          <button onClick={handleClick}>Buy Storage</button>
        </div>
      </div>
    </div>
  )
}

export default SideNav
