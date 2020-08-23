import React, { useState } from "react";
import { Teacher } from "../../Utils/interfaces";

import api from "../../services/api";

import Avatar from '../Avatar';

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";
import initialHeartIcon from "../../assets/images/icons/heart.svg";
import fullHeartIcon from "../../assets/images/icons/full-heart.svg";

import getSave, { saveStorage, getIds } from "../../Utils/storage";

import "./styles.css";

interface TeacherItemProps {
  teacher: Teacher;
  isFavorite: boolean;
}

const FAVORITE = 'Favoritar';
const UNFAVORITE = 'Desfavoritar';

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, isFavorite }) => {
  const { avatar, bio, cost, name, subject, whatsapp, id } = teacher;
  const [heart, setHeart] = useState({
    isFavorite,
    svg: isFavorite ? fullHeartIcon : initialHeartIcon,
  });

  const handleFavorite = () => {
    const favorites = getSave();
    const ids = getIds();

    if (heart.isFavorite) {
      favorites.splice(ids.indexOf(id), 1);
      
      setHeart({
        isFavorite: false,
        svg: initialHeartIcon,
      });

      saveStorage(favorites);
      return 0;
    }

    setHeart({
      isFavorite: true,
      svg: fullHeartIcon,
    });

    favorites.push(teacher);
    saveStorage(favorites);
  };

  const currencyBRL = (value: number) => {
    const options = { style: "currency", currency: "BRL" };

    return value.toLocaleString("pt-BR", options);
  };

  const createNewConnection = () => {
    api.post("connections", {
      user_id: id,
    });
  };

  return (
    <article className="teacher-item">
      <header>
        <Avatar avatar={avatar} link={`/profile/${id}`} />
        <div>
          <strong>{name}</strong>
          <span>{subject}</span>
        </div>
      </header>

      <p>{bio}</p>

      <footer>
        <p>
          Preço/hora
          <strong>{currencyBRL(cost)}</strong>
        </p>

        <div className="buttons-container">
          <button
            type="button"
            className="fav"
            onClick={handleFavorite}
            title={heart.isFavorite ? UNFAVORITE : FAVORITE}
          >
            <img src={heart.svg} alt="" />
          </button>

          <a
            target="_blank"
            onClick={createNewConnection}
            href={`https://wa.me/${whatsapp}`}
          >
            <img src={whatsappIcon} alt="Whatsapp" />
            Entre em contato
          </a>
        </div>
      </footer>
    </article>
  );
};

export default TeacherItem;
