import React from "react";

import "./styles.css";

interface IFormErrorProps {
  error: string;
}

const FormError: React.FC<IFormErrorProps> = ({ error }) => {
  return error ? (
    <div className="error">
      <span>{`Ocorreu um erro: ${error}`}</span>
    </div>
  ) : null;
};

export default FormError;
