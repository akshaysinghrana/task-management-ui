import React from "react";
import "./style.css";
import { priorityIconObj } from "../../utils/constants/helper";

function Card({
  id,
  taskType,
  title,
  isAvailable,
  priority,
  userInitials = "TT",
}) {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-body">
          <div className="card-title-container">
            <h2 className="card-title">{id}</h2>
          </div>
          <span className="vulnerability-assessment">{title}</span>
          {taskType && (
            <div className="task-type-container">
              <span className="border-grey-box task-type-icon-container">
                <img
                  src={priorityIconObj[priority]}
                  alt={title}
                  className="task-type-icon"
                />
              </span>
              <span className="task-type-text border-grey-box">{taskType}</span>
            </div>
          )}
        </div>
      </div>
      <div className="card-image-container">
        <div id="userAvatar" className="card-image">
          {userInitials}
        </div>
        <div
          className={`availability-circle ${
            isAvailable ? "available" : "unavailable"
          }`}
        ></div>
      </div>
    </div>
  );
}

export default Card;
