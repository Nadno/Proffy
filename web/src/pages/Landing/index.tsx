import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../store";

import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";

import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";

import { apiGet } from "../../services/api";

import Sign from "../../components/Sign";
import Avatar from "../../components/Avatar";
import SignOutButton from "../../components/SignOutButton";

import "./styles.css";

const Landing = () => {
  const AuthProvider = useContext(UserContext);

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    apiGet("/connections").then((response) =>
      setTotalConnections(response.data.total)
    );
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content">
        <header>
          <Avatar
            avatar="https://avatars0.githubusercontent.com/u/62628261?s=460&u=8e53dd470fb29af34da48cbb698284eb3cf19032&v=4"
            link="/"
          />

          <SignOutButton signOut={() => console.log("ok")} />
        </header>

        <article className="intro">
          <div className="logo-container">
            <img src={logoImg} alt="Proffy Logo" />
            <h2>Sua plataforma de estudos online.</h2>
          </div>

          <img
            src={landingImg}
            alt="Plataforma de estudos"
            className="hero-image"
          />
        </article>

        <footer>
          <span className="welcome">
            Seja bem-vindo. <br />
            <strong>O que deseja fazer?</strong>
          </span>

          <section className="options-container">
            <span className="total-connections">
              Total de {totalConnections} conexões já realizadas
              <img src={purpleHeartIcon} alt="Coração roxo" />
            </span>

            <div className="buttons-container">
              <Link to="/study" className="study">
                <img src={studyIcon} alt="Estudar" />
                Estudar
              </Link>

              <Link to="/give-classes" className="give-classes">
                <img src={giveClassesIcon} alt="Dar aula" />
                Dar aula
              </Link>
            </div>
          </section>
          {/* {AuthProvider?.user.token ? null : <Sign />} */}
        </footer>
      </div>
    </div>
  );
};

export default Landing;
