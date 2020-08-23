import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

interface IAvatarProps {
  avatar: string;
  link: string;
};

const Avatar: React.FC<IAvatarProps> = ({ avatar, link }) => {
  return (
    <div id="avatar">
      <Link to={link} target="_blank">
        <img src={avatar} alt="Avatar"/>
      </Link>
    </div>
  );
};

export default Avatar;