import React from 'react';
import { useHistory } from 'react-router-dom';

import logoImg from "../../assets/images/logo.svg";
import backIcon from "../../assets/images/icons/back.svg";

import './styles.css';

const SignLogo = () => {
  const history = useHistory();
  return (
    <div id="logo-container">
          <button type="button" onClick={() => history.goBack()}>
            <img src={backIcon} alt="Voltar" />
          </button>
          <img src={logoImg} alt="Proffy Logo" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>
  );
};

export default SignLogo;