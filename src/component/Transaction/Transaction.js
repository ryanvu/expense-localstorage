import React from "react";
import "./Transaction.scss";

const Transaction = ({ item, amount, category, handleClick, id }) => {
  return (
    <div className="transaction">
      <span className="transaction__item">{item}</span>
      <span>{amount}</span>
      <span>
        {category[0].toUpperCase() + category.slice(1, category.length)}
      </span>
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
