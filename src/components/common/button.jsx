import React from "react";
import "./button.css";

const Button = ({ children, isLoading, variant = "primary", ...props }) => {
  return (
    <button
      className={`btn btn-${variant}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="btn-loading">
          <svg className="spinner" viewBox="0 0 24 24">
            <circle
              className="spinner-circle"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="spinner-path"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
