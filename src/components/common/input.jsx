import React from "react";

const Input = ({ label, error, ...props }) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-300 mb-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2 rounded-lg bg-gray-800 text-white border 
          focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-700"}
        `}
        {...props} // This spreads name, value, onChange, type, placeholder etc.
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
