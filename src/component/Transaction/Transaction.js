import React from "react";
import "./Transaction.scss";
import { useUserContext } from "../../contexts/UserContext";

const Transaction = ({ item, amount, category, handleClick, id }) => {
  const { myCategories } = useUserContext();

  const findColor = (category) => {
    for (let i = 0; i < myCategories.length; i++) {
      if (category === myCategories[i].name) {
        return myCategories[i].color;
      }
    }
  };
  return (
    <div className="transaction">
      <span className="transaction__item">{item}</span>
      <span>{amount}</span>
      <span style={{ borderRight: `5px solid ${findColor(category)}` }}>
        {category[0].toUpperCase() + category.slice(1, category.length)}
      </span>
      {/* <div
        style={{
          position: "relative",
          bottom: "16px",
          height: "0.75rem",
          width: "0.75rem",
          borderRadius: "10px",
          background: findColor(category),
        }}
      /> */}
      <button
        onClick={() => {
          handleClick(id);
        }}
      >
        delete
      </button>
    </div>
  );
};

export default Transaction;
