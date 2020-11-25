import React, { useState, FormEvent, useContext } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../../store";
import { apiPost } from "../../services/api";
import verifyExpireToken from "../../Utils/refreshToken";

import SignOut from "../../components/SignOut";
import PageHeader from "../../components/PageHeader";
import LoginRedirect from "../../components/LoginRedirect";

import "./styles.css";
import ClassForm from "../../components/Pattern/ClassForm";

const TeacherForm = () => {
  const AuthProvider = useContext(UserContext);
  const history = useHistory();
  const [data, setData] = useState({});

  const handleCreateClass = async (e: FormEvent) => {
    e.preventDefault();
    const user_id = AuthProvider?.user ? AuthProvider?.user.account.id : 0;

    if (user_id === 0) return null;
    setData({
      ...data,
      user_id,
    });

    const itsOk = await verifyExpireToken();
    if (!itsOk) return SignOut();

    try {
      await apiPost("classes/create", data)
      .then(() => {
        alert("Cadastro realizado com sucesso!");
        history.push("/");
      });
    } catch {
      alert("Não foi possível criar a aula no momento, por favor tente mais tarde!");
    }
  };

  if (AuthProvider?.user.account.id === 0) return <LoginRedirect />;

  return (
    <div id="page-teacher-form" className="container">
      <PageHeader
        pageTitle="Dar aulas"
        title="Que incrível que você quer dar aulas."
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <ClassForm 
          Submit={handleCreateClass}
          setData={setData}
        />
      </main>
    </div>
  );
};

export default TeacherForm;
