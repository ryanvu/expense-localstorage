import React, { useState } from "react";
import MyCards from "../../component/MyCards/MyCards";
import "./Dashboard.scss";

const Dashboard = () => {
  const [right, setRight] = useState("cards");
  return (
    <div className="dashboard">
      <h2 className="dashboard__title">dashboard.</h2>
      <div className="dashboard__container">
        {/* left */}
        <ul className="dashboard__nav">
          <li
            onClick={() => {
              setRight("cards");
            }}
            className="dashboard__nav-items"
          >
            my cards
          </li>
          <li
            onClick={() => {
              setRight("settings");
            }}
            className="dashboard__nav-items"
          >
            settings
          </li>
        </ul>
        {/* right */}

        {right === "cards" && <MyCards />}
      </div>
    </div>
  );
};

export default Dashboard;
