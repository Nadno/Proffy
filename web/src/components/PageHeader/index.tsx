import React from "react";
import { Link } from "react-router-dom";

import Avatar from "../Avatar";

import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";

import "./styles.css";

export interface PageHeaderProps {
  title: string;
  description?: string;
  avatar?: string;
  user_id?: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  children, title, description, avatar = "", user_id,
}) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="Voltar" />
        </Link>
        <section className="logo-and-profile">
          <article className="profile">
            {
              avatar.length > 0 
                && 
              <Avatar avatar={avatar} link={`/profile/${user_id}`} />
            }
          </article>
          <img src={logoImg} alt="Proffy" />
        </section>
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
