import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../Avatar";

import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";

import "./styles.css";

export interface PageHeaderProps {
  title: string;
  description?: string;
  pageTitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  children, pageTitle, title, description, 
}) => {
  return (
    <header id="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <span>{ pageTitle }</span>
        <img src={logoImg} alt="Proffy" />
      </div>

      <div className="header-content">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
        {children}
      </div>
    </header>
  );
};

export default PageHeader;
