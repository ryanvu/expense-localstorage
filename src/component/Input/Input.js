import React from "react";
import "./Input.scss";
const Input = ({
  expense,
  number,
  label,
  placeholder,
  onChange,
  name,
  value,
}) => {
  if (expense) {
    return (
      <div className="input__wrapper">
        <label className="input__label">{label}</label>
        {number ? (
          <div
            style={{
              display: "flex",
              alignSelf: "stretch",
              alignItems: "center",
            }}
          >
            <span className="amount__dollarsign">$</span>
            <input
              className="input amount"
              type="number"
              min="0.01"
              step="0.01"
              max="5000"
              placeholder={placeholder}
              onChange={onChange}
              name={name}
              value={value}
            />
          </div>
        ) : (
          <input
            className="input"
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            name={name}
            value={value}
          />
        )}
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
