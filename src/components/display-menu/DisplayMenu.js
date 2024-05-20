import React, { useEffect, useState } from "react";
import DownArrow from "../../assets/icons/down.svg";
import "./style.css";

const groupingObj = {
  status: "Status",
  userId: "Users",
  priority: "Priority",
}

const DisplayMenu = ({ handleSelectedGrouping }) => {
  const [selectedGrouping, setSelectedGrouping] = useState("status");
  const [selectedOrdering, 
    // setSelectedOrdering
  ] = useState("priority");

  const handleGroupingChange = (e, type) => {
    e.preventDefault();
    setSelectedGrouping(type);
    const element = document.getElementById("status");
    element.classList.toggle("active")
  };

  // const handleOrderingChange = (type) => {
  //   setSelectedOrdering(type);
  // };

  const handleClick = (e) => {
    e.preventDefault();
    const element = document.getElementById("status");
    element.classList.toggle("active")
  };

  useEffect(() => {
    handleSelectedGrouping(selectedGrouping);
  }, [selectedGrouping, handleSelectedGrouping])

  return (
    <div className="display-container">
      <div className="display-menu">
        <div className="menu-section">
          <div className="menu-item-label">Grouping</div>
          <div className="menu-item dropdown">
            <div className="dropdown-label" onClick={handleClick}>
              {groupingObj[selectedGrouping]}
              <img src={DownArrow} alt="drop-down-arrow" />
            </div>
            <div id="status" className="dropdown-content">
              <div className="dropdown-option" onClick={(e) => handleGroupingChange(e, "status")}>Status</div>
              <div className="dropdown-option" onClick={(e) => handleGroupingChange(e, "userId")}>Users</div>
              <div className="dropdown-option" onClick={(e) => handleGroupingChange(e, "priority")}>Priority</div>
            </div>
          </div>
        </div>
        <div className="menu-section">
          <div className="menu-item-label">Ordering</div>
          <div className="menu-item dropdown">
            <div className="dropdown-label">
              {groupingObj[selectedOrdering]}
              <img src={DownArrow} alt="drop-down-arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayMenu;
