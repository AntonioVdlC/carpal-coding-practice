import React from "react";

const Input = ({
  className,
  label,
  placeholder,
  value,
  onInputChange,
  onInputFocus,
  onInputBlur,
  onInputKeyDowm,
  inputRef
}) => (
  <label className="input-container">
    <span className="input-label">{label}</span>
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
  </label>
);

export default Input;
