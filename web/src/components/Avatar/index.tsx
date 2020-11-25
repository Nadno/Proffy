import React from "react";
import { Link } from "react-router-dom";

import "./styles.css";

interface AvatarProps {
  avatar: string;
  link: string;
  name?: string;
  subject?: string;
}

const Avatar: React.FC<AvatarProps> = ({ avatar, link, }) => {
  return (
    <article id="avatar">
      <Link to={link}>
        <img src={avatar} alt="Avatar" />
      </Link>
    </article>
  );
};

export default Avatar;
