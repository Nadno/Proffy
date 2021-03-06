import React, { InputHTMLAttributes } from "react";

import "./styles.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
}

const Input: React.FC<InputProps> = ({ label, name, ...rest }) => {
  return (
    <div className="input-block">
      { label ? <label htmlFor={name}>{label}</label> : null }
      <input type="text" id={name} {...rest} />
    </div>
  );
};

export default Input;
