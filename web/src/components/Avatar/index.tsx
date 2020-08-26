import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

interface IAvatarProps {
  avatar: string;
  link: string;
}

const Avatar: React.FC<IAvatarProps> = ({ avatar, link }) => {
  return (
    <article id="avatar">
      <Link to={link}>
        <img src={avatar} alt="Avatar" />
      </Link>
    </article>
  );
};

export default Avatar;
