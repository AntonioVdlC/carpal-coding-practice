import React from "react";

import "./Input.css";

const Input = ({
  className,
  label,
  placeholder,
  value,
  onInputChange,
  onInputFocus,
  onInputBlur,
  onInputKeyDowm,
  onButtonClick,
  inputRef
}) => (
  <label className="input-container">
    <span className="input-label">{label}</span>
    <div className="input-wrapper">
      <input
        className={`input-text ${className || ""}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onInputChange(e.target.value)}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onKeyDown={onInputKeyDowm}
        ref={inputRef}
      />
      {onButtonClick ? (
        <button className="input-button" onClick={onButtonClick}>
          Go
        </button>
      ) : null}
    </div>
  </label>
);

export default Input;
