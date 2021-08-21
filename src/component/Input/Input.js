import React from "react";
import "./Input.scss";
const Input = ({ expense, label, placeholder, onChange, name, value }) => {
  if (expense) {
    return (
      <div className="input__wrapper">
        <label className="input__label">{label}</label>
        <input
          className="input"
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          value={value}
        />
      </div>
    );
  }
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
