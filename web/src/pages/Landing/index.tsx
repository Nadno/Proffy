import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../store";

import logoImg from "../../assets/images/logo.svg";
import landingImg from "../../assets/images/landing.svg";

import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";

import { apiGet } from "../../services/api";

import "./styles.css";
import Sign from "../../components/Sign";

const Landing = () => {
  const AuthProvider = useContext(UserContext);

  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    apiGet("/connections")
      .then((response) => setTotalConnections(response.data.total));
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logoImg} alt="Proffy Logo" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>

        <img
          src={landingImg}
          alt="Plataforma de estudos"
          className="hero-image"
        />

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

        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas
          <img src={purpleHeartIcon} alt="Coração roxo" />
        </span>
        { AuthProvider?.user.token ? null : <Sign /> }
      </div>
    </div>
  );
};

export default Landing;
