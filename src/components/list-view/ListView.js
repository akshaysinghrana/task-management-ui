import { useEffect, useState } from "react";
import Card from "../card/Card";
import "./style.css";
import {
  getUserInitials,
  priorityIconObj,
  reversedPriorityObj,
} from "../../utils/constants/helper";
export default function ListView({
  headerText = "",
  count = 0,
  type,
  listHeaderWiseData,
  userList,
}) {
  const [data, setData] = useState([]);
  const icon =
    type === "priority" && priorityIconObj[reversedPriorityObj[headerText]];

  useEffect(() => {
    const data =
      listHeaderWiseData?.[headerText].sort(
        (a, b) => a.priority - b.priority
      ) || [];
    setData(data);
  }, [listHeaderWiseData, headerText]);

  return (
    <div className="list-view-container">
      <div className="list-header">
        <span className={icon ? "imageHeader" : "imageHeader"}>
          {icon && <img src={icon} alt={headerText} />}
          {headerText} <span className="grey">{count}</span>
        </span>
        <span className="action-section grey">
          <span>+</span>
          <span>...</span>
        </span>
      </div>
      {data?.map((item) => (
        <Card
          id={item?.id}
          key={item?.id}
          userInitials={getUserInitials(userList[item?.userId]?.name)}
          title={item?.title}
          taskType={item?.tag.join(",")}
          isAvailable={userList[item?.userId]?.available || false}
          priority={item?.priority}
        />
      ))}
    </div>
  );
}
