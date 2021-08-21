import React from "react";
import "./Input.scss";
const Input = ({ placeholder, onChange, name, value }) => {
  return (
    <input
      className="input"
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      value={value}
    />
  );
};

export default Input;
