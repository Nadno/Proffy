import React from "react";
import { Teacher } from "../../Utils/interfaces";

import api from "../../services/api";

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem:React.FC<TeacherItemProps> = ({ teacher }) => {
  const {
    avatar,
    bio,
    cost,
    name,
    subject,
    whatsapp,
    id,
  } = teacher;

  const createNewConnection = () => {
    api.post('connections', {
      user_id: id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img
          src={avatar}
          alt="Professor"
        />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>
        {bio}
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R${cost},00</strong>
        </p>

        <a
        target="_blank"
        onClick={createNewConnection}
        href={`https://wa.me/${whatsapp}`} 
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entre em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
