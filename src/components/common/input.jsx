import React from "react";
import "./input.css";

const Input = ({ label, error, ...props }) => {
  return (
    <div className="input-wrapper">
      {label && <label className="form-label">{label}</label>}
      <input
        className={`form-input ${error ? "input-error" : ""}`}
        {...props}
      />
      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
};

export default Input;
