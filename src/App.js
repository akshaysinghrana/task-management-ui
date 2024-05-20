import "./App.css";
import ListView from "./components/list-view/ListView";
import { useEffect, useState } from "react";
import useFetchTaskData from "./utils/custom-hooks/useFetchTaskData";
import DisplayMenu from "./components/display-menu/DisplayMenu";
import DisplayMenuIcon from "./assets/icons/Display.svg";
import DownArrow from "./assets/icons/down.svg";
import { priorityObj } from "./utils/constants/helper";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [tickets, users, isLoading, error] = useFetchTaskData();
  const [listHeaders, setListHeaders] = useState({});
  const [listHeaderWiseData, setListHeaderWiseData] = useState({});
  const [displayFilter, setDisplayFilter] = useState("status");
  const [userObj, setUserObj] = useState({});

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const getHeaderList = (type) => {
    const headerList = {};
    const result = {};
    const userMap = {};
    if (type === "userId") {
      users.forEach((user) => {
        userMap[user.id] = user.name;
      });
    }

    const priorityMap = {};
    if (type === "priority") {
      Object.keys(priorityObj).forEach((key) => {
        priorityMap[key] = priorityObj[key];
      });
    }

    tickets?.forEach((item) => {
      const itemValue = item?.[type];
      if (itemValue || itemValue === 0) {
        headerList[itemValue] = (headerList[itemValue] || 0) + 1;
      }
    });

    Object.keys(headerList).forEach((key) => {
      if (type === "userId") {
        result[userMap[key]] = headerList[key];
      } else if (type === "priority" && priorityMap[key]) {
        result[priorityMap[key]] = headerList[key];
      } else {
        result[key] = headerList[key];
      }
    });

    return result;
  };

  const loadUserWiseData = () => {
    const userWiseData = {};
    console.log("here");
    const usersList = users.filter((item) => item.id);
    console.log("userList", usersList);
    usersList?.forEach((user) => {
      const name = user.name;
      if (name) {
        userWiseData[name] = tickets.filter((ele) => ele.userId === user.id);
      }
    });
    return userWiseData;
  };

  const loadPriorityWiseData = () => {
    const priorityWiseData = {};
    Object.keys(priorityObj).forEach((item) => {
      const priority = priorityObj[item];
      if (priority) {
        priorityWiseData[priority] = tickets.filter(
          (ele) => ele.priority === parseInt(item)
        );
      }
    });
    return priorityWiseData;
  };

  const loadStatusWiseData = (statusList) => {
    const statusWiseData = {};
    Object.keys(statusList).forEach((item) => {
      statusWiseData[item] = tickets.filter((ele) => ele.status === item);
    });
    return statusWiseData;
  };

  const getGroupWiseData = (headerList, type) => {
    let listHeaderWiseData = {};
    if (type === "status") {
      listHeaderWiseData = loadStatusWiseData(headerList);
    } else if (type === "userId") {
      listHeaderWiseData = loadUserWiseData();
    } else {
      listHeaderWiseData = loadPriorityWiseData(headerList);
    }
    setListHeaderWiseData(listHeaderWiseData);
  };

  const handleSelectedGrouping = (type = "status") => {
    setDisplayFilter(type);
  };

  useEffect(() => {
    const headerList = getHeaderList(displayFilter);
    setListHeaders(headerList);
    getGroupWiseData(headerList, displayFilter);
    users?.forEach((user) => {
      userObj[user.id] = user;
    });
    setUserObj({ ...userObj });
  }, [displayFilter, tickets, users]);

  if (error) {
    return (
      <div className="error">
        Something went wrong.
        <br />
        Please try again later.
      </div>
    );
  }
  return !isLoading ? (
    <div>
      <div className="app-header">
        <button className="dropdown-label display-button" onClick={handleClick}>
          <img src={DisplayMenuIcon} alt="drop-down-arrow" />
          Display
          <img src={DownArrow} alt="drop-down-arrow" />
        </button>
        {isOpen ? (
          <DisplayMenu handleSelectedGrouping={handleSelectedGrouping} />
        ) : null}
      </div>
      <div className="container">
        {Object.keys(listHeaders)?.map((item) => (
          <ListView
            type={displayFilter}
            headerText={item}
            count={listHeaders[item]}
            key={item}
            listHeaderWiseData={listHeaderWiseData}
            userList={userObj}
          />
        ))}
      </div>
    </div>
  ) : (
    "loading..."
  );
}

export default App;
