import React from "react";

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

const TeacherItem = () => {
  return (
    <article className="teacher-item">
      <header>
        <img
          src="https://avatars0.githubusercontent.com/u/62628261?s=460&u=8e53dd470fb29af34da48cbb698284eb3cf19032&v=4"
          alt="Professor"
        />
        <div>
          <strong>Fernando Machado</strong>
          <span>Matemática</span>
        </div>
      </header>

      <p>
        As vezes não sei nem onde eu tô, mas consigo me localizar facilmente em
        qualquer lugar. Tenho memória fotográfica e nunca fico perdido.
        <br />
        Eu ensino a galera como não ser perder em matemática, com lições
        práticas e simples para você nunca precisar proucuar um tutorial no
        youtube.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 20,00</strong>
        </p>

        <button type="button">
          <img src={whatsappIcon} alt="Whatsapp" />
          Entre em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
